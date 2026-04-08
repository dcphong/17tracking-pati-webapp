import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const API_URL = process.env['TRACK_API_URL'] || 'https://api.17track.net/track/v2.2'
const API_KEY = process.env['TRACK_SECURITY_KEY'] || ''
const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
const SUPABASE_KEY = process.env['SUPABASE_SERVICE_KEY'] || ''
const SHOPIFY_DOMAIN = process.env['SHOPIFY_DOMAIN'] || ''

const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null

export async function POST(req: NextRequest) {
  const { tracking_number } = await req.json()

  if (!tracking_number?.trim()) {
    return NextResponse.json({ error: 'Tracking number is required' }, { status: 400 })
  }

  if (!API_KEY) {
    return NextResponse.json({ error: '17TRACK API key not configured' }, { status: 500 })
  }

  const tn = tracking_number.trim()

  try {
    // Fetch tracking info from 17TRACK + product info from Supabase in parallel
    const [trackRes, products] = await Promise.all([
      fetch(`${API_URL}/gettrackinfo`, {
        method: 'POST',
        headers: { '17token': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify([{ number: tn }]),
      }),
      fetchProducts(tn),
    ])

    const json = await trackRes.json()

    if (json.code !== 0) {
      return NextResponse.json({ error: json.message || 'API error' }, { status: 502 })
    }

    const accepted = json.data?.accepted?.[0]
    if (!accepted) {
      const rejected = json.data?.rejected?.[0]
      const msg = rejected?.error?.message || 'Tracking number not found or not yet registered'
      return NextResponse.json({ error: msg }, { status: 404 })
    }

    return NextResponse.json({ data: accepted, products })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to fetch tracking info' }, { status: 500 })
  }
}

interface ProductInfo {
  title: string
  image: string
  quantity: number
}

async function fetchProducts(trackingNumber: string): Promise<ProductInfo[]> {
  if (!supabase) return []

  try {
    // Find orders with this tracking number
    const { data: orders } = await supabase
      .from('shopify_orders')
      .select('product_name, product_image, ordered_quantity')
      .contains('tracking_numbers', [trackingNumber])

    if (!orders?.length) return []

    // Fetch images for products missing product_image via Shopify storefront
    const products: ProductInfo[] = []
    const imageCache = new Map<string, string>()

    for (const order of orders) {
      const title = order.product_name || ''
      let image = order.product_image || ''

      if (!image && title && SHOPIFY_DOMAIN) {
        console.log(`[track] Fetching image for "${title}" from ${SHOPIFY_DOMAIN}`)
        if (imageCache.has(title)) {
          image = imageCache.get(title) || ''
        } else {
          try {
            const q = encodeURIComponent(title)
            const res = await fetch(
              `https://${SHOPIFY_DOMAIN}/search/suggest.json?q=${q}&resources%5Btype%5D=product&resources%5Blimit%5D=1`,
              { headers: { 'User-Agent': 'Mozilla/5.0' } }
            )
            const data = await res.json()
            const p = data?.resources?.results?.products?.[0]
            image = p?.image || ''
            console.log(`[track] Image result for "${title}": ${image ? 'found' : 'not found'}`)
          } catch (e) { console.log(`[track] Image fetch error for "${title}":`, e) }
          imageCache.set(title, image)
        }
      }

      products.push({ title, image, quantity: order.ordered_quantity || 1 })
    }

    return products
  } catch {
    return []
  }
}

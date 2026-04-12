import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const API_URL = process.env['TRACK_API_URL'] || 'https://api.17track.net/track/v2.2'
const API_KEY = process.env['TRACK_SECURITY_KEY'] || ''
const SUPABASE_URL = process.env['SUPABASE_URL'] || ''
const SUPABASE_KEY = process.env['SUPABASE_SERVICE_KEY'] || ''
const SHOPIFY_DOMAIN = process.env['SHOPIFY_DOMAIN'] || ''

const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null

const ALLOWED_ORIGINS = [
  `https://${SHOPIFY_DOMAIN}`,
  'http://localhost:3000',
]

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ''
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) })
}

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req)
  const { tracking_number } = await req.json()

  if (!tracking_number?.trim()) {
    return NextResponse.json({ error: 'Tracking number is required' }, { status: 400, headers })
  }

  if (!API_KEY) {
    return NextResponse.json({ error: '17TRACK API key not configured' }, { status: 500, headers })
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
      return NextResponse.json({ error: json.message || 'API error' }, { status: 502, headers })
    }

    const accepted = json.data?.accepted?.[0]
    if (!accepted) {
      const rejected = json.data?.rejected?.[0]
      const msg = rejected?.error?.message || 'Tracking number not found or not yet registered'
      return NextResponse.json({ error: msg }, { status: 404, headers })
    }

    return NextResponse.json({ data: accepted, products, shopifyDomain: SHOPIFY_DOMAIN }, { headers })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to fetch tracking info' }, { status: 500, headers })
  }
}

interface ProductInfo {
  title: string
  image: string
  quantity: number
  variant_id: number | null
  unit_price: string
  compare_at_price?: string
  variant_title?: string
}

async function fetchProducts(trackingNumber: string): Promise<ProductInfo[]> {
  if (!supabase) return []

  try {
    // Find orders with this tracking number
    const { data: orders } = await supabase
      .from('shopify_orders')
      .select('product_name, product_image, ordered_quantity, variant_id, unit_price')
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

      // Fetch live variant data from Shopify (price, compare_at_price, availability)
      let variantId = order.variant_id || null
      let price = order.unit_price || ''
      let compareAtPrice = ''
      let variantTitle = ''
      if (variantId && SHOPIFY_DOMAIN) {
        try {
          const vRes = await fetch(`https://${SHOPIFY_DOMAIN}/variants/${variantId}.json`)
          if (vRes.ok) {
            const vData = await vRes.json()
            const v = vData.product_variant
            if (v) {
              price = v.price || price
              compareAtPrice = v.compare_at_price || ''
              variantTitle = v.title || ''
            }
          } else {
            variantId = null  // variant deleted/unpublished
          }
        } catch { variantId = null }
      }

      products.push({ title, image, quantity: order.ordered_quantity || 1, variant_id: variantId, unit_price: price, compare_at_price: compareAtPrice, variant_title: variantTitle })
    }

    return products
  } catch {
    return []
  }
}

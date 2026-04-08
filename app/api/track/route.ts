import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env['17TRACK_API_URL'] || 'https://api.17track.net/track/v2.2'
const API_KEY = process.env['17TRACK_SECURITY_KEY'] || ''

export async function POST(req: NextRequest) {
  const { tracking_number } = await req.json()

  if (!tracking_number?.trim()) {
    return NextResponse.json({ error: 'Tracking number is required' }, { status: 400 })
  }

  if (!API_KEY) {
    return NextResponse.json({ error: '17TRACK API key not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(`${API_URL}/gettrackinfo`, {
      method: 'POST',
      headers: { '17token': API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ number: tracking_number.trim() }]),
    })

    const json = await res.json()

    if (json.code !== 0) {
      return NextResponse.json({ error: json.message || 'API error' }, { status: 502 })
    }

    const accepted = json.data?.accepted?.[0]
    if (!accepted) {
      const rejected = json.data?.rejected?.[0]
      const msg = rejected?.error?.message || 'Tracking number not found or not yet registered'
      return NextResponse.json({ error: msg }, { status: 404 })
    }

    return NextResponse.json({ data: accepted })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to fetch tracking info' }, { status: 500 })
  }
}

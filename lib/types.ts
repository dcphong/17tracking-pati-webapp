// 17TRACK API v2.2 response types

export interface TrackingEvent {
  time_iso: string
  time_utc: string
  description: string
  location: string
  stage: string
  sub_status: string
  address?: {
    country?: string
    state?: string
    city?: string
    postal_code?: string
  }
}

export interface Milestone {
  key_stage: string
  time_iso: string | null
  time_utc: string | null
}

export interface TrackingProvider {
  provider: {
    key: number
    name: string
    alias: string
    homepage: string
    country: string
  }
  events: TrackingEvent[]
}

export interface TrackingData {
  number: string
  carrier: number
  tag: string
  track_info: {
    shipping_info: {
      shipper_address: { country: string; city: string; state?: string }
      recipient_address: { country: string; city: string; state?: string }
    }
    latest_status: {
      status: string
      sub_status: string
      sub_status_descr?: string
    }
    latest_event: TrackingEvent
    time_metrics: {
      days_after_order: number
      days_of_transit: number
      days_of_transit_done: number
      days_after_last_update: number
      estimated_delivery_date?: {
        source: string
        from: string
        to: string
      }
    }
    milestone: Milestone[]
    tracking: {
      providers: TrackingProvider[]
    }
  }
}

// 17TRACK status codes
export const STATUS_MAP: Record<string, string> = {
  NotFound: 'Not Found',
  InfoReceived: 'Info Received',
  InTransit: 'In Transit',
  Expired: 'Expired',
  AvailableForPickup: 'Pick Up',
  OutForDelivery: 'Out for Delivery',
  Delivered: 'Delivered',
  Undelivered: 'Undelivered',
  Exception: 'Exception',
  Alert: 'Alert',
}

// Milestone key_stage mapping
export const MILESTONE_MAP: Record<string, { label: string; icon: string }> = {
  InfoReceived: { label: 'Info Received', icon: '/icons/blank.svg' },
  PickedUp: { label: 'Picked Up', icon: '/icons/pickup.svg' },
  Departed: { label: 'Departed', icon: '/icons/blank.svg' },
  InTransit: { label: 'In Transit', icon: '/icons/blank.svg' },
  Arrived: { label: 'Arrived', icon: '/icons/blank.svg' },
  OutForDelivery: { label: 'Out for Delivery', icon: '/icons/blank.svg' },
  Delivered: { label: 'Delivered', icon: '/icons/blank.svg' },
}

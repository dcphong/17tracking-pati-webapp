export interface TrackingEvent {
  checkpoint_date: string;
  tracking_detail: string;
  location: string;
  checkpoint_delivery_status: string;
  checkpoint_delivery_substatus: string;
  status_description: string;
  date: string;
}

export interface StatusNode {
  date: string;
  name: string;
  checkpoint_date: string;
  tracking_detail: string;
  checkpoint_delivery_status: string;
}

export interface ProductInfo {
  title: string;
  title_img: string;
  product_id: string;
  quantity: number;
  variant: string;
}

export interface TrackingData {
  status_node: Record<string, StatusNode>;
  trackinfo: TrackingEvent[];
  status: string;
  track_number: string;
  carrier_name: string;
  title: ProductInfo[];
  order_number?: string;
  courier: {
    name: string;
    code: string;
    url: string;
    img: string;
  };
}

export type TrackingStatus =
  | "Ordered"
  | "Order Ready"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered"
  | "Exception"
  | "Pending"
  | "Expired"
  | "Failed Attempt"
  | "Info Received";

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  order: number;
  isActive: boolean;
}

export interface TicketUpdatePayload {
  name?: string;
  description?: string;
  price?: number;
  order?: number;
  isActive?: boolean;
}

export interface EventPrice {
  inPerson?: {
    amount: number;
    currency: string;
  };
  virtual?: {
    amount: number;
    currency: string;
  };
}

export interface Event {
  _id: string;
  id: string;
  title: string;
  summary: string;
  link: string;
  image: string;
  expirationDate: string;
  duration?: string;
  isPaid: boolean;
  eventType: 'inPerson' | 'virtual' | 'hybrid';
  price?: EventPrice;
  status: 'active' | 'inactive';
  location: string;
  isActive: boolean;
  createdBy: string;
  lastUpdatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  metadata: Array<{
    total: number;
    totalPages: number;
  }>;
  results: Event[];
}

export interface NameDto {
  first: string;
  lastName: string;
}

export interface EventApplication {
  id?: string;
  eventId?: string;
  applicantName: NameDto;
  eventType: 'inPerson' | 'virtual';
  email: string;
  phoneNumber: string;
  currency?: string;
  referenceId?: string;
  isActive?: boolean;
}

export interface EventsQueryParams {
  page?: number;
  pageSize?: number;
  eventType?: string;
  isPaid?: boolean;
  status?: string;
}

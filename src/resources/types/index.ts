export interface ResourcePrice {
  amount: number;
  currency: string;
}

export interface Resource {
  _id: string;
  id: string;
  title: string;
  summary: string;
  link: string;
  image: string;
  isPaid: boolean;
  price?: ResourcePrice;
  isActive: boolean;
  createdBy: string;
  lastUpdatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResourcesResponse {
  metadata: Array<{
    total: number;
    totalPages: number;
  }>;
  results: Resource[];
}

export interface CreateResourceApplication {
  //resourceId: string
  applicantName: {
    first: string;
    lastName: string;
  };
  email: string;
  phoneNumber: string;
  referenceId?: string;
}

export interface ResourcesQueryParams {
  page?: number;
  pageSize?: number;
  isPaid?: boolean;
  isActive?: boolean;
  search?: string;
}

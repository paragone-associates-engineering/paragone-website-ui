export interface PropertyData {
  id: number;
  title: string;
  price: number;
  type: 'sale' | 'rent';
  featured?: boolean;
  address: string;
sqm: number;
  // propertyDetails: {
  //   id:string;
  //   name:string;
  //   value:string | number | boolean
  // }[];
  bedrooms: number;
  bathrooms: number;
  rating: number;
  image: string;
  location: {
    address: string
    city: string
    state?: string
    country?: string
    coordinates?: {
      lat: number
      lng: number
    }
  },
  propertyType:string;
}

export interface FilterOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface TestimonialData {
  id: number;
  name: string;
  occupation: string;
  comment: string;
  rating: number;
  avatar: string;
}


export interface Landmark {
  name: string
  category: string
  _id: string
}

export interface PropertyDetail {
  bedrooms: number
  bathrooms: number
  hasGarage: boolean
  squareFeet: number
}

export interface ApiProperty {
  _id: string
  id: string
  amount: number
  propertyName: string
  location: string
  listingType: string
  images: string[]
  description: string
  landmarks: Landmark[]
  propertyDetail: PropertyDetail
  area: number;
  videoUrl: string
  propertyDetails: {
    id:string;
    name:string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value:any
  }[];
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ApiListingsResponse {
  properties: ApiProperty[]
  totalCount: number
  page: number
  pageSize: number
}


export interface ListingsQueryParams {
  amountFrom?: number;
  amountTo?: number;
  areaFrom?: number;
  areaTo?: number;
  propertyCategory?: string;
  propertyType?: string;
  propertyName?: string;
  location?: string;
  listingType?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  page?: number;
  pageSize?: number;
  searchString?: string;
  
 
}

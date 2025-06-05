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

// export interface PropertyDetail {
//   bedrooms: number
//   bathrooms: number
//   hasGarage: boolean
//   squareFeet: number
// }

export interface Location {
  id: string;
  country: string;
  city: string;
  region: string;
  postalCode: string;
  _id: string;
}
export interface PropertyDetail {
  id: string;
  name: string;
  value: number | boolean | string;
  _id: string;
}
export interface ApiProperty {
  _id: string;
  id: string;
  amount: number;
  videoUrl: string;
  area: number;
  propertyCategory: string;
  propertyType: string;
  propertyName: string;
  location: Location;
  listingType: string;
  images: string[];
  description: string;
  landmarks: Landmark[];
  propertyDetails: PropertyDetail[];
  isActive: boolean;
  createdBy: string;
  lastUpdatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface ApiListingsResponse {
  properties: ApiProperty[]
  totalCount: number
  page: number
  pageSize: number
}


export interface ListingsQueryParams {
  // Range filters
  amountFrom?: number;
  amountTo?: number;
  areaFrom?: number;
  areaTo?: number;
  searchString?:string;
  // String filters
  propertyCategory?: string;
  propertyType?: string;
  propertyName?: string;
  listingType?: string;
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location?: any
  
  bedrooms?: number;
  bathrooms?: number;
  
  // Pagination
  page?: number;
  pageSize?: number;
}

// Helper function to extract property details by name
export const getPropertyDetailValue = (
  propertyDetails: PropertyDetail[], 
  name: string
): number | boolean | string | undefined => {
  return propertyDetails?.find(detail => detail.name === name)?.value;
};

// Helper function to get bedrooms count
export const getBedrooms = (propertyDetails: PropertyDetail[]): number => {
  const bedrooms = getPropertyDetailValue(propertyDetails, 'bedrooms');
  return typeof bedrooms === 'number' ? bedrooms : 0;
};

// Helper function to get bathrooms count
export const getBathrooms = (propertyDetails: PropertyDetail[]): number => {
  const bathrooms = getPropertyDetailValue(propertyDetails, 'bathrooms');
  return typeof bathrooms === 'number' ? bathrooms : 0;
};
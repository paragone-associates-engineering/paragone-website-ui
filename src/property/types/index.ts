
  export interface PropertyType {
    id: string
    name: string
  }
  
  export interface Location {
    id: string
    name: string
  }
  
  export interface BudgetOption {
    id: string
    range: string
  }
  
  export interface ContactMethod {
    id: string
    name: string
  }
  
  export interface PropertyCalculatorResult {
    recommendedValueRange: {
      min: number
      max: number
    }
    estimatedDownPayment: number
    savingsShortfall: number
    timeToSave: {
      months: number
      savingsRate: number
    }
    monthlyLoanRepayment: number
    propertyRecommendation: string
    proximityScore: {
      distance: number
      description: string
    }
  }
  
  export interface PropertyRequestFormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    propertyType: string
    location: string
    lowestPrice: string
    highestPrice: string
    contactMethod: string
    additionalComments: string
    purpose: "buy" | "rent" | "short-stay"
  }
  
  export interface ManagementFormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    propertyType: string
    location: string
    message: string
  }
  
  export interface Info {
    title: string
    description: string
    
  }
  
  // API response interfaces based on the provided example
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

// I
export interface ListingsQueryParams {
  page?: number
  pageSize?: number
  searchString?: string
  listingType?: string
  location?: string
  minBedrooms?: number
  maxBedrooms?: number
  minBathrooms?: number
  maxBathrooms?: number
  minSquareFeet?: number
  maxSquareFeet?: number
  hasGarage?: boolean
  minAmount?: number
  maxAmount?: number
}


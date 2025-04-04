export interface Property {
    id: string
    title: string
    price: number
    pricePerSqm?: number
    location: {
      address: string
      city: string
      state?: string
      country?: string
      coordinates?: {
        lat: number
        lng: number
      }
    }
    features: {
      bedrooms: number
      bathrooms: number
      area: number
      yearBuilt?: number
      parking?: boolean
      wifi?: boolean
      cableTV?: boolean
      elevator?: boolean
      airConditioning?: boolean
      furnished?: boolean
    }
    description: string
    images: string[]
    propertyType: "apartment" | "house" | "land" | "commercial"
    listingType: "sale" | "rent" | "short-stay"
    rating?: number
    reviewCount?: number
    featured?: boolean
    constructionYear?: number
    constructionPlan?: string
    nearbyPlaces?: NearbyPlace[]
    videoUrl?: string
  }
  
  export interface NearbyPlace {
    category: "education" | "health" | "shopping" | "transport" | "culture"
    name: string
    distance?: number
    type?: string
  }
  
  export interface PropertyFilter {
    listingType?: "sale" | "rent" | "short-stay" | "land"
    location?: string
    minPrice?: number
    maxPrice?: number
    minBeds?: number
    maxBeds?: number
    minBaths?: number
    maxBaths?: number
    minArea?: number
    maxArea?: number
    propertyType?: string
    propertyCategory?: string
    featured?: boolean
  }
  
  export interface Region {
    id: string
    name: string
    propertyCount?: number
    featured?: boolean
  }
  
  
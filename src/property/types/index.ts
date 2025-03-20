
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
  
  
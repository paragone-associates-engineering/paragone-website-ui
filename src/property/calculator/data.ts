import { PropertyType, Location, BudgetOption } from "../types"

export const propertyTypes: PropertyType[] = [
  { id: "apartment", name: "Apartment" },
  { id: "house", name: "House" },
  { id: "land", name: "Land" },
  { id: "commercial", name: "Commercial Property" },
]

export const locations: Location[] = [
  { id: "lagos", name: "Lagos" },
  { id: "abuja", name: "Abuja" },
  { id: "ph", name: "Port Harcourt" },
  { id: "ibadan", name: "Ibadan" },
]

export const budgetOptions: BudgetOption[] = [
  { id: "budget1", range: "₦10,000,000 - ₦20,000,000" },
  { id: "budget2", range: "₦20,000,000 - ₦30,000,000" },
  { id: "budget3", range: "₦30,000,000 - ₦50,000,000" },
  { id: "budget4", range: "₦50,000,000 - ₦100,000,000" },
  { id: "budget5", range: "Above ₦100,000,000" },
]
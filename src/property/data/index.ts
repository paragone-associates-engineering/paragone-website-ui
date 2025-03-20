import { PropertyType, Location, BudgetOption } from "../types";

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

export const priceRanges = [
  { id: "price1", label: "Select price", value: "" },
  { id: "price2", label: "₦5,000,000 - ₦10,000,000", value: "5000000-10000000" },
  { id: "price3", label: "₦10,000,000 - ₦20,000,000", value: "10000000-20000000" },
  { id: "price4", label: "₦20,000,000 - ₦50,000,000", value: "20000000-50000000" },
  { id: "price5", label: "₦50,000,000 - ₦100,000,000", value: "50000000-100000000" },
  { id: "price6", label: "Above ₦100,000,000", value: "100000000+" },
]

export const budgetOptions: BudgetOption[] = [
  { id: "budget1", range: "₦10,000,000 - ₦20,000,000" },
  { id: "budget2", range: "₦20,000,000 - ₦30,000,000" },
  { id: "budget3", range: "₦30,000,000 - ₦50,000,000" },
  { id: "budget4", range: "₦50,000,000 - ₦100,000,000" },
  { id: "budget5", range: "Above ₦100,000,000" },
]

export const contactMethods = [
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "whatsapp", name: "WhatsApp" },
  ]
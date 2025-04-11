import { Info } from "../../types/management";
import { PropertyType, Location, BudgetOption } from "../types";

export const propertyTypes: PropertyType[] = [
  { id: "residential", name: "Residential" },
  //{ id: "house", name: "House" },
  { id: "land", name: "Land" },
  { id: "commercial", name: "Commercial" },
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

  export const services: Info[] = [
      {
        title: "Tenant Placement",
        description:
          "Our team finds ideal and screens high-quality tenant panels, minimizing vacancy periods and maximizing your returns.",
      },
      {
        title: "Maintenance and Repairs",
        description:
          "We coordinate all maintenance and repair issues promptly using trusted contractors to keep your property in prime condition.",
      },
      {
        title: "Rent Collection",
        description:
          "We streamline rent collection and manage late payments, ensuring consistent cash flow and financial stability.",
      },
      {
        title: "Financial Reporting",
        description:
          "Receive detailed & regular financial statements and annual reports, giving you a clear overview of your property's performance.",
        
      },
      {
        title: "Property Inspections",
        description:
          "Regular property inspections help identify and address issues early, preserving the value and condition of your investment.",
        //icon: <SearchIcon />,
      },
      {
        title: "Legal Compliance",
        description:
          "Stay compliant with all applicable regulations, including all legal aspects, from lease agreements to eviction processes.",
        //icon: <GavelIcon />,
      },
    ]
  
    export const approaches: Info[] = [
      {
        title: "Personalized Service",
        description:
          "Every property is unique, and so are our management plans. We take our services to meet the specific needs of each property owner.",
        //icon: <PersonalVideoIcon />,
      },
      {
        title: "Proactive Management",
        description:
          "We anticipate potential issues that could become issues and address them early before they become problems, saving you time and money.",
        //icon: <BuildIcon />,
      },
      {
        title: "Transparent Communication",
        description:
          "Regular updates on your property's status, providing you with regular updates and easy access to important information.",
        //icon: <MessageIcon />,
      },
      {
        title: "Advanced Technology",
        description:
          "Utilizing the latest property management software, we offer paperless communication, efficient maintenance tracking, and detailed financial reporting.",
        //icon: <ComputerIcon />,
      },
    ]
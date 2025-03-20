export interface PropertyData {
  id: number;
  title: string;
  price: number;
  type: 'sale' | 'rent';
  featured?: boolean;
  address: string;
  sqm: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  image: string;
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

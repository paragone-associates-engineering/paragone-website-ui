export interface ManagementFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  location: string;
  message: string;
}

export interface Info {
  title: string;
  description: string;
}

export enum Feature {
  EVENT = 'Event',
  RESOURCES = 'Resources',
}

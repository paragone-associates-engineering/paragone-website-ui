export interface Landmarks {
    name: string;
    category: string;
  }
  
  export interface Property {
    propertyName: string;
    propertyType: string;
    propertyDocuments: File[];
    location: string;
    landmarks: string[];
    description: string;
    propertyImages: File[];
  }
  
  export interface SellAsCompany {
    //id: string;
    companyName: string;
    officeAddress: string;
    cacDocument: File[];
    phoneNumber: string;
    email: string;
    contactMethod: string;
    state: string;
    country: string;
    package: string;
    properties: Property[];
    // isActive: boolean;
    // createdAt: Date;
    // updatedAt: Date;
  }
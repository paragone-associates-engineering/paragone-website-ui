export interface JobOpening {
  id: string
  title: string
  icon: string
  description: string
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  linkedinProfile: string
  department: string
  resume: File | null
  message: string
  agreeToPolicy: boolean
}


export interface JobDetailData {
  title: string
  department: string
  location: string
  description: string
  duties: string[]
  skills: {
    title: string
    description: string
  }[]
  education: {
    educational: string
    experience: string
    certification: string
    preferred: string
  }
  email: string
  deadline: string
}

export interface ApplicationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  linkedinProfile: string
  department: string
  resume: File | null
  message: string
  agreeToPolicy: boolean
}

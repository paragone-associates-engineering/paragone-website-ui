import { z } from "zod";

export const commonContactSchema = z.object({
  name: z.object({
    first: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  }),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number is required"),
});


export const contactFormSchema = commonContactSchema.extend({
  reason: z.string().min(1, "Reason is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});
export const joinUsFormSchema = commonContactSchema.extend({
    location: z.string().min(1, "location is required"),
    additionalComment: z.string().min(1, "Message must be at least 1 characters").optional(),
    participation: z.string().min(5, "Profession required"),
  });

export const getInTouchFormSchema = commonContactSchema.extend({
 propertyType: z.string().min(1, "Property type is required"),
 additionalComment: z.string().min(2, "Message must be at least 2 characters").optional(),
  address: z.string().min(5, "Address is required"),
  contactMethod: z.string().min(1, "Contact method is required"),
  contactTime: z.string().min(1, "Contact time is required"),
  sellDate: z.string().min(1, "Preferred sell date is required"),  

  });
  
  export const propertyRequestFormSchema = commonContactSchema.extend({
    propertyType: z.string().min(1, "Property type is required"),
    additionalComment: z.string().min(2, "Message must be at least 2 characters").optional(),
    location: z.string().min(5, "Location is required"),
    contactMethod: z.string().min(1, "Contact method is required"),
    listingType: z.enum(["buy", "rent", "short-stay"], {
        required_error: "Listing type is required",
      }),
    lowestPrice: z.number().min(0, "Lowest price must be a number"),
    highestPrice: z.number().min(0, "Highest price must be a number"),
  });
  
   
  export const jobApplicationSchema = commonContactSchema.extend({
    jobId: z.string().min(1, 'job id is required'),
    jobTitle: z.string().min(1,'job title is required'),
    profile: z.string().url("Invalid URL").optional(),
    department: z.string().min(1, "Department is required"),
    resume: z.instanceof(File, { message: "Resume is required" }),
    message: z.string().optional(),
    agreeToPolicy: z.boolean().refine((val) => val === true, {
      message: "You must agree to the policy",
    }),
  });
  
  
export type JobApplicationData = z.infer<typeof jobApplicationSchema>;
export type ContactFormSchema = z.infer<typeof contactFormSchema>;
export type JoinUsFormSchema = z.infer<typeof joinUsFormSchema>;
export type GetInTouchFormSchema = z.infer<typeof getInTouchFormSchema>;
export type CommonContactSchema = z.infer<typeof commonContactSchema>;
export type PropertyRequestFormSchema = z.infer<typeof propertyRequestFormSchema>;

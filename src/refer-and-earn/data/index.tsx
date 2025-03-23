export interface ReferralFormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    profession: string
    message: string
  }
  
  export interface FAQ {
    question: string
    answer: string
  }

export const faqs: FAQ[] = [
    {
      question: "What is Refer-And-Earn?",
      answer:
        "Our Refer-And-Earn program is a rewarding initiative that allows you to earn attractive commissions by referring potential clients to us. When your referrals successfully purchase or sell a property through us, you earn rewards and help your network access our exceptional real estate services, making it a mutually beneficial opportunity.",
    },
    {
      question: "How do I sign up for the Refer-And-Earn program?",
      answer:
        "Simply fill out the registration form on this page with your details. Our team will review your application and contact you with your unique referral code and program details.",
    },
    {
      question: "What rewards can I earn?",
      answer:
        "You can earn cash rewards, special commission tiers, and exclusive perks based on successful transactions. Each successful referral earns you a competitive commission.",
    },
    {
      question: "How will I know if my referral was successful?",
      answer:
        "We will keep you updated throughout the process via email and our referral dashboard. You'll receive notifications when your referral makes contact and when transactions are completed.",
    },
    {
      question: "Can I send in direct details of my referral for quick followup?",
      answer:
        "Yes, you can provide direct contact information for immediate follow-up through your referral dashboard or by contacting your dedicated referral program manager.",
    },
  ]
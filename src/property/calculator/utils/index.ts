/**
 * Format a number as Nigerian Naira currency
 * @param value - The number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
  
  /**
   * Format a phone number in Nigerian format
   * @param phoneNumber - The phone number to format
   * @returns Formatted phone number
   */
  export const formatPhoneNumber = (phoneNumber: string): string => {
    // Basic formatting for Nigerian numbers
    if (!phoneNumber) return ""
  
    // Remove non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, "")
  
    // Check if it's a valid Nigerian number
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
    } else if (cleaned.length === 13 && cleaned.startsWith("234")) {
      // Handle international format
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`
    }
  
    // Return as is if it doesn't match expected formats
    return phoneNumber
  }
  
  
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
  
  /**
   * Format a date string
   * @param dateString - The date string to format
   * @param format - Optional format (default: 'MMM DD, YYYY')
   * @returns Formatted date string
   */
  export const formatDate = (dateString: string, format = "MMM DD, YYYY"): string => {
    const date = new Date(dateString)
  
    // Return empty string for invalid dates
    if (isNaN(date.getTime())) return ""
  
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
  
    // Replace format tokens with actual values
    return format
      .replace("YYYY", year.toString())
      .replace("YY", year.toString().slice(-2))
      .replace("MMMM", months[month])
      .replace("MMM", shortMonths[month])
      .replace("MM", (month + 1).toString().padStart(2, "0"))
      .replace("M", (month + 1).toString())
      .replace("DD", day.toString().padStart(2, "0"))
      .replace("D", day.toString())
  }
  
  
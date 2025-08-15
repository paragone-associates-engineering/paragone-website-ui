/* eslint-disable @typescript-eslint/no-explicit-any */
// Helper function to strip HTML tags and truncate text
export const stripHtmlAndTruncate = (html: string, maxLength: number = 200): string => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  const textContent = tempDiv.textContent || tempDiv.innerText || ''
  
  // Truncate if longer than maxLength
  if (textContent.length <= maxLength) {
    return textContent
  }
  
  // Find the last space before the limit to avoid cutting words
  const truncated = textContent.substring(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  
  // If there's a space, cut at the space; otherwise cut at the limit
  const cutPoint = lastSpaceIndex > maxLength * 0.8 ? lastSpaceIndex : maxLength
  
  return textContent.substring(0, cutPoint).trim() + '...'
}

// Update page meta tags for better social sharing
export const updateMetaTags = (resource: any, image?: string) => {
  const updateMetaTag = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="${property}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('property', property)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }
  
  updateMetaTag('og:title', resource.title)
  updateMetaTag('og:description', stripHtmlAndTruncate(resource.summary, 160))
  updateMetaTag('og:image', image || '')
  updateMetaTag('og:url', window.location.href)
}


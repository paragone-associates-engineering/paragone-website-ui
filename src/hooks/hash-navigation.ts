import { useNavigate } from 'react-router-dom';

// Utility functions for hash navigation
export const hashNavigationUtils = {
  // Navigate to a route with optional hash fragment
  navigateToSection: (navigate: ReturnType<typeof useNavigate>, path: string, hash?: string) => {
    const fullPath = hash ? `${path}#${hash}` : path;
    navigate(fullPath);
  },

  // Scroll to element by ID
  scrollToElement: (elementId: string, behavior: ScrollBehavior = 'smooth') => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior,
        block: 'start'
      });
    }
  },

  // Get hash from current URL
  getCurrentHash: () => {
    return window.location.hash.substring(1);
  },

  // Set hash without navigation
  setHash: (hash: string) => {
    window.history.replaceState(null, '', `#${hash}`);
  }
};

// Custom hook for hash navigation
export const useHashNavigation = () => {
  const navigate = useNavigate();

  return {
    navigateToSection: (path: string, hash?: string) => 
      hashNavigationUtils.navigateToSection(navigate, path, hash),
    
    scrollToElement: hashNavigationUtils.scrollToElement,
    getCurrentHash: hashNavigationUtils.getCurrentHash,
    setHash: hashNavigationUtils.setHash
  };
};


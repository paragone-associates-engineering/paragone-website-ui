
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollPosition {
  x: number;
  y: number;
}

class ScrollManager {
  private static instance: ScrollManager;
  private scrollPositions: Map<string, ScrollPosition> = new Map();
  private isRestoring = false;

  static getInstance(): ScrollManager {
    if (!ScrollManager.instance) {
      ScrollManager.instance = new ScrollManager();
    }
    return ScrollManager.instance;
  }

  saveScrollPosition(path: string) {
    if (this.isRestoring) return;
    
    this.scrollPositions.set(path, {
      x: window.scrollX,
      y: window.scrollY
    });
  }

  restoreScrollPosition(path: string, hash?: string) {
    this.isRestoring = true;
    
    // If there's a hash, scroll to that element
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
        this.isRestoring = false;
      }, 100);
      return;
    }

    // Otherwise restore previous scroll position
    const savedPosition = this.scrollPositions.get(path);
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          left: savedPosition.x,
          top: savedPosition.y,
          behavior: 'instant'
        });
        this.isRestoring = false;
      }, 100);
    } else {
      // Default to top for new pages
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        this.isRestoring = false;
      }, 100);
    }
  }

  scrollToHash(hash: string) {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}

export const useScrollManager = () => {
  const location = useLocation();
  const scrollManager = ScrollManager.getInstance();
  const previousLocation = useRef(location);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentHash = location.hash.replace('#', '');
    const previousPath = previousLocation.current.pathname;

    // Save scroll position when leaving a page
    if (previousPath !== currentPath) {
      scrollManager.saveScrollPosition(previousPath);
    }

    // Handle scroll restoration/hash scrolling
    if (currentHash) {
      // If there's a hash, scroll to that element
      scrollManager.scrollToHash(currentHash);
    } else if (previousPath !== currentPath) {
      // If navigating to a different page, restore scroll position
      scrollManager.restoreScrollPosition(currentPath);
    }
    // If same page without hash, maintain current scroll position

    previousLocation.current = location;
  }, [location, scrollManager]);

  return {
    scrollToHash: (hash: string) => scrollManager.scrollToHash(hash),
    saveCurrentPosition: () => scrollManager.saveScrollPosition(location.pathname),
  };
};
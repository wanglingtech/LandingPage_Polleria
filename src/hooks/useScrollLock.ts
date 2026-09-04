import { useEffect } from 'react';

// Counter to track active scroll locks across concurrent components (modals, drawers, menus)
let activeLocksCount = 0;
let scrollYPosition = 0;
let previousBodyPosition = '';
let previousBodyTop = '';
let previousBodyWidth = '';
let previousBodyOverflow = '';
let previousBodyOverscroll = '';
let previousBodyPaddingRight = '';
let previousHtmlOverflow = '';
let previousHtmlOverscroll = '';

export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (!lock) return;

    if (activeLocksCount === 0) {
      // Record current scroll position
      scrollYPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      // Save previous inline styles
      previousBodyPosition = document.body.style.position;
      previousBodyTop = document.body.style.top;
      previousBodyWidth = document.body.style.width;
      previousBodyOverflow = document.body.style.overflow;
      previousBodyOverscroll = document.body.style.overscrollBehavior;
      previousBodyPaddingRight = document.body.style.paddingRight;
      previousHtmlOverflow = document.documentElement.style.overflow;
      previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;

      // Calculate scrollbar width to prevent layout shift
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Apply complete scroll lock to both html and body
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYPosition}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';

      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    }

    activeLocksCount++;

    return () => {
      activeLocksCount = Math.max(0, activeLocksCount - 1);

      if (activeLocksCount === 0) {
        // Restore previous styles
        document.documentElement.style.overflow = previousHtmlOverflow;
        document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;

        document.body.style.position = previousBodyPosition;
        document.body.style.top = previousBodyTop;
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = previousBodyWidth;
        document.body.style.overflow = previousBodyOverflow;
        document.body.style.overscrollBehavior = previousBodyOverscroll;
        document.body.style.paddingRight = previousBodyPaddingRight;

        // Restore scroll position
        window.scrollTo(0, scrollYPosition);
      }
    };
  }, [lock]);
};


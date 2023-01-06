/**
 * https://gist.github.com/reecelucas/cd110ece696cca8468db895281fa28cb
 */

import {useState, useEffect} from 'react';

const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';

type Direction = 'up' | 'down';

export interface UseScrollDirectionProps {
  initialDirection: Direction;
  thresholdPixels?: number;
  off?: boolean;
}

export const useScrollDirection = ({
  initialDirection,
  thresholdPixels = 0,
  off,
}: UseScrollDirectionProps) => {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    const threshold = thresholdPixels;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    /**
     * Bind the scroll handler if `off` is set to false.
     * If `off` is set to true reset the scroll direction.
     */
    !off ? window.addEventListener('scroll', onScroll) : setScrollDir(initialDirection);

    return () => window.removeEventListener('scroll', onScroll);
  }, [initialDirection, thresholdPixels, off]);

  return scrollDir;
};

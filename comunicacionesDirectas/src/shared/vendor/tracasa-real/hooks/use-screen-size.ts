import { useEffect, useState } from 'react';

interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  width: number;
}

const MOBILE_MAX = 767;
const TABLET_MAX = 1023;
const DESKTOP_MAX = 1439;

export const useScreenSize = (): ScreenSize => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width <= MOBILE_MAX;
  const isTablet = width > MOBILE_MAX && width <= TABLET_MAX;
  const isDesktop = width > TABLET_MAX && width <= DESKTOP_MAX;
  const isLargeDesktop = width > DESKTOP_MAX;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    width,
  };
};

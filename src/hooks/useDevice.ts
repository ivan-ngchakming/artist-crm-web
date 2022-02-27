import { useEffect, useState } from "react";

interface Dimensions {
  width: number;
  height: number;
}

const useDevice = () => {
  const [dimensions, setDimensions] = useState<Dimensions>();

  const isMobile = (dimensions && dimensions?.width < 800) || false;

  const isDesktop = !isMobile;

  const resizeHandler = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setDimensions({
      width: width,
      height: height,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return { isMobile, isDesktop, dimensions };
};

export default useDevice;

import { useEffect, useState } from "react";

interface Dimensions {
  width: number;
  height: number;
}

const useDevice = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isMobile = dimensions.width < 800;

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
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return { isMobile, isDesktop, dimensions };
};

export default useDevice;

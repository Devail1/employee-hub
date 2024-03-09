// inspired by depricated hook - https://usehooks-ts.com/react-hook/use-image-on-load
import { useState, useEffect, useRef } from "react";

const useImageOnLoad = (src) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const img = (imageRef.current = new Image());
    img.onload = () => setIsLoaded(true);
    img.onerror = (event) => {
      setError(event);
      setIsLoaded(true);
    };
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoaded, error };
};

export default useImageOnLoad;

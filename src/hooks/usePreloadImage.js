
import {  useEffect } from 'react';

const usePreloadImage = (url) => {
  useEffect(() => {
    if (url) {
      const img = new Image();
      img.src = url;
      img.onload = () => console.log('Image loaded:', url); // Log when the image loads
      img.onerror = () => console.log('Image failed to load:', url);
    }
  }, [url]);
};

export default usePreloadImage;

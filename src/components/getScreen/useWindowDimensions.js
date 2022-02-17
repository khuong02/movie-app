import { useState, useEffect, useRef } from "react";

export default function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";
  const myRef = useRef();
  myRef.current = getWindowDimensions;

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(myRef.current());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow, myRef]);

  return windowDimensions;
}

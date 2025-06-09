import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(undefined);
  const TARGET_WIDTH = 768;
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TARGET_WIDTH - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < TARGET_WIDTH);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < TARGET_WIDTH);
    return () => {
      mql.removeEventListener("change", onchange);
    };
  }, []);
  return !!isMobile;
};

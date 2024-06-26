// inspired by - https://usehooks-ts.com/react-hook/use-scroll-lock
import { useRef, useState, useEffect } from "react";
import { isIOS } from "@/utils";

const IS_SERVER = typeof window === "undefined";

export const useScrollLock = (options = {}) => {
  const { autoLock = true, lockTarget, widthReflow = false } = options;
  const [isLocked, setIsLocked] = useState(false);
  const target = useRef(null);
  const originalStyle = useRef(null);
  const lock = () => {
    if (target.current) {
      const { overflow, paddingRight } = target.current.style;

      originalStyle.current = { overflow, paddingRight };

      if (widthReflow) {
        const offsetWidth =
          target.current === document.body
            ? window.innerWidth
            : target.current.offsetWidth;
        const currentPaddingRight =
          parseInt(window.getComputedStyle(target.current).paddingRight, 10) ||
          0;

        const scrollbarWidth = offsetWidth - target.current.scrollWidth;
        target.current.style.paddingRight = `${scrollbarWidth + currentPaddingRight}px`;
      }

      target.current.style.overflow = "hidden";

      // Fix iOS bug: Prevent auto scroll on keyboard lunch
      if (isIOS()) {
        target.current.style.position = "fixed";
      }

      setIsLocked(true);
    }
  };

  const unlock = () => {
    if (target.current && originalStyle.current) {
      target.current.style.overflow = originalStyle.current.overflow;
      if (isIOS()) {
        target.current.style.position = "unset";
      }
      if (widthReflow) {
        target.current.style.paddingRight = originalStyle.current.paddingRight;
      }
    }

    setIsLocked(false);
  };

  useEffect(() => {
    if (IS_SERVER) return;

    if (lockTarget) {
      target.current =
        typeof lockTarget === "string"
          ? document.querySelector(lockTarget)
          : lockTarget;
    }

    if (!target.current) {
      target.current = document.body;
    }

    if (autoLock) {
      lock();
    }

    return () => {
      unlock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLock, lockTarget, widthReflow]);

  return { isLocked, lock, unlock };
};

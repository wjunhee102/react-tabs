import { useLayoutEffect, useCallback, RefObject, useState } from "react";

export interface ContentRect {
  width: number;
  height: number;
}

export const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  callback?: (entry: DOMRectReadOnly) => void
) => { 

  const [ contentRect, setContentRect ] = useState<ContentRect>();

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries)) {
      return;
    }

    const entry = entries[0];
    
    setContentRect({
      width: entry.contentRect.width,
      height: entry.contentRect.height
    });

    if (callback) {
      callback(entry.contentRect);
    }

  }, [callback]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    let RO: ResizeObserver | null = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      handleResize(entries)
    );

    RO.observe(ref.current);

    return () => {
      if(RO instanceof ResizeObserver) RO.disconnect();
      RO = null;
    }
  }, [ref, handleResize]);

  return contentRect;
}
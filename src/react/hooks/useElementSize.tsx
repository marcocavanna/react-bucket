import * as React from 'react';
import { useWindowResize } from './useWindowResize';

/* --------
 * Hook Configuration
 * -------- */
interface UseElementSize {
  /** Set if hook is disabled */
  disabled?: boolean;

  /** Locally disable height detection */
  disableHeight?: boolean;

  /** Locally disable width detection */
  disableWidth?: boolean;
}


/* --------
 * Hook Definition
 * -------- */
export function useElementSize(
  config: UseElementSize
): readonly [ React.ReactElement<HTMLDivElement>, { width: number, height: number } ] {

  const { disabled, disableHeight, disableWidth } = config;

  /** Create a unique, invariable detector id */
  const [ widthDetectorID ] = React.useState(`__rx-width-detector-${Math.round(Math.random() * 1000)}`);

  /** Set element size */
  const [ size, setElementSize ] = React.useState({
    width : 0,
    height: 0
  });

  /** Build the Ref */
  const elementRef = React.useRef<HTMLDivElement>(null);

  /** Memoize Handler */
  const handleWindowResize = React.useCallback(
    () => {
      /** If no ref, or component is not mount, return */
      if (!elementRef.current || !elementRef.current.parentNode) {
        return;
      }

      const {
        clientHeight: newHeight,
        clientWidth : newWidth
      } = elementRef.current;

      /** Get next size */
      const nextHeight = disableHeight ? size.height : newHeight;
      const nextWidth = disableWidth ? size.width : newWidth;

      /** Set new element size */
      if ((nextHeight !== size.height) || (nextWidth !== size.width)) {
        setElementSize({
          height: elementRef.current.clientHeight,
          width : elementRef.current.clientWidth
        });
      }
    },
    [ disableHeight, disableWidth, size.height, size.width ]
  );

  /** Create the component to detect width */
  const widthDetector = React.useMemo(
    () => (
      <div
        ref={elementRef}
        id={widthDetectorID}
        style={{
          visibility: 'hidden',
          opacity   : 0
        }}
      />
    ),
    [ widthDetectorID ]
  );

  /** Use the window resize */
  useWindowResize({
    disabled: disabled || !elementRef.current || (disableWidth && disableHeight),
    onResize: handleWindowResize
  });

  /** Return computed data */
  return [ widthDetector, size ] as const;
}

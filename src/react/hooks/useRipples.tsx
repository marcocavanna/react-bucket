import * as React from 'react';


interface RippleProps {
  className?: string;

  key: React.Key;

  style?: React.CSSProperties;
}


export function useRipples(): readonly [ (event?: React.MouseEvent<HTMLElement>) => void, React.ReactNode ] {

  // ----
  // Initialize Ripples
  // ----
  const [ ripples, setRipples ] = React.useState<RippleProps[]>([]);


  // ----
  // Show the ripple using click event
  // ----
  const showRipple = React.useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      /** If no event, return */
      if (!event || typeof event?.currentTarget?.getBoundingClientRect !== 'function') {
        return;
      }

      /** Get the absolute position of ripple */
      const { left, top } = event.currentTarget.getBoundingClientRect();

      const x = event.clientX - left;
      const y = event.clientY - top;
      const size = Math.min(event.currentTarget.clientHeight, event.currentTarget.clientWidth);

      /** Add the new Ripple */
      setRipples((curr) => ([
        ...curr,
        {
          key      : event.timeStamp,
          className: 'ripple',
          style    : {
            width : size,
            height: size,
            left  : x - (size / 2),
            top   : y - (size / 2)
          }
        }
      ]));
    },
    []
  );


  // ----
  // Remap Props Array to build Node
  // ----
  const ripplesArray = React.useMemo(
    () => (
      <div className={'ripple-container'}>
        {ripples.map((props) => {
          /** Build the handler to remove ripple from array on animation end */
          const handleAnimationEnd = () => {
            setRipples((curr) => curr.filter((previous) => previous.key !== props.key));
          };

          /** Return the Span Component */
          return (
            <span {...props} onAnimationEnd={handleAnimationEnd} />
          );
        })}
      </div>
    ),
    [ ripples ]
  );


  // ----
  // Return utility
  // ----
  return [ showRipple, ripplesArray ] as const;
}

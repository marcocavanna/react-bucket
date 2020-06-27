import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  doesNodeContainClick,
  classByPattern,
  Ref
} from '@appbuckets/react-ui-core';

import {
  useElementType
} from '../../lib';

import { BackdropInnerProps } from './BackdropInner.types';


export default function BackdropInner(props: BackdropInnerProps): React.ReactElement<BackdropInnerProps> {

  const {
    content,
    children,
    className,
    onClick,
    onClickOutside,
    page,
    verticalAlign,
    visible,
    ...rest
  } = props;

  /** Create Refs */
  const containerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  /** Toggle container styles when visible change */
  React.useEffect(
    () => {
      /** Get the container ref */
      const container = containerRef.current;

      /** If no ref, return */
      if (!container || !container.style) {
        return;
      }

      /** Set container style */
      if (visible) {
        container.style.setProperty('display', 'flex', 'important');
      }
      else {
        container.style.removeProperty('display');
      }
    },
    [ visible, containerRef ]
  );

  /** Build a function to handle clicks */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    /** Check click handler exists */
    if (typeof onClick === 'function') {
      onClick(e, props);
    }

    /** Check if click is inside the content */
    if (contentRef.current && (contentRef.current !== e.target && doesNodeContainClick(contentRef.current, e))) {
      return;
    }

    /** Handle outside click too */
    if (typeof onClickOutside === 'function') {
      onClickOutside(e, props);
    }
  };

  /** Get the render element type */
  const ElementType = useElementType(BackdropInner, props);

  /** Get the Element Classes */
  const classes = clsx(
    { visible, page },
    classByPattern(verticalAlign, 'content-%value%'),
    'backdrop',
    className
  );

  /** Get the inner content */
  const innerContent = React.useMemo(
    () => childrenUtils.isNil(children) ? content : children,
    [ content, children ]
  );

  /** Render the Component */
  return (
    <Ref innerRef={containerRef}>
      <ElementType {...rest} className={classes} onClick={handleClick}>
        {innerContent && (
          <div ref={contentRef} className={'content'}>
            {innerContent}
          </div>
        )}
      </ElementType>
    </Ref>
  );
}

/** Properly set the Display Name */
BackdropInner.displayName = 'BackdropInner';

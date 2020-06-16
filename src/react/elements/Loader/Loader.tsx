import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  classByKey,
  classByValue,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useSharedClassName,
  useElementType,
  useSplitStateClassName
} from '../../lib';

import { LoaderProps } from './Loader.types';


export default function Loader(props: LoaderProps): React.ReactElement<LoaderProps> {

  const {
    className,
    rest: {
      children,
      content,
      active,
      centered,
      inline,
      inverted,
      overlay,
      type,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get Render Element Type */
  const ElementType = useElementType(Loader, props);

  /** Get the State Class */
  const [ stateClassName, rest ] = useSplitStateClassName(rawRest);

  /** Check if has Children */
  const hasChildren = !childrenUtils.isNil(children);

  /** Build Loader classes */
  const classes = clsx(
    classByKey(centered, 'centered'),
    classByKey(inverted, 'inverted'),
    classByKey(inline, 'inline'),
    classByValue(type),
    classByKey(overlay, 'overlay'),
    classByKey(active, 'active'),
    'loader',
    classByKey(hasChildren || content, 'with-content'),
    classByKey(!props.size, 'is-normal'),
    stateClassName,
    className
  );

  /** Build the Loader Content */
  const loaderContent = (
    <div className={'content'}>
      {hasChildren ? children : content}
    </div>
  );

  /** Circular loader is built using CSS only */
  if (type === 'circular') {
    return (
      <ElementType {...rest} className={classes}>
        {loaderContent}
      </ElementType>
    );
  }

  /** An indeterminate Loader has a bar container and a content */
  if (type === 'indeterminate bar') {
    return (
      <ElementType {...rest} className={classes}>
        <div className={'progress-container'}>
          <div className={'indeterminate-bar'} />
        </div>
        {loaderContent}
      </ElementType>
    );
  }

  /** Loader with Dots has 3 dot on type === dots, or 4 in type === circular dots */
  return (
    <ElementType {...rest} className={classes}>
      <div className={'dots-container'}>
        <div className={'dot'} />
        <div className={'dot'} />
        <div className={'dot'} />
        {type === 'circular dots' && <div className={'dot'} />}
      </div>
      {loaderContent}
    </ElementType>
  );

}

/** Set the default props */
Loader.defaultProps = {
  active: true,
  type  : 'circular'
} as Partial<LoaderProps>;

/** Set component displayName */
Loader.displayName = 'Loader';

/** Create the shorthand factory */
Loader.create = createShorthandFactory(Loader, (content) => ({ content }));

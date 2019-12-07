import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  getUnhandledProps,
  getElementType,
  classByKey,
  classByPattern,
  customPropTypes,
  createShorthandFactory
} from '../../lib';


function Loader(props) {
  const {
    active,
    centered,
    children,
    className,
    content,
    inline,
    inverted,
    overlay,
    size,
    type
  } = props;

  const classes = cx(
    'loader',
    classByKey(active, 'is-active'),
    classByKey(inline, 'is-inline'),
    classByKey(children || content, 'has-text'),
    classByKey(inverted, 'is-inverted'),
    classByPattern(size, 'is-%value%'),
    classByKey(!size, 'is-normal'),
    classByKey(centered, 'is-centered'),
    classByKey(overlay, 'is-overlay'),
    classByPattern(type, 'is-%value%'),
    className
  );

  const rest = getUnhandledProps(Loader, props);
  const ElementType = getElementType(Loader, props);

  /** Circular Loader is the simpliest indicator */
  if (type === 'circular') {
    return (
      <ElementType {...rest} className={classes}>
        {childrenUtils.isNil(children) ? content : children}
      </ElementType>
    );
  }

  /** Dots indicator has a more complext Structure */
  if (type === 'dots') {
    return (
      <ElementType {...rest} className={classes}>
        <div className='dots'>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div>
        {childrenUtils.isNil(children) ? content : children}
      </ElementType>
    );
  }
}

Loader.propTypes = {
  /** Active Props */
  active: PropTypes.bool,

  /** Element used to Render Loader */
  as: PropTypes.elementType,

  /** Centered Loader */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** User defined Class */
  className: PropTypes.string,

  /** Content Property */
  content: PropTypes.node,

  /** Inline Loader */
  inline: PropTypes.bool,

  /** Inverted Props */
  inverted: PropTypes.bool,

  /** Set the loader as overlay of a parent container */
  overlay: PropTypes.bool,

  /** Size Style */
  size: customPropTypes.size,

  /** Loader type */
  type: PropTypes.oneOf(['circular', 'dots', 'indeterminate bar'])
};

Loader.defaultProps = {
  type: 'circular'
};

Loader.create = createShorthandFactory(Loader, content => ({ content }));

export default Loader;

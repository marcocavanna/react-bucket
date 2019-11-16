import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  getUnhandledProps,
  getElementType,
  classByKey,
  classByPattern,
  customPropTypes
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
    size
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
    className
  );

  const rest = getUnhandledProps(Loader, props);
  const ElementType = getElementType(Loader, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

Loader.propTypes = {
  /** Active Props */
  active: PropTypes.bool,

  /** Element used to Render Loader */
  as: customPropTypes.as,

  /** Centered Loader */
  centered: PropTypes.bool,

  /** User defined Class */
  className: PropTypes.string,

  /** Content Property */
  content: PropTypes.any,

  /** Inline Loader */
  inline: PropTypes.bool,

  /** Inverted Props */
  inverted: PropTypes.bool,

  /** Size Style */
  size: customPropTypes.size
};

export default Loader;

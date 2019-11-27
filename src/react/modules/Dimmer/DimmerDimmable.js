import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps,
  classByKey
} from '../../lib';

/**
 * A dimmable sub-component for Dimmer.
 */
function DimmerDimmable(props) {
  const { className, children, content, dimmed } = props;

  const classes = cx(
    classByKey(dimmed, 'dimmed'),
    'dimmable',
    className,
  );

  const rest = getUnhandledProps(DimmerDimmable, props);
  const ElementType = getElementType(DimmerDimmable, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

DimmerDimmable.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: PropTypes.any,

  /** Controls whether or not the dim is displayed. */
  dimmed: PropTypes.bool
};

export default DimmerDimmable;

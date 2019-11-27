import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  getUnhandledProps,
  getElementType,
  childrenUtils,
  customPropTypes,
  classByPattern
} from '../../lib';

function LabelGroup(props) {
  const {
    className,
    children,
    content,
    size
  } = props;

  const classes = cx(
    'labels',
    classByPattern(size, 'is-%value%'),
    className
  );

  const rest = getUnhandledProps(LabelGroup, props);
  const ElementType = getElementType(LabelGroup, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

LabelGroup.propTypes = {
  /** An Element used to Render the Component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** User Defined Class */
  className: PropTypes.string,

  /** Content ShortHand */
  content: PropTypes.any,

  /** Size */
  size: customPropTypes.size

};

export default LabelGroup;

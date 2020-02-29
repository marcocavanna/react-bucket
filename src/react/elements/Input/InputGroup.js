import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps
} from '../../lib';

export default function InputGroup(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    'input-group',
    className
  );

  const rest = getUnhandledProps(InputGroup, props);
  const ElementType = getElementType(InputGroup, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

InputGroup.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary Content */
  children: PropTypes.node,

  /** User defined Class name */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node
};

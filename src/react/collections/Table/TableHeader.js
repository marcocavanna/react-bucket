import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps
} from '../../lib';

function TableHeader(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    className,
    'head'
  );

  const rest = getUnhandledProps(TableHeader, props);
  const ElementType = getElementType(TableHeader, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

TableHeader.propTypes = {
  /** An element used to render the Component */
  as: customPropTypes.as,

  /** Children Props */
  children: PropTypes.node,

  /** User Defined classes */
  className: PropTypes.string,

  /** Content shorthand */
  content: PropTypes.any
};

TableHeader.defaultProps = {
  as: 'thead'
};

export default TableHeader;

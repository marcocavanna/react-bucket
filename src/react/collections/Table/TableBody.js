import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps
} from '../../lib';

function TableBody(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    className,
    'body'
  );

  const rest = getUnhandledProps(TableBody, props);
  const ElementType = getElementType(TableBody, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

TableBody.propTypes = {
  /** An element used to render the Component */
  as: PropTypes.elementType,

  /** Children Props */
  children: PropTypes.node,

  /** User Defined classes */
  className: PropTypes.string,

  /** Content shorthand */
  content: PropTypes.any
};

TableBody.defaultProps = {
  as: 'tbody'
};

export default TableBody;

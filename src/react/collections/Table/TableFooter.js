import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps
} from '../../lib';

function TableFooter(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    className,
    'foot'
  );

  const rest = getUnhandledProps(TableFooter, props);
  const ElementType = getElementType(TableFooter, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

TableFooter.propTypes = {
  /** An element used to render the Component */
  as: PropTypes.elementType,

  /** Children Props */
  children: PropTypes.node,

  /** User Defined classes */
  className: PropTypes.string,

  /** Content shorthand */
  content: PropTypes.node
};

TableFooter.defaultProps = {
  as: 'tfoot'
};

export default TableFooter;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  getUnhandledProps,
  classByPattern,
  classByKey
} from '../../lib';

import TableCell from './TableCell';

function TableHeaderCell(props) {

  const {
    as,
    content,
    className,
    sorted,
    unsortable
  } = props;

  const classes = cx(
    classByKey(sorted, 'sorted'),
    classByKey(unsortable, 'is-unsortable'),
    classByPattern(sorted, 'sorted-%value%'),
    className
  );

  const rest = getUnhandledProps(TableHeaderCell, props);

  const headerContent = !childrenUtils.isNil(content) ? (
    <span className='table-header-content'>{content}</span>
  ) : null;

  return <TableCell {...rest} as={as} className={classes} content={headerContent} />;

}

TableHeaderCell.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** User defined classes */
  className: PropTypes.string,

  /** Header Content shorthand */
  content: PropTypes.node,

  /** Set the Cell as Sorted */
  sorted: PropTypes.oneOfType([
    PropTypes.oneOf(['asc', 'desc']),
    PropTypes.bool
  ]),

  /** A table header can be unsortable */
  unsortable: PropTypes.bool
};

TableHeaderCell.defaultProps = {
  as: 'th'
};

export default TableHeaderCell;

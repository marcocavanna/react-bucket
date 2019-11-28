import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps,
  classByKey
} from '../../lib';

import TableCell from './TableCell';

function TableRow(props) {

  const {
    active,
    cellAs,
    cells,
    children,
    className,
    disabled,
    error,
    selectable,
    success,
    warning
  } = props;

  const classes = cx(
    'row',
    className,
    classByKey(active, 'is-active'),
    classByKey(disabled, 'is-disabled'),
    classByKey(error, 'is-error'),
    classByKey(selectable, 'is-selectable'),
    classByKey(success, 'is-success'),
    classByKey(warning, 'is-warning')
  );

  const rest = getUnhandledProps(TableRow, props);
  const ElementType = getElementType(TableRow, props);

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {_.map(cells, cell => TableCell.create(
        cell, { defaultProps: { as: cellAs }, autoGenerateKey: true }
      ))}
    </ElementType>
  );

}

TableRow.propTypes = {
  /** Set Row as Active */
  active: PropTypes.bool,

  /** An element used to render the content */
  as: PropTypes.elementType,

  /** Set the element used to Render the Cells */
  cellAs: PropTypes.elementType,

  /** Array of string used to render the cells */
  cells: PropTypes.arrayOf(PropTypes.any),

  /** Children props */
  children: PropTypes.node,

  /** User defined Classes */
  className: PropTypes.string,

  /** Set Row as Disabled */
  disabled: PropTypes.bool,

  /** Set Row as Error */
  error: PropTypes.bool,

  /** Set a Row as Selectable */
  selectable: PropTypes.bool,

  /** Set Row as Success */
  success: PropTypes.bool,

  /** Set Row as Warning */
  warning: PropTypes.bool
};

TableRow.defaultProps = {
  as     : 'tr',
  cellAs : 'td'
};

TableRow.create = createShorthandFactory(TableRow, cells => ({ cells }));

export default TableRow;

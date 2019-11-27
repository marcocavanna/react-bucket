import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  classByKey,
  classByPattern,
  classByValue
} from '../../lib';

import Icon from '../../elements/Icon';

function TableCell(props) {

  const {
    active,
    children,
    className,
    content,
    disabled,
    error,
    icon,
    selectable,
    success,
    textAlign,
    verticalAlign,
    warning
  } = props;

  const classes = cx(
    classByKey(active, 'is-active'),
    classByKey(disabled, 'is-disabled'),
    classByKey(error, 'is-error'),
    classByKey(selectable, 'is-selectable'),
    classByKey(success, 'is-success'),
    classByPattern(textAlign, 'has-text-%value%'),
    classByValue(verticalAlign),
    classByKey(warning, 'is-warning'),
    className,
    'cell'
  );

  const rest = getUnhandledProps(TableCell, props);
  const ElementType = getElementType(TableCell, props);

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {icon ? Icon.create(icon) : null}
      {content}
    </ElementType>
  );

}

TableCell.propTypes = {
  /** Set the Cell as Active */
  active: PropTypes.bool,

  /** An Element used to Render the Component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** User Defined Class */
  className: PropTypes.string,

  /** Cell content Shorthand */
  content: PropTypes.any,

  /** Disable Cell */
  disabled: PropTypes.bool,

  /** Cell Error Style */
  error: PropTypes.bool,

  /** Icon Shorthand */
  icon: customPropTypes.fontAwesome,

  /** Set cell as Selectable */
  selectable: PropTypes.bool,

  /** Set cell as Success */
  success: PropTypes.bool,

  /** Set Text align */
  textAlign: customPropTypes.textAlign,

  /** Set Cell Vertical Align */
  verticalAlign: PropTypes.string,

  /** Set Cell as Warning */
  warning: PropTypes.bool
};

TableCell.defaultProps = {
  as: 'td'
};

TableCell.create = createShorthandFactory(TableCell, content => ({ content }));

export default TableCell;

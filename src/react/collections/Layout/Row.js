import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {
  classByPattern,
  classByValue,
  responsiveClass,
  getUnhandledProps,
  getElementType,
  customPropTypes
} from '../../lib';

function Row(props) {

  const {
    children,
    className,
    color,
    columnsAlign,
    textAlign,
    verticalAlign,
    withoutGap
  } = props;

  const classes = cx(
    'with-columns',
    classByPattern(color, 'has-text-%value%'),
    classByValue(columnsAlign),
    classByPattern(textAlign, 'has-text-%value%'),
    classByValue(verticalAlign),
    responsiveClass(withoutGap, 'without-gap'),
    className
  );

  const rest = getUnhandledProps(Row, props);

  const ElementType = getElementType(Row, props);

  return (
    <ElementType {...rest} className={classes}>
      {children}
    </ElementType>
  );
}

Row.propTypes = {
  /** An element used to render the component */
  as: customPropTypes.as,

  /** Children Node */
  children: PropTypes.node,

  /** User defined class */
  className: PropTypes.string,

  /** Custom Font Color */
  color: PropTypes.string,

  /** Flex Columns Align */
  columnsAlign: customPropTypes.flexHorizontalAlign,

  /** Container Text Alignment */
  textAlign: customPropTypes.textAlign,

  /** Columns Vertical Align */
  verticalAlign: customPropTypes.flexVerticalAlign,

  /** Without Gap responsive property */
  withoutGap: customPropTypes.breakpoints
};

export default Row;

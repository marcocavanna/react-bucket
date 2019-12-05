import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {
  childrenUtils,
  classByPattern,
  classByValue,
  responsiveClass,
  getUnhandledProps,
  getElementType,
  customPropTypes,
  createShorthandFactory
} from '../../lib';

import Column from './Column';

function Row(props) {

  const {
    children,
    className,
    color,
    columns,
    columnsAlign,
    content,
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

  if (Array.isArray(columns)) {
    return (
      <ElementType {...rest} className={classes}>
        {columns.map(col => Column.create(<Column />, {
          autoGenerateKey : true,
          overrideProps   : {
            content: col
          }
        }))}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

Row.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Children Node */
  children: PropTypes.node,

  /** User defined class */
  className: PropTypes.string,

  /** Custom Font Color */
  color: PropTypes.string,

  /** Columns Collection Shorthand */
  columns: PropTypes.array,

  /** Flex Columns Align */
  columnsAlign: customPropTypes.flexHorizontalAlign,

  /** Content Shorthand */
  content: PropTypes.node,

  /** Container Text Alignment */
  textAlign: customPropTypes.textAlign,

  /** Columns Vertical Align */
  verticalAlign: customPropTypes.flexVerticalAlign,

  /** Without Gap responsive property */
  withoutGap: customPropTypes.breakpoints
};

Row.create = createShorthandFactory(Row, content => ({ content }));

export default Row;

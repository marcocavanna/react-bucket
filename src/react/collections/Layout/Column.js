import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {
  classByPattern,
  classByValue,
  isValue,
  getUnhandledProps,
  getElementType,
  customPropTypes,
  createShorthandFactory
} from '../../lib';

function Column(props) {

  const {
    children,
    className,
    color,
    is,
    onTabletIs,
    onDesktopIs,
    onLargeDesktopIs,
    offsettedBy,
    onTabletOffsettedBy,
    onDesktopOffsettedBy,
    onLargeDesktopOffsettedBy,
    textAlign,
    verticalAlign
  } = props;

  const classes = cx(
    'column',
    classByPattern(color, 'has-text-%value%'),
    isValue(is),
    classByPattern(onTabletIs, 'on-tablet-is-%value%'),
    classByPattern(onDesktopIs, 'on-desktop-is-%value%'),
    classByPattern(onLargeDesktopIs, 'on-large-desktop-is-%value%'),
    classByPattern(offsettedBy, 'offsetted-by-%value%'),
    classByPattern(onTabletOffsettedBy, 'on-tablet-offsetted-by-%value%'),
    classByPattern(onDesktopOffsettedBy, 'on-desktop-offsetted-by-%value%'),
    classByPattern(onLargeDesktopOffsettedBy, 'on-large-desktop-offsetted-by-%value%'),
    classByPattern(textAlign, 'has-text-%value%'),
    classByValue(verticalAlign),
    className
  );

  const rest = getUnhandledProps(Column, props);

  const ElementType = getElementType(Column, props);

  return (
    <ElementType {...rest} className={classes}>
      {children}
    </ElementType>
  );

}

Column.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Children Node */
  children: PropTypes.node,

  /** User defined class */
  className: PropTypes.string,

  /** Custom Font Color */
  color: PropTypes.string,

  /** Base Column Width */
  is: customPropTypes.columnsWidth,

  /** Base Offset */
  offsettedBy: customPropTypes.columnsOffset,

  /** Responsive Column Width */
  onDesktopIs               : customPropTypes.columnsWidth,
  onDesktopOffsettedBy      : customPropTypes.columnsOffset,
  onLargeDesktopIs          : customPropTypes.columnsWidth,
  onLargeDesktopOffsettedBy : customPropTypes.columnsOffset,
  onTabletIs                : customPropTypes.columnsWidth,
  onTabletOffsettedBy       : customPropTypes.columnsOffset,

  /** Container Text Alignment */
  textAlign: customPropTypes.textAlign,

  /** Columns Vertical Align */
  verticalAlign: customPropTypes.flexVerticalAlign
};

Column.create = createShorthandFactory(Column, children => ({ children }));

export default Column;

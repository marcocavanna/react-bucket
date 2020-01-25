import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {
  childrenUtils,
  classByPattern,
  classByValue,
  isValue,
  getUnhandledProps,
  getElementType,
  customPropTypes,
  createShorthandFactory
} from '../../lib';
import getColumnWidthProps from './lib/getColumnWidthProps';
import getColumnOffsetProps from './lib/getColumnOffsetProps';

function Column(props) {

  const {
    children,
    className,
    color,
    content,
    textAlign,
    verticalAlign
  } = props;

  const {
    is,
    onTabletIs,
    onDesktopIs,
    onLargeDesktopIs
  } = getColumnWidthProps(props);

  const {
    offsettedBy,
    onTabletOffsettedBy,
    onDesktopOffsettedBy,
    onLargeDesktopOffsettedBy
  } = getColumnOffsetProps(props);

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
      {childrenUtils.isNil(children) ? content : children}
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

  /** Content Shorthand */
  content: PropTypes.node,

  /** Base Column Width */
  is: PropTypes.oneOfType([
    customPropTypes.columnsWidth,
    PropTypes.object
  ]),

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

Column.create = createShorthandFactory(Column, content => ({ content }));

export default Column;

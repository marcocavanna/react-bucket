import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import {
  customPropTypes,
  childrenUtils,
  getElementType,
  getUnhandledProps,
  classByPattern,
  responsiveClass,
  createShorthandFactory
} from '../../lib';


/**
 * Container is an element
 * containing all helper functions
 */
function Container(props) {

  const {
    background,
    block,
    borderedBottom,
    borderedLeft,
    borderedRight,
    borderedTop,
    children,
    className,
    content,
    dpElevation,
    flex,
    fontSize,
    fontWeight,
    hidden,
    inline,
    inlineBlock,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingX,
    paddingY,
    textAlign,
    textColor,
    textTransform,
    visible
  } = props;

  const classes = cx(

    /** Background Color */
    classByPattern(background, 'has-background-%value%'),

    /** Border */
    responsiveClass(borderedTop, 'bordered-top'),
    responsiveClass(borderedRight, 'bordered-right'),
    responsiveClass(borderedBottom, 'bordered-bottom'),
    responsiveClass(borderedLeft, 'bordered-left'),

    /** Box Shadow */
    classByPattern(dpElevation, 'dp-%value%'),

    /** Margin Classes */
    classByPattern(margin, 'm-%value%'),
    classByPattern(marginX, 'mx-%value%'),
    classByPattern(marginY, 'my-%value%'),
    classByPattern(marginTop, 'mt-%value%'),
    classByPattern(marginRight, 'mr-%value%'),
    classByPattern(marginBottom, 'mb-%value%'),
    classByPattern(marginLeft, 'ml-%value%'),

    /** Padding Classes */
    classByPattern(padding, 'p-%value%'),
    classByPattern(paddingX, 'px-%value%'),
    classByPattern(paddingY, 'py-%value%'),
    classByPattern(paddingTop, 'pt-%value%'),
    classByPattern(paddingRight, 'pr-%value%'),
    classByPattern(paddingBottom, 'pb-%value%'),
    classByPattern(paddingLeft, 'pl-%value%'),

    /** Display Type */
    responsiveClass(block, 'is-block'),
    responsiveClass(inlineBlock, 'is-inline-block'),
    responsiveClass(inline, 'is-inline'),
    responsiveClass(flex, 'is-flex'),

    /** Visibility Classes */
    responsiveClass(visible, 'is-visible'),
    responsiveClass(hidden, 'is-hidden'),

    /** Text and Font Properties */
    classByPattern(fontSize, 'has-text-%value%'),
    classByPattern(fontWeight, 'has-font-%value%'),
    classByPattern(textAlign, 'has-text-%value%'),
    classByPattern(textTransform, 'has-text-%value%'),
    classByPattern(textColor, 'has-text-%value%'),

    className

  );

  const rest = getUnhandledProps(Container, props);
  const ElementType = getElementType(Container, props);

  return (
    <ElementType {...rest} className={classes}>
      {!childrenUtils.isNil(children) ? children : content}
    </ElementType>
  );
}

Container.propTypes = {
  /** An element used to render the component */
  as: customPropTypes.as,

  /** Container Background Color */
  background: PropTypes.string,

  /** Display container as Block */
  block: customPropTypes.responsiveProperty,

  /** Display Border Bottom */
  borderedBottom: customPropTypes.responsiveProperty,

  /** Display Border Left */
  borderedLeft: customPropTypes.responsiveProperty,

  /** Display Border Right */
  borderedRight: customPropTypes.responsiveProperty,

  /** Display Border Top */
  borderedTop: customPropTypes.responsiveProperty,

  /** User defined Classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.any,

  /** Box Shadow */
  dpElevation: customPropTypes.numbersRange(1, 24),

  /** Display container as Flex */
  flex: customPropTypes.responsiveProperty,

  /** Change container font size */
  fontSize: PropTypes.oneOf(['small', 'normal', 'large']),

  /** Change container font weight */
  fontWeight: PropTypes.oneOf(['light', 'regular', 'semi-bold', 'bold']),

  /** Hide the container */
  hidden: customPropTypes.responsiveProperty,

  /** Display container as Inline */
  inline: customPropTypes.responsiveProperty,

  /** Display container as Inline Block */
  inlineBlock: customPropTypes.responsiveProperty,

  /** Set container Margin */
  margin: customPropTypes.numbersRange(1, 8),

  /** Set container Margin Bottom */
  marginBottom: customPropTypes.numbersRange(1, 8),

  /** Set container Margin Left */
  marginLeft: customPropTypes.numbersRange(1, 8),

  /** Set container Margin Right */
  marginRight: customPropTypes.numbersRange(1, 8),

  /** Set container Margin Top */
  marginTop: customPropTypes.numbersRange(1, 8),

  /** Set container Margin X */
  marginX: customPropTypes.numbersRange(1, 8),

  /** Set container Margin Y */
  marginY: customPropTypes.numbersRange(1, 8),

  /** Set container Padding */
  padding: customPropTypes.numbersRange(1, 8),

  /** Set container Padding Bottom */
  paddingBottom: customPropTypes.numbersRange(1, 8),

  /** Set container Padding Left */
  paddingLeft: customPropTypes.numbersRange(1, 8),

  /** Set container Padding Right */
  paddingRight: customPropTypes.numbersRange(1, 8),

  /** Set container Padding Top */
  paddingTop: customPropTypes.numbersRange(1, 8),

  /** Set container Padding X */
  paddingX: customPropTypes.numbersRange(1, 8),

  /** Set container Padding Y */
  paddingY: customPropTypes.numbersRange(1, 8),

  /** Set Text Align */
  textAlign: customPropTypes.textAlign,

  /** Set Text Color */
  textColor: PropTypes.string,

  /** Set Text Transform */
  textTransform: PropTypes.oneOf(['capitalize', 'lowercase', 'uppercase']),

  /** Set container as Visible */
  visible: customPropTypes.responsiveProperty

};

Container.create = createShorthandFactory(Container, content => ({ content }));

export default Container;

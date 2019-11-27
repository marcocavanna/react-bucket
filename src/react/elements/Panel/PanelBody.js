import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  getUnhandledProps,
  getElementType,
  classByPattern,
  childrenUtils,
  customPropTypes,
  createShorthandFactory
} from '../../lib';

function PanelBody(props) {

  const {
    children,
    className,
    color,
    content,
    fontWeight,
    textAlign
  } = props;

  const classes = cx(
    'panel-body',
    classByPattern(textAlign, 'has-text-%value%'),
    classByPattern(fontWeight, 'has-font-%value%'),
    classByPattern(color, 'has-text-%value%'),
    className
  );

  const rest = getUnhandledProps(PanelBody, props);

  const ElementType = getElementType(PanelBody, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

PanelBody.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary Content */
  children: PropTypes.node,

  /** Additional Classes */
  className: PropTypes.string,

  /** Text Color */
  color: PropTypes.string,

  /** Shorthand Properties for Content */
  content: PropTypes.any,

  /** Font Weight Property */
  fontWeight: PropTypes.string,

  /** Text Align */
  textAlign: customPropTypes.textAlign
};

PanelBody.create = createShorthandFactory(PanelBody, content => ({ content }));

export default PanelBody;

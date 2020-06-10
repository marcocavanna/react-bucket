import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  classByKey,
  classByPattern,
  createShorthandFactory,
  getElementType,
  getUnhandledProps,
  multiResponsiveKey
} from '../../lib';

function PanelSection(props) {

  const {
    className,
    children,
    content,
    divided,
    label,
    noMargin,
    textAlign,
    fontWeight,
    master
  } = props;

  const classes = cx(
    'panel-section',
    classByKey(divided, 'is-divided'),
    classByKey(noMargin, 'mb-0'),
    classByKey(master, 'is-master'),
    multiResponsiveKey(textAlign, 'has-text-%value%', classByPattern),
    classByPattern(fontWeight, 'has-font-%value%'),
    className
  );

  const rest = getUnhandledProps(PanelSection, props);
  const ElementType = getElementType(PanelSection, props);

  return (
    <ElementType {...rest} className={classes}>
      {label && <label>{label}</label>}
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

PanelSection.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary Content */
  children: PropTypes.node,

  /** User defined classname */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node,

  /** Draw a divider line above the section */
  divided: PropTypes.bool,

  /** Set the font weight */
  fontWeight: PropTypes.oneOf(['light', 'regular', 'semi-bold', 'bold']),

  /** Label Shorthand */
  label: PropTypes.node,

  /** Set Master Section */
  master: PropTypes.bool,

  /** Remove Section Bottom Margin */
  noMargin: PropTypes.bool,

  /** Section Text Align */
  textAlign: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

PanelSection.defaultProps = {
  divided: true
};

PanelSection.create = createShorthandFactory(PanelSection, content => ({ content }));

export default PanelSection;
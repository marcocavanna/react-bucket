import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  classByKey,
  createShorthandFactory,
  getElementType,
  getUnhandledProps
} from '../../lib';

function PanelSection(props) {

  const {
    className,
    children,
    content,
    divided,
    label
  } = props;

  const classes = cx(
    'panel-section',
    classByKey(divided, 'is-divided'),
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
  content: PropTypes.element,

  /** Draw a divider line above the section */
  divided: PropTypes.bool,

  /** Label Shorthand */
  label: PropTypes.node
};

PanelSection.defaultProps = {
  divided: true
};

PanelSection.create = createShorthandFactory(PanelSection, content => ({ content }));

export default PanelSection;

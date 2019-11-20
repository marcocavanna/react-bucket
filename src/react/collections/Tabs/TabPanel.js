import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  classByKey
} from '../../lib';

function TabPanel(props) {
  /** Split Props */
  const {
    active,
    children,
    className,
    content,
    loading
  } = props;

  /** Build Classes */
  const classes = cx(
    'tab-panel',
    classByKey(active, 'is-active'),
    classByKey(loading, 'is-loading'),
    className
  );

  const rest = getUnhandledProps(TabPanel, props);
  const ElementType = getElementType(TabPanel, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

TabPanel.propTypes = {
  /** An active panel is currently visible */
  active: PropTypes.bool,

  /** An element used to render the content */
  as: customPropTypes.as,

  /** Primary Content */
  children: PropTypes.node,

  /** Additional user defined classes */
  className: PropTypes.string,

  /** Content shorthand */
  content: PropTypes.any,

  /** Loading state for a Panel */
  loading: PropTypes.bool
};

TabPanel.defaultProps = {
  active: true
};

TabPanel.create = createShorthandFactory(TabPanel, content => ({ content }));

export default TabPanel;

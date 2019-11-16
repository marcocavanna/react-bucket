import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Row from './Row';
import Column from './Column';

import {
  classByKey,
  classByPattern,
  getUnhandledProps,
  getElementType,
  customPropTypes
} from '../../lib';

function Layout(props) {

  const {
    background,
    className,
    children,
    color,
    fluid,
    textAlign,
    width
  } = props;

  const classes = cx(
    'container',
    classByPattern(background, 'has-background-%value%'),
    classByPattern(color, 'has-text-%value%'),
    classByKey(fluid, 'is-fluid'),
    classByPattern(width, 'is-%value%-width'),
    classByPattern(textAlign, 'has-text-%value%'),
    className
  );

  const rest = getUnhandledProps(Layout, props);

  const ElementType = getElementType(Layout, props);

  return (
    <ElementType {...rest} className={classes}>
      {children}
    </ElementType>
  );

}

Layout.Row = Row;
Layout.Column = Column;

Layout.propTypes = {
  /** An element used to render the component */
  as: customPropTypes.as,

  /** Custom background Color */
  background: PropTypes.string,

  /** Children Node */
  children: PropTypes.node,

  /** User defined class */
  className: PropTypes.string,

  /** Custom Font Color */
  color: PropTypes.string,

  /** Fluid Property */
  fluid: PropTypes.bool,

  /** Container Text Alignment */
  textAlign: customPropTypes.textAlign,

  /** Fixed Width */
  width: customPropTypes.responsiveBreakpoint
};

export default Layout;

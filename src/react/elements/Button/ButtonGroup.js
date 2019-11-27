import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  getElementType,
  getUnhandledProps,
  classByKey
} from '../../lib';

function ButtonGroup(props) {

  const {
    children,
    full,
    vertical
  } = props;

  const classes = cx(
    vertical ? 'with-vertical-buttons' : 'with-buttons',
    classByKey(full, 'is-full')
  );

  const rest = getUnhandledProps(ButtonGroup, props);
  const ElementType = getElementType(ButtonGroup, props);

  return (
    <ElementType {...rest} className={classes}>
      {children}
    </ElementType>
  );

}

ButtonGroup.propTypes = {
  /** Element Used to Render the Component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Button Group Full Width */
  full: PropTypes.bool,

  /** Set display as Vertical Group */
  vertical: PropTypes.bool
};

export default ButtonGroup;

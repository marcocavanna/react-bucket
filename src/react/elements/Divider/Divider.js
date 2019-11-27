import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  getUnhandledProps,
  getElementType,
  classByKey,
  createShorthandFactory
} from '../../lib';

function Divider(props) {

  const {
    children,
    className,
    content,
    hidden,
    horizontal,
    inverted
  } = props;

  const classes = cx(
    'divider',
    classByKey(content || !childrenUtils.isNil(children), 'has-content'),
    classByKey(hidden, 'is-hidden'),
    classByKey(horizontal, 'is-horizontal'),
    classByKey(inverted, 'is-inverted'),
    className
  );

  const rest = getUnhandledProps(Divider, props);
  const ElementType = getElementType(Divider, props);

  return (
    <ElementType {...rest} className={classes}>
      {!childrenUtils.isNil(children) ? children : content}
    </ElementType>
  );

}

Divider.propTypes = {
  /** An Element used to Render the Component */
  as: PropTypes.elementType,

  /** User defined Classes */
  className: PropTypes.string,

  /** Content String */
  content: PropTypes.string,

  /** Hidden */
  hidden: PropTypes.bool,

  /** If is Horizontal */
  horizontal: PropTypes.bool,

  /** if is Inverted */
  inverted: PropTypes.bool
};

Divider.create = createShorthandFactory(Divider, content => ({ content }));

export default Divider;

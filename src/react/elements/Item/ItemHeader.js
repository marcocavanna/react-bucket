import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  customPropTypes,
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps,
  classByKey
} from '../../lib';

import Icon from '../Icon';

function ItemHeader(props) {

  const {
    children,
    className,
    content,
    icon
  } = props;

  const classes = cx(
    classByKey(icon, 'has-icon'),
    className,
    'header'
  );

  const ElementType = getElementType(ItemHeader, props);
  const rest = getUnhandledProps(ItemHeader, props);

  if (childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {icon && Icon.create(icon, { autoGenerateKey: false })}
        {content}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {children}
    </ElementType>
  );
}

ItemHeader.propTypes = {
  /** An element used to Render the Component */
  as: PropTypes.elementType,

  /** User Defined Classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.any,

  /** Icon Shorthand */
  icon: customPropTypes.fontAwesome
};

ItemHeader.create = createShorthandFactory(ItemHeader, content => ({ content }));

export default ItemHeader;

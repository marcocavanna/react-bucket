import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps
} from '../../lib';

import Icon from '../Icon';

function ItemSection(props) {

  const {
    children,
    className,
    content,
    icon
  } = props;

  const classes = cx('section', className);

  const rest = getUnhandledProps(ItemSection, props);
  const ElementType = getElementType(ItemSection, props);

  return (
    <ElementType {...rest} className={classes}>
      {icon && Icon.create(icon)}
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

ItemSection.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary Content */
  children: PropTypes.node,

  /** User defined classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node,

  /** Icon Shorthand */
  icon: customPropTypes.fontAwesome
};

ItemSection.create = createShorthandFactory(ItemSection, content => ({ content }));

export default ItemSection;

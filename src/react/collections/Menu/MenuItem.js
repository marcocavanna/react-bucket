import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import Icon from '../../elements/Icon';

import {
  customPropTypes,
  classByPattern,
  childrenUtils,
  getElementType,
  classByKey,
  createShorthandFactory
} from '../../lib';

class MenuItem extends React.PureComponent {

  static propTypes = {
    /** Display as Active */
    active: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]),

    /** An element used to render */
    // eslint-disable-next-line react/no-unused-prop-types
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** User Defined Classes */
    className: PropTypes.string,

    /** Custom Color */
    color: PropTypes.string,

    /** Content ShordHand */
    content: PropTypes.node,

    /** Disabled State */
    disabled: PropTypes.bool,

    /** Header Style */
    header: PropTypes.bool,

    /** Icon */
    icon: PropTypes.oneOfType([
      PropTypes.bool,
      customPropTypes.fontAwesome
    ]),

    /** Name Shorthand */
    name: PropTypes.string,

    /** OnClick Handler */
    onClick: PropTypes.func,

    /** On Right Position */
    right: PropTypes.bool
  }

  handleClick = (e) => {
    const { disabled } = this.props;

    if (!disabled) {
      e.stopPropagation();
      _.invoke(this.props, 'onClick', e, this.props);
    }
  }

  render() {

    const {
      active,
      children,
      className,
      color,
      content,
      disabled,
      header,
      icon,
      name,
      onClick,
      right
    } = this.props;

    const classes = cx(
      classByKey(active, 'is-active'),
      classByPattern(typeof active === 'string' && active, 'is-%value%'),
      classByPattern(color, 'is-%value%'),
      classByKey(disabled, 'is-disabled'),
      classByKey(header, 'header'),
      classByKey(icon === true || (icon && !(name || content)), 'icon'),
      classByKey(right, 'on-right'),
      'menu-item',
      className
    );

    const ElementType = getElementType(MenuItem, this.props, () => (onClick ? 'a' : undefined));

    if (!childrenUtils.isNil(children)) {
      return (
        <ElementType className={classes} onClick={this.handleClick}>
          {children}
        </ElementType>
      );
    }

    return (
      <ElementType className={classes} onClick={this.handleClick}>
        {Icon.create(icon, { autoGenerateKey: false })}
        {childrenUtils.isNil(content) ? _.startCase(name) : content}
      </ElementType>
    );

  }

}

MenuItem.create = createShorthandFactory(MenuItem, content => ({ content }));

export default MenuItem;

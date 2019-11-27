import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  AutoControlledComponent as Component,
  classByKey,
  getElementType,
  getUnhandledProps,
  childrenUtils,
  createShorthandFactory
} from '../../lib';

import MenuItem from './MenuItem';

// eslint-disable-next-line react/require-optimization
class Menu extends Component {

  static propTypes = {
    /** Index of the current active menu item */
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** An Element used to Render the Component */
    as: PropTypes.elementType,

    /** Menu can have no border */
    borderless: PropTypes.bool,

    /** User defined Class */
    className: PropTypes.string,

    /** Content Shorthand */
    content: PropTypes.any,

    /** Inital Active Index value */
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Item Shorthand */
    items: PropTypes.any,

    /** On Item Click Handler to be used without children */
    onItemClick: PropTypes.func,

    /** A menu can have secondary style */
    secondary: PropTypes.bool,

    /** Tab Style */
    tab: PropTypes.bool,

    /** Render as Text Only */
    text: PropTypes.bool,

    /** Vertical Menu */
    vertical: PropTypes.bool
  }

  static autoControlledProps = ['activeIndex']

  static Item = MenuItem

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps;

      this.trySetState({ activeIndex: index });

      _.invoke(predefinedProps, 'onClick', e, itemProps);
      _.invoke(this.props, 'onItemClick', e, itemProps);
    }
  })

  renderItems() {
    const { items } = this.props;
    const { activeIndex } = this.state;

    return _.map(items, (item, index) => (
      MenuItem.create(item, {
        defaultProps: {
          active: parseInt(activeIndex, 10) === index,
          index
        },
        overrideProps: this.handleItemOverrides
      })
    ));
  }

  render() {

    const {
      borderless,
      children,
      className,
      content,
      items,
      secondary,
      tab,
      text,
      vertical
    } = this.props;

    const classes = cx(
      'menu',
      classByKey(borderless, 'borderless'),
      classByKey(secondary, 'secondary'),
      classByKey(vertical, 'vertical'),
      classByKey(!vertical, 'horizontal'),
      classByKey(tab, 'tab'),
      classByKey(text, 'as-text'),
      className
    );

    const rest = getUnhandledProps(Menu, this.props);
    const ElementType = getElementType(Menu, this.props);

    if (Array.isArray(items)) {
      return (
        <ElementType {...rest} className={classes}>
          {this.renderItems()}
        </ElementType>
      );
    }

    return (
      <ElementType {...rest} className={classes}>
        {childrenUtils.isNil(children) ? content : children}
      </ElementType>
    );
  }
}

Menu.create = createShorthandFactory(Menu, items => ({ items }));

export default Menu;

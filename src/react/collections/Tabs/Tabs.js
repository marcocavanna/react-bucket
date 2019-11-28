import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import {
  AutoControlledComponent as Component,
  getElementType,
  getUnhandledProps
} from '../../lib';

import Menu from '../Menu';
import Layout from '../Layout';

import TabPanel from './TabPanel';

// eslint-disable-next-line react/require-optimization
class Tabs extends Component {

  static propTypes = {

    /** The index of the current active tab */
    activeIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),

    /** An element used to render the Component */
    as: PropTypes.elementType,

    /** The initial active index */
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Grid Shorthand */
    layout: PropTypes.object,

    /** Menu Props */
    menu: PropTypes.object,

    /** Set the Menu Position */
    menuPosition: PropTypes.oneOf(['left', 'right']),

    /** On Tab Changed Handler */
    onTabChange: PropTypes.func,

    /** Panels Array */
    panels: PropTypes.arrayOf(
      PropTypes.shape({
        trigger : PropTypes.string,
        panel   : PropTypes.element
      })
    ),

    /** Render only the active panel */
    renderActiveOnly: PropTypes.bool

  }

  static autoControlledProps = ['activeIndex']

  static defaultProps = {
    layout           : { panelWidth: 9, menuWidth: 3, fluid: true },
    menu             : { borderless: true },
    menuPosition     : 'left',
    renderActiveOnly : true
  }

  static Panel = TabPanel

  // eslint-disable-next-line class-methods-use-this
  getInitialAutoControlledState() {
    return { activeIndex: 0 };
  }

  handleItemClick = (e, { index }) => {
    /** Invoke the onTabChange handler */
    _.invoke(this.props, 'onTabChange', e, { ...this.props, activeIndex: index });
    /** Try to change the active index */
    this.trySetState({ activeIndex: index });
  }

  renderItems() {
    const { panels, renderActiveOnly } = this.props;
    const { activeIndex } = this.state;

    /** If must render only the active tab, invoke the render function */
    if (renderActiveOnly) {
      /** Get the Active Tab */
      const activeTab = _.get(panels, `[${activeIndex}].panel`);
      /** Render the Tab */
      return TabPanel.create(activeTab, {
        overrideProps   : { active: true },
        autoGenerateKey : false
      });
    }

    /** Else, render all tabs */
    return panels.map(({ panel }, index) => (
      TabPanel.create(panel, {
        autoGenerateKey : true,
        overrideProps   : {
          active: index === activeIndex
        }
      })
    ));
  }

  renderMenu() {
    const { menu, panels } = this.props;
    const { activeIndex } = this.state;

    return Menu.create(menu, {
      autoGenerateKey : false,
      overrideProps   : {
        items       : _.map(panels, 'trigger'),
        onItemClick : this.handleItemClick,
        activeIndex
      }
    });
  }

  renderVertical(menu) {
    const { layout, menuPosition } = this.props;
    const { panelWidth, menuWidth, ...layoutProps } = layout;

    const menuColumn = Layout.Column.create(
      { is: menuWidth, children: menu },
      { autoGenerateKey: false }
    );

    return (
      <Layout {...layoutProps}>
        <Layout.Row>
          {menuPosition === 'left' && menuColumn}
          {
            Layout.Column.create(
              { is: panelWidth, children: this.renderItems() },
              { autoGenerateKey: false }
            )
          }
          {menuPosition === 'right' && menuColumn}
        </Layout.Row>
      </Layout>
    );
  }

  render() {
    const menu = this.renderMenu();

    const rest = getUnhandledProps(Tabs, this.props);
    const ElementType = getElementType(Tabs, this.props);

    if (menu.props.vertical) {
      return (
        <ElementType {...rest}>
          {this.renderVertical(menu)}
        </ElementType>
      );
    }

    return (
      <ElementType {...rest} className='tabs'>
        {menu}
        {this.renderItems()}
      </ElementType>
    );
  }

}

export default Tabs;

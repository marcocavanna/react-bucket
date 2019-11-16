import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import {
  AutoControlledComponent as Component,
  getElementType,
  getUnhandledProps,
  classByKey,
  customPropTypes
} from '../../lib';

import Menu from '../Menu';
import Layout from '../Layout';
import TabPanel from './TabPanel';

// eslint-disable-next-line react/require-optimization
class Tabs extends Component {

  static propTypes = {

  }

  static autoControlledProps = ['activeIndex']

  static defaultProps = {
    grid             : { panelWidth: 12, tabWidth: 4 },
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
      return TabPanel.create(_.get(panels, `[${activeIndex}].panel`), {
        overrideProps   : { active: true },
        autoGenerateKey : false
      });
    }

    /** Else, render all tabs */
    return panels.map(({ panel }, index) => (
      TabPanel.create(panel, {
        overrideProps: {
          active: index === activeIndex
        }
      })
    ));
  }

  renderMenu() {
    const { menu, panels, menuPosition } = this.props;
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

  render() {
    const menu = this.renderMenu();

    const rest = getUnhandledProps(Tabs, this.props);
    const ElementType = getElementType(Tabs, this.props);

    return (

    );
  }

}

export default Tabs;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import PanelFab from './PanelFab';
import PanelSection from './PanelSection';

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  classByPattern,
  classByKey,
  childrenUtils
} from '../../lib';

function Panel(props) {

  const {
    children,
    className,
    color,
    content,
    fab,
    header,
    icon,
    loading,
    nested,
    onFabClick,
    subheader,
    table,
    textAlign
  } = props;

  const classes = cx(
    'panel',
    classByKey(fab, 'with-fab'),
    classByKey(loading, 'is-loading'),
    classByKey(table, 'has-table'),
    classByKey(nested, 'is-nested'),
    classByPattern(textAlign, 'has-text-%value%'),
    classByPattern(color, 'has-text-%value%'),
    className
  );

  const rest = getUnhandledProps(Panel, props);
  const ElementType = getElementType(Panel, props);

  const panelHeaderElement = header || subheader || icon
    ? PanelHeader.create({ header, subheader, icon }, { autoGenerateKey: false })
    : null;

  const panelBodyElement = PanelBody.create({ content }, { autoGenerateKey: false });

  return (
    <ElementType {...rest} className={classes}>
      {panelHeaderElement}
      {childrenUtils.isNil(children) ? panelBodyElement : children}
      {typeof fab === 'string' && <Panel.Fab icon={fab} onClick={onFabClick} />}
      {typeof fab !== 'string' && typeof fab !== 'boolean' && fab && <Panel.Fab>{fab}</Panel.Fab>}
    </ElementType>
  );
}

Panel.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary Content */
  children: PropTypes.node,

  /** Additional Classes */
  className: PropTypes.string,

  /** Text Color */
  color: PropTypes.string,

  /** Shorthand Properties for Content */
  content: PropTypes.node,

  /** Panel has Fab */
  fab: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.element
  ]),

  /** Header Shorthand Method */
  header: PropTypes.any,

  /** Icon Method ShortHand */
  icon: customPropTypes.fontAwesome,

  /** Loading Style for Panel */
  loading: PropTypes.bool,

  /** Explicit a Nested Panel */
  nested: PropTypes.bool,

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFabClick: PropTypes.func,

  /** Subheader Shorthand Method */
  subheader: PropTypes.string,

  /** Set Panel as Table Container */
  table: PropTypes.bool,

  /** Text Align */
  textAlign: customPropTypes.textAlign
};

Panel.Fab = PanelFab;
Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Section = PanelSection;

export default Panel;
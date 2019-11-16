import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import PanelFab from './PanelFab';

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
    classByPattern(textAlign, 'has-text-%value%'),
    classByPattern(color, 'has-text-%value%'),
    className
  );

  const rest = getUnhandledProps(Panel, props);
  const ElementType = getElementType(Panel, props);

  const panelHeaderElement = header || subheader || icon
    ? PanelHeader.create({ header, subheader, icon })
    : null;

  const panelBodyElement = PanelBody.create({ content });

  return (
    <ElementType {...rest} className={classes}>
      {panelHeaderElement}
      {childrenUtils.isNil(children) ? panelBodyElement : children}
      {typeof fab !== 'boolean' && fab && <PanelFab icon={fab} onFabClick={onFabClick} />}
    </ElementType>
  );
}

Panel.propTypes = {
  /** An element used to render the component */
  as: customPropTypes.as,

  /** Primary Content */
  children: PropTypes.node,

  /** Additional Classes */
  className: PropTypes.string,

  /** Text Color */
  color: PropTypes.string,

  /** Shorthand Properties for Content */
  content: PropTypes.any,

  /** Panel has Fab */
  fab: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.element
  ]),

  /** Header Shorthand Method */
  header: PropTypes.string,

  /** Icon Method ShortHand */
  icon: customPropTypes.fontAwesome,

  /** Loading Style for Panel */
  loading: PropTypes.bool,

  /** Fab Click Handler Function */
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

export default Panel;

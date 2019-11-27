import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  childrenUtils
} from '../../lib';

function PanelFab(props) {

  const {
    children,
    color,
    disabled,
    icon,
    onFabClick,
    primary
  } = props;

  const rest = getUnhandledProps(PanelFab, props);
  const ElementType = getElementType(PanelFab, props);

  return (
    <ElementType {...rest} className='panel-fab'>
      {
        !childrenUtils.isNil(children)
          ? children
          : icon && Button.create(
            { fab: true, icon, disabled, color, onClick: onFabClick, primary }
          )
      }
    </ElementType>
  );

}

PanelFab.propTypes = {
  /** An Element used to render the Component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Button Fab Color */
  color: PropTypes.string,

  /** Disabled State */
  disabled: PropTypes.bool,

  /** Icon ShortHand */
  icon: customPropTypes.fontAwesome,

  /** On Fab Click Function */
  onFabClick: PropTypes.func,

  /** Primary State */
  primary: PropTypes.bool
};

export default PanelFab;

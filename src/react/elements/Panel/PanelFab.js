import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import {
  createShorthandFactory,
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
    onClick,
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
            { fab: true, icon, disabled, color, onClick, primary },
            { autoGenerateKey: false }
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

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** Primary State */
  primary: PropTypes.bool
};

PanelFab.create = createShorthandFactory(PanelFab, icon => ({ icon }));

export default PanelFab;

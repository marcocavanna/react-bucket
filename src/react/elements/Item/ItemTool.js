import React from 'react';
import PropTypes from 'prop-types';

import {
  createShorthandFactory
} from '../../lib';

import Button from '../Button';
import Popup from '../../modules/Popup';

function ItemTool(props) {

  /** Get the Tooltip Props */
  const {
    tooltip,
    ...rest
  } = props;

  /** Build the Button */
  const tool = Button.create(rest, { autoGenerateKey: false, overrideProps: { className: 'item-tool', flat: true } });

  /** If tooltip exists, return as a Popup Item */
  if (tooltip) {
    return (
      <Popup
        trigger={tool}
        content={tooltip}
      />
    );
  }

  /** Else, return the Button */
  return tool;

}

ItemTool.propTypes = {
  tooltip: PropTypes.node
};

ItemTool.create = createShorthandFactory(ItemTool, props => props);

export default ItemTool;

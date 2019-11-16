import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import {

} from '../../lib';

function Progress(props) {

  const {
    active,
    indicator,
    label,
    max,
    min,
    value
  } = props;

}

Progress.propTypes = {
  /** Show an Active White Shadow */
  active: PropTypes.bool,

  /** Show indicator for current value */
  indicator: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['percent', 'steps'])
  ]),

  /** A Progress Bar can have a Label */
  label: PropTypes.string,

  /** Maximum Bar Value */
  max: PropTypes.number,

  /** Minimum Bar Value */
  min: PropTypes.number,

  /** Bar Value */
  value: PropTypes.number
};

Progress.defaultProps = {
  max : 100,
  min : 0
};

export default Progress;

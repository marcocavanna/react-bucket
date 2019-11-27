import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  partitionFieldProps,
  classByKey,
  classByPattern
} from '../../lib';

import Field from '../Field';

function Progress(props) {

  const {
    active,
    className,
    direction,
    discrete,
    formatLimits,
    indicator,
    inverted,
    limits,
    max,
    min,
    size,
    value
  } = props;

  /** Save progress values fixed to 2 decimals */
  const _value = Math.round(value * 100) / 100;
  const _max = Math.round(max * 100) / 100;
  const _min = Math.round(min * 100) / 100;

  /** Generate Progress Value calculating overValue */
  const hasOverValue = _max < _value;
  const progressValue = hasOverValue
    ? _max
    : _value;
  const progressMax = hasOverValue
    ? _value
    : _max;

  /** Get the Progress Color */
  const colorStep = progressValue <= 33
    ? 'low'
    : progressValue > 33 && progressValue <= 66
      ? 'mid'
      : 'high';

  /** Generate Progress Width */
  const progressWidth = Math.round(((progressValue - _min) / (progressMax - _min)) * 100);

  /** Build Classes */
  const classes = cx(
    'progress',
    classByKey(active, 'is-active'),
    classByKey(direction === 'right', 'on-right'),
    classByKey(discrete, 'is-discrete', 'is-colored'),
    classByKey(indicator, 'has-indicator'),
    classByKey(inverted, 'is-inverted'),
    classByKey(limits, 'with-limits'),
    classByKey(hasOverValue, 'is-overvalue'),
    classByPattern(size, 'is-%value%'),
    colorStep,
    className
  );

  const rawRest = getUnhandledProps(Progress, props);
  const ElementType = getElementType(Progress, props);

  /** Partition Field Props */
  const [fieldProps, rest] = partitionFieldProps(rawRest);

  /** Build the Indicator Element */
  const indicatorElement = indicator && (
    <div className='indicator'>
      {typeof indicator === 'string' || typeof indicator === 'boolean'
        ? indicator === 'percent' ? `${Math.round(((_value - _min) / (_max - _min)) * 100)}%` : `${_value}/${_max}`
        : indicator(_value)}
    </div>
  );

  /** Build the Limits Element */
  const limitsElement = limits && (
    <div className='limits'>
      <div className='low limit'>{formatLimits(_min)}</div>
      <div className='high limit'>{formatLimits(progressMax)}</div>
    </div>
  );

  return (
    <Field
      {...fieldProps}
      as={ElementType}
      content={(
        <div {...rest} className={classes}>
          {limitsElement}
          <div className='bar'>
            <div className='value' style={{ width: `${progressWidth > 0 ? progressWidth : 0}%` }}>
              {indicatorElement}
            </div>
          </div>
        </div>
      )}
    />
  );
}

Progress.propTypes = {
  /** Show an Active White Shadow */
  active: PropTypes.bool,

  /** An element used to render the Component */
  as: customPropTypes.as,

  /** User defined classes */
  className: PropTypes.string,

  /** Set Progress Direction */
  direction: PropTypes.oneOf(['left', 'right']),

  /** Remove Colors */
  discrete: PropTypes.bool,

  /** Format Limits */
  formatLimits: PropTypes.func,

  /** Show indicator for current value */
  indicator: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['percent', 'steps']),
    PropTypes.func
  ]),

  /** Invert the Bar Color logic, max value will be danger colored */
  inverted: PropTypes.bool,

  /** Show Progress Limits */
  limits: PropTypes.bool,

  /** Maximum Bar Value */
  max: PropTypes.number,

  /** Minimum Bar Value */
  min: PropTypes.number,

  /** Size Variation */
  size: customPropTypes.size,

  /** Bar Value */
  value: PropTypes.number
};

Progress.defaultProps = {
  direction    : 'left',
  formatLimits : limit => limit,
  max          : 100,
  min          : 0,
  value        : 0
};

export default Progress;

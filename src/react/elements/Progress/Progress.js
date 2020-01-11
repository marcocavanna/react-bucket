import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  classByKey,
  classByPattern,
  childrenUtils
} from '../../lib';

function Progress(props) {

  const {
    active,
    children,
    className,
    circular,
    content,
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

  /** Generate Progress Width */
  const progressWidth = Math.round(((progressValue - _min) / (progressMax - _min)) * 100);

  /** Get the Progress Color */
  const colorStep = progressWidth <= 33
    ? 'low'
    : progressWidth > 33 && progressWidth <= 66
      ? 'mid'
      : 'high';

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
    classByKey(circular, 'is-circular'),
    classByKey(content || children, 'has-content'),
    classByPattern(size, 'is-%value%'),
    colorStep,
    className
  );

  const rest = getUnhandledProps(Progress, props);
  const ElementType = getElementType(Progress, props);

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

  /** Build Content if Exists */
  const contentElement = !!(children || content) && (
    <div className='progress-content'>
      {childrenUtils.isNil(children) ? content : children}
    </div>
  );

  if (!circular) {
    return (
      <ElementType {...rest} className={classes}>
        {limitsElement}
        <div className='bar'>
          <div className='value' style={{ width: `${progressWidth > 0 ? progressWidth : 0}%` }}>
            {indicatorElement}
          </div>
        </div>
      </ElementType>
    );
  }

  const circularProgressSize = {
    circle   : contentElement ? 14 : 40,
    stroke   : contentElement ? 5 : 7,
    progress : progressWidth > 0 ? progressWidth : 0
  };

  switch (size) {
    case 'extra-small':
      circularProgressSize.circle /= 4;
      circularProgressSize.stroke /= 4;
      break;

    case 'small':
      circularProgressSize.circle /= 2;
      circularProgressSize.stroke /= 1.75;
      break;

    case 'large':
      circularProgressSize.circle *= 2;
      circularProgressSize.stroke *= 2;
      break;

    case 'big':
      circularProgressSize.circle *= 4;
      circularProgressSize.stroke *= 4;
      break;

    case 'huge':
      circularProgressSize.circle *= 6;
      circularProgressSize.stroke *= 6;
      break;

    default:
      circularProgressSize.circle *= 1;
      circularProgressSize.stroke *= 1;
  }

  circularProgressSize.radius = (circularProgressSize.circle - circularProgressSize.stroke) / 2;

  const viewBox = [0, 0, circularProgressSize.circle, circularProgressSize.circle].join(' ');
  const dashArray = circularProgressSize.radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * circularProgressSize.progress / 100;

  return (
    <ElementType {...rest} className={classes}>
      <div className='progress-wrapper'>
        <svg
          width={circularProgressSize.circle}
          height={circularProgressSize.circle}
          viewBox={viewBox}
        >
          <circle
            className='progress-circle-background'
            cx={circularProgressSize.circle / 2}
            cy={circularProgressSize.circle / 2}
            r={circularProgressSize.radius}
            strokeWidth={`${circularProgressSize.stroke}px`}
          />
          <circle
            className='progress-circle-value'
            cx={circularProgressSize.circle / 2}
            cy={circularProgressSize.circle / 2}
            r={circularProgressSize.radius}
            strokeWidth={`${circularProgressSize.stroke}px`}
            transform={`rotate(-90 ${circularProgressSize.circle / 2} ${circularProgressSize.circle / 2})`}
            style={{
              strokeDasharray  : dashArray,
              strokeDashoffset : dashOffset
            }}
          />
        </svg>
      </div>
      {contentElement}
    </ElementType>
  );
}

Progress.propTypes = {
  /** Show an Active White Shadow */
  active: PropTypes.bool,

  /** An element used to render the Component */
  as: PropTypes.elementType,

  /** Primary Content */
  children: PropTypes.node,

  /** Draw a Circular Progress */
  circular: PropTypes.bool,

  /** User defined classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node,

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

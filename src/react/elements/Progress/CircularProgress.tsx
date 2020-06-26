import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { useElementType } from '../../lib';

import { CircularProgressProps } from './CircularProgress.types';

import useProgressProps from './lib/useProgressProps';
import useProgressIndicator from './lib/useProgressIndicator';


export default function CircularProgress(
  props: CircularProgressProps
): React.ReactElement<CircularProgressProps> {

  const {
    className,
    progress,
    rest: {
      as,
      indicator,
      radius,
      strokeWidth,
      style: userDefinedStyle,
      ...rest
    }
  } = useProgressProps(props);

  const ElementType = useElementType(CircularProgress, props);

  const classes = clsx(
    className,
    'circular'
  );


  /** Build the Indicator Element */
  const indicatorElement = useProgressIndicator(indicator, progress);


  // ----
  // Circle Build Value
  // ----
  const circle = React.useMemo<{ radius: number, stroke: number }>(
    () => {

      const startingStrokeWidth = indicatorElement ? strokeWidth - 2 : strokeWidth;
      const startingRadius = indicatorElement ? radius + 1 : radius;

      switch (props.size) {
        case 'extra small':
          return { radius: startingRadius / 3, stroke: startingStrokeWidth / 2 };

        case 'small':
          return { radius: startingRadius / 1.75, stroke: startingStrokeWidth / 1.5 };

        case 'large':
          return { radius: startingRadius * 1.75, stroke: startingStrokeWidth * 1.5 };

        case 'big':
          return { radius: startingRadius * 3, stroke: startingStrokeWidth * 2.5 };

        case 'huge':
          return { radius: startingRadius * 4.5, stroke: startingStrokeWidth * 4 };

        default:
          return { radius: startingRadius, stroke: startingStrokeWidth };
      }
    },
    [ props.size, indicatorElement ]
  );

  const size = Math.ceil((circle.radius * 2) + circle.stroke);

  const viewBox = [ 0, 0, size, size ].join(' ');
  const dashArray = circle.radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * progress.width / 100);


  return (
    <ElementType
      {...rest}
      className={classes}
      style={{
        ...userDefinedStyle,
        height: `${size}px`,
        width : `${size}px`
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
      >
        <circle
          className={'bar'}
          cx={size / 2}
          cy={size / 2}
          r={circle.radius}
          strokeWidth={`${circle.stroke}px`}
        />
        <circle
          className={'value'}
          cx={size / 2}
          cy={size / 2}
          r={circle.radius}
          strokeWidth={`${circle.stroke}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            strokeDasharray : dashArray,
            strokeDashoffset: dashOffset
          }}
        />
      </svg>
      {indicatorElement}
    </ElementType>
  );

}

CircularProgress.defaultProps = {
  max        : 100,
  min        : 0,
  radius     : 16,
  strokeWidth: 10
} as Partial<CircularProgressProps>;

CircularProgress.create = createShorthandFactory(CircularProgress, (value) => ({ value: value as number }));

import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import Label from './Label';

import { LabelGroupProps } from './LabelGroup.types';


export default function LabelGroup(props: LabelGroupProps): React.ReactElement<LabelGroupProps> {

  const {
    className,
    rest: {
      children,
      labels,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(LabelGroup, props);

  /** Build the element class list */
  const classes = clsx(
    'labels',
    className
  );

  /** If children are declared, render them */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {Array.isArray(labels) && labels.map((label) => (
        Label.create(label, {
          autoGenerateKey: true
        })
      ))}
    </ElementType>
  );
}

LabelGroup.displayName = 'LabelGroup';

import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  classByKey
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../../lib';

import { Icon } from '../Icon';

import { SectionProps } from './Section.types';


export default function Section(props: SectionProps): React.ReactElement<SectionProps> {

  const {
    className,
    rest: {
      children,
      content,
      direction,
      divided,
      icon,
      label,
      reverse,
      ...rest
    }
  } = useSharedClassName(props);

  const classes = clsx(
    direction,
    { divided, reverse },
    'section',
    className
  );

  const labelClasses = clsx(
    'label',
    classByKey(direction === 'horizontal' && reverse, 'has-text-right')
  );

  const contentClasses = clsx(
    'content',
    classByKey(direction === 'horizontal' && !reverse, 'has-text-right')
  );

  const ElementType = useElementType(Section, props);

  const labelElement = React.useMemo(
    () => label && (
      <div className={labelClasses}>
        {Icon.create(icon, { autoGenerateKey: false })}{label}
      </div>
    ),
    [
      label,
      icon,
      labelClasses
    ]
  );

  return (
    <ElementType {...rest} className={classes}>
      {labelElement}
      <div className={contentClasses}>
        {childrenUtils.isNil(children) ? content : children}
      </div>
    </ElementType>
  );
}

Section.displayName = 'Section';

Section.defaultProps = {
  direction: 'vertical'
} as Partial<SectionProps>;

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

import { useWithDefaultProps } from '../../context/BucketContext';

import { Icon } from '../Icon';

import { SectionProps } from './Section.types';


/* --------
 * Component Declare
 * -------- */
type SectionComponent = React.FunctionComponent<SectionProps>;


/* --------
 * Component Render
 * -------- */
const Section: SectionComponent = (receivedProps) => {

  const props = useWithDefaultProps('section', receivedProps);

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
};

Section.displayName = 'Section';

export default Section;

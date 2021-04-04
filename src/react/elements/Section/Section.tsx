import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

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
type SectionComponent = CreatableFunctionComponent<SectionProps>;


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

  const ElementType = useElementType(Section, props);

  const contentNode = childrenUtils.isNil(children) ? content : children;

  const classes = clsx(
    direction,
    {
      divided,
      reverse,
      'without-content': !contentNode
    },
    'section',
    className
  );

  const labelClasses = clsx(
    'label',
    { 'has-text-right': direction === 'horizontal' && reverse }
  );

  const contentClasses = clsx(
    'content',
    { 'has-text-right': direction === 'horizontal' && !reverse }
  );

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
      {contentNode && (
        <div className={contentClasses}>
          {contentNode}
        </div>
      )}
    </ElementType>
  );
};

Section.displayName = 'Section';

Section.create = createShorthandFactory(Section, (content) => ({ content }));

export default Section;

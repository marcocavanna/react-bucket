import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  getElementType,
  childrenUtils
} from '@appbuckets/react-ui-core';

import { HeaderSubheaderProps } from './HeaderSubheader.types';
import { getSharedClassNames } from '../../lib';


export default function HeaderSubheader(props: HeaderSubheaderProps): React.ReactElement<HeaderSubheaderProps> {

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = getSharedClassNames(props);

  const ElementType = getElementType(HeaderSubheader, props);

  const classes = clsx(
    'subheader',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

HeaderSubheader.displayName = 'HeaderSubheader';

HeaderSubheader.defaultProps = {
  as: 'h4' as React.ElementType
};

HeaderSubheader.create = createShorthandFactory(HeaderSubheader, content => ({ content }));

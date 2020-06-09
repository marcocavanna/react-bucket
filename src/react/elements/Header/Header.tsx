import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  getElementType,
  classByKey
} from '@appbuckets/react-ui-core';

import { HeaderProps } from './Header.types';
import { getSharedClassNames } from '../../lib';

import HeaderContent from './HeaderContent';
import HeaderSubheader from './HeaderSubheader';


export default function Header(props: HeaderProps): React.ReactElement<HeaderProps> {

  const {
    className,
    rest: {
      children,
      content,
      disabled,
      divided,
      subheader,
      ...rest
    }
  } = getSharedClassNames(props);

  const ElementType = getElementType(Header, props);

  const classes = clsx(
    'header',
    classByKey(disabled, 'is-disabled'),
    classByKey(divided, 'is-divided'),
    className
  );

  const contentElement = React.useMemo(
    () => HeaderContent.create(content, { autoGenerateKey: false }),
    [ content ]
  );

  const subheaderElement = React.useMemo(
    () => HeaderSubheader.create(subheader, { autoGenerateKey: false }),
    [ subheader ]
  );

  return (
    <ElementType {...rest} className={classes}>
      <div className={'header-content'}>
        {contentElement}
        {subheaderElement}
      </div>
    </ElementType>
  );
}

Header.Content = HeaderContent;
Header.Subheader = HeaderSubheader;

Header.displayName = 'Header';

Header.create = createShorthandFactory<HeaderProps>(Header, content => ({ content }));

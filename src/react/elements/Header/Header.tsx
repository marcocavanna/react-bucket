import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  getElementType
} from '@appbuckets/react-ui-core';

import { HeaderProps } from './Header.types';
import { getSharedClassNames } from '../../lib';

import HeaderContent from './HeaderContent';
import HeaderSubheader from './HeaderSubheader';

import { Icon } from '../Icon';


export default function Header(props: HeaderProps): React.ReactElement<HeaderProps> {

  const {
    className,
    rest: {
      children,
      content,
      disabled,
      divided,
      subheader,
      icon,
      ...rest
    }
  } = getSharedClassNames(props);

  const ElementType = getElementType(Header, props);

  const classes = clsx(
    {
      disabled,
      divided,
      'with-icon': icon
    },
    'header',
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

  const iconElement = React.useMemo(
    () => Icon.create(icon, { autoGenerateKey: false }),
    [ icon ]
  );

  return (
    <ElementType {...rest} className={classes}>
      {iconElement && (
        <div className={'header-icon'}>
          {iconElement}
        </div>
      )}
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

Header.create = createShorthandFactory(Header, content => ({ content }));

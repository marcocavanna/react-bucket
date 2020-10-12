import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
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

  const hasChildren = !childrenUtils.isNil(children);

  const contentElement = React.useMemo(
    () => !hasChildren && HeaderContent.create(content, { autoGenerateKey: false }),
    [ content, children ]
  );

  const subheaderElement = React.useMemo(
    () => !hasChildren && HeaderSubheader.create(subheader, { autoGenerateKey: false }),
    [ subheader, children ]
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
        {hasChildren ? children : (
          <React.Fragment>
            {contentElement}
            {subheaderElement}
          </React.Fragment>
        )}
      </div>
    </ElementType>
  );
}

Header.Content = HeaderContent;
Header.Subheader = HeaderSubheader;

Header.displayName = 'Header';

Header.create = createShorthandFactory(Header, content => ({ content }));

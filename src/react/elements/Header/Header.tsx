import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import { getSharedClassNames } from '../../lib';
import Button from '../Button/Button';

import { Icon } from '../Icon';

import HeaderContent from './HeaderContent';
import HeaderSubheader from './HeaderSubheader';

import { HeaderProps } from './Header.types';


/* --------
 * Component Declare
 * -------- */
export type HeaderComponent = CreatableFunctionComponent<HeaderProps> & {
  Content: typeof HeaderContent;
  Subheader: typeof HeaderSubheader;
};


/* --------
 * Component Render
 * -------- */
const Header: HeaderComponent = (props) => {

  const {
    className,
    rest: {
      actions,
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
      'with-icon'   : icon,
      'with-actions': Array.isArray(actions)
    },
    'header',
    className
  );

  const hasChildren = !childrenUtils.isNil(children);

  const contentElement = React.useMemo(
    () => !hasChildren && HeaderContent.create(content, { autoGenerateKey: false }),
    [ hasChildren, content ]
  );

  const subheaderElement = React.useMemo(
    () => !hasChildren && HeaderSubheader.create(subheader, { autoGenerateKey: false }),
    [ hasChildren, subheader ]
  );

  const iconElement = React.useMemo(
    () => Icon.create(icon, { autoGenerateKey: false }),
    [ icon ]
  );

  const actionsElement = React.useMemo(
    () => {
      if (!Array.isArray(actions)) {
        return null;
      }

      return (
        <div className={'header-actions'}>
          {actions.map((action) => Button.create(action, {
            autoGenerateKey: true,
            defaultProps   : {
              className: 'action'
            }
          }))}
        </div>
      );
    },
    [ actions ]
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
      {actionsElement}
    </ElementType>
  );
};

Header.Content = HeaderContent;
Header.Subheader = HeaderSubheader;

Header.displayName = 'Header';

Header.create = createShorthandFactory(Header, content => ({ content }));

export default Header;

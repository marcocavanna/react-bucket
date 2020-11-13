import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  getElementType,
  childrenUtils
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../../generic';

import { getSharedClassNames } from '../../lib';

import { HeaderSubheaderProps } from './HeaderSubheader.types';

/* --------
 * Component Declare
 * -------- */
type HeaderSubheaderComponent = CreatableFunctionComponent<HeaderSubheaderProps>;

/* --------
 * Component Render
 * -------- */
const HeaderSubheader: HeaderSubheaderComponent = (props) => {

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

};

HeaderSubheader.displayName = 'HeaderSubheader';

HeaderSubheader.defaultProps = {
  as: 'h4' as React.ElementType
};

HeaderSubheader.create = createShorthandFactory(HeaderSubheader, content => ({ content }));

export default HeaderSubheader;

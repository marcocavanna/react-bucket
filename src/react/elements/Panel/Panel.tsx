import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils, classByKey,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { PanelProps } from './Panel.types';

import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import PanelFooter from './PanelFooter';

import { Loader } from '../Loader';


export default function Panel(props: PanelProps): React.ReactElement<PanelProps> {

  const {
    className,
    rest: {
      children,
      content,
      fab,
      footer,
      disabled,
      loading,
      header,
      solid,
      ...rawRest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(Panel, props);

  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  const classes = clsx(
    classByKey(solid, 'solid'),
    classByKey(disabled || loading, 'disabled'),
    classByKey(loading, 'loading'),
    'panel',
    className,
    stateClasses
  );

  /** If children exists, render them */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  /** Use shorthand to build panel elements */
  const loaderElement = React.useMemo(
    () => loading && Loader.create({ size: 'big' }, { autoGenerateKey: false }),
    [ loading ]
  );

  const headerElement = React.useMemo(
    () => PanelHeader.create(header, { autoGenerateKey: false }),
    [ header ]
  );

  const footerElement = React.useMemo(
    () => PanelFooter.create(footer, { autoGenerateKey: false }),
    [ footer ]
  );

  const bodyContent = childrenUtils.isNil(children) ? content : children;

  /** Return the Panel */
  return (
    <ElementType {...rest} className={classes}>
      {loaderElement}
      {headerElement}
      {bodyContent && (
        <PanelBody fab={fab}>
          {bodyContent}
        </PanelBody>
      )}
      {footerElement}
    </ElementType>
  );

}

Panel.displayName = 'Panel';

Panel.create = createShorthandFactory(Panel, (content) => ({ content }));

Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

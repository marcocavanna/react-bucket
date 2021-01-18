import * as React from 'react';
import clsx from 'clsx';

import {
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { Header } from '../Header';
import { Icon } from '../Icon';

import { HeroButtonProps } from './HeroButton.types';


/* --------
 * Component Declare
 * -------- */
type HeroButtonComponent = React.FunctionComponent<HeroButtonProps>;


/* --------
 * Component Render
 * -------- */
const HeroButton: HeroButtonComponent = (props) => {

  const {
    className,
    rest: {
      active,
      content,
      disabled,
      discreet,
      icon,
      onClick,
      subheader,
      variation,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(HeroButton, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Handle Buttons Click */
  const handleClick = (e: React.MouseEvent) => {
    /** A disable button could not be clicked */
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (typeof onClick === 'function') {
      e.stopPropagation();
      onClick(e, props);
    }
  };

  /** Build the element class list */
  const classes = clsx(
    {
      active,
      disabled,
      discreet
    },
    'hero-button',
    typeof variation === 'number' ? `variation-${variation}` : undefined,
    stateClasses,
    className
  );

  /** Build Hero Content */
  const headerContent = React.useMemo(
    () => Header.create({
      content,
      subheader
    }, {
      autoGenerateKey: false
    }),
    [ content, subheader ]
  );

  const iconElement = React.useMemo(
    () => icon && Icon.create(icon, {
      autoGenerateKey: false
    }),
    [ icon ]
  );

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      <div className={'content'}>
        {headerContent}
        {iconElement}
      </div>
    </ElementType>
  );
};

HeroButton.displayName = 'HeroButton';

export default HeroButton;

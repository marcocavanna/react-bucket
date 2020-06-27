import * as React from 'react';
import clsx from 'clsx';

import {
  useFontawesomeIcon,
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import {
  classByPattern,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { IconProps } from './Icon.types';
import { FontAwesomeIcon } from '../../generic';


export default function Icon(props: IconProps): React.ReactElement<IconProps> {

  const {
    className,
    rest: {
      bordered,
      disabled,
      fitted,
      flip,
      iconStyle,
      name,
      onClick,
      rotate,
      solid,
      spin,
      unspaced,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get Component Element Type */
  const ElementType = useElementType(Icon, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Handle click, to disabled it if is disabled */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    /** If icon has been disabled, prevent click */
    if (disabled) {
      e.preventDefault();
      return;
    }
    /** If the onClick function exists, invoke it */
    if (typeof onClick === 'function') {
      onClick(e, props);
    }
  };

  /** Get the FontAwesome Icon */
  const iconClassName = useFontawesomeIcon(name, iconStyle);

  /** Build icon ClassName */
  const classes = clsx(
    'icon',
    stateClasses,
    className,
    iconClassName,
    solid,
    {
      bordered,
      disabled,
      fitted,
      unspaced,
      'clickable': onClick,
      'fa-spin'  : spin
    },
    classByPattern(flip, 'fa-flip-%value%'),
    classByPattern(rotate, 'fa-rotate-%value%')
  );

  /** Draw the element */
  return (
    <ElementType
      {...rest}
      className={classes}
      onClick={handleClick}
    />
  );
}

Icon.displayName = 'Icon';

/** Set icon default props */
Icon.defaultProps = {
  as: 'i' as React.ElementType
};

/** Icon could be created using a Shorthand */
Icon.create = createShorthandFactory(Icon, (name) => ({ name: name as FontAwesomeIcon }));

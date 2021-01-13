import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { CreatableFunctionComponent } from '../../generic';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { IconProps } from './Icon.types';


library.add(fas, fab, far);

/* --------
 * Component Declare
 * -------- */
type IconComponent = CreatableFunctionComponent<IconProps>;


/* --------
 * Component Render
 * -------- */
const Icon: IconComponent = React.memo<IconProps>((props) => {

  const {
    className,
    rest: {
      bordered,
      disabled,
      fitted,
      flip,
      iconStyle,
      inverse,
      listItem,
      onClick,
      mask,
      name,
      pulse,
      rotate,
      solid,
      spin,
      transform,
      unspaced,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Split state className from rest props */
  const [ stateClasses ] = useSplitStateClassName(rawRest);

  /** Handle click, to disabled it if is disabled */
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
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
  // const iconClassName = useFontawesomeIcon(name, iconStyle);

  /** Build icon ClassName */
  const classes = clsx(
    'icon',
    stateClasses,
    className,
    solid,
    {
      disabled,
      unspaced,
      clickable: onClick
    }
  );

  if (!name) {
    return null;
  }

  /** Draw the element */
  return (
    <FontAwesomeIcon
      border={bordered}
      fixedWidth={!fitted}
      className={classes}
      icon={[ iconStyle || 'fas', name ]}
      mask={mask}
      spin={spin}
      pulse={pulse}
      flip={flip}
      inverse={inverse}
      listItem={listItem}
      rotate={rotate}
      transform={transform}
      onClick={handleClick}
    />
  );
}) as unknown as IconComponent;

Icon.displayName = 'Icon';

/** Icon could be created using a Shorthand */
Icon.create = createShorthandFactory(Icon, (name) => ({ name: name as any }));

export default Icon;

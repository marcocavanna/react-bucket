import fontAwesomeMapper from './fontAwesomeMapper';

import { FontAwesomeIcon, FontAwesomeIconStyle } from '../generic';


const cache: { [icon: string]: string | null } = {};


export default function getFontawesomeIconClassName(
  name?: FontAwesomeIcon,
  style?: FontAwesomeIconStyle
): string | null {

  /** If no name has been provided, return null */
  if (name == null || !name?.length) {
    return null;
  }

  /** Check if Icon ClassName has been Cached */
  const cacheName = `${name}?${style ?? 'default'}`;
  if (cache[cacheName] !== undefined) {
    return cache[cacheName];
  }

  /** Get the icon className */
  let iconClassName: string | null = null;

  /** Check pairing exists */
  if (fontAwesomeMapper[name]) {
    /** Get classes */
    const { classes } = fontAwesomeMapper[name];
    /** If style has been provided, and exists in style object, get it */
    if (style && classes[style]) {
      iconClassName = classes[style] ?? null;
    }
    /** Else, fallback to first style */
    else {
      iconClassName = classes[Object.keys(classes)[0] as ('brands' | 'regular' | 'solid')] ?? null;
    }
  }

  /** Save into cache, and return */
  cache[cacheName] = iconClassName;

  return iconClassName;
}

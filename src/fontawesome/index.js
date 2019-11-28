const fontAwesomePair = require('./icon-module/fa-mapper');

export default (name, style) => {

  /**
   * Check Name is Provided
   */
  if (name === null || name === undefined || typeof name !== 'string' || !name) {
    return null;
  }

  /**
   * Check its Pairing Exists
   */
  if (!fontAwesomePair[name] || typeof fontAwesomePair[name].classes !== 'object') {
    return null;
  }

  /**
   * Initialize the iconClassName variable
   * and get all possible class for this icon
   */
  let iconClassName;
  const { classes: iconClasses } = fontAwesomePair[name];

  /**
   * If style variable exists, and
   * has a provided classname, then assign
   * it to iconClassName variable
   */
  if (style && iconClasses[style]) {
    iconClassName = iconClasses[style];
  }

  /**
   * If iconClassName is still undefined
   * assigned by default the first possible
   * classname
   */
  if (!iconClassName) {
    const firstStyle = Object.getOwnPropertyNames(iconClasses)[0];
    iconClassName = iconClasses[firstStyle];
  }

  return iconClassName;

};

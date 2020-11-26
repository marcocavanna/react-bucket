'use strict';

var fontAwesomeMapper = require('./fontAwesomeMapper.js');

var cache = {};
function getFontawesomeIconClassName(name, style) {
  var _a, _b;
  /** If no name has been provided, return null */
  if (
    name == null ||
    !(name === null || name === void 0 ? void 0 : name.length)
  ) {
    return null;
  }
  /** Check if Icon ClassName has been Cached */
  var cacheName =
    name + '?' + (style !== null && style !== void 0 ? style : 'default');
  if (cache[cacheName] !== undefined) {
    return cache[cacheName];
  }
  /** Get the icon className */
  var iconClassName = null;
  /** Check pairing exists */
  if (fontAwesomeMapper[name]) {
    /** Get classes */
    var classes = fontAwesomeMapper[name].classes;
    /** If style has been provided, and exists in style object, get it */
    if (style && classes[style]) {
      iconClassName =
        (_a = classes[style]) !== null && _a !== void 0 ? _a : null;
    } else {
    /** Else, fallback to first style */
      iconClassName =
        (_b = classes[Object.keys(classes)[0]]) !== null && _b !== void 0
          ? _b
          : null;
    }
  }
  /** Save into cache, and return */
  cache[cacheName] = iconClassName;
  return iconClassName;
}

module.exports = getFontawesomeIconClassName;
//# sourceMappingURL=getFontawesomeIconClassName.js.map

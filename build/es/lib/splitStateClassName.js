'use strict';

var _tslib = require('../_virtual/_tslib.js');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

function splitStateClassName(props) {
  var _a = props,
    appearance = _a.appearance,
    danger = _a.danger,
    info = _a.info,
    primary = _a.primary,
    secondary = _a.secondary,
    success = _a.success,
    warning = _a.warning,
    rest = _tslib.__rest(_a, [
      'appearance',
      'danger',
      'info',
      'primary',
      'secondary',
      'success',
      'warning',
    ]);
  var classes = clsx__default['default'](
    reactUiCore.classByKey(danger, 'is-danger'),
    reactUiCore.classByKey(info, 'is-info'),
    reactUiCore.classByKey(primary, 'is-primary'),
    reactUiCore.classByKey(secondary, 'is-secondary'),
    reactUiCore.classByKey(success, 'is-success'),
    reactUiCore.classByKey(warning, 'is-warning'),
    /** Apply manual color only if any other shorthand is falsy */
    reactUiCore.classByPattern(
      !danger &&
        !info &&
        !primary &&
        !secondary &&
        !success &&
        !warning &&
        appearance,
      'is-%value%'
    )
  );
  return [
    classes,
    rest,
    {
      appearance: appearance,
      danger: danger,
      info: info,
      primary: primary,
      secondary: secondary,
      success: success,
      warning: warning,
    },
  ];
}

module.exports = splitStateClassName;
//# sourceMappingURL=splitStateClassName.js.map

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('../_virtual/_tslib.js');
var React = require('react');
var reactUiCore = require('@appbuckets/react-ui-core');
var getSharedClassNames = require('./getSharedClassNames.js');
var splitStateClassName = require('./splitStateClassName.js');
var getFontawesomeIconClassName = require('./getFontawesomeIconClassName.js');

/**
 * Export a function to use the correct
 * element type, wrapped by a react useMemo
 * hook function
 */
function useElementType(Component, props, getDefault) {
  var _a;
  return React.useMemo(
    function () {
      return reactUiCore.getElementType(Component, props, getDefault);
    },
    // eslint-disable-next-line
    [
      (_a = Component.defaultProps) === null || _a === void 0 ? void 0 : _a.as,
      props.as,
      props.href,
      getDefault,
    ]
  );
}
/**
 * Export a function to use the correct
 * shared className, wrapped by a react useMemo
 */
function useSharedClassName(props) {
  /** Extract Props used to build shared className string */
  var _a = props,
    as = _a.as,
    backgroundColor = _a.backgroundColor,
    className = _a.className,
    columnsAlign = _a.columnsAlign,
    display = _a.display,
    fontWeight = _a.fontWeight,
    width = _a.width,
    offsetBy = _a.offsetBy,
    size = _a.size,
    textAlign = _a.textAlign,
    textColor = _a.textColor,
    verticalAlign = _a.verticalAlign,
    withoutGap = _a.withoutGap,
    rest = _tslib.__rest(_a, [
      'as',
      'backgroundColor',
      'className',
      'columnsAlign',
      'display',
      'fontWeight',
      'width',
      'offsetBy',
      'size',
      'textAlign',
      'textColor',
      'verticalAlign',
      'withoutGap',
    ]);
  /** Use a memoized value to build classes */
  var classes = React.useMemo(
    function () {
      return getSharedClassNames({
        backgroundColor: backgroundColor,
        className: className,
        columnsAlign: columnsAlign,
        display: display,
        fontWeight: fontWeight,
        width: width,
        offsetBy: offsetBy,
        size: size,
        textAlign: textAlign,
        textColor: textColor,
        verticalAlign: verticalAlign,
        withoutGap: withoutGap,
      }).className;
    },
    [
      backgroundColor,
      className,
      columnsAlign,
      display,
      fontWeight,
      width,
      offsetBy,
      size,
      textAlign,
      textColor,
      verticalAlign,
      withoutGap,
    ]
  );
  /** Return className and rest props */
  return { className: classes, rest: rest };
}
/**
 * Export a function to split the state className
 * from component Props
 */
function useSplitStateClassName(props) {
  var appearance = props.appearance,
    danger = props.danger,
    info = props.info,
    primary = props.primary,
    secondary = props.secondary,
    success = props.success,
    warning = props.warning,
    rest = _tslib.__rest(props, [
      'appearance',
      'danger',
      'info',
      'primary',
      'secondary',
      'success',
      'warning',
    ]);
  /** Use a memoized value to build classes */
  var _a = React.useMemo(
      function () {
        return splitStateClassName({
          appearance: appearance,
          danger: danger,
          info: info,
          primary: primary,
          secondary: secondary,
          success: success,
          warning: warning,
        });
      },
      [appearance, danger, info, primary, secondary, success, warning]
    ),
    classes = _a[0],
    state = _a[2];
  return [classes, rest, state];
}
/**
 * Export a memoized function to get the right fontawesome class based on name and iconStyle
 */
function useFontawesomeIcon(name, iconStyle) {
  return React.useMemo(
    function () {
      return getFontawesomeIconClassName(name, iconStyle);
    },
    [name, iconStyle]
  );
}

exports.useElementType = useElementType;
exports.useFontawesomeIcon = useFontawesomeIcon;
exports.useSharedClassName = useSharedClassName;
exports.useSplitStateClassName = useSplitStateClassName;
//# sourceMappingURL=customHook.js.map

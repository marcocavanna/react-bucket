'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
require('../Button/ButtonGroup.js');
var Header = require('../Header/Header.js');
var Button = require('../Button/Button.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var EmptyContent = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    button = _b.button,
    header = _b.header,
    icon = _b.icon,
    rest = _tslib.__rest(_b, [
      'children',
      'content',
      'button',
      'header',
      'icon',
    ]);
  var classes = clsx__default['default']('empty', className);
  var ElementType = customHook.useElementType(EmptyContent, props);
  var buttonElement = React.useMemo(
    function () {
      return Button.create(button, { autoGenerateKey: false });
    },
    [button]
  );
  var headerElement = React.useMemo(
    function () {
      return (
        (header || content || icon) &&
        Header.create(
          {
            content: header,
            subheader: content,
            icon: icon,
          },
          {
            autoGenerateKey: false,
            overrideProps: {
              textAlign: 'center',
            },
          }
        )
      );
    },
    [header, content, icon]
  );
  if (!reactUiCore.childrenUtils.isNil(children)) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      children
    );
  }
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    headerElement,
    buttonElement
  );
};
EmptyContent.displayName = 'EmptyContent';
EmptyContent.create = reactUiCore.createShorthandFactory(
  EmptyContent,
  function (header) {
    return { header: header };
  }
);

module.exports = EmptyContent;
//# sourceMappingURL=EmptyContent.js.map

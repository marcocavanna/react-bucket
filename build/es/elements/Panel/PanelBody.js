'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
require('../Button/ButtonGroup.js');
var Button = require('../Button/Button.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var PanelBody = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    fab = _b.fab,
    rest = _tslib.__rest(_b, ['children', 'content', 'fab']);
  var ElementType = customHook.useElementType(PanelBody, props);
  var classes = clsx__default['default'](
    'body',
    Array.isArray(fab) && !!fab.length && 'with-fab',
    className
  );
  /** Build Fab Buttons */
  var fabButtons = React.useMemo(
    function () {
      return Array.isArray(fab)
        ? fab.map(function (buttonProps) {
            return Button.create(buttonProps, {
              autoGenerateKey: true,
              overrideProps: { fab: true },
            });
          })
        : [];
    },
    [fab]
  );
  var fabsElement =
    !!fabButtons.length &&
    React.createElement('div', { className: 'fabs' }, fabButtons);
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    reactUiCore.childrenUtils.isNil(children) ? content : children,
    fabsElement
  );
};
PanelBody.displayName = 'PanelBody';
PanelBody.create = reactUiCore.createShorthandFactory(PanelBody, function (
  content
) {
  return { content: content };
});

module.exports = PanelBody;
//# sourceMappingURL=PanelBody.js.map

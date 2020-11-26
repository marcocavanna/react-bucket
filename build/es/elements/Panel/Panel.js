'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Loader = require('../Loader/Loader.js');
var PanelHeader = require('./PanelHeader.js');
var PanelBody = require('./PanelBody.js');
var PanelFooter = require('./PanelFooter.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Panel = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    fab = _b.fab,
    footer = _b.footer,
    disabled = _b.disabled,
    loading = _b.loading,
    header = _b.header,
    solid = _b.solid,
    rawRest = _tslib.__rest(_b, [
      'children',
      'content',
      'fab',
      'footer',
      'disabled',
      'loading',
      'header',
      'solid',
    ]);
  var ElementType = customHook.useElementType(Panel, props);
  var _c = customHook.useSplitStateClassName(rawRest),
    stateClasses = _c[0],
    rest = _c[1];
  var classes = clsx__default['default'](
    {
      solid: solid,
      disabled: disabled || loading,
      loading: loading,
    },
    'panel',
    className,
    stateClasses
  );
  /** Use shorthand to build panel elements */
  var loaderElement = React.useMemo(
    function () {
      return (
        loading && Loader.create({ size: 'big' }, { autoGenerateKey: false })
      );
    },
    [loading]
  );
  var headerElement = React.useMemo(
    function () {
      return PanelHeader.create(header, { autoGenerateKey: false });
    },
    [header]
  );
  var footerElement = React.useMemo(
    function () {
      return PanelFooter.create(footer, { autoGenerateKey: false });
    },
    [footer]
  );
  /** If children exists, render them */
  if (!reactUiCore.childrenUtils.isNil(children)) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      children
    );
  }
  var bodyContent = reactUiCore.childrenUtils.isNil(children)
    ? content
    : children;
  /** Return the Panel */
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    loaderElement,
    headerElement,
    bodyContent && React.createElement(PanelBody, { fab: fab }, bodyContent),
    footerElement
  );
};
Panel.displayName = 'Panel';
Panel.create = reactUiCore.createShorthandFactory(Panel, function (content) {
  return { content: content };
});
Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

module.exports = Panel;
//# sourceMappingURL=Panel.js.map

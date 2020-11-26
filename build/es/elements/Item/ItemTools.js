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
var ItemTools = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    disabled = _b.disabled,
    tools = _b.tools,
    rest = _tslib.__rest(_b, ['children', 'content', 'disabled', 'tools']);
  /** Get the component element type */
  var ElementType = customHook.useElementType(ItemTools, props);
  /** Build the element class list */
  var classes = clsx__default['default']('tools', className);
  /** Render Item Tools */
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    tools &&
      tools.map(function (tool) {
        return Button.create(tool, {
          autoGenerateKey: false,
          defaultProps: {
            disabled: disabled,
            flat: true,
          },
        });
      })
  );
};
ItemTools.displayName = 'ItemTools';
ItemTools.create = reactUiCore.createShorthandFactory(ItemTools, function (
  tools
) {
  return { tools: tools };
});

module.exports = ItemTools;
//# sourceMappingURL=ItemTools.js.map

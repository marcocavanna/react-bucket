'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var Loader = require('../Loader/Loader.js');
var ItemHeader = require('./ItemHeader.js');
var ItemMeta = require('./ItemMeta.js');
var ItemText = require('./ItemText.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var ItemContent = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    children = _b.children,
    content = _b.content,
    header = _b.header,
    loading = _b.loading,
    meta = _b.meta,
    rest = _tslib.__rest(_b, [
      'children',
      'content',
      'header',
      'loading',
      'meta',
    ]);
  /** Get the component element type */
  var ElementType = customHook.useElementType(ItemContent, props);
  /** Build the element class list */
  var classes = clsx__default['default']('content', className);
  var hasChildren = !reactUiCore.childrenUtils.isNil(children);
  // ----
  // Define Component Memoized Element
  // ----
  var loaderElement = React.useMemo(
    function () {
      return (
        loading &&
        Loader.create(
          typeof loading !== 'boolean'
            ? loading
            : { type: 'indeterminate bar' },
          {
            autoGenerateKey: false,
            defaultProps: {
              primary: true,
              size: 'big',
              type: 'indeterminate bar',
            },
            overrideProps: {
              active: true,
            },
          }
        )
      );
    },
    [loading]
  );
  var headerElement = React.useMemo(
    function () {
      return (
        !hasChildren &&
        ItemHeader.create(header, {
          autoGenerateKey: false,
        })
      );
    },
    [hasChildren, header]
  );
  var textOrLoaderElement = React.useMemo(
    function () {
      if (hasChildren) {
        return null;
      }
      if (loading) {
        return loaderElement;
      }
      return ItemText.create(content, {
        autoGenerateKey: false,
      });
    },
    [hasChildren, content, loading, loaderElement]
  );
  var metaElement = React.useMemo(
    function () {
      return (
        !hasChildren &&
        !loading &&
        ItemMeta.create(meta, {
          autoGenerateKey: false,
        })
      );
    },
    [hasChildren, meta, loading]
  );
  // ----
  // Component render with declared children
  // ----
  if (hasChildren) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      children
    );
  }
  // ----
  // Component render with shorthand
  // ----
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    headerElement,
    textOrLoaderElement,
    metaElement
  );
};
ItemContent.displayName = 'ItemContent';
ItemContent.Header = ItemHeader;
ItemContent.Text = ItemText;
ItemContent.Meta = ItemMeta;
ItemContent.create = reactUiCore.createShorthandFactory(ItemContent, function (
  content
) {
  return { content: content };
});

module.exports = ItemContent;
//# sourceMappingURL=ItemContent.js.map

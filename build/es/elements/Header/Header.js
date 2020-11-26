'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var getSharedClassNames = require('../../lib/getSharedClassNames.js');
require('tiny-invariant');
var Icon = require('../Icon/Icon.js');
var HeaderContent = require('./HeaderContent.js');
var HeaderSubheader = require('./HeaderSubheader.js');
var Button = require('../Button/Button.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Header = function (props) {
  var _a = getSharedClassNames(props),
    className = _a.className,
    _b = _a.rest,
    actions = _b.actions,
    children = _b.children,
    content = _b.content,
    disabled = _b.disabled,
    divided = _b.divided,
    subheader = _b.subheader,
    icon = _b.icon,
    rest = _tslib.__rest(_b, [
      'actions',
      'children',
      'content',
      'disabled',
      'divided',
      'subheader',
      'icon',
    ]);
  var ElementType = reactUiCore.getElementType(Header, props);
  var classes = clsx__default['default'](
    {
      disabled: disabled,
      divided: divided,
      'with-icon': icon,
      'with-actions': Array.isArray(actions),
    },
    'header',
    className
  );
  var hasChildren = !reactUiCore.childrenUtils.isNil(children);
  var contentElement = React.useMemo(
    function () {
      return (
        !hasChildren &&
        HeaderContent.create(content, { autoGenerateKey: false })
      );
    },
    [hasChildren, content]
  );
  var subheaderElement = React.useMemo(
    function () {
      return (
        !hasChildren &&
        HeaderSubheader.create(subheader, { autoGenerateKey: false })
      );
    },
    [hasChildren, subheader]
  );
  var iconElement = React.useMemo(
    function () {
      return Icon.create(icon, { autoGenerateKey: false });
    },
    [icon]
  );
  var actionsElement = React.useMemo(
    function () {
      if (!Array.isArray(actions)) {
        return null;
      }
      return React.createElement(
        'div',
        { className: 'header-actions' },
        actions.map(function (action) {
          return Button.create(action, {
            autoGenerateKey: true,
            defaultProps: {
              className: 'action',
            },
          });
        })
      );
    },
    [actions]
  );
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    iconElement &&
      React.createElement('div', { className: 'header-icon' }, iconElement),
    React.createElement(
      'div',
      { className: 'header-content' },
      hasChildren
        ? children
        : React.createElement(
            React.Fragment,
            null,
            contentElement,
            subheaderElement
          )
    ),
    actionsElement
  );
};
Header.Content = HeaderContent;
Header.Subheader = HeaderSubheader;
Header.displayName = 'Header';
Header.create = reactUiCore.createShorthandFactory(Header, function (content) {
  return { content: content };
});

module.exports = Header;
//# sourceMappingURL=Header.js.map

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('../../../_virtual/_tslib.js');
var React = require('react');
require('@appbuckets/react-ui-core');

/**
 * Return memoized PortalProps using user defined portal props and
 * some other props value
 * @param portalProps User defined PortalProps
 * @param rest All PopupProps
 */
function usePortalProps(portalProps, rest) {
  return React.useMemo(
    function () {
      var _a, _b, _c;
      var memoizedPortalProps = _tslib.__assign({}, portalProps);
      if (rest.hoverable) {
        memoizedPortalProps.closeOnPortalMouseLeave = true;
        memoizedPortalProps.mouseLeaveDelay = 300;
      }
      if (
        (_a = rest.openOn) === null || _a === void 0
          ? void 0
          : _a.includes('click')
      ) {
        memoizedPortalProps.openOnTriggerClick = true;
        memoizedPortalProps.closeOnTriggerClick = true;
        memoizedPortalProps.closeOnDocumentClick = true;
      }
      if (
        (_b = rest.openOn) === null || _b === void 0
          ? void 0
          : _b.includes('focus')
      ) {
        memoizedPortalProps.openOnTriggerFocus = true;
        memoizedPortalProps.closeOnTriggerBlur = true;
      }
      if (
        (_c = rest.openOn) === null || _c === void 0
          ? void 0
          : _c.includes('hover')
      ) {
        memoizedPortalProps.openOnTriggerMouseEnter = true;
        memoizedPortalProps.closeOnTriggerMouseLeave = true;
        memoizedPortalProps.mouseLeaveDelay = 70;
        memoizedPortalProps.mouseEnterDelay = 50;
      }
      return memoizedPortalProps;
    },
    [portalProps, rest.openOn, rest.hoverable]
  );
}
function usePopperPlacementMapping(position) {
  return React.useMemo(
    function () {
      if (!position) {
        return 'auto';
      }
      return {
        auto: 'auto',
        'top center': 'top',
        'top left': 'top-start',
        'top right': 'top-end',
        'bottom center': 'bottom',
        'bottom left': 'bottom-start',
        'bottom right': 'bottom-end',
        'right center': 'right',
        'left center': 'left',
      }[position];
    },
    [position]
  );
}
/**
 * Merge user defined modifiers with default popper modifiers
 *
 * @param defaultModifiers An array of default modifiers
 * @param userDefinedModifiers The user default modifiers
 * @param deps An array of dependencies to append to useMemo
 */
function usePopperModifiers(defaultModifiers, userDefinedModifiers, deps) {
  return React.useMemo(
    function () {
      if (!userDefinedModifiers) {
        return defaultModifiers;
      }
      var mergedPopperModifiers = _tslib.__spreadArrays(userDefinedModifiers);
      defaultModifiers.forEach(function (modifier) {
        if (
          !mergedPopperModifiers.find(function (userModifier) {
            return userModifier.name === modifier.name;
          })
        ) {
          mergedPopperModifiers.push(modifier);
        }
      });
      return mergedPopperModifiers;
    },
    [defaultModifiers, userDefinedModifiers, deps]
  );
}
var ReferenceProxy = /** @class */ (function () {
  function ReferenceProxy(ref) {
    this.ref = ref;
  }
  ReferenceProxy.prototype.getBoundingClientRect = function () {
    var _a, _b;
    return (_b =
      (_a = this.ref.current) === null || _a === void 0
        ? void 0
        : _a.getBoundingClientRect()) !== null && _b !== void 0
      ? _b
      : {};
  };
  Object.defineProperty(ReferenceProxy.prototype, 'clientWidth', {
    get: function () {
      return this.getBoundingClientRect().width;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(ReferenceProxy.prototype, 'clientHeight', {
    get: function () {
      return this.getBoundingClientRect().height;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(ReferenceProxy.prototype, 'parentNode', {
    get: function () {
      var _a;
      return (_a = this.ref.current) === null || _a === void 0
        ? void 0
        : _a.parentNode;
    },
    enumerable: false,
    configurable: true,
  });
  return ReferenceProxy;
})();

exports.usePopperModifiers = usePopperModifiers;
exports.usePopperPlacementMapping = usePopperPlacementMapping;
exports.usePortalProps = usePortalProps;
//# sourceMappingURL=internalHooks.js.map

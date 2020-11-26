'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var Loader = require('../../elements/Loader/Loader.js');
var BackdropInner = require('./BackdropInner.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Backdrop = function (props) {
  // ----
  // Get Backdrop Props
  // ----
  var /** Backdrop Props */
    className = props.className,
    closeOnBackdropClick = props.closeOnBackdropClick,
    children = props.children,
    content = props.content,
    loading = props.loading,
    loaderProps = props.loaderProps,
    page = props.page,
    visible = props.visible,
    /** Handled Portal Props */
    closeOnDocumentClick = props.closeOnDocumentClick,
    closeOnEscape = props.closeOnEscape,
    onClose = props.onClose,
    onMount = props.onMount,
    onOpen = props.onOpen,
    onUnmount = props.onUnmount,
    openOnTriggerClick = props.openOnTriggerClick,
    openOnTriggerFocus = props.openOnTriggerFocus,
    openOnTriggerMouseEnter = props.openOnTriggerMouseEnter,
    trigger = props.trigger,
    triggerRef = props.triggerRef,
    /** OnClick must be stripped to rest props passed down to Backdrop Inner */
    onClick = props.onClick,
    /** All other Props */
    rest = _tslib.__rest(props, [
      'className',
      'closeOnBackdropClick',
      'children',
      'content',
      'loading',
      'loaderProps',
      'page',
      'visible',
      'closeOnDocumentClick',
      'closeOnEscape',
      'onClose',
      'onMount',
      'onOpen',
      'onUnmount',
      'openOnTriggerClick',
      'openOnTriggerFocus',
      'openOnTriggerMouseEnter',
      'trigger',
      'triggerRef',
      'onClick',
    ]);
  /** Check if code is running on browser */
  var isBrowser = React.useMemo(function () {
    return reactUiCore.isBrowser();
  }, []);
  // ----
  // Define Backdrop Handlers
  // ----
  var handlePortalMount = function () {
    if (isBrowser) {
      document.body.classList.add('dimmable');
      document.body.classList.add('dimmed');
    }
    if (onMount) {
      onMount(null, props);
    }
  };
  var handlePortalUnmount = function () {
    if (isBrowser) {
      document.body.classList.remove('dimmable');
      document.body.classList.remove('dimmed');
    }
    if (onUnmount) {
      onUnmount(null, props);
    }
  };
  var handlePortalOpen = function (e) {
    if (onOpen) {
      onOpen(e, props);
    }
  };
  var handlePortalClose = function (e) {
    if (onClose) {
      onClose(e, props);
    }
  };
  var handleOutsideContentClick = function (e) {
    if (visible && closeOnBackdropClick) {
      handlePortalClose(e);
    }
  };
  // ----
  // Define Classes
  // ----
  var innerClasses = clsx__default['default'](className, {
    loading: loading,
    page: page,
  });
  // ----
  // Memoized Elements
  // ----
  var innerContent = React.createElement(
    BackdropInner,
    _tslib.__assign({}, rest, {
      className: innerClasses,
      visible: visible,
      onClickOutside: handleOutsideContentClick,
    }),
    loading
      ? Loader.create(
          _tslib.__assign(
            { appearance: 'white', size: 'big', centered: true },
            loaderProps
          ),
          { autoGenerateKey: false }
        )
      : reactUiCore.childrenUtils.isNil(children)
      ? content
      : children
  );
  /** Return the Dimmer */
  if (page) {
    return React.createElement(
      reactUiCore.Portal,
      {
        closeOnEscape: closeOnEscape,
        closeOnDocumentClick: closeOnDocumentClick,
        open: visible,
        openOnTriggerClick: openOnTriggerClick,
        openOnTriggerMouseEnter: openOnTriggerMouseEnter,
        openOnTriggerFocus: openOnTriggerFocus,
        trigger: trigger,
        triggerRef: triggerRef,
        onClose: handlePortalClose,
        onOpen: handlePortalOpen,
        onMount: handlePortalMount,
        onUnmount: handlePortalUnmount,
      },
      innerContent
    );
  }
  /** Else, return the Backdrop Inner Content */
  return innerContent;
};
/** Properly set the Display Name */
Backdrop.displayName = 'Backdrop';
/** Append Child Component */
Backdrop.Inner = BackdropInner;
/** Backdrop could be created using shorthand */
Backdrop.create = reactUiCore.createShorthandFactory(Backdrop, function (
  content
) {
  return { content: content };
});

module.exports = Backdrop;
//# sourceMappingURL=Backdrop.js.map

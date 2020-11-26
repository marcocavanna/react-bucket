'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
var reactUiCore = require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
require('../../elements/Button/ButtonGroup.js');
var Icon = require('../../elements/Icon/Icon.js');
var Button = require('../../elements/Button/Button.js');
var useAutoControlledValue = require('../../hooks/useAutoControlledValue.js');
var Backdrop = require('../Backdrop/Backdrop.js');
var Modal_context = require('./Modal.context.js');
var ModalActions = require('./ModalActions.js');
var ModalContent = require('./ModalContent.js');
var ModalHeader = require('./ModalHeader.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Modal = function (props) {
  // ----
  // Get Modal Props
  // ----
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    /** Modal Props */
    actions = _b.actions,
    basic = _b.basic,
    children = _b.children,
    closeIcon = _b.closeIcon,
    closeOnBackdropClick = _b.closeOnBackdropClick,
    content = _b.content,
    header = _b.header,
    icon = _b.icon,
    userDefinedMountNode = _b.mountNode,
    size = _b.size,
    /** Modal handlers */
    onActionClick = _b.onActionClick,
    onClose = _b.onClose,
    onOpen = _b.onOpen,
    /** Modal state Prop */
    defaultOpen = _b.defaultOpen,
    openProp = _b.open,
    /** Handled Backdrop Props */
    loading = _b.loading,
    loaderProps = _b.loaderProps,
    /** Handled Portal Props */
    closeOnDocumentClick = _b.closeOnDocumentClick,
    closeOnEscape = _b.closeOnEscape,
    openOnTriggerClick = _b.openOnTriggerClick,
    openOnTriggerFocus = _b.openOnTriggerFocus,
    openOnTriggerMouseEnter = _b.openOnTriggerMouseEnter,
    trigger = _b.trigger,
    triggerRef = _b.triggerRef,
    /** All other Props */
    rest = _tslib.__rest(_b, [
      'actions',
      'basic',
      'children',
      'closeIcon',
      'closeOnBackdropClick',
      'content',
      'header',
      'icon',
      'mountNode',
      'size',
      'onActionClick',
      'onClose',
      'onOpen',
      'defaultOpen',
      'open',
      'loading',
      'loaderProps',
      'closeOnDocumentClick',
      'closeOnEscape',
      'openOnTriggerClick',
      'openOnTriggerFocus',
      'openOnTriggerMouseEnter',
      'trigger',
      'triggerRef',
    ]);
  // ----
  // Init Modal Internal State
  // ----
  /** Init the AutoControlled open state */
  var _c = useAutoControlledValue.useAutoControlledValue(false, {
      prop: openProp,
      defaultProp: defaultOpen,
    }),
    open = _c[0],
    trySetOpen = _c[1];
  /** Get the component element type */
  var ElementType = customHook.useElementType(Modal, props);
  /** Check if in this render modal has children */
  var hasChildren = !reactUiCore.childrenUtils.isNil(children);
  // ----
  // Define Modal Handlers
  // ----
  var handleModalClose = function (e) {
    /** Call User Handler if Exists */
    if (onClose) {
      onClose(e, props);
    }
    /** Try to close the modal */
    trySetOpen(false);
  };
  var handleModalOpen = function (e) {
    /** Call User Handler if Exists */
    if (onOpen) {
      onOpen(e, props);
    }
    /** Try to open the modal */
    trySetOpen(true);
  };
  // ----
  // Build Component Classes
  // ----
  var contentClasses = clsx__default['default'](
    'modal',
    size,
    { basic: basic },
    icon && 'with-icon',
    className
  );
  var mountNodeClasses = clsx__default['default']('dimmable', open && 'dimmed');
  // ----
  // Memoized Elements
  // ----
  var modalIconElement = React.useMemo(
    function () {
      return (
        icon &&
        Icon.create(icon, {
          autoGenerateKey: false,
          overrideProps: {
            solid: 'inverted circle',
          },
        })
      );
    },
    [icon]
  );
  var closeIconElement =
    closeIcon &&
    Button.create(
      {
        icon: closeIcon,
        flat: true,
        appearance: 'white shade',
      },
      {
        autoGenerateKey: false,
        defaultProps: { className: 'close' },
        overrideProps: function (predefinedProps) {
          return {
            onClick: function (e) {
              /** Call original user defined handler on icon */
              if (predefinedProps.onClick) {
                predefinedProps.onClick(e, predefinedProps);
              }
              /** Try to close the Modal */
              handleModalClose(e);
            },
          };
        },
      }
    );
  var modalHeaderElement = React.useMemo(
    function () {
      /** Set empty component if is closed */
      if (!open || !header) {
        return null;
      }
      /** Create a new Modal Header using Shorthand Factory */
      return ModalHeader.create(header, { autoGenerateKey: false });
    },
    [open, header]
  );
  var modalActionsElement = React.useMemo(
    function () {
      /** Set empty component if is closed */
      if (hasChildren || !open || !actions) {
        return null;
      }
      /** Create modal action element using Shorthand Factory */
      return ModalActions.create(actions, {
        autoGenerateKey: false,
        overrideProps: function (predefinedProps) {
          return {
            onActionClick: function (e, buttonProps) {
              /** Call predefined on Action Click function */
              if (predefinedProps.onActionClick) {
                predefinedProps.onActionClick(e, buttonProps);
              }
              /** Call modal action click if exists */
              if (onActionClick) {
                onActionClick(e, buttonProps);
              }
            },
          };
        },
      });
    },
    [hasChildren, open, actions, onActionClick]
  );
  // ----
  // Init an internal function to build Modal Content
  // ----
  var renderModalContent = function () {
    return React.createElement(
      Modal_context.ModalProvider,
      { value: { closeModal: handleModalClose } },
      React.createElement(
        ElementType,
        _tslib.__assign({}, rest, { className: contentClasses }),
        React.createElement(reactUiCore.MountNode, {
          className: mountNodeClasses,
          node:
            userDefinedMountNode !== null && userDefinedMountNode !== void 0
              ? userDefinedMountNode
              : document.body,
        }),
        modalIconElement,
        closeIconElement,
        modalHeaderElement,
        !hasChildren
          ? React.createElement(
              React.Fragment,
              null,
              ModalContent.create(content, { autoGenerateKey: false }),
              modalActionsElement
            )
          : typeof children === 'function'
          ? children({ closeModal: handleModalClose })
          : children
      )
    );
  };
  // ----
  // Render the Component
  // ----
  return React.createElement(
    Backdrop,
    {
      page: true,
      animated: true,
      className: 'modals',
      visible: open,
      closeOnBackdropClick: closeOnBackdropClick,
      closeOnDocumentClick: closeOnDocumentClick,
      closeOnEscape: closeOnEscape,
      openOnTriggerClick: openOnTriggerClick,
      openOnTriggerMouseEnter: openOnTriggerMouseEnter,
      openOnTriggerFocus: openOnTriggerFocus,
      trigger: trigger,
      triggerRef: triggerRef,
      verticalAlign: 'on top',
      loading: loading,
      loaderProps: loaderProps,
      onClose: handleModalClose,
      onOpen: handleModalOpen,
    },
    renderModalContent()
  );
};
Modal.displayName = 'Modal';
Modal.defaultProps = {
  closeIcon: 'times',
  closeOnDocumentClick: false,
  closeOnBackdropClick: true,
};
Modal.Actions = ModalActions;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;

module.exports = Modal;
//# sourceMappingURL=Modal.js.map

import React, { cloneElement, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import EventStack from '@semantic-ui-react/event-stack';
import keyboardKey from 'keyboard-key';
import _ from 'lodash';

import {
  AutoControlledComponent as Component,
  doesNodeContainClick,
  handleRef
} from '../../lib';

import Ref from '../Ref';
import PortalInner from './PortalInner';

/**
 * A component that allows you to render children outside their parent.
 * @see Modal
 * @see Popup
 * @see Dimmer
 * @see Confirm
 */
// eslint-disable-next-line react/require-optimization
class Portal extends Component {
  static propTypes = {
    /** Primary content. */
    children: PropTypes.node.isRequired,

    /** Controls whether or not the portal should close when the document is clicked. */
    closeOnDocumentClick: PropTypes.bool,

    /** Controls whether or not the portal should close when escape is pressed is displayed. */
    closeOnEscape: PropTypes.bool,

    /**
     * Controls whether or not the portal should close when mousing out of the portal.
     * NOTE: This will prevent `closeOnTriggerMouseLeave` when mousing over the
     * gap from the trigger to the portal.
     */
    closeOnPortalMouseLeave: PropTypes.bool,

    /** Controls whether or not the portal should close on blur of the trigger. */
    closeOnTriggerBlur: PropTypes.bool,

    /** Controls whether or not the portal should close on click of the trigger. */
    closeOnTriggerClick: PropTypes.bool,

    /** Controls whether or not the portal should close when mousing out of the trigger. */
    closeOnTriggerMouseLeave: PropTypes.bool,

    /** Initial value of open. */
    // eslint-disable-next-line react/no-unused-prop-types
    defaultOpen: PropTypes.bool,

    /** Event pool namespace that is used to handle component events */
    eventPool: PropTypes.string,

    /** The node where the portal should mount. */
    mountNode: PropTypes.any,

    /** Milliseconds to wait before opening on mouse over */
    mouseEnterDelay: PropTypes.number,

    /** Milliseconds to wait before closing on mouse leave */
    mouseLeaveDelay: PropTypes.number,

    /**
     * Called when a close event happens
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClose: PropTypes.func,

    /**
     * Called when the portal is mounted on the DOM.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    // eslint-disable-next-line react/no-unused-prop-types
    onMount: PropTypes.func,

    /**
     * Called when an open event happens
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onOpen: PropTypes.func,

    /** On Portal Outside Click */
    // eslint-disable-next-line react/no-unused-prop-types
    onOutsideClick: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    // eslint-disable-next-line react/no-unused-prop-types
    onUnmount: PropTypes.func,

    /** Controls whether or not the portal is displayed. */
    // eslint-disable-next-line react/no-unused-prop-types
    open: PropTypes.bool,

    /** Controls whether or not the portal should open when the trigger is clicked. */
    openOnTriggerClick: PropTypes.bool,

    /** Controls whether or not the portal should open on focus of the trigger. */
    openOnTriggerFocus: PropTypes.bool,

    /** Controls whether or not the portal should open when mousing over the trigger. */
    openOnTriggerMouseEnter: PropTypes.bool,

    /** Element to be rendered in-place where the portal is defined. */
    trigger: PropTypes.node,

    /** Called with a ref to the trigger node. */
    triggerRef: PropTypes.any
  }

  static defaultProps = {
    closeOnDocumentClick : true,
    closeOnEscape        : true,
    eventPool            : 'default',
    openOnTriggerClick   : true
  }

  static autoControlledProps = ['open']

  static Inner = PortalInner

  contentRef = createRef()

  triggerRef = createRef()

  latestDocumentMouseDownEvent = null

  componentWillUnmount() {
    // Clean up timers
    clearTimeout(this.mouseEnterTimer);
    clearTimeout(this.mouseLeaveTimer);
  }

  // ----------------------------------------
  // Document Event Handlers
  // ----------------------------------------

  onDocumentMouseDown = (e) => {
    this.latestDocumentMouseDownEvent = e;
  }

  onDocumentClick = (e) => {
    const { closeOnDocumentClick } = this.props;
    const currentMouseDownEvent = this.latestDocumentMouseDownEvent;
    this.latestDocumentMouseDownEvent = null;

    if (
      // no portal
      !this.contentRef.current
      // event happened in trigger (delegate to trigger handlers)
      || doesNodeContainClick(this.triggerRef.current, e)
      // event originated in the portal but was ended outside
      || (currentMouseDownEvent
        && doesNodeContainClick(this.contentRef.current, currentMouseDownEvent))
      // event happened in the portal
      || doesNodeContainClick(this.contentRef.current, e)
    ) {
      return;
    } // ignore the click

    _.invoke(this.props, 'onOutsideClick', e, this.props);

    if (closeOnDocumentClick) {
      this.close(e);
    }
  }

  onDocumentKeyDown = (e) => {
    const { closeOnEscape } = this.props;

    if (!closeOnEscape) return;
    if (keyboardKey.getCode(e) !== keyboardKey.Escape) return;

    this.close(e);
  }

  // ----------------------------------------
  // Component Event Handlers
  // ----------------------------------------

  onPortalMouseLeact = (e) => {
    const { closeOnPortalMouseLeave, mouseLeaveDelay } = this.props;

    if (!closeOnPortalMouseLeave) return;

    // Do not close the portal when 'mouseleave' is triggered by children
    if (e.target !== this.contentRef.current) return;

    this.mouseLeaveTimer = this.closeWithTimeout(e, mouseLeaveDelay);
  }

  onPortalMouseEnter = () => {
    // In order to enable mousing from the trigger to the portal, we need to
    // clear the mouseleave timer that was set when leaving the trigger.
    const { closeOnPortalMouseLeave } = this.props;

    if (!closeOnPortalMouseLeave) return;

    clearTimeout(this.mouseLeaveTimer);
  }

  handleTriggerBlur = (e, ...rest) => {
    const { trigger, closeOnTriggerBlur } = this.props;

    // Call original event handler
    _.invoke(trigger, 'props.onBlur', e, ...rest);

    // IE 11 doesn't work with relatedTarget in blur events
    const target = e.relatedTarget || document.activeElement;
    // do not close if focus is given to the portal
    const didFocusPortal = _.invoke(this.contentRef.current, 'contains', target);

    if (!closeOnTriggerBlur || didFocusPortal) return;

    this.close(e);
  }

  handleTriggerClick = (e, ...rest) => {
    const { trigger, closeOnTriggerClick, openOnTriggerClick } = this.props;
    const { open } = this.state;

    e.stopPropagation();

    // Call original event handler
    _.invoke(trigger, 'props.onClick', e, ...rest);

    if (open && closeOnTriggerClick) {
      this.close(e);
    }
    else if (!open && openOnTriggerClick) {
      this.open(e);
    }
  }

  handleTriggerFocus = (e, ...rest) => {
    const { trigger, openOnTriggerFocus } = this.props;

    // Call original event handler
    _.invoke(trigger, 'props.onFocus', e, ...rest);

    if (!openOnTriggerFocus) return;

    this.open(e);
  }

  handleTriggerMouseLeave = (e, ...rest) => {
    clearTimeout(this.mouseEnterTimer);

    const { trigger, closeOnTriggerMouseLeave, mouseLeaveDelay } = this.props;

    // Call original event handler
    _.invoke(trigger, 'props.onMouseLeave', e, ...rest);

    if (!closeOnTriggerMouseLeave) return;

    this.mouseLeaveTimer = this.closeWithTimeout(e, mouseLeaveDelay);
  }

  handleTriggerMouseEnter = (e, ...rest) => {
    clearTimeout(this.mouseLeaveTimer);

    const { trigger, mouseEnterDelay, openOnTriggerMouseEnter } = this.props;

    // Call original event handler
    _.invoke(trigger, 'props.onMouseEnter', e, ...rest);


    if (!openOnTriggerMouseEnter) return;

    this.mouseEnterTimer = this.openWithTimeout(e, mouseEnterDelay);
  }

  // ----------------------------------------
  // Behavior
  // ----------------------------------------

  open = (e) => {
    const { onOpen } = this.props;
    if (onOpen) onOpen(e, this.props);

    this.trySetState({ open: true });
  }

  openWithTimeout = (e, delay) => {
    // React wipes the entire event object and suggests using e.persist() if
    // you need the event for async access. However, even with e.persist
    // certain required props (e.g. currentTarget) are null so we're forced to clone.
    const eventClone = { ...e };
    return setTimeout(() => this.open(eventClone), delay || 0);
  }

  close = (e) => {
    const { onClose } = this.props;
    if (onClose) onClose(e, this.props);

    this.trySetState({ open: false });
  }

  closeWithTimeout = (e, delay) => {
    // React wipes the entire event object and suggests using e.persist() if
    // you need the event for async access. However, even with e.persist
    // certain required props (e.g. currentTarget) are null so we're forced to clone.
    const eventClone = { ...e };
    return setTimeout(() => this.close(eventClone), delay || 0);
  }

  handleMount = () => _.invoke(this.props, 'onMount', null, this.props)

  handleUnmount = () => _.invoke(this.props, 'onUnmount', null, this.props)

  handleTriggerRef = (c) => {
    const { triggerRef } = this.props;

    this.triggerRef.current = c;
    handleRef(triggerRef, c);
  }

  render() {
    const { children, eventPool, mountNode, trigger } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        {open && (
          <Fragment>
            <PortalInner
              innerRef={this.contentRef}
              mountNode={mountNode}
              onMount={this.handleMount}
              onUnmount={this.handleUnmount}
            >
              {children}
            </PortalInner>

            <EventStack
              name='mouseleave'
              on={this.onPortalMouseLeact}
              pool={eventPool}
              target={this.contentRef}
            />
            <EventStack
              name='mouseenter'
              on={this.onPortalMouseEnter}
              pool={eventPool}
              target={this.contentRef}
            />
            <EventStack name='mousedown' on={this.onDocumentMouseDown} pool={eventPool} />
            <EventStack name='click' on={this.onDocumentClick} pool={eventPool} />
            <EventStack name='keydown' on={this.onDocumentKeyDown} pool={eventPool} />
          </Fragment>
        )}
        {trigger && (
          // eslint-disable-next-line react/jsx-handler-names
          <Ref innerRef={this.handleTriggerRef}>
            {cloneElement(trigger, {
              onBlur       : this.handleTriggerBlur,
              onClick      : this.handleTriggerClick,
              onFocus      : this.handleTriggerFocus,
              onMouseLeave : this.handleTriggerMouseLeave,
              onMouseEnter : this.handleTriggerMouseEnter
            })}
          </Ref>
        )}
      </Fragment>
    );
  }
}

export default Portal;

import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import EventStack, { instance as eventStack } from '@semantic-ui-react/event-stack';

import _ from 'lodash';
import shallowEqual from 'shallowequal';
import { Popper } from 'react-popper';

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  classByKey,
  classByPattern
} from '../../lib';

import Portal from '../../addons/Portal';
import Ref from '../../addons/Ref';

import createReferenceProxy from './lib/createReferenceProxy';
import { positions, positionsMapping, placementMapping } from './lib/position';

import PopupContent from './PopupContent';
import PopupHeader from './PopupHeader';

class Popup extends PureComponent {

  static propTypes = {
    /** An Element used to render the Component */
    as: PropTypes.elementType,

    /** Basic Style */
    basic: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** User Defined Classes */
    className: PropTypes.string,

    /** Content Shorthand */
    content: PropTypes.node,

    /** Disabled State */
    disabled: PropTypes.bool,

    /** Header Shorthand */
    header: PropTypes.any,

    /** Hide on Close */
    hideOnScroll: PropTypes.bool,

    /** Not close popper on hover */
    hoverable: PropTypes.bool,

    /** Inverted Style */
    inverted: PropTypes.bool,

    /** Offset properties with units px, % %p, vw, vh */
    offset: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),

    /** Triggers to Open the Popup */
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['hover', 'click', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['hover', 'click', 'focus']))
    ]),

    /** onClose Handler */
    onClose: PropTypes.func,

    /** onMount Handler */
    onMount: PropTypes.func,

    /** onOpen Handler */
    onOpen: PropTypes.func,

    /** onUnmount Handler */
    onUnmount: PropTypes.func,

    /** A popup can have dependencies which update will schedule a position update. */
    popperDependencies: PropTypes.array,

    /** An object containing custom settings for the Popper.js modifiers. */
    popperModifiers: PropTypes.object,

    /** Position for the popover. */
    position: PropTypes.string,

    /** Size modifier */
    size: customPropTypes.size,

    /** User defined Style */
    style: PropTypes.object,

    /** Element to be rendered in-place where the popup is defined. */
    trigger: PropTypes.node
  }

  static defaultProps = {
    basic    : true,
    disabled : false,
    inverted : true,
    offset   : 0,
    on       : 'hover',
    position : 'top left'
  }

  static Content = PopupContent;

  static Header = PopupHeader;

  static getDerivedStateFromProps(props, state) {
    if (state.closed || state.disabled) return {};

    const unhandledProps = getUnhandledProps(Popup, props);

    const contentRestProps = _.reduce(
      unhandledProps,
      (acc, val, key) => {
        if (!_.includes(Portal.handledProps, key)) {
          acc[key] = val;
        }

        return acc;
      }
    );

    const portalRestProps = _.pick(unhandledProps, Portal.handledProps);

    return { contentRestProps, portalRestProps };
  }

  state = {};

  open = false;

  triggerRef = createRef();

  componentDidUpdate(prevProps) {
    const { popperDependencies } = this.props;
    const deepEqual = shallowEqual(popperDependencies, prevProps.popperDependencies);

    if (!deepEqual) {
      this.handleUpdate();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  getPortalProps = () => {
    const portalProps = {};

    const { on, hoverable } = this.props;

    const normalizedOn = _.isArray(on) ? on : [on];

    if (hoverable) {
      portalProps.closeOnPortalMouseLeave = true;
      portalProps.mouseLeaveDelay = 300;
    }

    if (_.includes(normalizedOn, 'click')) {
      portalProps.openOnTriggerClick = true;
      portalProps.closeOnTriggerClick = true;
      portalProps.closeOnDocumentClick = true;
    }

    if (_.includes(normalizedOn, 'focus')) {
      portalProps.openOnTriggerFocus = true;
      portalProps.closeOnTriggerBlur = true;
    }

    if (_.includes(normalizedOn, 'hover')) {
      portalProps.openOnTriggerMouseEnter = true;
      portalProps.closeOnTriggerMouseLeave = true;
      portalProps.mouseLeaveDelay = 70;
      portalProps.mouseEnterDelay = 50;
    }

    return portalProps;
  }

  hideOnScroll = (e) => {
    this.setState({ closed: true });

    eventStack.unsub('scroll', this.hideOnScroll, { target: window });

    this.timeoutId = setTimeout(() => {
      this.setState({ closed: false });
    }, 50);

    this.handleClose(e);
  }

  handleClose = e => _.invoke(this.props, 'onClose', e, this.props);

  handleOpen = e => _.invoke(this.props, 'onOpen', e, this.props);

  handlePortalMount = e => _.invoke(this.props, 'onMount', e, this.props);

  handlePortalUnmount = (e) => {
    this.positionUpdate = null;
    _.invoke(this.props, 'onUnmount', e, this.props);
  };

  handleUpdate = () => this.positionUpdate && this.positionUpdate();

  renderContent = ({
    placement : popperPlacement,
    ref       : popperRef,
    scheduleUpdate,
    style     : popperStyle
  }) => {

    const {
      basic,
      children,
      className,
      content,
      hideOnScroll,
      header,
      inverted,
      size,
      style
    } = this.props;

    const { contentRestProps } = this.state;

    this.positionUpdate = scheduleUpdate;

    const classes = cx(
      classByKey(basic, 'is-basic'),
      classByKey(inverted, 'is-inverted'),
      classByPattern(size, 'is-%value%'),
      classByPattern(placementMapping[popperPlacement], 'is-%value%'),
      'popup',
      'visible',
      className
    );

    const ElementType = getElementType(Popup, this.props);

    const styles = {
      left  : 'auto',
      right : 'auto',
      ...popperStyle,
      ...style
    };

    return (
      <Ref innerRef={popperRef}>
        <ElementType {...contentRestProps} className={classes} style={styles}>
          <div className='popup-content'>
            {childrenUtils.isNil(children)
              ? (
                <React.Fragment>
                  {PopupHeader.create(header, { autoGenerateKey: false })}
                  {PopupContent.create(content, { autoGenerateKey: false })}
                </React.Fragment>
              )
              : children}
            {hideOnScroll && <EventStack on={this.hideOnScroll} name='scroll' target='window' />}
          </div>
        </ElementType>
      </Ref>
    );

  }

  render() {

    const {
      disabled,
      offset,
      popperModifiers,
      position,
      trigger
    } = this.props;

    const {
      closed,
      portalRestProps
    } = this.state;

    if (closed || disabled) return trigger;

    const modifiers = _.merge(
      {
        arrow        : { enabled: false },
        keepTogether : { enabled: !!offset },
        offset       : { enabled: !!offset, offset }
      },
      popperModifiers
    );

    const referenceElement = createReferenceProxy(this.triggerRef);

    const mergedPortalProps = { ...this.getPortalProps(), ...portalRestProps };

    return (
      <Portal
        {...mergedPortalProps}
        trigger={trigger}
        triggerRef={this.triggerRef}
        onClose={this.handleClose}
        onMount={this.handlePortalMount}
        onOpen={this.handleOpen}
        onUnmount={this.handlePortalUnmount}
      >
        <Popper
          modifiers={modifiers}
          placement={positionsMapping[position]}
          referenceElement={referenceElement}
        >
          {this.renderContent}
        </Popper>
      </Portal>
    );

  }

}

export default Popup;

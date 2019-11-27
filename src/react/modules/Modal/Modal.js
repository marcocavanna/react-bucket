import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import shallowEqual from 'shallowequal';

import _ from 'lodash';

import { isBrowser } from '@appbuckets/rabbit';

import { instance as EventStack } from '@semantic-ui-react/event-stack';

import {
  AutoControlledComponent as Component,
  childrenUtils,
  customPropTypes,
  doesNodeContainClick,
  getElementType,
  getUnhandledProps,
  classByKey,
  classByPattern
} from '../../lib';

import Ref from '../../addons/Ref';
import MountNode from '../../addons/MountNode';
import Portal from '../../addons/Portal';

import Icon from '../../elements/Icon';

import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalActions from './ModalActions';

import { canFit, getLegacyStyles, isLegacy } from './utils';

// eslint-disable-next-line react/require-optimization
class Modal extends Component {

  static propTypes = {
    /** Shorthand for Modal.Actions */
    actions: PropTypes.array,

    /** An element used to render the Component */
    as: PropTypes.elementType,

    /** Autosized Width */
    autosized: PropTypes.bool,

    /** Reduce Modal graphic */
    basic: PropTypes.bool,

    /** Show a modal centered */
    centered: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional user defined classes */
    className: PropTypes.string,

    /** Shorthand for close icon */
    closeIcon: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
      PropTypes.bool,
      customPropTypes.fontAwesome
    ]),

    /** Set if a modal must close on dimmer click */
    closeOnDimmerClick: PropTypes.bool,

    /** Set if modal must close on document click */
    closeOnDocumentClick: PropTypes.bool,

    /** Content Shorthand */
    content: PropTypes.node,

    /** Initial open value */
    defaultOpen: PropTypes.bool,

    /** Set dimmer properties */
    dimmer: PropTypes.oneOf([true, 'inverted', 'blurring']),

    /** Event Pool namespace */
    eventPool: PropTypes.string,

    /** Modal header shorthand */
    header: PropTypes.node,

    /** Node where to mount Modal */
    mountNode: PropTypes.any,

    /** On Action click function handler */
    onActionClick: PropTypes.func,

    /** On Close Function handler */
    onClose: PropTypes.func,

    /** On Mount Function handler */
    onMount: PropTypes.func,

    /** On Open Function handler */
    onOpen: PropTypes.func,

    /** On Unmount function handler */
    onUnmount: PropTypes.func,

    /** Set if the modal is opened or not */
    open: PropTypes.bool,

    /** Size Modal Props */
    size: PropTypes.oneOf(['small', 'big']),

    /** Custom Style */
    style: PropTypes.object,

    /** The element that will trigger the Modal */
    trigger: PropTypes.node

  }

  static defaultProps = {
    centered             : true,
    closeOnDimmerClick   : true,
    closeOnDocumentClick : false,
    dimmer               : true,
    eventPool            : 'Modal'
  }

  static autoControlledProps = ['open']

  static Header = ModalHeader

  static Content = ModalContent

  static Actions = ModalActions

  legacy = isBrowser() && isLegacy()

  ref = React.createRef()

  dimmer = React.createRef()

  dimmerRef = React.createRef()

  latestDocumentMouseDownEvent = null


  // eslint-disable-next-line react/destructuring-assignment
  getMountNode = () => (isBrowser() ? this.props.mountNode || document.body : null)

  handleActionsOverrides = predefinedProps => ({
    onActionClick: (e, props) => {
      _.invoke(predefinedProps, 'onActionClick', e, props);
      _.invoke(this.props, 'onActionClick', e, this.props);

      this.handleClose(e);
    }
  })

  handleClose = (e) => {
    _.invoke(this.props, 'onClose', e, this.props);
    this.trySetState({ open: false });
  }

  handleDocumentMouseDown = (e) => {
    this.latestDocumentMouseDownEvent = e;
  }

  handleDocumentClick = (e) => {
    const { closeOnDimmerClick } = this.props;
    const currentDocumentMouseDownEvent = this.latestDocumentMouseDownEvent;
    this.latestDocumentMouseDownEvent = null;

    if (!closeOnDimmerClick
      || doesNodeContainClick(this.ref.current, currentDocumentMouseDownEvent)
      || doesNodeContainClick(this.ref.current, e)) {
      return;
    }

    _.invoke(this.props, 'onClose', e, this.props);
    this.trySetState({ open: false });
  }

  handleIconOverrides = predefinedProps => ({
    onClick: (e) => {
      _.invoke(predefinedProps, 'onClick', e);
      this.handleClose(e);
    }
  })

  handleOpen = (e) => {
    _.invoke(this.props, 'onOpen', e, this.props);
    this.trySetState({ open: true });
  }

  handlePortalMount = (e) => {
    const { eventPool } = this.props;

    this.setState({ scrolling: false });
    this.setPositionAndClassNames();

    EventStack.sub('mousedown', this.handleDocumentMouseDown, {
      pool   : eventPool,
      target : this.dimmerRef.current
    });

    EventStack.sub('click', this.handleDocumentClick, {
      pool   : eventPool,
      target : this.dimmerRef.current
    });

    _.invoke(this.props, 'onMount', e, this.props);
  }

  handlePortalUnmount = (e) => {
    const { eventPool } = this.props;

    cancelAnimationFrame(this.animationRequestId);

    EventStack.unsub('mousedown', this.handleDocumentMouseDown, {
      pool   : eventPool,
      target : this.dimmerRef.current
    });

    EventStack.unsub('click', this.handleDocumentClick, {
      pool   : eventPool,
      target : this.dimmerRef.current
    });

    _.invoke('onUnmount', e, this.props);
  }

  setDimmerNodeStyle = () => {
    const { current } = this.dimmerRef;

    if (current && current.style && current.style.display !== 'flex') {
      current.style.setProperty('display', 'flex', 'important');
    }
  }

  setPositionAndClassNames = () => {
    const { centered, dimmer } = this.props;
    const {
      legacyStyles: oldLegacyStyles,
      scrolling: oldScrolling,
      mountClasses: oldMountClasses
    } = this.state;

    let scrolling;
    const newState = {};

    if (this.ref.current) {
      const rect = this.ref.current.getBoundingClientRect();
      const isFitted = canFit(rect);

      scrolling = !isFitted;

      const legacyStyles = this.legacy ? getLegacyStyles(isFitted, centered, rect) : {};

      if (!shallowEqual(oldLegacyStyles, legacyStyles)) {
        newState.legacyStyles = legacyStyles;
      }

      if (oldScrolling !== scrolling) {
        newState.scrolling = scrolling;
      }
    }

    const classes = cx(
      classByKey(dimmer, 'dimmable dimmed'),
      classByKey(dimmer === 'blurring', 'has-blurred-dimmer'),
      classByKey(scrolling, 'is-scrolling')
    );

    if (oldMountClasses !== classes) {
      newState.mountClasses = classes;
    }

    if (!_.isEmpty(newState)) {
      this.setState(newState);
    }

    this.animationRequestId = requestAnimationFrame(this.setPositionAndClassNames);

    this.setDimmerNodeStyle();
  }

  renderContent = (rest) => {
    /** Get Content Props */
    const {
      actions,
      autosized,
      basic,
      children,
      className,
      closeIcon,
      content,
      header,
      mountNode,
      size,
      style
    } = this.props;

    const {
      legacyStyles,
      mountClasses,
      scrolling
    } = this.state;

    const classes = cx(
      'modal with-transition is-active',
      classByPattern(size, 'is-%value'),
      classByKey(basic, 'is-basic'),
      classByKey(this.legacy, 'is-legacy'),
      classByKey(scrolling, 'is-scrolling'),
      classByKey(autosized, 'is-autosized'),
      className
    );

    const ElementType = getElementType(Modal, this.props);

    const closeIconName = closeIcon === true ? 'times' : closeIcon;
    const closeIconElement = !!closeIcon && Icon
      .create(closeIconName, {
        overrideProps : this.handleIconOverrides,
        defaultProps  : { className: 'modal-close' }
      });

    return (
      <Ref innerRef={this.ref}>
        <ElementType {...rest} className={classes} style={{ ...legacyStyles, ...style }}>
          <MountNode className={mountClasses} node={mountNode} />

          {closeIconElement}

          {childrenUtils.isNil(children) ? (
            <React.Fragment>
              {ModalHeader.create(header, { autoGenerateKey: false })}
              {ModalContent.create(content, { autoGenerateKey: false })}
              {ModalActions.create(actions, { overrideProps: this.handleActionsOverrides })}
            </React.Fragment>
          ) : (
            typeof children === 'function'
              ? children({ closeModal: this.handleClose.bind(this) })
              : children
          )}
        </ElementType>
      </Ref>
    );

  }

  componentWillUnmount() {
    this.handlePortalUnmount();
  }

  render() {
    const { open } = this.state;
    const {
      centered,
      closeOnDocumentClick,
      dimmer,
      eventPool,
      trigger
    } = this.props;

    const mountNode = this.getMountNode();

    if (!isBrowser()) {
      return React.isValidElement(trigger) ? trigger : null;
    }

    const unhandled = getUnhandledProps(Modal, this.props);
    const portalPropNames = Portal.handledProps;

    const rest = _.reduce(
      unhandled,
      (acc, val, key) => {
        if (!_.includes(portalPropNames, key)) {
          acc[key] = val;
        }
        return acc;
      },
      {}
    );

    const portalProps = _.pick(unhandled, portalPropNames);

    const dimmerClasses = cx(
      'page modals dimmer with-transition is-active',
      classByKey(dimmer === 'inverted', 'is-inverted'),
      classByKey(!centered, 'is-top-aligned')
    );

    return (
      <Portal
        closeOnDocumentClick={closeOnDocumentClick}
        {...portalProps}
        trigger={trigger}
        eventPool={eventPool}
        mountNode={mountNode}
        open={open}
        onClose={this.handleClose}
        onMount={this.handlePortalMount}
        onOpen={this.handleOpen}
        onUnmount={this.handlePortalUnmount}
      >
        <div ref={this.dimmerRef} className={dimmerClasses}>
          {this.renderContent(rest)}
        </div>
      </Portal>
    );
  }

}

export default Modal;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { createPortal } from 'react-dom';

import {
  handleRef,
  isBrowser
} from '../../lib';

import Ref from '../Ref';

/**
 * An inner component that allows you to render children outside their parent.
 */
// eslint-disable-next-line react/require-optimization
class PortalInner extends Component {
  static propTypes = {
    /** Primary content. */
    children: PropTypes.node.isRequired,

    /** Called with a ref to the inner node. */
    innerRef: PropTypes.any,

    /** The node where the portal should mount. */
    mountNode: PropTypes.any,

    /**
     * Called when the portal is mounted on the DOM
     *
     * @param {null}
     * @param {object} data - All props.
     */
    // eslint-disable-next-line react/no-unused-prop-types
    onMount: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM
     *
     * @param {null}
     * @param {object} data - All props.
     */
    // eslint-disable-next-line react/no-unused-prop-types
    onUnmount: PropTypes.func
  }

  componentDidMount() {
    _.invoke(this.props, 'onMount', null, this.props);
  }

  componentWillUnmount() {
    _.invoke(this.props, 'onUnmount', null, this.props);
  }

  handleRef = (c) => {
    const { innerRef } = this.props;

    handleRef(innerRef, c);
  }

  render() {
    if (!isBrowser()) return null;
    const { children, mountNode = document.body } = this.props;

    // eslint-disable-next-line react/jsx-handler-names
    return createPortal(<Ref innerRef={this.handleRef}>{children}</Ref>, mountNode);
  }
}

export default PortalInner;

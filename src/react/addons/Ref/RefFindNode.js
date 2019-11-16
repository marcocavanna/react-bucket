import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import { handleRef } from '../../lib/refUtils';

export default class RefFindNode extends React.PureComponent {
  static propTypes = {
    /** Primary content. */
    children: PropTypes.element.isRequired,

    /**
     * Called when a child component will be mounted or updated.
     *
     * @param {HTMLElement} node - Referred node.
     */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }

  prevNode = null

  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    this.prevNode = findDOMNode(this);

    const { innerRef } = this.props;

    handleRef(innerRef, this.prevNode);
  }

  componentDidUpdate() {
    // eslint-disable-next-line react/no-find-dom-node
    const currentNode = findDOMNode(this);

    if (this.prevNode !== currentNode) {
      this.prevNode = currentNode;
      const { innerRef } = this.props;
      handleRef(innerRef, currentNode);
    }
  }

  componentWillUnmount() {
    const { innerRef } = this.props;
    handleRef(innerRef, null);
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

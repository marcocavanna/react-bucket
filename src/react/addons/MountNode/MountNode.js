import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  customPropTypes
} from '../../lib';

import getNodeRefFromProps from './lib/getNodeRefFromProps';
import handleClassNamesChange from './lib/handleClassNamesChange';
import NodeRegistry from './lib/NodeRegistry';

const nodeRegistry = new NodeRegistry();

export default class MountNode extends Component {

  static propTypes = {
    /** Additional User Defined classes */
    className: PropTypes.string,

    /** The DOM node where will apply classname, default is document.body */
    // eslint-disable-next-line react/no-unused-prop-types
    node: PropTypes.node
  }

  shouldComponentUpdate({ className: next }) {
    const { className: current } = this.props;

    return next !== current;
  }

  componentDidMount() {
    const ref = getNodeRefFromProps(this.props);

    nodeRegistry.add(ref, this);
    nodeRegistry.emit(ref, handleClassNamesChange);
  }

  componentDidUpdate() {
    const ref = getNodeRefFromProps(this.props);

    nodeRegistry.emit(ref, handleClassNamesChange);
  }

  componentWillUnmount() {
    const ref = getNodeRefFromProps(this.props);

    nodeRegistry.del(ref, this);
    nodeRegistry.emit(ref, handleClassNamesChange);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }

}

import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps
} from '../../lib';

import Ref from '../../addons/Ref';

import ScrollableContent from './ScrollableContent';

// eslint-disable-next-line react/require-optimization
class Scrollable extends React.Component {

  static Content = ScrollableContent

  static create = createShorthandFactory(Scrollable, content => ({ content }))

  static propTypes = {
    /** An element used to render the component */
    as: PropTypes.elementType,

    /** Primary Content */
    children: PropTypes.node,

    /** User defined classes */
    className: PropTypes.string,

    /** Content shorthand */
    content: PropTypes.node,

    /** Define scrollable element height */
    height: PropTypes.number,

    /** User defined style */
    style: PropTypes.object
  }

  static defaultProps = {
    height: 364
  }

  _couldScrollUp = false

  _couldScrollDown = false

  containerRef = createRef()

  render() {
    const {
      children,
      className,
      content,
      height,
      style: userStyle
    } = this.props;


    const classes = cx(
      'scrollable',
      className
    );

    const style = {
      ...(!_.isEmpty(userStyle) ? userStyle : {}),
      height
    };

    const rest = getUnhandledProps(Scrollable, this.props);
    const ElementType = getElementType(Scrollable, this.props);

    return (
      <Ref innerRef={this.containerRef}>
        <ElementType {...rest} className={classes} style={style}>
          {!childrenUtils.isNil(children) ? children : ScrollableContent.create(content)}
        </ElementType>
      </Ref>
    );
  }

}

export default Scrollable;

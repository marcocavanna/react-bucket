import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

import Ref from '../../addons/Ref';

import {
  childrenUtils,
  doesNodeContainClick,
  getElementType,
  getUnhandledProps,
  classByKey,
  classByPattern
} from '../../lib';

/**
 * An inner element for a Dimmer.
 */
export default class DimmerInner extends PureComponent {
  static propTypes = {
    /** An active dimmer will dim its parent container. */
    active: PropTypes.bool,

    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: PropTypes.node,

    /** A disabled dimmer cannot be activated */
    disabled: PropTypes.bool,

    /** A dimmer can be formatted to have its colors inverted. */
    inverted: PropTypes.bool,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Handles click outside Dimmer's content, but inside Dimmer area.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClickOutside: PropTypes.func,

    /** A dimmer can be formatted to be fixed to the page. */
    page: PropTypes.bool,

    /** A dimmer can be controlled with simple prop. */
    simple: PropTypes.bool,

    /** A dimmer can have its content top or bottom aligned. */
    verticalAlign: PropTypes.oneOf(['bottom', 'top'])
  }

  containerRef = createRef()

  contentRef = createRef()

  componentDidMount() {
    const { active } = this.props;

    this.toggleStyles(active);
  }

  componentDidUpdate(prevProps) {
    const { active: currentActive } = this.props;
    const { active: prevActive } = prevProps;

    if (prevActive !== currentActive) this.toggleStyles(currentActive);
  }

  handleClick = (e) => {
    const contentRef = this.contentRef.current;

    _.invoke(this.props, 'onClick', e, this.props);

    if (contentRef && (contentRef !== e.target && doesNodeContainClick(contentRef, e))) {
      return;
    }

    _.invoke(this.props, 'onClickOutside', e, this.props);
  }

  toggleStyles(active) {
    const containerRef = this.containerRef.current;

    if (!containerRef || !containerRef.style) return;
    if (active) {
      containerRef.style.setProperty('display', 'flex', 'important');
    }
    else {
      containerRef.style.removeProperty('display');
    }
  }

  render() {
    const {
      active,
      children,
      className,
      content,
      disabled,
      inverted,
      page,
      simple,
      verticalAlign
    } = this.props;

    const classes = cx(
      'ui',
      classByKey(active, 'is-active'),
      classByKey(disabled, 'is-disabled'),
      classByKey(inverted, 'is-inverted'),
      classByKey(page, 'is-full-page'),
      classByKey(simple, 'is-simple'),
      classByPattern(verticalAlign, 'is-%value%-aligned'),
      'dimmer',
      className,
    );

    const rest = getUnhandledProps(DimmerInner, this.props);
    const ElementType = getElementType(DimmerInner, this.props);

    const childrenContent = childrenUtils.isNil(children) ? content : children;

    return (
      <Ref innerRef={this.containerRef}>
        <ElementType {...rest} className={classes} onClick={this.handleClick}>
          {childrenContent && (
            <div ref={this.contentRef} className='content'>
              {childrenContent}
            </div>
          )}
        </ElementType>
      </Ref>
    );
  }
}

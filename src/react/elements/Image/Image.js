import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  classByKey,
  classByPattern,
  getUnhandledProps,
  getElementType,
  partitionHTMLProps,
  htmlImageProps
} from '../../lib';

import Dimmer from '../../modules/Dimmer';
import Label from '../Label';

function Image(props) {

  const {
    avatar,
    bordered,
    children,
    circular,
    className,
    content,
    dimmer,
    disabled,
    full,
    href,
    inline,
    label,
    rounded,
    spaced,
    wrapped
  } = props;

  const classes = cx(
    classByKey(avatar, 'is-avatar'),
    classByKey(bordered, 'is-bordered'),
    classByKey(circular, 'is-circular'),
    classByKey(disabled, 'is-disabled'),
    classByKey(full, 'is-full'),
    classByKey(inline, 'is-inline'),
    classByKey(rounded, 'is-rounded'),
    classByKey(spaced === true, 'is-spaced'),
    classByPattern(typeof spaced === 'string', 'is-spaced-%value%'),
    'image',
    className
  );

  const rest = getUnhandledProps(Image, props);
  const [imgTagProps, rootProps] = partitionHTMLProps(rest, { htmlProps: htmlImageProps });
  const ElementType = getElementType(Image, props, () => (
    (!_.isNil(dimmer) || !_.isNil(wrapped) || !childrenUtils.isNil(children)) && 'div'
  ));

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes}>
        {content}
      </ElementType>
    );
  }

  if (ElementType === 'img') {
    return <ElementType {...rootProps} {...imgTagProps} className={classes} />;
  }

  return (
    <ElementType {...rootProps} className={classes} href={href}>
      {dimmer && Dimmer.create(dimmer, { autoGenerateKey: false })}
      {label && Label.create(label, { autoGenerateKey: false })}
      <img {...imgTagProps} />
    </ElementType>
  );

}

Image.propTypes = {
  /** An element used to render the componenet */
  as: PropTypes.elementType,

  /** Define if image is avatar style */
  avatar: PropTypes.bool,

  /** Define if image is Bordered */
  bordered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Define if image is Circular */
  circular: PropTypes.bool,

  /** User defined class */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node,

  /** Dimmer Shorthand */
  dimmer: PropTypes.any,

  /** Show image as disabled */
  disabled: PropTypes.bool,

  /** Show image full width */
  full: PropTypes.bool,

  /** Render the Image as a Tag */
  href: PropTypes.string,

  /** Show image as Inline Block */
  inline: PropTypes.bool,

  /** Add Label */
  label: PropTypes.any,

  /** Round Corners */
  rounded: PropTypes.bool,

  /** Add Space on left/right */
  spaced: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right'])
  ]),

  /** Wrap the Image */
  wrapped: PropTypes.bool
};

Image.defaultProps = {
  as: 'img'
};

export default Image;

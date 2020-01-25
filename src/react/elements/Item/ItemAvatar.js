import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  customPropTypes,
  createShorthandFactory,
  getRandomGradient,
  getElementType,
  getUnhandledProps,
  classByKey,
  classByPattern
} from '../../lib';

import Image from '../Image';
import Icon from '../Icon';

function ItemAvatar(props) {

  const {
    centered,
    className,
    color,
    content,
    danger,
    disabled,
    generateBackground,
    icon,
    image,
    inline,
    primary,
    secondary,
    size,
    success,
    warning
  } = props;

  const hasCustomBackground = generateBackground
    || color || danger || primary || secondary || success || warning;

  const classes = cx(
    'item-avatar',
    classByKey(centered, 'is-centered'),
    classByPattern(color, 'is-%value%'),
    classByKey(danger, 'is-danger'),
    classByKey(disabled, 'is-disabled'),
    classByKey(image, 'has-image'),
    classByKey(inline, 'is-inline-block'),
    classByKey(primary, 'is-primary'),
    classByKey(secondary, 'is-secondary'),
    classByPattern(size, 'is-%value%'),
    classByKey(success, 'is-success'),
    classByKey(warning, 'is-warning'),
    classByKey(hasCustomBackground, 'has-generated-background'),
    className
  );

  if (!icon && !image && !content) {
    return null;
  }

  const ElementType = getElementType(ItemAvatar, props);
  const rest = getUnhandledProps(ItemAvatar, props);

  const containerStyle = generateBackground && (typeof generateBackground === 'string' || content)
    ? getRandomGradient(typeof generateBackground === 'string' ? generateBackground : content)
    : null;

  const avatarContent = (() => {
    if (icon) {
      return Icon.create(icon, { autoGenerateKey: false });
    }

    if (image) {
      return <Image src={image} />;
    }

    return content;
  })();

  return (
    <ElementType {...rest} className={classes} style={containerStyle}>
      <div className='content'>
        {avatarContent}
      </div>
    </ElementType>
  );

}

ItemAvatar.propTypes = {
  /** An element used to render the Component */
  as: PropTypes.elementType,

  /** Centered */
  centered: PropTypes.bool,

  /** User Defined Classes */
  className: PropTypes.string,

  /** Set Avatar Color */
  color: PropTypes.string,

  /** Set Avatar Placeholder */
  content: PropTypes.node,

  /** Set Danger Style */
  danger: PropTypes.bool,

  /** Disabled State */
  disabled: PropTypes.bool,

  /** Set the Random Background color generator */
  generateBackground: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),

  /** Set Avatar Icon */
  icon: customPropTypes.fontAwesome,

  /** Set Avatar Image */
  image: PropTypes.any,

  /** Display as Inline */
  inline: PropTypes.bool,

  /** Set Primary Style */
  primary: PropTypes.bool,

  /** Set Secondary Style */
  secondary: PropTypes.bool,

  /** Change Avatar Size */
  size: customPropTypes.size,

  /** Set Success Style */
  success: PropTypes.bool,

  /** Set Warning Style */
  warning: PropTypes.bool
};

ItemAvatar.create = createShorthandFactory(ItemAvatar, props => props);

export default ItemAvatar;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  customPropTypes,
  childrenUtils,
  getElementType,
  getUnhandledProps,
  classByKey
} from '../../lib';

import HeroContent from './HeroContent';
import HeroHeader from './HeroHeader';
import HeroTools from './HeroTools';

import Icon from '../Icon';

function Hero(props) {

  const {
    children,
    className,
    content,
    header,
    heroIcon,
    tools
  } = props;

  const classes = cx(
    'hero',
    classByKey(heroIcon, 'with-hero-icon'),
    classByKey(tools, 'with-hero-tools'),
    className
  );

  const rest = getUnhandledProps(Hero, props);
  const ElementType = getElementType(Hero, props);

  const HeaderElement = header && HeroHeader.create(header, { autoGenerateKey: false });
  const ContentElement = content && HeroContent.create(content, { autoGenerateKey: false });
  const ToolsElement = tools && HeroTools.create(tools, { autoGenerateKey: false });
  const IconElement = heroIcon && (
    <div className='hero-icon'>
      <Icon name={heroIcon} />
    </div>
  );

  return (
    <ElementType {...rest} className={classes}>

      {IconElement}

      {childrenUtils.isNil(children) ? (
        <React.Fragment>
          {HeaderElement}
          {ContentElement}
        </React.Fragment>
      ) : children}

      {ToolsElement}

    </ElementType>
  );
}

Hero.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** User Defined classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node,

  /** Header Shorthand */
  header: PropTypes.any,

  /** An Hero Icon */
  heroIcon: customPropTypes.fontAwesome,

  /** Add Hero Tools */
  tools: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.bool
  ])
};

Hero.Content = HeroContent;
Hero.Header = HeroHeader;
Hero.Tools = HeroTools;

export default Hero;
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps
} from '../../lib';

function HeroContent(props) {

  const {
    children,
    className,
    content
  } = props;

  const classes = cx(
    'hero-content',
    className
  );

  const rest = getUnhandledProps(HeroContent, props);
  const ElementType = getElementType(HeroContent, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

HeroContent.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** User Defined classes */
  className: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.node
};

HeroContent.create = createShorthandFactory(HeroContent, content => ({ content }));

export default HeroContent;
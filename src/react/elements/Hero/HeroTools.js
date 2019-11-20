import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  classByKey,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  createShorthandFactory
} from '../../lib';

import Button from '../Button';

function HeroTools(props) {

  const {
    className,
    tools
  } = props;

  const classes = cx(
    'hero-tools',
    classByKey(Array.isArray(tools), 'has-tools'),
    classByKey(Array.isArray(tools) && tools.length === 1, 'has-single-tool'),
    className
  );

  const rest = getUnhandledProps(HeroTools, props);
  const ElementType = getElementType(HeroTools, props);

  return (
    <ElementType {...rest} className={classes}>
      {tools.map(tool => Button.create(tool))}
    </ElementType>
  );

}

HeroTools.propTypes = {
  /** An element used to show the Component */
  as: customPropTypes.as,

  /** User defined classes */
  className: PropTypes.string,

  /** Tools Array */
  tools: PropTypes.arrayOf(PropTypes.object)
};

HeroTools.defaultProps = {
  tools: []
};

HeroTools.create = createShorthandFactory(
  HeroTools, tools => ({ tools: Array.isArray(tools) ? tools : [] })
);

export default HeroTools;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  classByKey,
  getElementType,
  getUnhandledProps,
  createShorthandFactory
} from '../../lib';

import Button from '../Button';

import DropdownMenu from '../../collections/DropdownMenu';

function HeroTools(props) {

  const {
    className,
    includeHeroPageTools,
    tools
  } = props;

  const hasTools = Array.isArray(tools) && !!tools.length;

  const classes = cx(
    'hero-tools',
    classByKey(hasTools, 'has-tools'),
    classByKey(hasTools && tools.length === 1, 'has-single-tool'),
    className
  );

  const rest = getUnhandledProps(HeroTools, props);
  const ElementType = getElementType(HeroTools, props);

  if (!hasTools) {
    return null;
  }

  return (
    <React.Fragment>
      {/* Place InHero Tools Component */}
      <ElementType {...rest} className={classes}>
        {tools.map(tool => Button.create(tool, { autoGenerateKey: true }))}
      </ElementType>

      {/* Place the Menu Tools */}
      {includeHeroPageTools && (
        <div className='page-hero-tools'>
          {/* If is a Single Fab, place the Fab */}
          {tools.length === 1
            ? Button.create(tools[0], { autoGenerateKey: false })
            : (
              <DropdownMenu
                className='hero-tools-menu'
                trigger={(
                  <Button fab primary icon='ellipsis v' />
                )}
                content={tools.map(tool => Button.create(tool, { autoGenerateKey: true }))}
              />
            )}
        </div>
      )}

    </React.Fragment>
  );

}

HeroTools.propTypes = {
  /** An element used to show the Component */
  as: PropTypes.elementType,

  /** User defined classes */
  className: PropTypes.string,

  /** Include Hero Page Tools */
  includeHeroPageTools: PropTypes.bool,

  /** Tools Array */
  tools: PropTypes.arrayOf(PropTypes.object)
};

HeroTools.defaultProps = {
  includeHeroPageTools : true,
  tools                : []
};

HeroTools.create = createShorthandFactory(
  HeroTools, tools => ({ tools: Array.isArray(tools) ? tools : [] })
);

export default HeroTools;


import React from 'react';
import PropTypes from 'prop-types';
import { NavHashLink as NavLink } from 'react-router-hash-link';

import { Menu, Panel } from '../../../src/react';

function RightMenu(props) {

  const {
    examples
  } = props;

  return (
    <Menu vertical secondary className=''>
      <Panel>
        <Panel.Body>
          {
            Object.getOwnPropertyNames(examples)
              .map(exampleKey => (
                <Menu.Item
                  key={exampleKey}
                  smooth
                  as={NavLink}
                  content={examples[exampleKey].header}
                  to={`#${exampleKey}`}
                />
              ))
              }
        </Panel.Body>
      </Panel>
    </Menu>
  );

}

RightMenu.propTypes = {
  examples: PropTypes.object
};

RightMenu.defaultProps = {
  examples: {}
};

export default RightMenu;

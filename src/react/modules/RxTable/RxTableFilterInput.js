import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { isValidString } from '@appbuckets/rabbit';

import Container from '../../elements/Container';
import Input from '../../elements/Input';
import Layout from '../../collections/Layout';

function RxTableFilterInput(props) {

  const {
    enable,
    onFilterChange
  } = props;

  /** Check if must render the Component */
  if (!enable) {
    return null;
  }

  const [filterStr, changeFilterStr] = useState('');

  const handleInputChange = (e) => {
    /** Change the Filter String */
    const newFilter = isValidString(e.target.value) ? e.target.value : '';
    /** If Filter is different from before, change it */
    if (newFilter !== filterStr) {
      /** Change Actual Filter */
      changeFilterStr(newFilter);
      /** Fire the new Filter String */
      if (typeof onFilterChange === 'function') {
        onFilterChange(newFilter);
      }
    }
  };

  return (
    <Container marginTop='4' marginBottom='6' className='rx-table-action-row'>
      <Layout.Row>
        <Layout.Column is={4} offsettedBy={8}>
          <Input
            icon='search'
            type='search'
            placeholder='Cerca...'
            value={filterStr}
            onChange={handleInputChange}
          />
        </Layout.Column>
      </Layout.Row>
    </Container>
  );

}

RxTableFilterInput.propTypes = {
  /** Enable Boolean indicate wethever render the component */
  enable: PropTypes.bool,

  /** On Filter Change handler */
  onFilterChange: PropTypes.func
};

export default RxTableFilterInput;

import React from 'react';
import PropTypes from 'prop-types';

import {
  childrenUtils
} from '../../lib';

import Table from '../../collections/Table';

function RxTableBodyNoFiltered(props) {

  /** Get Props */
  const {
    columnsCount,
    content,
    filteredText
  } = props;

  /** Return the Table Body */
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan={columnsCount} className='rx-table-empty-filtered'>
          {
            !childrenUtils.isNil(content)
              ? typeof content === 'function'
                ? content(filteredText)
                : content
              : <span>{`Nessun risultato per : '${filteredText}'`}</span>
          }
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );

}

RxTableBodyNoFiltered.propTypes = {

  /** Table Columns Count */
  columnsCount: PropTypes.number.isRequired,

  /** Content Shorthand */
  content: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),

  /** Filtered Text */
  filteredText: PropTypes.string

};

export default RxTableBodyNoFiltered;

import React from 'react';
import PropTypes from 'prop-types';

import {
  childrenUtils
} from '../../lib';

import Table from '../../collections/Table';

function RxTableBodyNoContent(props) {

  /** Get Shorthand */
  const {
    columnsCount,
    content
  } = props;

  /** Return the Table Body with No Content Row */
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan={columnsCount} className='rx-table-empty-data'>
          {childrenUtils.isNil(content) ? <span>Nessun dato da Visualizzare</span> : content}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
}

RxTableBodyNoContent.propTypes = {
  /** Columsn Count */
  columnsCount: PropTypes.number.isRequired,

  /** Content Shorthand Replacer */
  content: PropTypes.node
};

export default RxTableBodyNoContent;

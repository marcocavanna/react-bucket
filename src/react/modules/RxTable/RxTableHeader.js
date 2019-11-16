import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../collections/Table';

function RxTableHeader(props) {

  const {
    sorting,
    columns,
    onSortChange
  } = props;

  const handleCellClick = (id, headerProps) => {
    if (typeof onSortChange === 'function' && !headerProps.unsortable) {
      onSortChange(id, headerProps);
    }
  };

  return (
    <Table.Header>
      <Table.Row>
        {columns.map(({ id, sort, cellContent, ...rest }) => (
          <Table.HeaderCell
            key={id}
            sorted={sorting.by === id && (sorting.reverse ? 'desc' : 'asc')}
            onClick={() => handleCellClick(id, { id, sort, ...rest })}
            {...rest}
          />
        ))}
      </Table.Row>
    </Table.Header>
  );

}

RxTableHeader.propTypes = {
  /** RxTableData Columns */
  columns: PropTypes.arrayOf(PropTypes.object),

  /** On Sort Change Handler */
  onSortChange: PropTypes.func,

  /** RxTableData Sorting Options */
  sorting: PropTypes.object
};

RxTableHeader.defaultProps = {
  columns : [],
  sorting : {}
};

export default RxTableHeader;

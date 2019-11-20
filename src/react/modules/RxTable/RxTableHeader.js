import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../collections/Table';

function RxTableHeader(props) {

  const {
    sorting,
    columns,
    onSortChange,
    hasToolsColumn,
    toolsColumnPosition
  } = props;

  const handleCellClick = (id, headerProps) => {
    if (typeof onSortChange === 'function' && !headerProps.unsortable) {
      onSortChange(id, headerProps);
    }
  };

  return (
    <Table.Header>
      <Table.Row>
        {hasToolsColumn && toolsColumnPosition === 'left' && (
          <Table.HeaderCell className='tools-cell' />
        )}
        {columns.map(({ id, sort, cellContent, ...rest }) => (
          <Table.HeaderCell
            key={id}
            sorted={sorting.by === id && (sorting.reverse ? 'desc' : 'asc')}
            onClick={() => handleCellClick(id, { id, sort, ...rest })}
            {...rest}
          />
        ))}
        {hasToolsColumn && toolsColumnPosition === 'right' && (
          <Table.HeaderCell className='tools-cell' />
        )}
      </Table.Row>
    </Table.Header>
  );

}

RxTableHeader.propTypes = {
  /** RxTableData Columns */
  columns: PropTypes.arrayOf(PropTypes.object),

  /** Render or not the Tools Column */
  hasToolsColumn: PropTypes.bool,

  /** On Sort Change Handler */
  onSortChange: PropTypes.func,

  /** RxTableData Sorting Options */
  sorting: PropTypes.object,

  /** Table column position */
  toolsColumnPosition: PropTypes.oneOf(['left', 'right'])
};

RxTableHeader.defaultProps = {
  columns              : [],
  sorting              : {},
  toolsColumnPosition : 'right'
};

export default RxTableHeader;

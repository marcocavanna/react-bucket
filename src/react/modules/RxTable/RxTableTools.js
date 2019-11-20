import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '../../collections/Table/TableCell';

import DropdownMenu from '../../collections/DropdownMenu';

function RxTableTools(props) {

  const {
    row,
    tools: computeTools
  } = props;

  /** Get Tools */
  const tools = computeTools(row);

  /** If no tools has to be display, return an empty cell */
  if (!tools.length) {
    return <TableCell className='tools-cell' />;
  }

  /** Else return Tools */
  return (
    <TableCell className='tools-cell'>
      <DropdownMenu
        items={tools}
      />
    </TableCell>
  );

}

RxTableTools.propTypes = {
  row   : PropTypes.object,
  tools : PropTypes.func
};

export default RxTableTools;

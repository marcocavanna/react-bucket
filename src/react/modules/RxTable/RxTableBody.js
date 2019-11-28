import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import Table from '../../collections/Table';

import paginateDate from './lib/paginate';

import RxTableBodyNoContent from './RxTableBodyNoContent';
import RxTableBodyNoFiltered from './RxTableBodyNoFiltered';
import RxTablePaginationWalker from './RxTablePaginationWalker';

import RxTableBodyContent from './RxTableBodyContent';

function RxTableBody(props) {

  /** Get Props */
  const {
    children,
    currentPage,
    hasPagination,
    itemsPerPage,
    rxTableData,
    search,
    toolsPosition
  } = props;

  /** Get Data, using props */
  const { data: filteredData } = rxTableData.filter(search);

  /** Paginate data if is necessary */
  const { data, totalPages } = hasPagination
    ? paginateDate(filteredData, currentPage, itemsPerPage)
    : { data: filteredData };

  /** Get Counters */
  const {
    all      : allDataCount,
    filtered : filteredDataCount
  } = rxTableData.count;

  /** If no data exists, return an empty content */
  if (!allDataCount) {
    const {
      noData: noDataProps
    } = props;

    return (
      <RxTableBodyNoContent
        columnsCount={rxTableData.columns.length}
        content={noDataProps}
      />
    );
  }

  /** If no data respond to current filter, return an empty content */
  if (!filteredDataCount) {
    const {
      noFound: noFoundProp
    } = props;

    return (
      <RxTableBodyNoFiltered
        columnsCount={rxTableData.columns.length}
        content={noFoundProp}
        filteredText={search}
      />
    );
  }

  /** Build a function to handle rowClick */
  const { onRowClick: handleRowClick } = rxTableData;

  /** Build a function to handle Page change */
  const handlePageChange = (...args) => _.invoke(props, 'onPageChange', ...args);

  /** Else return the Complete Table Body Elements */
  return (
    <React.Fragment>
      {/* Table Body */}
      <RxTableBodyContent
        columns={rxTableData.columns}
        data={data}
        keyField={rxTableData.keyField}
        rowHasTools={rxTableData.hasTools}
        tools={rxTableData.tools}
        toolsPosition={toolsPosition}
        onRowClick={handleRowClick}
      >
        {children}
      </RxTableBodyContent>

      {/* If has Pagination return the Table Footer */}
      {hasPagination && (
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={rxTableData.columns.length}>
              <RxTablePaginationWalker
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      )}
    </React.Fragment>
  );
}

RxTableBody.propTypes = {
  /** Primary Content */
  children: PropTypes.func,

  /** Current Page to View */
  currentPage: PropTypes.number,

  /** Set if data are paginated */
  hasPagination: PropTypes.bool,

  /** Set the number of item per page */
  itemsPerPage: PropTypes.number,

  /** No Data Content */
  noData: PropTypes.node,

  /** No Found Content */
  noFound: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),

  /** On Page Change Handler */
  // eslint-disable-next-line react/no-unused-prop-types
  onPageChange: PropTypes.func,

  /** The RxTable Data */
  rxTableData: PropTypes.any,

  /** Searched Text */
  search: PropTypes.string,

  /** Tools Column Position */
  toolsPosition: PropTypes.oneOf(['left', 'right'])
};

export default RxTableBody;

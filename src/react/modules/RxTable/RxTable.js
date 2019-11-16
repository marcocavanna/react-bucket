import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Table from '../../collections/Table';
import Container from '../../elements/Container';
import Loader from '../../elements/Loader';
import Message from '../../collections/Message';

import RxTableData from './RxTableData';

import RxTableHeader from './RxTableHeader';
import RxTableFilterInput from './RxTableFilterInput';
import RxTablePaginationWalker from './RxTablePaginationWalker';

import paginateData from './lib/paginate';

import {
  childrenUtils,
  classByKey
} from '../../lib';

class RxTable extends React.PureComponent {

  static Cell = Table.Cell

  static Header = RxTableHeader

  static FilterInput = RxTableFilterInput

  static PaginationWalker = RxTablePaginationWalker

  static propTypes = {
    /** User Defined Classes */
    className: PropTypes.string,

    /** Error component to show when a load data error occured */
    error: PropTypes.node,

    /** The Loader Component to show while data is loading */
    loader: PropTypes.node,

    /** No Data Prop will used to show message if there is no data into table */
    noData: PropTypes.node,

    /** No Found Prop will be used while no data exists for filter */
    noFound: PropTypes.node,

    /** Paginate data */
    paginate: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]),

    /** RxTable Data Instance Prop */
    rxTableData: PropTypes.instanceOf(RxTableData),

    /** RxTable can use React Virtualized to show lot of data */
    virtualizeTable: PropTypes.bool
  }

  static defaultProps = {
    /** RxTable is virtualized by Default */
    virtualizeTable: true
  }

  _system = {
    isFirstDataLoad      : true,
    dataLoadedWatcher    : () => null,
    dataLoadingWatcher   : () => null
  }

  _freshState = () => {
    /** Get RxTableData Props */
    const {
      rxTableData: {
        filtering,
        loaded,
        loading,
        sorting
      },
      paginate
    } = this.props;

    return {
      filtering,
      loaded,
      loading,
      sorting,
      error            : null,
      searchStr        : '',
      enablePagination : !!paginate,
      itemsPerPage     : typeof paginate === 'number' ? paginate : 25,
      currentPage      : 1
    };
  }

  state = this._freshState()

  handleDataLoaded = (error) => {

    /** Set Loaded State */
    this.setState({
      error,
      loading : false,
      loaded  : !error
    });

    if (this._system.isFirstDataLoad) {
      this._system.isFirstDataLoad = false;
    }
    else {
      this.forceUpdate();
    }

  }

  handleDataLoading = () => {
    /** Set Loading State */
    this.setState({
      error   : null,
      loading : true,
      loaded  : false
    });
  }

  constructor(props) {
    /** Check rxTableData Instance */
    const { rxTableData } = props;

    if (!(rxTableData instanceof RxTableData)) {
      throw new Error('[ RxTable ] Invalid `rxTableData` prop. This must be an instance of RxTableData');
    }

    super(props);
  }

  componentDidMount() {
    /** Get the rxTableData instance */
    const { rxTableData } = this.props;

    /** Attach a Watcher to get RxTableData change */
    this._system.dataLoadedWatcher = rxTableData.onDataLoaded(this.handleDataLoaded);
    this._system.dataLoadingWatcher = rxTableData.onDataLoading(this.handleDataLoading);

  }

  componentWillUnmount() {
    /** Remove Listener */
    this._system.dataLoadedWatcher();
    this._system.dataLoadingWatcher();
  }

  handleFilterInputChange = (searchStr) => {
    this.setState({ searchStr });
  }

  handleSortChange = (sortColumn) => {
    /** Get RxTable Data */
    const { rxTableData } = this.props;

    /** Change Sorting and get new Props */
    const newSort = rxTableData.sort(sortColumn).sorting;

    this.setState({ sorting: newSort });
  }

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  }

  getData = () => {
    /** Get Search String */
    const {
      searchStr,
      enablePagination,
      currentPage,
      itemsPerPage
    } = this.state;

    /** Get RxTableData instance */
    const { rxTableData } = this.props;

    const { data } = rxTableData.filter(searchStr);

    if (!enablePagination) {
      return { data };
    }

    return paginateData(data, currentPage, itemsPerPage);

  }

  RxTableError = (props) => {
    const { error } = props;

    const {
      error: errorChildren
    } = this.props;

    /** Get Error Message and Header */
    return childrenUtils.isNil(errorChildren)
      ? <Message error header='An Error occured while loading Data' content={error} />
      : errorChildren;

  }

  RxTableLoading = () => {
    const {
      loader: loaderChildren
    } = this.props;

    /** Get the Loader Component */
    return (
      <Container
        className='rx-table rx-table-loading'
        paddingTop='4'
        paddingBottom='5'
        content={childrenUtils.isNil(loaderChildren) ? (
          <Loader active inline centered size='big' />
        ) : loaderChildren}
      />
    );

  }

  RxTableBody = (props) => {

    /** Get Filter String */
    const { searchStr } = this.state;

    /** Get the RxTableData */
    const { rxTableData, children } = this.props;

    /** Get Data from Local Props */
    const { data } = props;

    /** Get Counter */
    const {
      all      : allCount,
      filtered : filteredCount
    } = rxTableData.count;

    /** If no Data exists, show message */
    if (!allCount) {
      const {
        noData: noDataProp
      } = this.props;

      const NoData = childrenUtils.isNil(noDataProp)
        ? <span>No Data to Show</span>
        : noDataProp;

      return (
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={rxTableData.columns.length} className='rx-table-empty-data'>
              {NoData}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
    }

    /** If no data exists for current filter string, show message */
    if (!filteredCount) {
      const {
        noFound: noFoundProp
      } = this.props;

      const NoFound = childrenUtils.isNil(noFoundProp)
        ? <span>{`No result for current search : '${searchStr}'`}</span>
        : typeof noFoundProp === 'function'
          ? noFoundProp(searchStr)
          : noFoundProp;

      return (
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={rxTableData.columns.length} className='rx-table-empty-filtered'>
              {NoFound}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
    }

    /** Build the Row Click handler */
    const handleRowClick = (...args) => rxTableData.onRowClick(...args);

    /** Return Data */
    return (
      <Table.Body>
        {
          data.map((item, index, arr) => (
            <Table.Row
              key={item[rxTableData.keyField]}
              selectable={typeof rxTableData.onRowClick === 'function'}
              onClick={() => handleRowClick(item, index, arr)}
            >
              {
                !childrenUtils.isNil(children)
                  ? children(item, index, arr)
                  : rxTableData.columns.map(({ id, ...rest }) => (
                    <Table.Cell
                      key={id}
                      className={rest.className}
                      textAlign={rest.textAlign}
                      verticalAlign={rest.verticalAlign}
                    >
                      {
                        typeof rest.cellContent === 'function'
                          ? rest.cellContent(item, { id, ...rest })
                          : <span className='cell-title'>{item[id]}</span>
                      }
                    </Table.Cell>
                  ))
              }
            </Table.Row>
          ))
        }
      </Table.Body>
    );
  }

  render() {
    /** Get RxTableRows comps */
    const {
      RxTableBody,
      RxTableLoading,
      RxTableError
    } = this;

    /** Spread Props */
    const {
      className,
      rxTableData,
      virtualizeTable
    } = this.props;

    /** Spread State */
    const {
      sorting,
      loaded,
      loading,
      error,
      enablePagination,
      currentPage
    } = this.state;

    /** If table is loading, show Progress */
    if (loading) {
      return <RxTableLoading />;
    }

    /** If table has error, show message */
    if (error || !loaded) {
      return <Container className='rx-table rx-table-error' content={<RxTableError error={error} />} />;
    }

    /** Build table Classes */
    const classes = cx(
      classByKey(virtualizeTable, 'fixed-cell-height'),
      className
    );

    /** Check props is correct instance of RxTableData */
    if (!(rxTableData instanceof RxTableData)) {
      return null;
    }

    /** Get Table Data */
    const { data, totalPages } = this.getData();

    /** Get RxTableData Props */
    const { columns, filtering } = rxTableData;

    return (
      <div className='rx-table'>

        <RxTableFilterInput
          enable={!!filtering.fields.length}
          onFilterChange={this.handleFilterInputChange}
        />

        <Table sortable={sorting.enabled} className={classes}>

          {/* Render Header */}
          <RxTableHeader
            sorting={sorting}
            columns={columns}
            onSortChange={this.handleSortChange}
          />

          {/* Render Table Body */}
          <RxTableBody data={data} />

        </Table>

        {/* Render the Paginator */}
        {enablePagination
          && (
            <RxTablePaginationWalker
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={this.handlePageChange}
            />
          )}

      </div>
    );
  }

}

export default RxTable;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Table from '../../collections/Table';

import RxTableData from './RxTableData';

import RxTableHeader from './RxTableHeader';
import RxTableTools from './RxTableTools';
import RxTableFilterInput from './RxTableFilterInput';
import RxTablePaginationWalker from './RxTablePaginationWalker';

import RxTableBody from './RxTableBody';
import RxTableLoader from './RxTableLoader';
import RxTableError from './RxTableError';

import {
  classByKey
} from '../../lib';

// eslint-disable-next-line react/require-optimization
class RxTable extends React.Component {

  static Cell = Table.Cell

  static Header = RxTableHeader

  static FilterInput = RxTableFilterInput

  static PaginationWalker = RxTablePaginationWalker

  static Tools = RxTableTools

  static propTypes = {
    /** Primary content. */
    children: PropTypes.func,

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

    /** Set the Tools Column Position */
    toolsColumnPosition: PropTypes.oneOf(['left', 'right']),

    /** RxTable can use React Virtualized to show lot of data */
    virtualizeTable: PropTypes.bool
  }

  static defaultProps = {
    /** Tools column position */
    toolsColumnPosition: 'right',

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

  render() {

    /** Spread Props */
    const {
      children,
      className,
      loader,
      noData,
      noFound,
      rxTableData,
      toolsColumnPosition,
      virtualizeTable,
      error: errorHeader
    } = this.props;

    /** Spread State */
    const {
      currentPage,
      enablePagination,
      error,
      loaded,
      loading,
      itemsPerPage,
      searchStr,
      sorting
    } = this.state;

    /** If table is loading, show Progress */
    if (loading) {
      return <RxTableLoader content={loader} />;
    }

    /** If table has error, show message */
    if (error || !loaded) {
      return <RxTableError error={error} header={errorHeader} />;
    }

    /** Build table Classes */
    const classes = cx(
      classByKey(virtualizeTable, 'fixed-cell-height'),
      className
    );

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
            hasToolsColumn={rxTableData.tableHasTools}
            toolsColumnPosition={toolsColumnPosition}
            onSortChange={this.handleSortChange}
          />

          {/* Table Body */}
          <RxTableBody
            currentPage={currentPage}
            hasPagination={enablePagination}
            itemsPerPage={itemsPerPage}
            noData={noData}
            noFound={noFound}
            rxTableData={rxTableData}
            search={searchStr}
            toolsPosition={toolsColumnPosition}
            onPageChange={this.handlePageChange}
          >
            {children}
          </RxTableBody>

        </Table>

      </div>
    );
  }

}

export default RxTable;

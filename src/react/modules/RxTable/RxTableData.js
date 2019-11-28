import {
  EventHandler,
  isObject,
  isPromiseLike,
  isValidString,
  getRandomToken
} from '@appbuckets/rabbit';

import hash from 'object-hash';

import Fuse from 'fuse.js';

import arraySort from 'array-sort';
import {
  regexp as regExpSearch,
  basic as basicStringSearch
} from 'smart-table-search';

import _ from 'lodash';

class RxTableData {

  /** Set Static Props to Get Default */
  static defaultFiltering = {
    caseSensitive  : false,
    fields         : [],
    fuzzyBehaviour : false,
    useRegExp      : false,
    search         : ''
  }

  static defaultSorting = {
    by      : null,
    enabled : false,
    reverse : false
  }

  static fuseJSOptions = {
    /** Sort Data by Score */
    shouldSort         : true,
    /** Set Min Match */
    minMatchCharLength : 1,
    /** Set Max Pattern Length */
    maxPatternLength   : 32,
    /** Set Default Start */
    location           : 0,
    /** Set max Distance */
    distance           : 75,
    /** Set Threshold */
    threshold          : 0.6
  }

  /** Create an Event Handler */
  __eventHandler = new EventHandler(this)

  /** Set System Properties */
  _system = {
    /** Retreive data function */
    data: null,

    /** Current Data Hash */
    dataHash: hash([]),

    /** Set a state to know if data must be loaded */
    dataLoaded: false,

    /** Set an Array of Parser for Data Load */
    dataLoadedParser: [],

    /** When using a Promise to load function a Loading state must be used */
    dataLoading: false,

    /** Save Load Error */
    dataLoadError: null,

    /** Indicate if data is beeing reloading */
    dataReloading: false,

    /** Default Key Field */
    keyField: '_key',

    /** Init a Property to save initial Data */
    initialData: null,

    /** On Row Click function element */
    onRowClick: null,

    /** Option Hash */
    optionHash: hash({}),

    /** Row Tools Array, used to render context menu */
    rowTools: {
      /** Compute if show or not tools */
      show          : false,
      /** Save the table has tools boolean to render tools column */
      tableHasTools : false,
      /** Tools list to use */
      tools         : []
    }
  }

  /** Build a Container for columns */
  _columns = {
    /** Save the Columns Array */
    array: [],

    /** Save the Columns Map */
    mapping: {}
  }

  /** Save Data Length */
  _dataLength = {
    allData      : 0,
    filteredData : 0
  }

  constructor(data, options = {}) {

    /**
     * Get Columns Prop
     * and check if is present
     * and consistent for RxTableData
     */
    const { columns } = options;

    if (!Array.isArray(columns)) {
      throw new Error('[ RxTableData ] `columns` key is necessary and must be an Array');
    }

    if (columns.filter(isObject).length !== columns.length) {
      throw new Error('[ RxTableData ] Each column in `columns` key must be an Object');
    }

    columns
      .map((column) => {
        /** Build the Column ID */
        if (!isValidString(column.id)) {
          column.id = getRandomToken();
        }

        /** Purge Sort Property, assert is always an Array */
        column.sort = isValidString(column.sort)
          ? column.sort.split(' ')
          : column.sort;

        if (!Array.isArray(column.sort)) {
          column.sort = [];
        }

        return column;
      })
      .forEach((column, index) => {
        /** Save the Column into the Array */
        this._columns.array.push(column);

        /** Save Column Mapping */
        this._columns.mapping[column.id] = index;
      });


    /** Get the Filtering Options */
    const {
      filtering: {
        caseSensitive = RxTableData.defaultFiltering.caseSensitive,
        fields = RxTableData.defaultFiltering.fields,
        fuzzyBehaviour = RxTableData.defaultFiltering.fuzzyBehaviour,
        useRegExp = RxTableData.defaultFiltering.useRegExp
      } = {}
    } = options;

    this._filter = {
      fields,
      fuzzyBehaviour,
      useRegExp,
      caseSensitive : !!caseSensitive,
      search        : RxTableData.defaultFiltering.search
    };


    /** Get Sorting Options */
    const {
      sorting: {
        enabled: enableSort = RxTableData.defaultSorting.enabled,
        initial: initialSort = null
      }
    } = options;

    const hasInitialSort = isValidString(initialSort);
    const reverseSort = hasInitialSort && initialSort.charAt(0) === '-';

    this._sort = {
      by: hasInitialSort
        ? (reverseSort ? initialSort.slice(1) : initialSort)
        : RxTableData.defaultSorting.by,
      enabled : hasInitialSort || enableSort,
      reverse : hasInitialSort ? !!reverseSort : RxTableData.defaultSorting.reverse
    };


    /** Save and Check the KeyField */
    const { keyField = '_key' } = options;

    if (!isValidString(keyField)) {
      throw new Error('[ RxTableData ] `keyField` must be a valid String');
    }

    this._system.keyField = keyField;

    /** Register handler Functions for row click */
    this._system.onRowClick = options.onRowClick;

    /** Register row tools */
    if (isObject(options.rowTools)) {
      /** Get Props */
      const { show, tools } = options.rowTools;
      /** Check show type */
      this._system.rowTools.show = (typeof show === 'boolean' || typeof show === 'function')
        ? show
        : true;
      /** Save tools */
      this._system.rowTools.tools = Array.isArray(tools) ? tools.slice() : tools;
      /** If tools are valid, set the tableHasTools boolean */
      this._system.rowTools.tableHasTools = !!(
        (Array.isArray(tools) && tools.length) || typeof tools === 'function'
      );
    }

    /** Prepare Data */
    this._system.initialData = this._prepareData(data);

    /** Generate Options Hash */
    this._generateOptionsHash();

    /** Once Data has been Prepared, could by loaded */
    this._loadData();

  }


  /** onDataLoaded */
  onDataLoaded = (callback, context) => this.__eventHandler.attachOrFire(
    'onDataLoaded',
    callback,
    context,
    false,
    this._system.dataLoadError,
    this._system.data
  )


  /** onDataLoading */
  onDataLoading = (callback, context) => this.__eventHandler.attachOrFire(
    'onDataLoading',
    callback,
    context,
    false
  )

  /** Return Columns Array */
  get columns() {
    return this._columns.array;
  }

  /** Return current data count */
  get count() {
    return {
      all      : this._dataLength.allData,
      filtered : this._dataLength.filteredData
    };
  }

  /** Return the current data hash */
  get dataHash() {
    return this._system.dataHash;
  }

  /** Get the actual Filtering */
  get filtering() {
    return this._filter;
  }

  /** Return Key Field */
  get keyField() {
    return this._system.keyField;
  }

  /** Return loaded state */
  get loaded() {
    return !!this._system.dataLoaded;
  }

  /** Return loading state */
  get loading() {
    return !!this._system.dataLoading;
  }

  /** Return onRowClick handler, fallback to noop */
  get onRowClick() {
    return typeof this._system.onRowClick === 'function'
      ? this._system.onRowClick
      : () => { };
  }

  /** Return current options hash */
  get optionsHash() {
    return this._system.optionHash;
  }

  /** Return reloading state */
  get reloading() {
    return !!this._system.dataReloading;
  }

  /** Get the actual Sorting */
  get sorting() {
    return this._sort;
  }

  /** Check if table has tools to show */
  get tableHasTools() {
    return !!this._system.rowTools.tableHasTools;
  }

  /** Get the compute tools function */
  get tools() {
    return typeof this._system.rowTools.tools === 'function'
      ? this._system.rowTools.tools
      : () => this._system.rowTools.tools;
  }

  /** Return Data */
  get data() {
    /** Get Row Data */
    const { data } = this._system;
    const {
      _filter: filter,
      _sort: sort
    } = this;

    let _rawData = Array.isArray(data) ? data.slice() : [];

    /** Save all data Length */
    this._dataLength.allData = _rawData.length;

    /**
     * If filtering is active, and is using
     * fuzzy behaviour, then use FuseJS to
     * return data, sorted by score and not
     * by actual sort property
     */
    if (filter.search && filter.fuzzyBehaviour) {
      /** Build the fuse array */
      const fuseList = new Fuse(_rawData, {
        ...RxTableData.fuseJSOptions,
        caseSensitive : filter.caseSensitive,
        keys          : filter.fields
      });
      /** Search for request */
      const _dataResult = fuseList.search(filter.search);
      /** Save Search Result */
      this._dataLength.filteredData = _dataResult.length;
      /** Return filtered Data */
      return _dataResult;
    }

    /**
     * Check if must filter data using/without using
     * the regExp Function
     */
    if (filter.search) {
      /** Build the Search Performer */
      const performSearch = filter.useRegExp
        ? regExpSearch(
          { value: filter.search, scope: filter.fields, flags: filter.caseSensitive ? '' : 'i' }
        )
        : basicStringSearch(
          { value: filter.search, scope: filter.fields, isCaseSensitive: filter.caseSensitive }
        );

      /** Save Search Result */
      _rawData = performSearch(_rawData);
    }

    /** Check if must sort result data */
    if (sort.enabled) {
      /** Get the Sorted Columns */
      const column = this.columns.filter(({ id }) => id === sort.by)[0];

      /** If a Column exists, perform the Sort */
      if (isObject(column)) {
        /** Sort the Array */
        _rawData = arraySort(_rawData, column.sort, { reverse: sort.reverse });
      }
    }

    /** Save the Filtered Data */
    this._dataLength.filteredData = _rawData.length;

    /** Return Data */
    return _rawData;

  }


  /** Change the Actual Filter String */
  filter = (str) => {
    /** Set string if is a valid string, else null */
    this._filter.search = isValidString(str) ? str : '';

    /** Restore Option Hash */
    this._generateOptionsHash();

    /** Return this instance */
    return this;
  }


  /** Change the Actual Sort */
  sort = (columnKey = null) => {
    /**
     * If no Column Key is provided
     * remove the actual sorting pref
     */
    if (!columnKey) {
      this._sort.by = null;
    }

    /**
     * If Column Key choosed for
     * sort data, reverse the actual sort
     */
    else if (columnKey === this._sort.by) {
      this._sort.reverse = !this._sort.reverse;
    }

    /**
     * Else, change the actual sorting,
     * restoring the sort reverse option
     */
    else {
      this._sort.by = columnKey;
      this._sort.reverse = false;
    }

    /** Restore Options Hash */
    this._generateOptionsHash();

    /** Return the Instance */
    return this;
  }


  /** Reload Data */
  reload = ({ silent = true } = {}) => {
    /**
     * dataReloading Property is usefull to
     * avoid rerender data while a data reload
     * has been asked in silent mode.
     */
    this._system.dataReloading = !!silent;

    /** Reload Data */
    this._loadData({ silent });
  }


  /** Compute if current row has tools */
  hasTools = (...args) => {
    /** Get the Show Prop */
    const { show, tools } = this._system.rowTools;

    /** If table has no tools return false */
    if (!this._system.rowTools.tableHasTools) {
      return false;
    }

    /** Double check show types, must be function or boolean */
    if (!['boolean', 'function'].includes(typeof show)) {
      return false;
    }

    /** If tools is not of the right type, return false */
    const toolsAreArray = Array.isArray(tools);
    if ((toolsAreArray && !tools.length) || (!toolsAreArray && typeof tools !== 'function')) {
      return false;
    }

    /** If is a boolean, return as is */
    if (typeof show === 'boolean') {
      return show;
    }

    /** Else invoke the function passing props */
    return show(...args);
  }


  _generateOptionsHash = () => {
    this._system.optionHash = hash({
      ...this._filter,
      ...this._sort
    });
  }


  /** Load Data */
  _loadData = ({
    silent = false
  } = {}) => {
    /** Restore Data Props */
    this._system.data = null;
    this._system.dataLoaded = false;
    this._system.dataLoading = true;
    this._system.dataLoadError = null;

    /** Get Type of Data */
    if (typeof this._system.initialData === 'function') {
      /** Run the Function */
      const result = this._system.initialData();

      /** If function is not a Promise, it could be prepared */
      if (!isPromiseLike(result)) {
        this._saveData(this._prepareData(result));
        return;
      }

      /**
       * Else, must wait the Promise resolution.
       * This phase will also fire the onData... events
       * to let the UI change and know when data could
       * be used.
       * The onDataLoading must be called only if
       * method is not silent
       */
      if (!silent) {
        this.onDataLoading();
      }

      /**
       * Await the result of the promise
       * and save/load data
       */
      result
        .then((_data) => {
          /** Check if Data must be Parsed */
          const data = this._system.dataLoadedParser
            .reduce((rawData, parser) => parser(rawData), _data);

          /** Prepared Parsed Data */
          this._saveData(this._prepareData(data));

          this.onDataLoaded();

          return true;
        })
        .catch((e) => {
          /** Save the Error */
          this._saveData(null);
          this._system.dataLoadError = e;

          this.onDataLoaded();

          return false;
        });

      return;
    }

    /** If data is not a function, than is an Array */
    this._saveData(this._system.initialData.slice());
  }


  _saveData = (_data) => {
    /** Save Data as is */
    this._system.data = _data;
    this._system.dataHash = hash(_data);
    this._system.dataLoaded = Array.isArray(_data);
    this._system.dataLoading = false;
    this._system.dataReloading = false;
  }


  /** Prepare Data, asserting is an Array */
  _prepareData = (data) => {
    const { keyField } = this._system;

    /**
     * If received data is an Object,
     * then parse it building an array
     * with properly setted key field
     */
    if (isObject(data)) {
      const arrayData = [];

      _.forOwn(data, (item, key) => {
        /** Assert item is an Object */
        const _item = isObject(item) ? item : { data: item };
        /** Build the Key if doesn't exists */
        if (!isValidString(_item[keyField])) {
          _item[keyField] = key;
        }
        /** Push the Item */
        arrayData.push(_item);
      });

      /** Save Initial Length */
      this._dataLength.allData = arrayData.length;
      this._dataLength.filteredData = arrayData.length;

      return arrayData;
    }

    /**
     * If data is an Array,
     * remap item to be sure
     * are consistent
     */
    if (Array.isArray(data)) {
      const dataMapped = data.map((item) => {
        /** Assert item is an Object */
        const _item = isObject(item) ? item : { data: item };
        /** Build key if it doesn't exists */
        if (!isValidString(_item[keyField])) {
          _item[keyField] = getRandomToken();
        }
        /** Return the Mapped Item */
        return _item;
      });

      /** Save Initial Length */
      this._dataLength.allData = dataMapped.length;
      this._dataLength.filteredData = dataMapped.length;

      return dataMapped;
    }

    /**
     * If data is a function
     * simply store it to
     * used when must load data
     */
    if (typeof data === 'function') {
      return data;
    }

    /** Fallback returning an Empty Array */
    return [];
  }

}

export default RxTableData;

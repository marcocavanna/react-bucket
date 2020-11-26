import clsx from 'clsx';
import * as React from 'react';

import { AnyObject } from '../../generic';
import areEqualStringArray from './lib/areEqualStringArray';
import { RxTableFactory } from './RxTable.factory';

import { RxTableColumnProps, RxTableHeaderCellComponent } from './RxTable.types';


/* --------
 * Header Title Column Component Interface
 * -------- */
export interface RxTableHeaderTitleColumnProps {
  /** The Column Object */
  column: RxTableColumnProps<any, AnyObject>;

  /** Cell Component used to Render the element */
  Component: RxTableHeaderCellComponent;

  /** Set if table sorting is reversed */
  isSortReversed: boolean;

  /** On Sort Handler */
  onSortChange: RxTableFactory<any>['setSorting'];

  /** Set Sorting */
  tableSorting: string[]
}


/* --------
 * Header Title Column Component Definition
 * -------- */
const RxTableHeaderTitleColumn: React.FunctionComponent<RxTableHeaderTitleColumnProps> = (
  props
) => {

  const {
    column,
    Component,
    isSortReversed,
    onSortChange,
    tableSorting
  } = props;

  /** Compute memoized sorting props */
  const sorting = React.useMemo(
    (): { isSortable: boolean, isSorted: boolean } => {
      const isSortable = Array.isArray(column.sort) && !!column.sort.length;

      return {
        isSortable,
        isSorted: isSortable && areEqualStringArray(tableSorting, column.sort!)
      };
    },
    [ column.sort, tableSorting ]
  );

  /** Build classes */
  const classes = clsx(
    column.textAlign && `has-text-${column.textAlign}`,
    column.headerClassName
  );

  /** Handle Sorting Change */
  const handleSortChange = React.useCallback(
    () => {
      if (!sorting.isSortable) {
        return;
      }

      if (sorting.isSorted) {
        onSortChange(column.sort!, !isSortReversed);
      }
      else {
        onSortChange(column.sort!, false);
      }
    },
    [
      column.sort,
      isSortReversed,
      onSortChange,
      sorting.isSortable,
      sorting.isSorted
    ]
  );

  return (
    <Component
      className={classes}
      column={column}
      content={column.header}
      hasSorting={sorting.isSortable}
      isActualSortingColumn={sorting.isSorted}
      isReversedSorting={sorting.isSorted && isSortReversed}
      onClick={sorting.isSortable ? handleSortChange : undefined}
    />
  );
};

RxTableHeaderTitleColumn.displayName = 'RxTableHeaderTitleColumn';

export {
  RxTableHeaderTitleColumn
};

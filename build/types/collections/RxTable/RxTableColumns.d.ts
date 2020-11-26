import * as React from 'react';
import { AnyObject } from '../../generic';
import { RxTableFactory } from './RxTable.factory';
import {
  RxTableColumnProps,
  RxTableHeaderCellComponent,
} from './RxTable.types';
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
  tableSorting: string[];
}
declare const RxTableHeaderTitleColumn: React.FunctionComponent<RxTableHeaderTitleColumnProps>;
export { RxTableHeaderTitleColumn };

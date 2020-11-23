import { AnyObject } from '../../generic';

import { RxTableColumnProps } from '../../collections/RxTable';


export interface VirtualizedTableColumnProps<Data extends AnyObject = AnyObject>
  extends RxTableColumnProps<Data> {
  /** Column Width */
  width: number;
}

import { CreatableFunctionComponent } from '../../generic';
import { TableCellProps } from './TableCell.types';
import TableCellContent from './TableCellContent';
declare type TableCellComponent = CreatableFunctionComponent<TableCellProps> & {
  Content: typeof TableCellContent;
};
declare const TableCell: TableCellComponent;
export default TableCell;

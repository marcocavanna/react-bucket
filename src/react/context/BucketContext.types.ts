import { AccordionsProps } from '../collections/Accordions';
import { DropdownMenuProps } from '../collections/DropdownMenu';
import { FormFormikProps, FormProps } from '../collections/Form';
import { ColumnProps, ContainerProps, RowProps } from '../collections/Grid';
import { MenuItemProps, MenuProps } from '../collections/Menu';
import { MessageProps } from '../collections/Message';
import { RxTableProps } from '../collections/RxTable';
import {
  TableBodyProps,
  TableCellContentProps,
  TableCellProps,
  TableFooterProps, TableHeaderCellProps, TableHeaderProps,
  TableProps, TableRowProps
} from '../collections/Table';
import { TabsProps } from '../collections/Tabs';
import { TabPanelProps } from '../collections/Tabs/TabPanel.types';
import { AvatarProps } from '../elements/Avatar';
import { BadgeProps } from '../elements/Badge';
import { BoxProps } from '../elements/Box';
import { ButtonGroupProps, ButtonProps } from '../elements/Button';
import { CheckboxProps } from '../elements/Checkbox';
import { ColorPickerProps } from '../elements/ColorPicker';
import { DayPickerProps } from '../elements/DayPicker';
import { DividerProps } from '../elements/Divider';
import { EmptyContentProps } from '../elements/EmptyContent';
import { HeaderContentProps, HeaderProps, HeaderSubheaderProps } from '../elements/Header';
import { HeroButtonProps } from '../elements/HeroButton';
import { IconProps } from '../elements/Icon';
import { InputProps } from '../elements/Input';
import {
  ItemContentProps,
  ItemGroupProps,
  ItemHeaderProps,
  ItemMetaProps,
  ItemProps,
  ItemTextProps, ItemToolsProps
} from '../elements/Item';
import { LabelProps } from '../elements/Label';
import { LabelGroupProps } from '../elements/Label/LabelGroup.types';
import { LoaderProps } from '../elements/Loader';
import { NumericInputProps } from '../elements/NumericInput';
import { PanelBodyProps, PanelFooterProps, PanelHeaderProps, PanelProps } from '../elements/Panel';
import { CircularProgressProps, LinearProgressProps } from '../elements/Progress';
import { SectionProps } from '../elements/Section';
import { SelectMultiProps, SelectProps } from '../elements/Select';
import { ToastProps } from '../elements/Toast';
import { AutoSpacerProps } from '../hoc/AutoSpacer';
import { BackdropInnerProps, BackdropProps } from '../modules/Backdrop';
import { CollapsableProps } from '../modules/Collapsable';
import { DropzoneProps } from '../modules/Dropzone';
import { ModalActionsProps, ModalContentProps, ModalHeaderProps, ModalProps } from '../modules/Modal';
import { PopupProps } from '../modules/Popup';
import { StickyProps } from '../modules/Sticky';
import { VirtualizedTableProps } from '../modules/VirtualizedTable';


/* --------
 * Bucket Theme Provider
 * -------- */
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P]
};

type ThemeComponentProps<Props> = Partial<Props>;

export interface ThemeOptions {
  accordions: ThemeComponentProps<AccordionsProps>;

  avatar: ThemeComponentProps<AvatarProps>;

  autoSpacer: ThemeComponentProps<AutoSpacerProps>;

  backdrop: ThemeComponentProps<BackdropProps>;

  backdropInner: ThemeComponentProps<BackdropInnerProps>;

  badge: ThemeComponentProps<BadgeProps>;

  box: ThemeComponentProps<BoxProps>;

  button: ThemeComponentProps<ButtonProps>;

  buttonGroup: ThemeComponentProps<ButtonGroupProps>;

  checkbox: ThemeComponentProps<CheckboxProps>;

  circularProgress: ThemeComponentProps<CircularProgressProps>;

  collapsable: ThemeComponentProps<CollapsableProps>;

  colorPicker: ThemeComponentProps<ColorPickerProps>;

  column: ThemeComponentProps<ColumnProps>;

  container: ThemeComponentProps<ContainerProps>;

  dayPicker: ThemeComponentProps<DayPickerProps<any>>;

  divider: ThemeComponentProps<DividerProps>;

  dropdownMenu: ThemeComponentProps<DropdownMenuProps>;

  dropzone: ThemeComponentProps<DropzoneProps>;

  emptyContent: ThemeComponentProps<EmptyContentProps>;

  form: ThemeComponentProps<FormProps>;

  formFormik: ThemeComponentProps<FormFormikProps<any>>;

  header: ThemeComponentProps<HeaderProps>;

  headerContent: ThemeComponentProps<HeaderContentProps>;

  headerSubheader: ThemeComponentProps<HeaderSubheaderProps>;

  heroButton: ThemeComponentProps<HeroButtonProps>;

  icon: ThemeComponentProps<IconProps>;

  input: ThemeComponentProps<InputProps>;

  item: ThemeComponentProps<ItemProps>;

  itemContent: ThemeComponentProps<ItemContentProps>;

  itemGroup: ThemeComponentProps<ItemGroupProps>;

  itemHeader: ThemeComponentProps<ItemHeaderProps>;

  itemMeta: ThemeComponentProps<ItemMetaProps>;

  itemText: ThemeComponentProps<ItemTextProps>;

  itemTools: ThemeComponentProps<ItemToolsProps>;

  label: ThemeComponentProps<LabelProps>;

  labelGroup: ThemeComponentProps<LabelGroupProps>;

  linearProgress: ThemeComponentProps<LinearProgressProps>;

  loader: ThemeComponentProps<LoaderProps>;

  menu: ThemeComponentProps<MenuProps>;

  menuItem: ThemeComponentProps<MenuItemProps>;

  message: ThemeComponentProps<MessageProps>;

  modal: ThemeComponentProps<ModalProps>;

  modalActions: ThemeComponentProps<ModalActionsProps>;

  modalContent: ThemeComponentProps<ModalContentProps>;

  modalHeader: ThemeComponentProps<ModalHeaderProps>;

  numericInput: ThemeComponentProps<NumericInputProps>;

  panel: ThemeComponentProps<PanelProps>;

  panelBody: ThemeComponentProps<PanelBodyProps>;

  panelFooter: ThemeComponentProps<PanelFooterProps>;

  panelHeader: ThemeComponentProps<PanelHeaderProps>;

  popup: ThemeComponentProps<PopupProps>;

  row: ThemeComponentProps<RowProps>;

  rxTable: ThemeComponentProps<RxTableProps<any>>;

  section: ThemeComponentProps<SectionProps>;

  select: ThemeComponentProps<SelectProps<any, any, any>>;

  selectMulti: ThemeComponentProps<SelectMultiProps<any, any>>;

  sticky: ThemeComponentProps<StickyProps>;

  table: ThemeComponentProps<TableProps>;

  tableBody: ThemeComponentProps<TableBodyProps>;

  tableCell: ThemeComponentProps<TableCellProps>;

  tableCellContent: ThemeComponentProps<TableCellContentProps>;

  tableFooter: ThemeComponentProps<TableFooterProps>;

  tableHeader: ThemeComponentProps<TableHeaderProps>;

  tableHeaderCell: ThemeComponentProps<TableHeaderCellProps>;

  tableRow: ThemeComponentProps<TableRowProps>;

  tabPanel: ThemeComponentProps<TabPanelProps>;

  tabs: ThemeComponentProps<TabsProps>;

  toast: ThemeComponentProps<ToastProps>;

  virtualizedTable: ThemeComponentProps<VirtualizedTableProps<any>>;

}

export type PartialThemeOptions = RecursivePartial<ThemeOptions>;


/* --------
 * The Bucket Context will contain the theme object and some useful functions
 * -------- */
export interface BucketThemeContext {
  /** Theme configuration */
  theme: ThemeOptions;
}

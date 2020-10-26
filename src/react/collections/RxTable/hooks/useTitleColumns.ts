import * as React from 'react';

import {
  RxTableColumnTitle,
  RxTableColumnTitleProps,
  RxTableColumns,
  TransformColumns
} from '../RxTable.types';


export function renderColumnTitle<Data>(title: RxTableColumnTitle<Data>, props: RxTableColumnTitleProps<Data>) {
  if (typeof title === 'function') {
    return title(props);
  }

  return title;
}


function fillTitle<Data>(columns: RxTableColumns<Data>, columnTitleProps: RxTableColumnTitleProps<Data>) {
  return columns.map((column) => ({
    ...column,
    title: renderColumnTitle(column.title, columnTitleProps)
  }));
}


export function useTitleColumns<Data>(columnTitleProps: RxTableColumnTitleProps<Data>): [ TransformColumns<Data> ] {
  return [
    React.useCallback(
      (columns: RxTableColumns<Data>) => fillTitle(columns, columnTitleProps),
      [ columnTitleProps ]
    )
  ];
}

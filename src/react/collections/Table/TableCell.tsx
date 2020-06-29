import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../../lib';

import { TableCellProps } from './TableCell.types';
import TableCellContent from './TableCellContent';


export default function TableCell(props: TableCellProps): React.ReactElement<TableCellProps> {

  const {
    className,
    rest: {
      active,
      children,
      content,
      header,
      meta,
      selectable,
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ stateClassName, rest ] = useSplitStateClassName(rawRest);

  const ElementType = useElementType(TableCell, props);

  const classes = clsx(
    { active, selectable },
    'cell',
    className,
    stateClassName
  );


  // ----
  // Generate Memoized Shorthand Content
  // ----
  const metaElement = React.useMemo(
    () => TableCellContent.create(meta, { autoGenerateKey: false, overrideProps: { type: 'meta' } }),
    [ meta ]
  );

  const titleElement = React.useMemo(
    () => TableCellContent.create(header, { autoGenerateKey: false, overrideProps: { type: 'title' } }),
    [ header ]
  );

  const contentElement = React.useMemo(
    () => TableCellContent.create(content, { autoGenerateKey: false, overrideProps: { type: 'content' } }),
    [ content ]
  );


  // ----
  // Render Children
  // ----
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }


  // ----
  // Render Using Shorthand
  // ----
  return (
    <ElementType {...rest} className={classes}>
      {metaElement}
      {titleElement}
      {contentElement}
    </ElementType>
  );

}

TableCell.displayName = 'TableCell';

TableCell.defaultProps = {
  as: 'td'
} as Partial<TableCellProps>;

TableCell.Content = TableCellContent;

TableCell.create = createShorthandFactory(TableCell, (content) => ({ content }));

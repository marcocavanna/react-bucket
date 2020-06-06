import * as React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';

import * as Grid from './index';
import { RowProps } from './index';
import { FlexContentHorizontalAlign, FlexContentVerticalAlign, FlexContentWidth } from '../../generic';


export default { title: 'Collections/Grid', decorators: [ withKnobs ] };


/* --------
 * Stories Components
 * -------- */
const Row = (props: RowProps) => (
  <div style={{ width: '90%', margin: '0 auto' }}>
    <Grid.Row {...props} />
  </div>
);

const Box = (props: { content?: string, height?: number, className?: string }) => (
  <div
    className={`has-background-primary ${props.className}`}
    style={{
      minHeight     : props.height ?? 100,
      borderRadius  : 15,
      display       : 'flex',
      justifyContent: 'center',
      alignItems    : 'center',
      margin        : '2em 0'
    }}
  >
    <div className={'is-large has-font-bold'}>
      {props.content ?? 'COL'}
    </div>
  </div>
);


/* --------
 * Stories
 * -------- */
const buildRow = (...columns: FlexContentWidth[]) => (
  <Row>
    {columns.map((width, ix) => (
      <Grid.Column
        key={ix}
        width={width}
        content={(
          <Box content={width.toString()} />
        )}
      />
    ))}
  </Row>
);

const buildColumns = (divider: number) => (
  new Array(24 / divider).fill('').map((_, ix) => (
    <Grid.Column
      key={ix}
      content={(
        <Box content={(divider).toString()} />
      )}
    />
  ))
);

export const baseGrid = () => (
  [ 1, 2, 3, 4, 6, 8, 12, 24 ].reverse().map(divider => (
    <Row key={divider}>
      {buildColumns(divider)}
    </Row>
  ))
);

export const variableColumnsWidth = () => (
  <React.Fragment>
    {buildRow(8, 16)}
    {buildRow(4, 8, 4, 8)}
    {buildRow(2, 16, 6)}
    {buildRow(12, 4, 4, 4)}
    {buildRow(3, 9, 3, 6, 3)}
  </React.Fragment>
);

export const responsiveColumnsWidth = () => (
  <Row>
    <Grid.Column
      width={{ phoneUp: 24, tabletUp: 8 }}
      content={<Box content={'Full on Phone'} />}
    />
    <Grid.Column
      width={{ phoneUp: 16 }}
      content={<Box content={'2/3 on Phone'} />}
    />
    <Grid.Column
      width={{ phoneUp: 8, tabletUp: 24 }}
      content={<Box content={'Full on Tablet Up'} />}
    />
  </Row>
);

export const verticalDisposition = () => (
  <React.Fragment>

    {[ 'on top', 'on bottom', 'stretched', 'center' ].map(align => (
      <Row key={align} verticalAlign={align as FlexContentVerticalAlign}>
        <Grid.Column
          as={Box}
          width={6}
          height={50}
        />
        <Grid.Column
          as={Box}
          width={6}
          height={100}
        />
        <Grid.Column
          as={Box}
          width={6}
          height={75}
        />
        <Grid.Column
          as={Box}
          width={6}
          height={25}
        />
      </Row>
    ))}

  </React.Fragment>
);

export const horizontalDisposition = () => {

  const align = select(
    'columnsAlign',
    [ 'on start', 'centered', 'on end', 'spaced between', 'spaced around' ],
    'on start',
    'columnsAlign'
  );

  return (
    <React.Fragment key={align}>
      <h3>columnsAlign : <code>{align}</code></h3>
      <Row columnsAlign={align as FlexContentHorizontalAlign}>
        <Grid.Column
          width={4}
          content={(
            <Box />
          )}
        />
        <Grid.Column
          width={4}
          content={(
            <Box />
          )}
        />
        <Grid.Column
          width={4}
          content={(
            <Box />
          )}
        />
      </Row>
    </React.Fragment>
  );

};

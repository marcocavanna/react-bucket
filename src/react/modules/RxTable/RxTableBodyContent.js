import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import {
  childrenUtils
} from '../../lib';

import Table from '../../collections/Table';

import RxTableTools from './RxTableTools';

function RxTableBodyContent(props) {

  /** Get Props */
  const {
    children,
    columns,
    data,
    keyField,
    onRowClick,
    rowHasTools,
    tools,
    toolsPosition
  } = props;

  /** If children is not null, use it to compute row */
  if (!childrenUtils.isNil(children)) {
    return (
      <Table.Body>
        {
          data.map((item, index, arr) => (
            <Table.Row
              key={item[keyField]}
              selectable={typeof onRowClick === 'function'}
              onClick={() => _.invoke(props, 'onRowClick', item, index, arr)}
            >
              {children(item, index, arr)}
            </Table.Row>
          ))
        }
      </Table.Body>
    );
  }

  /** Else, return the table using rxprops */
  return (
    <Table.Body>
      {
        data.map((item, index, arr) => (
          <Table.Row
            key={item[keyField]}
            selectable={typeof onRowClick === 'function'}
            onClick={() => _.invoke(props, 'onRowClick', item, index, arr)}
          >
            {/* Draw tools on left */}
            {
              toolsPosition === 'left'
              && rowHasTools(item)
              && <RxTableTools row={item} tools={tools} />
            }
            {/* Map Columsn */}
            {columns.map(({ id, ...rest }) => (
              <Table.Cell
                key={id}
                className={rest.className}
                textAlign={rest.textAlign}
                verticalAlign={rest.verticalAlign}
              >
                {
                  typeof rest.cellContent === 'function'
                    ? rest.cellContent(item, { id, ...rest })
                    : <span className='cell-header'>{item[id]}</span>
                }
              </Table.Cell>
            ))}
            {/* Draw tools on right */}
            {
              toolsPosition === 'right'
              && rowHasTools(item)
              && <RxTableTools row={item} tools={tools} />
            }
          </Table.Row>
        ))
      }
    </Table.Body>
  );
}

RxTableBodyContent.propTypes = {
  /** Function to build Row */
  children: PropTypes.func,

  /** Columns Array */
  columns: PropTypes.array.isRequired,

  /** Data Array */
  data: PropTypes.array.isRequired,

  /** Key Field to use */
  keyField: PropTypes.string.isRequired,

  /** Handler on Row Click */
  onRowClick: PropTypes.func,

  /** Function to calc if a row has tool */
  rowHasTools: PropTypes.func,

  /** Tools to use */
  tools: PropTypes.func,

  /** Tools column position */
  toolsPosition: PropTypes.oneOf(['left', 'right'])
};

export default RxTableBodyContent;

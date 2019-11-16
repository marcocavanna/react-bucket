import React from 'react';

import {
  customPropTypes,
  getUnhandledProps
} from '../../lib';

import TableHeader from './TableHeader';

function TableFooter(props) {
  const { as } = props;
  const rest = getUnhandledProps(TableFooter, props);

  return <TableHeader {...rest} as={as} />;
}

TableFooter.propTypes = {
  /** An element used to render the Component */
  as: customPropTypes.as
};

TableFooter.defaultProps = {
  as: 'tfoot'
};

export default TableFooter;

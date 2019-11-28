import React from 'react';
import PropTypes from 'prop-types';

import {
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
  as: PropTypes.elementType
};

TableFooter.defaultProps = {
  as: 'tfoot'
};

export default TableFooter;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  customPropTypes,
  createShorthandFactory,
  getElementType,
  getUnhandledProps,
  classByPattern
} from '../../lib';

function Spacer(props) {

  const { height, className } = props;

  const classes = cx(
    'spacer',
    classByPattern(height, 'pt-%value%'),
    className
  );

  const rest = getUnhandledProps(Spacer, props);
  const ElementType = getElementType(Spacer, props);

  return <ElementType {...rest} className={classes} />;

}

Spacer.defaultProps = {
  height: 4                 // 4 = 1em
};

Spacer.propTypes = {
  /** An Element Used to Render the Component */
  as: customPropTypes.as,

  /** User Defined Class Name */
  className: PropTypes.string,

  /** Spacer Height */
  height: PropTypes.oneOfType([
    PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
    PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8'])
  ])
};

Spacer.create = createShorthandFactory(Spacer, height => ({ height }));

export default Spacer;

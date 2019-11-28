import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps
} from '../../lib';

function LabelDetail(props) {
  const {
    children,
    className,
    content
  } = props;

  const classes = cx('detail', className);

  const rest = getUnhandledProps(LabelDetail, props);
  const ElementType = getElementType(LabelDetail, props);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
}

LabelDetail.propTypes = {
  /** An element used to render the Compoenent */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional Class */
  className: PropTypes.string,

  /** Shorthand for content */
  content: PropTypes.node
};

LabelDetail.create = createShorthandFactory(LabelDetail, content => ({ content }));

export default LabelDetail;

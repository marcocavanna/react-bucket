import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import Header from '../Header/Header';

import {
  getElementType,
  getUnhandledProps,
  createShorthandFactory,
  childrenUtils,
  customPropTypes,
  classByValue
} from '../../lib';

function PanelHeader(props) {

  const {
    children,
    className,
    color,
    header,
    icon,
    subheader,
    textAlign
  } = props;

  const classes = cx(
    'panel-header',
    classByValue(color, 'has-text-%value%'),
    classByValue(textAlign, 'has-text-%value%'),
    className
  );

  const rest = getUnhandledProps(PanelHeader, props);

  const ElementType = getElementType(PanelHeader, props);

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const headerElement = header || subheader
    ? Header.create({ content: header, subheader, icon })
    : null;

  return (
    <ElementType {...rest} className={classes}>
      {headerElement}
      {children}
    </ElementType>
  );

}

PanelHeader.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Primary Content */
  children: PropTypes.node,

  /** Additional Classes */
  className: PropTypes.string,

  /** Text Color */
  color: PropTypes.string,

  /** Header Shorthand Method */
  header: PropTypes.string,

  /** Icon ShortHand */
  icon: customPropTypes.fontAwesome,

  /** Subheader Shorthand Method */
  subheader: PropTypes.string,

  /** Text Align */
  textAlign: customPropTypes.textAlign
};

PanelHeader.create = createShorthandFactory(PanelHeader, (val) => {
  if (_.isString(val)) {
    return { header: val };
  }

  if (_.isObject(val) && !_.isArray(val)) {
    return { header: val.header, subheader: val.subheader, icon: val.icon };
  }

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.log('Panel Header shorthand must be a string or an object with header and/or subheader key');
  }

  return { header: null };
});

export default PanelHeader;

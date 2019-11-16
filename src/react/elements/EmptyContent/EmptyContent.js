import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  createShorthandFactory,
  customPropTypes,
  getUnhandledProps,
  classByKey,
  childrenUtils
} from '../../lib';

import Container from '../Container';

import Icon from '../Icon';

function EmptyContent(props) {

  const {
    children,
    className,
    content,
    header,
    icon,
    textAlign,
    color
  } = props;

  const hasContent = content || !childrenUtils.isNil(children);

  const classes = cx(
    'empty-content',
    classByKey(hasContent, 'has-content'),
    classByKey(icon, 'has-icon'),
    classByKey(header, 'has-header'),
    className
  );

  const rest = getUnhandledProps(EmptyContent, props);

  const IconElement = icon && Icon.create(icon);

  return (
    <Container {...rest} textColor={color} textAlign={textAlign} className={classes}>
      {icon && <div className='empty-content-icon'>{IconElement}</div>}
      {header && <div className='empty-content-header'>{header}</div>}
      {hasContent && (
        <div className='empty-content-content'>
          {!childrenUtils.isNil(children) ? children : content}
        </div>
      )}
    </Container>
  );
}

EmptyContent.propTypes = {
  /** User defined classes */
  className: PropTypes.string,

  /** Text Color */
  color: PropTypes.string,

  /** Content Shorthand */
  content: PropTypes.any,

  /** Empty Content Header */
  header: PropTypes.string,

  /** Icon Item */
  icon: customPropTypes.fontAwesome,

  /** Text alignment */
  textAlign: PropTypes.string
};

EmptyContent.defaultProps = {
  color     : 'grey-light',
  textAlign : 'center'
};

EmptyContent.create = createShorthandFactory(EmptyContent, props => props);

export default EmptyContent;

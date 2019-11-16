import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  customPropTypes,
  childrenUtils,
  getUnhandledProps,
  getElementType,
  createShorthandFactory,
  classByKey,
  classByPattern
} from '../../lib';

import Icon from '../Icon';
import LabelDetail from './LabelDetail';
import LabelGroup from './LabelGroup';

class Label extends React.PureComponent {

  /**
   * Define Component PropTypes
   */
  static propTypes = {
    /** An element used to render the component */
    as: customPropTypes.as,

    /** User Defined Class */
    className: PropTypes.string,

    /** Color Props */
    color: PropTypes.string,

    /** Content ShortHand */
    content: PropTypes.any,

    /** Detail Shorthand */
    detail: PropTypes.any,

    /** Icon Shorthand */
    icon: customPropTypes.fontAwesome
  }

  /**
   * Append Child Component
   */
  static Detail = LabelDetail;

  static Group = LabelGroup;

  /**
   * Build an Handle Click Function
   */
  handleClick = e => _.invoke(this.props, 'onClick', e)

  render() {
    const {
      children,
      className,
      color,
      content,
      detail,
      icon
    } = this.props;

    const classes = cx(
      'label',
      classByKey(icon, 'has-icon'),
      classByPattern(color, 'is-%value%'),
      className
    );

    const rest = getUnhandledProps(Label, this.props);
    const ElementType = getElementType(Label, this.props);

    if (!childrenUtils.isNil(children)) {
      return (
        <ElementType {...rest} className={classes}>
          {children}
        </ElementType>
      );
    }

    return (
      <ElementType {...rest} className={classes} onClick={this.handleClick}>
        {icon && Icon.create(icon, { autoGenerateKey: false })}
        {content}
        {detail && LabelDetail.create(detail, { autoGenerateKey: false })}
      </ElementType>
    );
  }

}

Label.create = createShorthandFactory(Label, content => ({ content }));

export default Label;

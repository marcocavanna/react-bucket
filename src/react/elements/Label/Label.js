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
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** User Defined Class */
    className: PropTypes.string,

    /** Color Props */
    color: PropTypes.string,

    /** Content ShortHand */
    content: PropTypes.node,

    /** Set danger color */
    danger: PropTypes.bool,

    /** Detail Shorthand */
    detail: PropTypes.any,

    /** Icon Shorthand */
    icon: customPropTypes.fontAwesome,

    /** Set info color */
    info: PropTypes.bool,

    /**
     * Called after user's click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** Set primary color */
    primary: PropTypes.bool,

    /** Set success color */
    success: PropTypes.bool,

    /** Set warning color */
    warning: PropTypes.bool
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
      danger,
      detail,
      icon,
      info,
      primary,
      success,
      warning
    } = this.props;

    const classes = cx(
      'label',
      classByKey(icon, 'has-icon'),
      classByKey(danger, 'is-danger'),
      classByKey(info, 'is-info'),
      classByKey(primary, 'is-primary'),
      classByKey(success, 'is-success'),
      classByKey(warning, 'is-warning'),
      classByPattern(color, 'is-%value%'),
      className
    );

    const rest = getUnhandledProps(Label, this.props);
    const ElementType = getElementType(Label, this.props);

    if (!childrenUtils.isNil(children)) {
      return (
        <div className='label-wrapper'>
          <ElementType {...rest} className={classes}>
            {children}
          </ElementType>
        </div>
      );
    }

    return (
      <div className='label-wrapper'>
        <ElementType {...rest} className={classes} onClick={this.handleClick}>
          {icon && Icon.create(icon, { autoGenerateKey: false })}
          {content}
          {detail && LabelDetail.create(detail, { autoGenerateKey: false })}
        </ElementType>
      </div>
    );
  }

}

Label.create = createShorthandFactory(Label, content => ({ content }));

export default Label;

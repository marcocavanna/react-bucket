import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  customPropTypes,
  classByKey,
  classByPattern,
  getElementType,
  getUnhandledProps,
  createHTMLParagraph
} from '../../lib';

import MessageContent from './MessageContent';
import MessageHeader from './MessageHeader';
import MessageItem from './MessageItem';
import MessageList from './MessageList';

import Button from '../../elements/Button';
import Icon from '../../elements/Icon';

export default class Message extends PureComponent {

  static propTypes = {
    /** Action Button */
    action: PropTypes.any,

    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: PropTypes.node,

    /** A message may be formatted to display a negative message. Same as `negative`. */
    error: PropTypes.bool,

    /** Shorthand for MessageHeader. */
    header: PropTypes.any,

    /** A message can contain an icon. */
    icon: PropTypes.oneOfType([customPropTypes.fontAwesome, PropTypes.bool]),

    /** A message may be formatted to display information. */
    info: PropTypes.bool,

    /** Array shorthand items for the MessageList. Mutually exclusive with children. */
    list: PropTypes.any,

    /**
     * A message that the user can choose to hide.
     * Called when the user clicks the "x" icon. This also adds the "x" icon.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onDismiss: PropTypes.func,

    /** A message with Primary Color */
    primary: PropTypes.bool,

    /** A message with Secondary Color */
    secondary: PropTypes.bool,

    /** A message can have different sizes. */
    size: customPropTypes.size,

    /** A message may be formatted to display a positive message.  Same as `positive`. */
    success: PropTypes.bool,

    /** A message may be formatted to display warning messages. */
    warning: PropTypes.bool
  }

  static Content = MessageContent

  static Header = MessageHeader

  static List = MessageList;

  static Item = MessageItem;

  handleDismiss = e => _.invoke(this.props, 'onDismiss', e, this.props)

  render() {

    const {
      action,
      children,
      className,
      content,
      error,
      header,
      icon,
      info,
      list,
      onDismiss,
      primary,
      secondary,
      size,
      success,
      warning
    } = this.props;

    const classes = cx(
      'message',
      classByPattern(size, 'is-%value%'),
      classByKey(action, 'has-action'),
      classByKey(icon, 'has-icon'),
      classByKey(error, 'is-danger'),
      classByKey(info, 'is-info'),
      classByKey(success, 'is-success'),
      classByKey(warning, 'is-warning'),
      classByKey(primary, 'is-primary'),
      classByKey(secondary, 'is-secondary'),
      className
    );

    const dismissIcon = onDismiss && <Icon name='times' className='dismiss' onClick={this.handleDismiss} />;

    const rest = getUnhandledProps(Message, this.props);
    const ElementType = getElementType(Message, this.props);

    if (!childrenUtils.isNil(children)) {
      return (
        <ElementType {...rest} className={classes}>
          {dismissIcon}
          {children}
        </ElementType>
      );
    }

    return (
      <ElementType {...rest} className={classes}>
        {dismissIcon}
        {icon && Icon.create(icon, { autoGenerateKey: false })}
        {(!_.isNil(header) || !_.isNil(content) || !_.isNil(list)) && (
          <MessageContent>
            {header && MessageHeader.create(header, { autoGenerateKey: false })}
            {content && createHTMLParagraph(content, { autoGenerateKey: false })}
            {list && MessageList.create(list, { autoGenerateKey: false })}
          </MessageContent>
        )}
        {action && (
          <div className='message-action has-text-right mt-2 mb-1'>
            {Button.create(action, { autoGenerateKey: false })}
          </div>
        )}
      </ElementType>
    );

  }

}

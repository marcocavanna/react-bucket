/* eslint-disable react/require-optimization */
import React from 'react';
import ButterToast from 'butter-toast';

import { isObject } from '@appbuckets/rabbit';

import { Toast } from '../../../../../src/react';

class TrayManager {

  constructor(namespace, Component, componentProps) {
    this.Component = Component;
    this.componentProps = componentProps;
    this.namespace = namespace;
  }

  show = (_contentProps, options = {}, overrideProps = {}) => {

    const contentProps = (() => {
      /** If is an Object, return as is */
      if (isObject(_contentProps)) {
        return _contentProps;
      }

      return { header: _contentProps };
    })();

    /** If no contentProps, stop */
    if (contentProps === null) {
      return;
    }

    /** Get Original onClick event */
    const { onClick: handleClick } = contentProps;

    const props = {
      ...this.componentProps,
      ...contentProps,
      ...overrideProps
    };

    const { Component } = this;

    /** Get Raise Props */
    const {
      namespace = this.namespace,
      content,
      timeout = 6000,
      sticky,
      dismiss,
      onClick = handleClick,
      pauseOnHover,
      ...rest
    } = options;

    ButterToast.raise({
      namespace,
      timeout,
      sticky,
      dismiss,
      onClick,
      pauseOnHover,
      content: butterProps => <Component {...rest} {...props} {...butterProps} />
    });
  }

  default = (props, options) => this.show(props, options, { dismissable: true });

  error = (props, options) => this.show(props, options, { error: true, icon: 'times circle', dismissable: true })

  info = (props, options) => this.show(props, options, { info: true, icon: 'info', dismissable: true })

  primary = (props, options) => this.show(props, options, { primary: true, dismissable: true })

  secondary = (props, options) => this.show(props, options, { secondary: true, dismissable: true })

  success = (props, options) => this.show(props, options, { success: true, icon: 'check', dismissable: true })

  warning = (props, options) => this.show(props, options, { warning: true, icon: 'exclamation circle', dismissable: true })

  auto = (props, options) => {
    let _show;

    ['error', 'warning', 'success', 'info', 'primary', 'secondary'].forEach((method) => {
      if (props[method] && this[method] && !_show) {
        _show = this[method];
      }
    });

    return _show ? _show(props, options) : this.default(props, options);
  }

}

const NotificationController = new TrayManager('notification-container', Toast);
const ToastController = new TrayManager('toast-container', Toast);

export {
  NotificationController as Notification,
  ToastController as Toast
};

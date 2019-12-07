import React from 'react';

import ButterToast from 'butter-toast';

import loadComponentInfo from '../../util/loadComponentInfo';
import ToastInfo from '../../component-info/Toast.info.json';
import { Toast } from './NotificationManager';

import { Button } from '../../../../../src/react';

export default {
  path: '/toast',

  icon: 'bread slice',

  hero: {
    header  : 'Toast',
    content : 'A Toast is a push notification'
  },

  props: {
    Toast: {
      ...loadComponentInfo(ToastInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Toast',
      subheader : 'Simple Toast notification',
      content   : () => {

        const handleClick = () => {

          Toast.info('Clicked');

        };

        return (
          <React.Fragment>
            <Button content='click' onClick={handleClick} />

            <ButterToast
              className='toasts'
              namespace='toast-container'
              position={{
                horizontal : 'POS_CENTER',
                vertical   : 'POS_BOTTOM'
              }}
            />
          </React.Fragment>
        );
      }
    },

    error: {
      header    : 'Error',
      subheader : 'A Toast can notificate an error',
      content   : () => {

        const handleClick = () => {
          Toast.error('Error');
        };

        return (
          <React.Fragment>
            <Button danger content='Error Toast' onClick={handleClick} />
          </React.Fragment>
        );

      }
    },

    primary: {
      header    : 'Primary',
      subheader : 'A Toast can be formatted in primary style',
      content   : () => {

        const handleClick = () => {
          Toast.primary('Clicked');
        };

        return (
          <React.Fragment>
            <Button primary content='primary toast' onClick={handleClick} />
          </React.Fragment>
        );

      }
    },

    success: {
      header    : 'Success',
      subheader : 'A Toast can be success',
      content   : () => {

        const handleClick = () => {
          Toast.success('Action Complete');
        };

        return (
          <React.Fragment>
            <Button success content='Success Toast' onClick={handleClick} />
          </React.Fragment>
        );

      }
    },

    warning: {
      header    : 'Warning',
      subheader : 'A Toast can be warning',
      content   : () => {

        const handleClick = () => {
          Toast.warning('Warning!');
        };

        return (
          <React.Fragment>
            <Button warning content='Warning Toast' onClick={handleClick} />
          </React.Fragment>
        );

      }
    }

  }

};

import * as React from 'react';

import { Modal } from './index';
import { Button } from '../../elements/Button';


export default { title: 'Modules/Modal', component: Modal };


export const baseModal = () => {
  return (
    <Modal
      closeOnDocumentClick
      trigger={(
        <Button
          content={'Apri Modale'}
        />
      )}
      icon={{
        name   : 'google',
        primary: true
      }}
      header={{
        content  : 'Product Designer',
        subheader: 'Cracow, Poland',
        meta     : '3 days ago'
      }}
      content={'Lorem ipsum dolor sit amen Lorem ipsum dolor sit amen Lorem ipsum dolor sit amen Lorem ipsum dolor sit amen Lorem ipsum dolor sit amen Lorem ipsum dolor sit amen Lorem ipsum dolor sit amen'}
      actions={[
        {
          key    : 0,
          content: 'Cancella'
        },
        {
          key    : 1,
          content: 'Fantastico',
          primary: true
        }
      ]}
      textAlign={'center'}
      size={'small'}
    />
  );
};

import * as React from 'react';
import { Button } from '../../elements/Button';
import { Modal } from '../../modules/Modal';
import { Column, Row } from '../Grid';
import {
  FormFormik,
  FormikInput,
  FormFormikActionHandler,
  FormikTime,
  FormikDayPicker
} from './index';


export default { title: 'Collections/Form', component: FormFormik };

type Contact = {
  name: string,
  surname: string,
  date: number | null,
  time: number | null
};

export const formikForm = () => {

  const handleSubmit: FormFormikActionHandler<Contact> = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ processed: 'OK' });
      }, 1500);
    });
  };

  return (
    <Modal
      header={'Add new User'}
      icon={{
        name   : 'user plus',
        primary: true
      }}
      trigger={(
        <Button content={'Open Modal'} />
      )}
    >
      <FormFormik<Contact>
        formActionWrapper={Modal.Actions}
        formContentWrapper={Modal.Content}
        onSubmit={handleSubmit}
        submitButton={'Save'}
        initialValues={{
          name   : '',
          surname: '',
          date   : null,
          time   : null
        }}
      >
        <Row>
          <Column>
            <FormikInput
              name={'name'}
              label={'First Name'}
              icon={'user'}
            />
          </Column>
          <Column>
            <FormikInput
              name={'surname'}
              label={'Last Name'}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <FormikDayPicker
              clearable
              name={'date'}
              label={'Day'}
            />
          </Column>
          <Column>
            <FormikTime
              name={'time'}
              label={'Hour'}
            />
          </Column>
        </Row>
      </FormFormik>
    </Modal>
  );

};

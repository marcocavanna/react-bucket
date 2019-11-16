import * as React from 'react'

import { SelectProps } from '../../elements/Select';

export interface FormikSelectProps extends StrictFormikSelectProps {
  [key: string]: any
}

export interface StrictFormikSelectProps extends SelectProps {

}

interface FormikSelectComponent extends React.StatelessComponent<FormikSelectProps> { }

declare const FormikSelect: FormikSelectComponent

export default FormikSelect

import * as React from 'react'

import { PlaceProps } from '../../elements/Place'

export interface FormikPlaceProps extends StrictFormikPlaceProps {
  [key: string]: any
}

export interface StrictFormikPlaceProps extends PlaceProps { }

interface FormikPlaceComponent extends React.StatelessComponent<FormikPlaceProps> { }

declare const FormikPlace: FormikPlaceComponent

export default FormikPlace

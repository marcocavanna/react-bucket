import * as React from 'react'

import { SelectProps } from '../Select'

export interface PlaceProps extends StrictPlaceProps {
  [key: string]: any
}

export interface StrictPlaceProps extends SelectProps { }

interface PlaceComponent extends React.StatelessComponent<PlaceProps> { }

declare const Place: PlaceComponent

export default Place

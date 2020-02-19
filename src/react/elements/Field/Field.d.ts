import * as React from 'react'

import {
  ReactBucketCOLOR,
  ReactBucketSIZE,
  ReactBucketICON,
  ReactBucketShorthandItem,
  ReactBucketALIGN
} from '../../generic';

import { ButtonProps } from '../Button';

export interface FieldProps extends StrictFieldProps {
  [key: string]: any
}

export interface StrictFieldProps {
  /** Action Button */
  action?: ReactBucketShorthandItem<ButtonProps>

  /** Action Position */
  actionPosition?: 'left' | 'right'

  /** An element used to render */
  as?: React.ElementType

  /** Bordered Field */
  bordered?: boolean

  /** Set a field as a Checkbox container */
  checkbox?: boolean

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Content Element */
  content?: React.ReactNode

  /** ClassName for Content Element */
  contentClassName?: string

  /** Disabled Field */
  disabled?: boolean

  /** Set style as Editor Container */
  editor?: boolean

  /** Error Style */
  error?: boolean

  /** Draw Flat and Borderless */
  flat?: boolean

  /** Focused Field */
  focus?: boolean

  /** Set field as Form Element container */
  form?: boolean

  /** Full width field */
  full?: boolean

  /** Hint Element */
  hint?: React.ReactNode

  /** The hint color */
  hintColor?: ReactBucketCOLOR

  /** Icon Element */
  icon?: ReactBucketICON

  /** Display field as inline */
  inline?: boolean

  /** Icon Position */
  iconPosition?: 'left' | 'right'

  /** Place an inline Label */
  inlineLabel?: string

  /** Set the position of the inline label */
  inlineLabelPosition?: 'left' | 'right'

  /** Set the field as an input container */
  input?: boolean

  /** Set the Field Label */
  label?: string

  /** Input messages to Show */
  messages?: React.ReactNode[]

  /** Set the Field as Required */
  required?: boolean

  /** Adjust field size */
  size?: ReactBucketSIZE

  /** Set the Success Style */
  success?: boolean

  /** Set the field as simple text container */
  text?: boolean

  /** Set the Text Alignment */
  textAlign?: ReactBucketALIGN

  /** Set the Warning Style */
  warning?: boolean

}

declare const Field: React.FunctionComponent<FieldProps>

export default Field

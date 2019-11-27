import * as React from 'react'

import { AppBucketsCOLORS, AppBucketsSIZE, ReactBucketICON } from '../../generic';

export interface FieldProps extends StrictFieldProps {
  [key: string]: any
}

export interface StrictFieldProps {
  /** Action Button */
  action?: any,

  /** Action Position */
  actionPosition?: 'left' | 'right'

  /** An element used to render */
  as?: any,

  /** Bordered Field */
  bordered?: boolean

  /** Set a field as a Checkbox container */
  checkbox?: boolean

  /** Children Node */
  children?: React.ReactNode,

  /** User defined class */
  className?: string,

  /** Content Element */
  content?: React.ReactNode,

  /** ClassName for Content Element */
  contentClassName?: string

  /** Disabled Field */
  disabled?: boolean

  /** Error Style */
  error?: boolean

  /** Focused Field */
  focus?: boolean

  /** Set field as Form Element container */
  form?: boolean

  /** Full width field */
  full?: boolean

  /** Hint Element */
  hint?: any

  /** The hint color */
  hintColor?: AppBucketsCOLORS

  /** Icon Element */
  icon?: ReactBucketICON

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
  messages?: string[]

  /** Set the Field as Required */
  required?: boolean

  /** Adjust field size */
  size?: AppBucketsSIZE

  /** Set the Success Style */
  success?: boolean

  /** Set the field as simple text container */
  text?: boolean

  /** Set the Warning Style */
  warning?: boolean

}

interface FieldComponent extends React.StatelessComponent<FieldProps> { }

declare const Field: FieldComponent

export default Field

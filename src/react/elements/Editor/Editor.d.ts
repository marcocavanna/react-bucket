import * as React from 'react'

import { RawDraftContentState, EditorState } from 'draft-js';

import { FieldProps } from '../Field';

declare interface ExtendedEditorProps extends EditorProps {
  value: EditorState,
  rawValue: RawDraftContentState,
  htmlValue: string
}

export interface EditorProps extends StrictEditorProps {
  [key: string]: any
}

export interface StrictEditorProps extends FieldProps {
  /** An element used to render */
  as?: any,

  /** User defined class */
  className?: string,

  /** Default initial value */
  defaultValue?: EditorState | string

  /** Set editor as disabled */
  disabled?: boolean,

  /** Set max Tab Depth */
  maxTabDepth?: number

  /** Field Name */
  name?: string

  /** On Blur Handler */
  onBlur?: (e: React.FocusEvent<any>, props: ExtendedEditorProps) => void

  /** On Change Handler */
  onChange?: (nothing: void, props: ExtendedEditorProps) => void

  /** On Focus Handler */
  onFocus?: (e: React.FocusEvent<any>, props: ExtendedEditorProps) => void

  /** Placeholder text */
  placeholder?: string

  /** Set editor as Read Only */
  readOnly?: boolean

  /** Set the Tab Index */
  tabIndex?: number | string

  /** Set Editor Value */
  value?: EditorState

}

interface EditorComponent extends React.StatelessComponent<EditorProps> { }

declare const Editor: EditorComponent

export default Editor

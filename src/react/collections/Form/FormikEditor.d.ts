import * as React from 'react';

import { EditorProps } from '../../elements/Editor';

export interface FormikEditorProps extends EditorProps { }

interface FormikEditorComponent extends React.FunctionComponent<FormikEditorProps> { }

declare const FormikEditor: FormikEditorComponent

export default FormikEditor

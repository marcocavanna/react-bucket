import * as React from 'react';
import { FormFormikProps } from './FormFormik.types';
declare function FormFormik<Values = any, SubmitResult = any>(
  props: FormFormikProps<Values, SubmitResult>
): React.ReactElement<FormFormikProps<Values, SubmitResult>>;
declare namespace FormFormik {
  var defaultProps: Partial<FormFormikProps<any, any>>;
}
export default FormFormik;

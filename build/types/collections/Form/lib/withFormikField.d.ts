import {
  FormikFieldComponent,
  WithFormikFieldConfiguration,
  WrappedComponentInnerProps,
} from './withFormikField.types';
export default function withFormikField<
  P extends WrappedComponentInnerProps,
  ValueType = any,
  DisplayedValue = ValueType
>(
  configuration: WithFormikFieldConfiguration<P, ValueType, DisplayedValue>
): FormikFieldComponent<P>;

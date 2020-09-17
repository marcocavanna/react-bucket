import * as React from 'react';

import { FieldProps } from './Field.types';
import Field from './Field';


interface InternalFieldState {
  isDirty: boolean;

  isFocused: boolean;

  isTouched: boolean;
}

export default class ControlledStateField
  extends React.Component<FieldProps, InternalFieldState> {

  /* --------
   * Set the Default Component Props
   * -------- */
  static defaultProps = {
    actionPosition: 'right',
    iconPosition  : 'left'
  } as Partial<FieldProps>;


  /* --------
   * State Definition
   * -------- */
  state: InternalFieldState = {
    isDirty  : !!this.props.isDirty,
    isFocused: !!this.props.isFocused,
    isTouched: !!this.props.isTouched
  };


  /* --------
   * State Management Handlers
   * -------- */
  setIsFocused = (nextIsFocused: boolean) => {
    if (nextIsFocused !== this.state.isFocused) {
      this.setState({ isFocused: nextIsFocused, isTouched: true });
    }
  };

  setIsDirty = (nextIsDirty: boolean) => {
    if (nextIsDirty !== this.state.isDirty) {
      this.setState({ isDirty: nextIsDirty });
    }
  };

  setIsTouched = (nextIsTouched: boolean) => {
    if (nextIsTouched !== this.state.isTouched) {
      this.setState({ isTouched: nextIsTouched });
    }
  };

  resetState = () => {
    this.setState({ isTouched: false, isDirty: false });
  };


  /* --------
   * Component Render Function
   * -------- */
  public render() {
    return (
      <Field
        {...this.props}
        {...this.state}
      />
    );
  }

}

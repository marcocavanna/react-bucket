import * as React from 'react';

import {
  ReactBucketComponentProps
} from '../../generic';


export interface FormProps extends ReactBucketComponentProps<StrictFormProps, 'form'> {
}

export interface StrictFormProps {
  /** Disable form submit */
  disabled?: boolean;

  /** On Form Submit handler */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, props: FormProps) => void;
}

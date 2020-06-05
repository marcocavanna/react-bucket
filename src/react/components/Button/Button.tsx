import * as React from 'react';

import { ButtonProps } from './Button.types';

export default ({ content, ...rest }: ButtonProps) => (
  <button {...rest} className={'button'}>{content}</button>
);

import * as React from 'react';
import { render } from '@testing-library/react';

import Button from './Button';
import { ButtonProps } from './Button.types';

describe('Buttons', () => {

  const renderComponent = (props?: ButtonProps) => render(<Button {...props} data-testid={'button'} />);

  it('should render with default class', () => {
    const { getByTestId } = renderComponent();

    const buttonComponent = getByTestId('button');

    expect(buttonComponent).toHaveClass('button');
  });

});

import * as React from 'react';

import { render } from '@testing-library/react';


export interface ComponentRenderOptions<P = {}> {
  /** A must have className */
  hasClassName?: string[];

  /** An object with required props to render the component */
  requiredProps?: P;
}

export default function componentCorrectlyRender(
  Component: React.ComponentType<{ 'data-testid': string, [key: string]: any }>,
  options?: ComponentRenderOptions
) {

  const {
    hasClassName,
    requiredProps
  } = options ?? {};

  const renderComponent = () => {
    const {
      getByTestId
    } = render(
      <Component
        {...requiredProps}
        data-testid={'my-component'}
      />
    );

    return getByTestId('my-component');
  };

  describe('component render (common)', () => {

    it('should be in DOM', () => {
      const component = renderComponent();
      expect(component).toBeInTheDocument();
    });

    if (hasClassName) {
      it(`should have '${hasClassName.join(', ')}' className by default`, () => {
        const component = renderComponent();
        expect(component).toHaveClass(...hasClassName);
      });
    }

  });
}

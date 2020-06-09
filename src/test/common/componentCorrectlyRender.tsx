import * as React from 'react';

import { render } from '@testing-library/react';


export interface ComponentRenderOptions<P = {}> {
  /** A must have className */
  hasClassName?: string[];

  /** Check if Children are rendered */
  injectChildren?: boolean;

  /** An object with required props to render the component */
  requiredProps?: P;
}

export default function componentCorrectlyRender(
  Component: any,
  options?: ComponentRenderOptions
) {

  const {
    hasClassName,
    injectChildren = true,
    requiredProps
  } = options ?? {};

  const renderComponent = (props?: any) => {
    const {
      getByTestId
    } = render(
      <Component
        {...requiredProps}
        {...props}
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

    if (injectChildren) {
      it('should render children', () => {
        const component = renderComponent({ children: <span className={'children'}>The Children</span> });
        expect(component.getElementsByClassName('children').length).toBeTruthy();
      });
    }

    if (hasClassName) {
      it(`should have '${hasClassName.join(', ')}' className by default`, () => {
        const component = renderComponent();
        expect(component).toHaveClass(...hasClassName);
      });
    }

  });
}

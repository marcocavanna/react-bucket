import * as React from 'react';

import { render } from '@testing-library/react';


export default function itWillHaveSharedClassName(Component: any) {

  const renderComponent = (props?: any) => {
    const {
      getByTestId
    } = render(
      <Component
        {...props}
        data-testid={'my-component'}
      />
    );

    return getByTestId('my-component');
  };

  describe(`component ${Component.displayName} will have state class`, () => {

    it('will set the danger state', () => {
      const component = renderComponent({ danger: true });
      expect(component).toHaveClass('is-danger');
    });

    it('will set the info state', () => {
      const component = renderComponent({ info: true });
      expect(component).toHaveClass('is-info');
    });

    it('will set the primary state', () => {
      const component = renderComponent({ primary: true });
      expect(component).toHaveClass('is-primary');
    });

    it('will set the secondary state', () => {
      const component = renderComponent({ secondary: true });
      expect(component).toHaveClass('is-secondary');
    });

    it('will set the success state', () => {
      const component = renderComponent({ success: true });
      expect(component).toHaveClass('is-success');
    });

    it('will set the warning state', () => {
      const component = renderComponent({ warning: true });
      expect(component).toHaveClass('is-warning');
    });

    it('will set custom appearance state', () => {
      const component = renderComponent({ appearance: 'amazon' });
      expect(component).toHaveClass('is-amazon');
    });

  });
}

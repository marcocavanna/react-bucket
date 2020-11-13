import * as React from 'react';

import { render } from '@testing-library/react';
import { getElementType } from '@appbuckets/react-ui-core';


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

  describe(`component ${Component.displayName} will have shared class`, () => {

    it('will use default element type', () => {
      const ElementType = getElementType(Component, {});

      if (typeof ElementType === 'string') {
        const component = renderComponent();
        expect(component.tagName.toUpperCase()).toBe(ElementType.toUpperCase());
      }
    });

    it('will be rendered with custom type', () => {
      const component = renderComponent({ as: 'span' });
      expect(component.tagName.toUpperCase()).toBe('SPAN');
    });

    it('will set the background color', () => {
      const component = renderComponent({ backgroundColor: 'primary' });
      expect(component).toHaveClass('has-background-primary');
    });

    it('will set the font weight', () => {
      const component = renderComponent({ fontWeight: 'bold' });
      expect(component).toHaveClass('has-font-bold');
    });

    it('will set size', () => {
      const component = renderComponent({ size: 'big' });
      expect(component).toHaveClass('is-big');
    });

    it('will set text align', () => {
      const component = renderComponent({ textAlign: 'center' });
      expect(component).toHaveClass('has-text-center');
    });

    it('will set the text color', () => {
      const component = renderComponent({ textColor: 'danger' });
      expect(component).toHaveClass('has-text-danger');
    });

  });
}

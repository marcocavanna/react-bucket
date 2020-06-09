import * as React from 'react';

import { render } from '@testing-library/react';


export function itWillSetContainerResponsiveClassName(Component: any) {

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

  describe(`component ${Component.displayName} will set responsive container className`, () => {

    it('will use columns align plain property', () => {
      const component = renderComponent({ columnsAlign: 'on end' });
      expect(component).toHaveClass('on-end');
    });

    it('will use columns align object property', () => {
      const component = renderComponent({
        columnsAlign: {
          phoneUp       : 'on start',
          tabletUp      : 'centered',
          desktopUp     : 'on end',
          largeDesktopUp: 'spaced between'
        }
      });
      expect(component)
        .toHaveClass('on-phone-on-start', 'on-tablet-centered', 'on-desktop-on-end', 'on-large-desktop-spaced-between');
    });

    it('will use vertical align plain property', () => {
      const component = renderComponent({ verticalAlign: 'on top' });
      expect(component).toHaveClass('on-top');
    });

    it('will use vertical align object property', () => {
      const component = renderComponent({
        verticalAlign: {
          phoneUp       : 'stretched',
          tabletUp      : 'on bottom',
          desktopUp     : 'on top',
          largeDesktopUp: 'center'
        }
      });
      expect(component)
        .toHaveClass('on-phone-stretched', 'on-tablet-on-bottom', 'on-desktop-on-top', 'on-large-desktop-center');
    });

    it('will use without gap plain property', () => {
      const component = renderComponent({ withoutGap: true });
      expect(component).toHaveClass('without-gap');
    });

    it('will use without gap object property', () => {
      const component = renderComponent({
        withoutGap: {
          phoneUp  : true,
          desktopUp: true
        }
      });
      expect(component)
        .toHaveClass('on-phone-without-gap', 'on-desktop-without-gap');
    });
  });

}


export function itWillSetContentResponsiveClassName(Component: any) {

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

  describe(`component ${Component.displayName} will set responsive content className`, () => {

    it('will use columns width plain property', () => {
      const component = renderComponent({ width: '8' });
      expect(component).toHaveClass('is-8');
    });

    it('will use columns width object property', () => {
      const component = renderComponent({
        width: {
          phoneUp       : '24',
          tabletUp      : '8',
          desktopUp     : '12',
          largeDesktopUp: '16'
        }
      });
      expect(component)
        .toHaveClass('on-phone-is-24', 'on-tablet-is-8', 'on-desktop-is-12', 'on-large-desktop-is-16');
    });

    it('will use vertical align plain property', () => {
      const component = renderComponent({ verticalAlign: 'on top' });
      expect(component).toHaveClass('on-top');
    });

    it('will use vertical align object property', () => {
      const component = renderComponent({
        verticalAlign: {
          phoneUp       : 'stretched',
          tabletUp      : 'on bottom',
          desktopUp     : 'on top',
          largeDesktopUp: 'center'
        }
      });
      expect(component)
        .toHaveClass('on-phone-stretched', 'on-tablet-on-bottom', 'on-desktop-on-top', 'on-large-desktop-center');
    });

    it('will use offset plain property', () => {
      const component = renderComponent({ offsetBy: 8 });
      expect(component).toHaveClass('offset-by-8');
    });

    it('will use offset object property', () => {
      const component = renderComponent({
        offsetBy: {
          phoneUp       : 12,
          tabletUp      : 18,
          desktopUp     : 8,
          largeDesktopUp: 4
        }
      });
      expect(component)
        .toHaveClass(
          'on-phone-offset-by-12',
          'on-tablet-offset-by-18',
          'on-desktop-offset-by-8',
          'on-large-desktop-offset-by-4'
        );
    });
  });

}

import * as React from 'react';

import { getRenderTools } from '../lib';


export interface HandleClickOptions {
  /** Choose if must check second argument are component props */
  eventWillPassProps?: boolean;

  /** Choose if must test click on disabled element */
  testDisabled?: boolean;
}


export default function itWillHandleMouseEvents<P, K extends keyof P>(
  Component: React.ComponentType<P>,
  mouseEventProp: K,
  trigger?: (component: HTMLElement) => void,
  options?: HandleClickOptions
) {

  const {
    eventWillPassProps = true,
    testDisabled = true
  } = options ?? {};

  const { getComponentElement } = getRenderTools(Component);

  const triggerEvent = trigger || ((component: HTMLElement) => component.click());

  it(`will invoke the ${mouseEventProp} event handler function`, () => {
    const mockCallback = jest.fn();
    const component = getComponentElement({ [mouseEventProp]: mockCallback } as unknown as P);
    triggerEvent(component);
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  if (testDisabled) {
    it(`will ignore the ${mouseEventProp} event handler if disabled`, () => {
      const mockCallback = jest.fn();
      const component = getComponentElement({
        [mouseEventProp]: mockCallback,
        as              : 'div',
        disabled        : true
      } as unknown as P);
      triggerEvent(component);
      expect(mockCallback.mock.calls.length).toBe(0);
    });
  }

  it(`won't throw error if ${mouseEventProp} event handler doesn't exists`, () => {
    const component = getComponentElement();
    expect(() => component.click()).not.toThrow();
  });

  if (eventWillPassProps) {
    it(`it will receive component props on ${mouseEventProp} event`, () => {
      let handledProps: any = null;

      const handleMouseEvent = (even: any, props: any) => {
        handledProps = props;
      };

      // Silent console.error
      // tslint:disable-next-line:no-empty
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {
      });

      const component = getComponentElement({
        theAnswerToLifeTheUniverseAndEverything: 42,
        [mouseEventProp]                       : handleMouseEvent
      } as unknown as P);

      triggerEvent(component);

      expect(typeof handledProps === 'object' && handledProps !== null).toBe(true);
      expect(handledProps.theAnswerToLifeTheUniverseAndEverything).toBe(42);
      expect(handledProps[mouseEventProp] === handleMouseEvent).toBe(true);

      spy.mockRestore();
    });
  }
}

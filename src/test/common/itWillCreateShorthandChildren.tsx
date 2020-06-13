import * as React from 'react';

import { getRenderTools } from '../lib';


export default function itWillCreateShorthandChildren<P, K extends keyof P>(
  Component: React.ComponentType<P>,
  prop: K,
  value: P[K]
) {

  describe('it will create shorthand children using props', () => {
    /** Build Render Tools */
    const renderTools = getRenderTools<P>(Component, { [prop]: value } as unknown as P);

    /** If value is not an array, try to find it */
    if (!Array.isArray(value)) {
      /** If is not an object, search by text */
      if (typeof (value as unknown as string) === 'string' || typeof (value as unknown as string) === 'number') {
        it('will create a single element using primitive value', () => {
          /** Get the rendered Element */
          const { getChildByText } = renderTools;
          const child = getChildByText((value as unknown as number | string).toString());
          expect(child).toBeInTheDocument();
        });
      }
      else if (typeof value === 'object' && value !== null) {
        /** Add the testID to value */
        // @ts-ignore
        value['data-testid'] = 'child-component';
        /** Render and get child */
        it('will create a single element using object value', () => {
          const { getChildByTestId } = renderTools;
          const child = getChildByTestId('child-component', { [prop]: value } as unknown as P);
          expect(child).toBeInTheDocument();
        });
      }
    }
    else {
      it('will create children element using an array of props', () => {
        /** Remap value, adding testid */
        value.map((v, ix) => {
          v.key = ix;
          v['data-testid'] = 'children-component';
          return v;
        });
        /** Render the Content */
        const { getChildrenByTestId } = renderTools;
        const children = getChildrenByTestId('children-component', { [prop]: value } as unknown as P);
        expect(children.length).toBe(value.length);
      });
    }

  });

}

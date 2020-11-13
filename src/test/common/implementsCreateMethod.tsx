import * as React from 'react';


export default function implementsCreateMethods(Component: any) {

  const { displayName } = Component;

  describe('create shorthand method (common)', () => {

    it('is a static method', () => {
      expect(typeof Component.create).toBe('function');
    });

    it(`creates a ${displayName} from a string`, () => {
      expect(React.isValidElement(Component.create('foo', { autoGenerateKey: false }))).toBe(true);
    });

    it(`creates a ${displayName} from a number`, () => {
      expect(React.isValidElement(Component.create(154, { autoGenerateKey: false }))).toBe(true);
    });

    it(`creates a ${displayName} from a 0 number`, () => {
      expect(React.isValidElement(Component.create(0, { autoGenerateKey: false }))).toBe(true);
    });

    it(`creates a ${displayName} from an object`, () => {
      expect(React.isValidElement(Component.create({ 'data-create': 'factory' }, { autoGenerateKey: false })))
        .toBe(true);
    });

    it(`creates a ${displayName} from an array`, () => {
      expect(React.isValidElement(Component.create(
        [ 'foo', 145, { 'data-create': 'factory' } ],
        { autoGenerateKey: false }
      ))).toBe(true);
    });

    it(`creates a ${displayName} from an element`, () => {
      expect(React.isValidElement(Component.create(<div />, { autoGenerateKey: false }))).toBe(true);
    });

    it('returns null if passed null', () => {
      expect(Component.create(null, { autoGenerateKey: false })).toBe(null);
    });

    it('returns null if passed undefined', () => {
      expect(Component.create(undefined, { autoGenerateKey: false })).toBe(null);
    });

    it('returns null if passed true', () => {
      expect(Component.create(true, { autoGenerateKey: false })).toBe(null);
    });

    it('returns null if passed false', () => {
      expect(Component.create(false, { autoGenerateKey: false })).toBe(null);
    });

  });
}

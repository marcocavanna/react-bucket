import { resolve } from 'path';
import { DeclaredInterface, getInterfaces, getNodes, requireTs } from './tsHelpers';


export interface ComponentDeclarationTestOptions {
  /** Component File Path */
  filePath: string[];
}

export default function assertComponentDeclaration(
  Component: any,
  options: ComponentDeclarationTestOptions
) {

  const { displayName } = Component;
  const componentPath = resolve(__dirname, '..', '..', 'react', ...options.filePath, `${displayName}.types.ts`);

  // Read TS File
  const tsFile = requireTs(componentPath);

  // Build Interfaces Name
  const propsInterfaceName = `${displayName}Props`;
  const strictInterfaceName = `Strict${displayName}Props`;

  // Check Display Name is Valid
  describe('Component displayName', () => {
    it('should have the displayName props', () => {
      expect(typeof displayName === 'string').toBe(true);
      expect((displayName?.length ?? 0) > 0).toBe(true);
    });
  });

  // Check Typings
  describe('Types', () => {
    // Types file Exists
    it('should have right type file', () => {
      expect(tsFile).not.toBe(undefined);
    });

    // Build Nodes from typescript file
    const tsNodes = getNodes(componentPath, typeof tsFile === 'string' ? tsFile : '');

    // Get Interfaces
    const interfaces = getInterfaces(tsNodes);

    const propsInterfaceObject: DeclaredInterface | undefined = interfaces
      .find(({ name }) => name === propsInterfaceName);
    const strictInterfaceObject: DeclaredInterface | undefined = interfaces
      .find(({ name }) => name === strictInterfaceName);

    describe(`interface ${propsInterfaceName}`, () => {
      it('has interface', () => {
        expect(typeof propsInterfaceObject).toBe('object');
      });

      it('is exported', () => {
        expect(propsInterfaceObject?.exported).toBe(true);
      });

      it('has no members', () => {
        expect(propsInterfaceObject?.members.length).toBe(0);
      });
    });

    describe(`interface ${strictInterfaceName}`, () => {
      it('has interface', () => {
        expect(typeof strictInterfaceObject).toBe('object');
      });

      it('is exported', () => {
        expect(strictInterfaceObject?.exported).toBe(true);
      });
    });

  });
}

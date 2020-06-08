import * as ts from 'typescript';

import { readFileSync, existsSync } from 'fs';


/* --------
 * TS Helpers Interfaces and Types
 * -------- */
export type DeclaredInterface = { exported: boolean, name: ts.__String };


export const requireTs = (tsPath: string): string | undefined => {
  if (!existsSync(tsPath)) {
    return;
  }

  const fileBuffer = readFileSync(tsPath);

  if (fileBuffer.length === 0) {
    return;
  }

  return fileBuffer.toString('utf8');
};


const walkNode = (node: ts.Node, nodes: ts.Node[]) => {
  ts.forEachChild(node, (child) => {
    nodes.push(child);
    walkNode(child, nodes);
    return false;
  });
};


export const getNodes = (filePath: string, tsContent: string): ts.Node[] => {
  const nodes: ts.Node[] = [];
  const source = ts.createSourceFile(filePath, tsContent, ts.ScriptTarget.Latest, true);

  walkNode(source, nodes);

  return nodes;
};


export const getInterfaces = (nodes: ts.Node[]): DeclaredInterface[] => {
  // Get all Interfaces
  const interfaces = nodes.filter((node) => node.kind === ts.SyntaxKind.InterfaceDeclaration) as ts.InterfaceDeclaration[];

  // Return props for interfaces
  return interfaces.map(({ modifiers, name }) => ({
    exported: !!(modifiers?.find(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)),
    name    : name.escapedText
  }));
};

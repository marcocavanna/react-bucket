import * as React from 'react';

import { Panel } from '../../react/elements/Panel';

import * as common from '../common';


const comps: [ React.ComponentType<any>, string, string ][] = [
  [ Panel, 'panel', 'panel' ],
  [ Panel.Header, 'panel header', 'head' ],
  [ Panel.Body, 'panel body', 'body' ],
  [ Panel.Footer, 'panel footer', 'foot' ]
];

comps.forEach(([ Component, name, className ]) => {
  describe(`testing ${name}`, () => {
    common.assertComponentDeclaration(Component, { filePath: [ 'elements', 'Panel' ] });

    common.componentCorrectlyRender(Component, { hasClassName: [ className ] });

    common.implementsCreateMethod(Component);

    common.itWillHaveSharedClassName(Component);
  });
});

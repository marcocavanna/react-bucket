import * as Grid from '../../react/collections/Grid';

import * as common from '../common';


describe('testing rows', () => {

  common.assertComponentDeclaration(Grid.Row, { filePath: [ 'collections', 'Grid' ] });

  common.componentCorrectlyRender(Grid.Row, { hasClassName: [ 'with-columns' ] });

  common.itWillHaveSharedClassName(Grid.Row);

  common.itWillSetContainerResponsiveClassName(Grid.Row);

  common.itWillCreateShorthandChildren(Grid.Row, 'columns', [ { content: 'ciao' } ]);

});


describe('testing columns', () => {

  common.assertComponentDeclaration(Grid.Column, { filePath: [ 'collections', 'Grid' ] });

  common.componentCorrectlyRender(Grid.Column, { hasClassName: [ 'column' ] });

  common.implementsCreateMethod(Grid.Column);

  common.itWillHaveSharedClassName(Grid.Column);

  common.itWillSetContentResponsiveClassName(Grid.Column);

  common.itWillCreateShorthandChildren(Grid.Column, 'content', 'Column Content');

});

import { Header } from '../../react/elements/Header';

import * as common from '../common';


describe('testing header', () => {

  common.assertComponentDeclaration(Header, { filePath: [ 'elements', 'Header' ] });

  common.componentCorrectlyRender(Header, { hasClassName: [ 'header' ], injectChildren: false });

  common.implementsCreateMethod(Header);

  common.itWillHaveSharedClassName(Header);

});


describe('testing header content', () => {

  common.assertComponentDeclaration(Header.Content, { filePath: [ 'elements', 'Header' ] });

  common.componentCorrectlyRender(Header.Content, { hasClassName: [ 'content' ] });

  common.implementsCreateMethod(Header.Content);

});


describe('testing header subheader', () => {

  common.assertComponentDeclaration(Header.Subheader, { filePath: [ 'elements', 'Header' ] });

  common.componentCorrectlyRender(Header.Subheader, { hasClassName: [ 'subheader' ] });

  common.implementsCreateMethod(Header.Subheader);

});

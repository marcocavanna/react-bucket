import * as common from '../common';

import { Button } from '../../react/elements/Button';


describe('testing button', () => {

  common.assertComponentDeclaration(Button, { filePath: [ 'elements', 'Button' ] });

  common.componentCorrectlyRender(Button, { hasClassName: [ 'button' ] });

  common.itWillHaveSharedClassName(Button);

  common.itWillHaveStateClassName(Button);

  common.implementsCreateMethod(Button);

  common.itWillCreateShorthandChildren(Button, 'content', 'Click Me!');

});


describe('testing button group', () => {

  common.assertComponentDeclaration(Button.Group, { filePath: [ 'elements', 'Button' ] });

  common.componentCorrectlyRender(Button.Group, { hasClassName: [ 'buttons' ] });

  common.itWillHaveSharedClassName(Button.Group);

  common.implementsCreateMethod(Button.Group);

  common.itWillCreateShorthandChildren(Button.Group, 'buttons', [
    { content: 'Click 1' },
    { content: 'Click 2' }
  ]);

});

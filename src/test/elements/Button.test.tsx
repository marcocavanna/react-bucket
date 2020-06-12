import * as common from '../common';

import { Button } from '../../react/elements/Button';


describe('testing button', () => {

  common.assertComponentDeclaration(Button, { filePath: [ 'elements', 'Button' ] });

  common.componentCorrectlyRender(Button, { hasClassName: [ 'button' ] });

  common.itWillHaveSharedClassName(Button);

  common.itWillHaveStateClassName(Button);

});

import * as common from '../common';
import { Icon } from '../../react/elements/Icon';


describe('testing icon', () => {

  common.assertComponentDeclaration(Icon, { filePath: [ 'elements', 'Icon' ] });

  common.componentCorrectlyRender(Icon, { hasClassName: [ 'icon' ], injectChildren: false });

  common.implementsCreateMethod(Icon);

  common.itWillHaveSharedClassName(Icon);

  common.itWillHaveStateClassName(Icon);

});

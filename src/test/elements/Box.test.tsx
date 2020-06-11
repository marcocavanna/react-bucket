import { Box } from '../../react/elements/Box';

import * as common from '../common';


describe('testing box', () => {

  common.assertComponentDeclaration(Box, { filePath: [ 'elements', 'Box' ] });

  common.componentCorrectlyRender(Box, { hasClassName: [ 'box' ] });

  common.itWillHaveSharedClassName(Box);

});

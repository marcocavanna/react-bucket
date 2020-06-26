import { LinearProgress, CircularProgress } from '../../react/elements/Progress';

import * as common from '../common';


describe('testing linear loader', () => {
  common.assertComponentDeclaration(LinearProgress, { filePath: [ 'elements', 'Progress' ] });

  common.componentCorrectlyRender(
    LinearProgress,
    { hasClassName: [ 'linear', 'progress' ], requiredProps: { value: 65 } }
  );

  common.implementsCreateMethod(LinearProgress);

});

describe('testing circular loader', () => {
  common.assertComponentDeclaration(CircularProgress, { filePath: [ 'elements', 'Progress' ] });

  common.componentCorrectlyRender(
    CircularProgress,
    { hasClassName: [ 'circular', 'progress' ], injectChildren: false, requiredProps: { value: 76 } }
  );

  common.implementsCreateMethod(CircularProgress);

});

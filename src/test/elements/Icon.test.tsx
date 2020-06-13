import { getRenderTools } from '../lib';

import * as common from '../common';

import { Icon } from '../../react/elements/Icon';


describe('testing icon', () => {

  const renderTools = getRenderTools(Icon);

  common.assertComponentDeclaration(Icon, { filePath: [ 'elements', 'Icon' ] });

  common.componentCorrectlyRender(Icon, { hasClassName: [ 'icon' ], injectChildren: false });

  common.implementsCreateMethod(Icon);

  common.itWillHaveSharedClassName(Icon);

  common.itWillHaveStateClassName(Icon);

  it('will add fontawesome class', () => {
    const { getComponentElement } = renderTools;
    const component = getComponentElement({ name: 'plus' });
    expect(component).toHaveClass('fa-plus');
  });

  it('will use fontawesome class cache', () => {
    const { getComponentElement } = renderTools;
    const component = getComponentElement({ name: 'plus' });
    expect(component).toHaveClass('fa-plus');
  });

  it('will use fontawesome class and style', () => {
    const { getComponentElement } = renderTools;
    const component = getComponentElement({ name: 'apple', iconStyle: 'brands' });
    expect(component).toHaveClass('fab', 'fa-apple');
  });

  it('will use fallback to default fontawesome class', () => {
    const { getComponentElement } = renderTools;
    const component = getComponentElement({ name: 'plus', iconStyle: 'brands' });
    expect(component).toHaveClass('fas', 'fa-plus');
  });

});

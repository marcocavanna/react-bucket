import { getRenderTools } from '../lib';

import * as common from '../common';

import { Loader } from '../../react/elements/Loader';


describe('testing loader', () => {

  const {
    getComponentElement
  } = getRenderTools(Loader);

  common.assertComponentDeclaration(Loader, { filePath: [ 'elements', 'Loader' ] });

  common.componentCorrectlyRender(Loader, { hasClassName: [ 'loader', 'active', 'circular' ] });

  common.implementsCreateMethod(Loader);

  common.itWillHaveSharedClassName(Loader);

  common.itWillHaveStateClassName(Loader);

  it('will render a indeterminate bar loader', () => {
    const component = getComponentElement({ type: 'indeterminate bar' });
    const children = component.getElementsByClassName('progress-container');
    expect(component).toHaveClass('indeterminate-bar');
    expect(children.length).toBe(1);
    expect(children[0]).toBeInTheDocument();
  });

  it('will render a dots loader', () => {
    const component = getComponentElement({ type: 'dots' });
    const children = component.getElementsByClassName('dot');
    expect(component).toHaveClass('dots');
    expect(children.length).toBe(3);
  });

  it('will render a circular dots loader', () => {
    const component = getComponentElement({ type: 'circular dots' });
    const children = component.getElementsByClassName('dot');
    expect(component).toHaveClass('circular-dots');
    expect(children.length).toBe(4);
  });

});

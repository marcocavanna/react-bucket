import { getRenderTools } from '../lib';

import * as common from '../common';

import { Button } from '../../react/elements/Button';


describe('testing button', () => {

  const {
    getComponentElement
  } = getRenderTools(Button);

  common.assertComponentDeclaration(Button, { filePath: [ 'elements', 'Button' ] });

  common.componentCorrectlyRender(Button, { hasClassName: [ 'button' ] });

  common.itWillHaveSharedClassName(Button);

  common.itWillHaveStateClassName(Button);

  common.implementsCreateMethod(Button);

  common.itWillCreateShorthandChildren(Button, 'content', 'Click Me!');

  common.itWillHandleMouseEvents(Button, 'onClick');

  it('will render a button with custom role', () => {
    const component = getComponentElement({ role: 'submit' });
    expect(component.getAttribute('role')).toBe('submit');
  });

  it('will set tabIndex to -1 if disabled', () => {
    const component = getComponentElement({ disabled: true });
    expect(component.getAttribute('tabIndex')).toBe('-1');
  });

  it('will set the custom tabIndex', () => {
    const component = getComponentElement({ tabIndex: 2 });
    expect(component.getAttribute('tabIndex')).toBe('2');
  });

  it('will set the tabIndex to 0 if rendered as a div element', () => {
    const component = getComponentElement({ as: 'div' });
    expect(component.getAttribute('tabIndex')).toBe('0');
  });

  it('will create the icon using shorthand', () => {
    const component = getComponentElement({ icon: 'plus' });
    expect(component.getElementsByClassName('fa-plus')).toHaveLength(1);
  });

  it('will set icon as-icon and fab classNames', () => {
    const asIcon = getComponentElement({ icon: 'plus', fab: true });
    expect(asIcon).toHaveClass('as-icon', 'fab');
  });

  it('will set icon with-icon className', () => {
    const withIcon = getComponentElement({ icon: 'plus', iconPosition: 'right', content: 'Click Me' });
    expect(withIcon).toHaveClass('with-icon');
  });

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

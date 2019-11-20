import React from 'react';

import Button from '../../../../src/react/elements/Button/Button';

describe('Button', () => {

  it('Renders a Default Button', () => {
    shallow(<Button />)
      .first()
      .should.have.tagName('button');
  });

});

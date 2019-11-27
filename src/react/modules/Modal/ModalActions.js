import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _ from 'lodash';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType,
  getUnhandledProps
} from '../../lib';

import Button from '../../elements/Button';

function ModalActions(props) {

  const {
    actions,
    children,
    className,
    content
  } = props;

  const handleButtonOverrides = predefinedProps => ({
    onClick: (e, buttonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps);
      _.invoke(props, 'onActionClick', e, buttonProps);
    }
  });

  const classes = cx(
    'modal-actions',
    className
  );

  const rest = getUnhandledProps(ModalActions, props);
  const ElementType = getElementType(ModalActions, props);

  if (!childrenUtils.isNil(children) || !children.isNil(content)) {
    return (
      <ElementType {...rest} className={classes}>
        {childrenUtils.isNil(children) ? content : children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {_.map(actions, action => Button.create(action, { overrideProps: handleButtonOverrides }))}
    </ElementType>
  );

}

ModalActions.propTypes = {
  /** Modal Actions Array */
  actions: PropTypes.array,

  /** An element used to render the component */
  as: PropTypes.elementType,

  /** User Defined classes */
  className: PropTypes.string,

  /** Content shorthand */
  content: PropTypes.node,

  /** On Action Click handler */
  onActionClick: PropTypes.func
};

ModalActions.create = createShorthandFactory(ModalActions, actions => ({ actions }));

export default ModalActions;

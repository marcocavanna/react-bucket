/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import {
  createShorthandFactory
} from '../../lib';

function FieldMessages(props) {

  const {
    content,
    ...rest
  } = props;

  if (!Array.isArray(content)) {
    return null;
  }

  const messages = content.filter(value => !_.isNil(value));

  if (!messages.length) {
    return null;
  }

  return (
    <div {...rest} className='addon field-messages'>
      {Array.isArray(content) ? (
        <ul>
          {content.map((el, ix) => <li key={ix}>{el}</li>)}
        </ul>
      ) : null}
    </div>
  );
}

FieldMessages.propTypes = {
  /** Messages List */
  content: PropTypes.arrayOf(PropTypes.node)
};

FieldMessages.create = createShorthandFactory(FieldMessages, content => ({ content }));

export default FieldMessages;

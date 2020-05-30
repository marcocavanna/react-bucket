import React from 'react';
import PropTypes from 'prop-types';

import { isValidString, regExpEscape } from '@appbuckets/rabbit';

import {
  getElementType,
  getUnhandledProps
} from '../../lib';

export default function Highlighter(props) {

  const {
    content,
    highlight
  } = props;

  const ElementType = getElementType(Highlighter, props);
  const rest = getUnhandledProps(Highlighter, props);

  if (!isValidString(highlight) || !isValidString(content)) {
    return <ElementType>{content}</ElementType>;
  }

  const regExp = new RegExp(regExpEscape(highlight), 'ig');
  const matches = content.match(regExp);

  if (!matches) {
    return <ElementType>{content}</ElementType>;
  }

  const result = content.split(regExp).map((partial, index) => (
    index > 0
      ? [
        // eslint-disable-next-line react/no-array-index-key
        <span key={`${partial}-${index}`} className='match'>{matches[index - 1]}</span>,
        // eslint-disable-next-line react/no-array-index-key
        <span key={`${partial}-${index}-unmatched`} className='unmatch'>{partial}</span>
      ]
      : partial
  ));

  return (
    <ElementType {...rest} className='highlighter'>
      {result}
    </ElementType>
  );
}

Highlighter.propTypes = {
  /** An element used to render the component */
  as: PropTypes.elementType,

  /** Content to Show */
  content: PropTypes.string,

  /** Content to Highlight */
  highlight: PropTypes.string
};

Highlighter.defaultProps = {
  as: 'span'
};

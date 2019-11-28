import React from 'react';
import PropTypes from 'prop-types';

import {
  childrenUtils
} from '../../lib';

import Container from '../../elements/Container';
import Loader from '../../elements/Loader';

function RxTableLoader(props) {

  /** Get Content */
  const {
    content
  } = props;

  return (
    <Container
      className='rx-table rx-table-loading'
      paddingTop='4'
      paddingBottom='5'
      content={childrenUtils.isNil(content) ? (
        <Loader active inline centered size='big' />
      ) : content}
    />
  );

}

RxTableLoader.propTypes = {
  /** Content Shorthand */
  content: PropTypes.node
};

export default RxTableLoader;

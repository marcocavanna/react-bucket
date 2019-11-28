import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../elements/Container';
import Message from '../../collections/Message';

function RxTableError(props) {

  /** Get Content */
  const {
    error,
    header
  } = props;

  return (
    <Container
      className='rx-table rx-table-loading'
      marginBottom='4'
      content={(
        <Message
          error
          header={header || 'Si è verificato un errore durante il caricamento dei dati'}
          content={error}
        />
      )}
    />
  );

}

RxTableError.propTypes = {
  /** Content Shorthand */
  error: PropTypes.any,

  /** Header Content */
  header: PropTypes.node
};

export default RxTableError;

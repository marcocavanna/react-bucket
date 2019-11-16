import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../elements/Container';
import Button from '../../elements/Button';

function RxTablePaginationWalker(props) {

  const {
    currentPage,
    onPageChange,
    totalPages,
    walkerSize
  } = props;

  /** Create the Walker */
  const walker = new Array(totalPages)
    .fill(1)
    .map((val, index) => val * (index + 1))
    .splice(
      Math.max(0, Math.min(currentPage - (walkerSize / 2) - 1, totalPages - walkerSize - 1)),
      walkerSize + 1
    );

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const handlePageChange = (newPage) => {
    if (typeof onPageChange === 'function' && newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  return (
    <Container textAlign='right'>
      <Button.Group>
        <Button icon='angle left' disabled={!hasPrevPage} onClick={() => handlePageChange(currentPage - 1)} />
        {walker.map(page => (
          <Button
            key={page}
            content={page.toString()}
            primary={page === currentPage}
            onClick={() => handlePageChange(page)}
          />
        ))}
        <Button icon='angle right' disabled={!hasNextPage} onClick={() => handlePageChange(currentPage + 1)} />
      </Button.Group>
    </Container>
  );
}

RxTablePaginationWalker.propTypes = {
  /** Current Page */
  currentPage: PropTypes.number,

  /** On Page Change Handler Function */
  onPageChange: PropTypes.func,

  /** Total Page Count */
  totalPages: PropTypes.number,

  /** Walker Size */
  walkerSize: PropTypes.number
};

RxTablePaginationWalker.defaultProps = {
  walkerSize: 10
};

export default RxTablePaginationWalker;

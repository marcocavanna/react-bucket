export default function paginate(array, _getPage = 1, _itemsPerPage = 10) {

  /** Check Param is an Array */
  if (!Array.isArray(array)) {
    throw new Error(`Expected an Array, but got ${typeof array}`);
  }

  /** Assert valid page and limit */
  const getPage = Math.max(parseInt(_getPage, 10), 1);
  const itemsPerPage = Math.max(parseInt(_itemsPerPage, 10), 1);

  /** Get Paginated Items */
  const offset = (getPage - 1) * itemsPerPage;
  const paginatedDate = array.slice(offset, offset + itemsPerPage);

  /** Get Total Pages */
  const totalPages = Math.ceil(array.length / itemsPerPage);

  /** Return Paginate Data and Prop */
  return {
    itemsPerPage,
    totalPages,
    currentPage : getPage,
    itemsCount  : array.length,
    hasNextPage : getPage < totalPages,
    hasPrevPage : getPage > 1,
    data        : paginatedDate
  };

}

import { useState, useEffect } from 'react';

export function useCreatePagination({ serverTotalItems, serverTotalPages }) {
  const [newCurrentPage, setNewCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  useEffect(() => {
    if (serverTotalItems) {
      setTotalItems(serverTotalItems);
      setTotalPages(serverTotalPages);
    }
  }, [serverTotalItems, serverTotalPages]);

  function handleSetCurrentPage(
    newCurrentPage,
    prevPageNumber,
    nextPageNumber
  ) {
    if (newCurrentPage !== '...') {
      setNewCurrentPage(newCurrentPage);
      return;
    }
    const updateCurrentPage = Math.floor((prevPageNumber + nextPageNumber) / 2);
    setNewCurrentPage(updateCurrentPage);
  }
  function checkCurrentPageAfterDelete() {
    const maxPage = Math.ceil((totalItems - 1) / 10);
    newCurrentPage > maxPage && setNewCurrentPage(prev => prev - 1 || 1);
  }
  return [
    newCurrentPage,
    totalPages,
    handleSetCurrentPage,
    checkCurrentPageAfterDelete,
  ];
}

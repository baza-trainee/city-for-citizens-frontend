import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import IconAdminPaginationArrow from '@/assets/icons/common/totalPage-arrow-icon.svg';

export default function EventPagination({ currentPage, totalPage, onClick }) {
  console.log('currentPage', currentPage, 'totalPage', totalPage);
  const maxPagePosition = 7;
  const arrayOfPageNumbers = Array.from(
    { length: maxPagePosition },
    (_, i) => i + 1
  );
  const [pages, setPages] = useState(createPagesArray(arrayOfPageNumbers));

  useEffect(() => {
    setPages(createPagesArray(arrayOfPageNumbers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  function createPagesArray([...pageArr]) {
    if (totalPage <= maxPagePosition) return arrayOfPageNumbers;
    pageArr[maxPagePosition - 1] = totalPage;
    if (currentPage <= 4) {
      pageArr[maxPagePosition - 2] = '...';
      return pageArr;
    }
    if (currentPage >= totalPage - 3) {
      pageArr[1] = '...';
      let counter = 0;
      for (let i = totalPage; i >= totalPage - 4; i--) {
        pageArr[maxPagePosition - 1 - counter] = totalPage - counter;
        counter++;
      }
      return pageArr;
    }
    pageArr[1] = '...';
    pageArr[maxPagePosition - 2] = '...';
    pageArr[2] = currentPage - 1;
    pageArr[3] = currentPage;
    pageArr[4] = currentPage + 1;
    console.log('pageArr', pageArr);
    return pageArr;
  }

  function handleChangePagination(e) {
    const arrowButton = e.target.closest('button');
    if (arrowButton.hasAttribute('data-arrow-left') && currentPage > 1) {
      onClick(currentPage - 1);
    }
    if (
      arrowButton.hasAttribute('data-arrow-right') &&
      currentPage < totalPage
    ) {
      onClick(currentPage + 1);
    }
  }

  return (
    <div className="mb-12 mt-[5rem] flex flex-grow items-end justify-end gap-x-6 tablet:mr-5 desktop:mr-[5.8rem]">
      <ol className="flex gap-x-6 font-medium tablet:text-xl laptop:text-2xl">
        {pages.map((pageNumber, i, arr) => (
          <li
            key={uuidv4()}
            onClick={() => onClick(pageNumber, arr[i - 1], arr[i + 1])}
            className={`text-admin-dark
            ${
              pageNumber === currentPage && 'bg-admin-gray'
            } flex h-11 w-11 cursor-pointer items-center justify-center rounded font-oswald transition-colors`}
          >
            {pageNumber}
          </li>
        ))}
      </ol>
      <div className="flex gap-x-5">
        <button
          className="group cursor-pointer disabled:cursor-default"
          onClick={handleChangePagination}
          disabled={currentPage === 1}
          data-arrow-left
        >
          <IconAdminPaginationArrow
            height="44"
            weight="44"
            className={`rounded-xl bg-admin-lightgray stroke-admin-dark transition-colors group-disabled:stroke-admin-darkgray`}
          />
        </button>
        <button
          className="group cursor-pointer disabled:cursor-default"
          onClick={handleChangePagination}
          disabled={currentPage >= totalPage}
          data-arrow-right
        >
          <IconAdminPaginationArrow
            height="44"
            weight="44"
            className={`-scale-x-100 rounded-xl bg-admin-lightgray stroke-admin-dark transition-colors group-disabled:stroke-admin-darkgray`}
          />
        </button>
      </div>
    </div>
  );
}

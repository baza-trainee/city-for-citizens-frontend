import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IconAdminPaginationArrow from '@/assets/icons/admin-sidebar/pagination-arrow-icon.svg';

const EventPagination = ({ currentPage, onClick }) => {
  const [pagination, setPagination] = useState(5);
  const arrayOfPageNumbers = Array.from(
    { length: pagination },
    (_, i) => i + 1
  );

  function handleChangePagination(e) {
    const arrowButton = e.target.closest('button');
    if (arrowButton.hasAttribute('data-arrow-left') && currentPage > 1) {
      onClick(currentPage - 1);
    }
    if (
      arrowButton.hasAttribute('data-arrow-right') &&
      currentPage < pagination
    ) {
      onClick(currentPage + 1);
    }
  }
  return (
    <div className="mb-12 mt-[6.7rem] flex justify-end gap-x-6 tablet:mr-10 desktop:mr-[5.8rem]">
      <ol className="flex gap-x-6 font-oswald  text-2xl font-medium">
        {arrayOfPageNumbers.map(pageNumber => (
          <li
            key={uuidv4()}
            onClick={() => onClick(pageNumber)}
            className={`text-admin-dark
            ${
              pageNumber === currentPage ? 'bg-admin-gray' : null
            } flex h-11 w-11 cursor-pointer items-center justify-center  rounded transition-colors`}
          >
            {pageNumber}
          </li>
        ))}
      </ol>
      <div className="flex gap-x-5">
        <button
          className="group cursor-pointer disabled:cursor-default"
          onClick={handleChangePagination}
          disabled={`${currentPage === 1 ? true : ''}`}
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
          disabled={`${currentPage === pagination ? true : ''}`}
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
};

export default EventPagination;

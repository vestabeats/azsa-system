import React from 'react';

type PaginationProps = {
  numbers: number[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  nPage: any;
};

const Pagination: React.FC<PaginationProps> = ({ numbers, currentPage, setCurrentPage, nPage }) => {
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (id: number) => {
    setCurrentPage(id);
  };

  return (
    <nav>
      <ul className="flex flex-row">
        <li className="border-gray-300 rounded text-center border text-green-600">
          <a href="#" className="block py-2 px-4" onClick={prePage}>Prev</a>
        </li>
        {numbers.map((n, i) => (
          <li
            className={`border border-gray-300 rounded text-center text-green-600 ${currentPage === n ? 'bg-green-600 text-white' : ''}`}
            key={i}
          >
            <a href="#" className="block py-2 px-4" onClick={() => changePage(n)}>{n}</a>
          </li>
        ))}
        <li className="border-gray-300 rounded text-center border text-green-600">
          <a href="#" className="block py-2 px-4" onClick={nextPage}>Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

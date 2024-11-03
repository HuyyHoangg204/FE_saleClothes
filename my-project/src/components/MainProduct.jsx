import icons from "../assets/icons";
import HomeSectionCard from "../partials/HomeSectionCard/HomeSectionCard";
import { useEffect, useState } from "react";
import SortProduct from "./SortProduct";

function MainProduct({ title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [show3Dot, setShow3Dot] = useState(true);
  const [showSortProduct, setSortProduct] = useState(false);
  const [isIconRotated, setIsIconRotated] = useState(false);
  const itemsPerPage = 28;
  const items = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const selectedProducts = items.slice(startIndex, startIndex + itemsPerPage);
  const getDisplayedPages = () => {
    let pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage === 1) {
        pages = [1, 2, 3];
      } else if (currentPage === totalPages) {
        pages = [totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [currentPage - 1, currentPage, currentPage + 1];
      }
    }
    return pages;
  };
  const displayedPages = getDisplayedPages();

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changePage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (totalPages <= 3) {
      setShow3Dot(false);
    } else if (currentPage === totalPages - 2) {
      setShow3Dot(false);
    } else if (currentPage === totalPages - 1) {
      setShow3Dot(false);
    } else if (currentPage === totalPages) {
      setShow3Dot(false);
    } else setShow3Dot(true);
  });

  const toggleSortProduct = () => {
    setSortProduct((prev) => !prev);
    setIsIconRotated((prev) => !prev); // Thay đổi trạng thái quay của biểu tượng
  };

  return (
    //
    <div className="w-full ml-12">
      <div className="flex justify-between items-center">
        <span className="font-sans font-semibold text-[22px]">{title}</span>
        <div
          onClick={toggleSortProduct}
          className="flex justify-around items-center border rounded-3xl w-[240px] h-[42px] relative cursor-pointer"
        >
          <span>Sắp xếp theo</span>
          <img
            className={`w-9 h-9 transition-transform duration-300 ${
              isIconRotated ? "rotate-180" : ""
            }`}
            src={icons.iconDropDownArrow}
            alt=""
          />
        </div>
        {showSortProduct && <SortProduct />}
      </div>
      <div className="flex flex-wrap w-full justify-between mt-5 gap-y-10">
        {selectedProducts.map((item, index) => (
          <div className="">
            <HomeSectionCard />
          </div>
        ))}
      </div>
      <div>
        <nav
          className="flex flex-col md:flex-row justify-center items-center md:items-center space-y-3 md:space-y-0 p-4 mt-10"
          aria-label="Table navigation"
        >
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <button
                onClick={prevPage}
                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-black hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
            {displayedPages.map((page) => (
              <li onClick={() => changePage(page)} key={page}>
                <button
                  href="#"
                  className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                    currentPage === page
                      ? "z-10 text-white bg-black border  hover:bg-black hover:text-white dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-black hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

            {show3Dot && (
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
            )}
            {totalPages > 3 && currentPage < 7 && (
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {totalPages}
                </a>
              </li>
            )}
            <li>
              <button
                onClick={nextPage}
                className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-black hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MainProduct;

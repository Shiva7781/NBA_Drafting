import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./PaginationComp.css";

/** Not in use Reference only */

const PaginationComp = ({ data }) => {
  console.log("data:", data);

  const PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: selectedPage }) => {
    console.log("selectedPage:", selectedPage);
    setCurrentPage(selectedPage);
  };

  // 0, 10, 20, 30...
  const offset = currentPage * PER_PAGE;
  // console.log("offset:", offset);

  const currentPageData = data
    .slice(offset, offset + PER_PAGE)
    .map((res, index) => <h1 key={index}>Name: {res.first_name}</h1>);
  // console.log("currentPageData:", currentPageData);

  // total page: 500
  const pageCount = Math.ceil(data.length / PER_PAGE);

  return (
    <>
      <div className="">
        {currentPageData}

        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link__disabled"}
          activeClassName={"pagination__link__active"}
        />
      </div>
    </>
  );
};

export default PaginationComp;

import React from "react";

const Pagination = ({ perPage, currentPage, onClick }) => {
  return (
    <div className="flex-hbox flex-main-center">
      <ul className="mr-no mr-tb-sm pd-no flex-hbox">
        {Array(perPage)
          .fill(3)
          .map((p, i) => {
            return (
              <li
                className={`list-style-none pd-xs br-xs mr-r-sm cursor-pointer ${
                  currentPage === i + 1 ? "bg-info" : ""
                }`}
                key={i}
                onClick={() => onClick(i + 1)}
              >
                {i + 1}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Pagination;

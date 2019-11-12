import React from "react";

const Pagination = ({ perPage, currentPage, onClick }) => {
  return (
    <ul>
      {Array(perPage)
        .fill(3)
        .map((p, i) => {
          return (
            <li
              className={currentPage === i ? "active" : ""}
              key={i}
              onClick={() => onClick(i + 1)}
            >
              {i + 1}
            </li>
          );
        })}
    </ul>
  );
};

export default Pagination;

import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ perPage, currentPage, onClick }) => {
  return (
    <div className="flex-hbox flex-main-center">
      <ul className="mr-no mr-tb-md  pd-no flex-hbox">
        {Array(perPage)
          .fill(3)
          .map((p, i) => {
            return (
              <li
                className={`list-style-none pd-xs br-radius-sm mr-r-sm cursor-pointer ${
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

Pagination.propTypes = {
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

Pagination.defaultProps = {};

export default Pagination;

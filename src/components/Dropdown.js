import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({ onActionHandler }) => {
  return (
    <ul className="br-xs pd-no w-px-100 text-center br-radius-sm bg-white">
      <li
        className="list-style-none pd-sm cursor-pointer"
        onClick={() => {
          onActionHandler({ key: "view" });
        }}
      >
        View
      </li>
      <li
        className="list-style-none pd-sm cursor-pointer"
        onClick={() => {
          onActionHandler({ key: "edit" });
        }}
      >
        Edit
      </li>
      <li
        className="list-style-none pd-sm cursor-pointer"
        onClick={() => {
          onActionHandler({ key: "delete" });
        }}
      >
        Delete
      </li>
    </ul>
  );
};

Dropdown.propTypes = {
  onActionHandler: PropTypes.func.isRequired
};

Dropdown.defaultProps = {};

export default Dropdown;

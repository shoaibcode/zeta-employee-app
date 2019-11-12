import React from "react";
import PropTypes from "prop-types";

import EmployeeListItem from "./EmployeeListItem";

const EmployeeList = ({ list, onActionHandler }) => {
  return (
    <tbody>
      {list.map((employee, index) => {
        return (
          <EmployeeListItem
            key={index}
            index={index}
            employee={employee}
            onActionHandler={onActionHandler}
          />
        );
      })}
    </tbody>
  );
};

EmployeeList.propTypes = {
  list: PropTypes.array.isRequired,
  onActionHandler: PropTypes.func.isRequired
};

EmployeeList.defaultProps = {};

export default EmployeeList;

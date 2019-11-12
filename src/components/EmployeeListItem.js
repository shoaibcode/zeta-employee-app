import React, { useState } from "react";
import PropTypes from "prop-types";

import Dropdown from "./Dropdown";

const EmployeeListItem = ({ index, employee, onActionHandler }) => {
  const {
    id,
    preferredFullName,
    employeeCode,
    jobTitleName,
    phoneNumber,
    emailAddress,
    region,
    dob
  } = employee;

  const actionHandler = ({ key }) => {
    onActionHandler({ key, employee, index });
  };

  return (
    <tr>
      <th className="br-b-xs pd-sm" scope="row">
        {id}
      </th>
      <td className="br-b-xs pd-sm w-px-100">{preferredFullName}</td>
      <td className="br-b-xs pd-sm">{employeeCode}</td>
      <td className="br-b-xs pd-sm w-px-100">{jobTitleName}</td>
      <td className="br-b-xs pd-sm">{phoneNumber}</td>
      <td className="br-b-xs pd-sm">{emailAddress}</td>
      <td className="br-b-xs pd-sm">{region}</td>
      <td className="br-b-xs pd-sm w-px-100">{dob}</td>
      <td className="br-b-xs pd-sm position-relative hover-element-children">
        <span className="cursor-pointer">...</span>
        <div className="position-absolute hover-target display-none position-index-1 top--1">
          <Dropdown onActionHandler={actionHandler} />
        </div>
      </td>
    </tr>
  );
};

EmployeeListItem.propTypes = {
  index: PropTypes.number.isRequired,
  employee: PropTypes.object.isRequired,
  onActionHandler: PropTypes.func.isRequired
};

EmployeeListItem.defaultProps = {};

export default EmployeeListItem;

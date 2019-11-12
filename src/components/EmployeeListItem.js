import React, { useState } from "react";
import PropTypes from "prop-types";

import Dropdown from "./Dropdown";

const EmployeeListItem = ({ index, employee, onActionHandler }) => {
  const [showOptions, toggleOptions] = useState(false);
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
    toggleOptions(false);
  };

  return (
    <tr>
      <th className="br-b-xs pd-sm" scope="row">
        {id}
      </th>
      <td className="br-b-xs pd-sm">{preferredFullName}</td>
      <td className="br-b-xs pd-sm">{employeeCode}</td>
      <td className="br-b-xs pd-sm">{jobTitleName}</td>
      <td className="br-b-xs pd-sm">{phoneNumber}</td>
      <td className="br-b-xs pd-sm">{emailAddress}</td>
      <td className="br-b-xs pd-sm">{region}</td>
      <td className="br-b-xs pd-sm">{dob}</td>
      <td className="br-b-xs pd-sm">
        <span onClick={() => toggleOptions(true)}>...</span>
        {showOptions ? <Dropdown onActionHandler={actionHandler} /> : null}
      </td>
    </tr>
  );
};

export default EmployeeListItem;

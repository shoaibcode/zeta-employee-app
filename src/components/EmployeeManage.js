import React, { useState } from "react";
import PropTypes from "prop-types";

import Input from "./Input";

const defaultEmployee = {
  jobTitleName: "",
  firstName: "",
  lastName: "",
  dob: "",
  preferredFullName: "",
  employeeCode: "",
  region: "",
  phoneNumber: 0,
  emailAddress: ""
};

const EmployeeManage = ({
  onSubmit,
  onCancel,
  title,
  employee = defaultEmployee
}) => {
  const [employeeCode, changeEmployeeCode] = useState(
    () => employee.employeeCode
  );
  const [firstName, changeFirstName] = useState(() => employee.firstName);
  const [lastName, changeLastName] = useState(() => employee.lastName);
  const [jobTitleName, changeJobTitleName] = useState(
    () => employee.jobTitleName
  );
  const [emailAddress, changeEmailAddress] = useState(
    () => employee.emailAddress
  );
  const [phoneNumber, changePhoneNumber] = useState(() => employee.phoneNumber);
  const [region, changeRegion] = useState(() => employee.region);
  const [dob, changeDOB] = useState(() => employee.dob);

  const submitHandler = () => {
    onSubmit({
      employeeCode,
      firstName,
      lastName,
      preferredFullName: `${firstName} ${lastName}`,
      emailAddress,
      phoneNumber,
      region,
      dob
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <div>{title}</div>
        <div>
          <label>
            EM
            <Input
              type="text"
              value={employeeCode}
              onChange={changeEmployeeCode}
              required
            />
          </label>
        </div>

        <div>
          <div>
            <label>
              First Name
              <Input
                type="text"
                value={firstName}
                onChange={changeFirstName}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Last Name
              <Input
                type="text"
                value={lastName}
                onChange={changeLastName}
                required
              />
            </label>
          </div>
        </div>

        <div>
          <label>
            Job Title
            <Input
              type="email"
              value={jobTitleName}
              onChange={changeJobTitleName}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <Input
              type="email"
              value={emailAddress}
              onChange={changeEmailAddress}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Phone Number
            <Input
              type="number"
              value={phoneNumber}
              onChange={changePhoneNumber}
              required
            />
          </label>
        </div>

        <div>
          <div>
            <label>
              Region
              <Input
                type="text"
                value={region}
                onChange={changeRegion}
                required
              />
            </label>
          </div>
          <div>
            <label>
              DOB
              <Input type="date" value={dob} onChange={changeDOB} required />
            </label>
          </div>
        </div>

        <div>
          <button type="submit"> Create</button>
          <button onClick={onCancel}> Cancel</button>
        </div>
      </div>
    </form>
  );
};

EmployeeManage.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool
};

EmployeeManage.defaultProps = {
  required: true
};

export default EmployeeManage;

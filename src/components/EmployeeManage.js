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
      id: employee.id,
      employeeCode,
      jobTitleName,
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
    <div className="overlay-content flex-vbox flex-main-center">
      <div className="w-percent-40 mr-auto bg-white br-radius-sm">
        <form onSubmit={submitHandler}>
          <div>
            <div className="br-b-xs pd-md">{title}</div>

            <div className="pd-lg">
              <div>
                <label>
                  <div> EM</div>
                  <Input
                    type="text"
                    value={employeeCode}
                    onChange={changeEmployeeCode}
                    required
                  />
                </label>
              </div>

              <div className="flex-hbox mr-tb-sm flex-main-space-between">
                <div className="w-percent-45">
                  <label>
                    <div> First Name</div>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={changeFirstName}
                      required
                    />
                  </label>
                </div>
                <div className="w-percent-45">
                  <label>
                    <div> Last Name</div>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={changeLastName}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="mr-tb-sm">
                <div>
                  <label>
                    Job Title
                    <Input
                      type="text"
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

              <div className="mr-tb-sm">
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
                    <Input
                      type="date"
                      value={dob}
                      onChange={changeDOB}
                      required
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  className="pd-sm mr-r-sm w-px-100 br-radius-sm bg-info cursor-pointer"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="pd-sm br-radius-sm w-px-100 cursor-pointer"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
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

import React from "react";
import PropTypes from "prop-types";

const EmployeeView = ({ employee, toggleViewModal }) => {
  return (
    <div className="overlay-content flex-vbox flex-main-center">
      <div className="w-percent-30 mr-auto bg-white br-radius-sm">
        <div className="br-b-xs pd-md font-bold">
          <div>EM Code: {employee.employeeCode}</div>
          <div>{employee.preferredFullName}</div>
        </div>

        <div className="pd-md">
          <div className="flex-hbox pd-tb-sm">
            <div className="mr-r-md text-faintgrey">Name</div>
            <div>{employee.preferredFullName}</div>
          </div>
          <div className="flex-hbox pd-tb-sm">
            <div className="mr-r-md text-faintgrey">Job Title</div>
            <div>{employee.jobTitleName}</div>
          </div>

          <div className="flex-hbox pd-tb-sm">
            <div className="mr-r-md text-faintgrey">Phone Number</div>
            <div>{employee.phoneNumber}</div>
          </div>

          <div className="flex-hbox pd-tb-sm">
            <div className="mr-r-md text-faintgrey">Email</div>
            <div>{employee.emailAddress}</div>
          </div>

          <div className="flex-hbox pd-tb-sm">
            <div className="mr-r-md text-faintgrey">Region</div>
            <div>{employee.region}</div>
          </div>

          <div className="flex-hbox pd-tb-sm">
            <div className="mr-r-md text-faintgrey">DOB</div>
            <div>{employee.dob}</div>
          </div>
        </div>

        <div className="pd-md">
          <button
            className="pd-sm mr-r-sm w-px-100 br-radius-sm bg-info cursor-pointer"
            type="submit"
            onClick={() => toggleViewModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

EmployeeView.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool
};

EmployeeView.defaultProps = {
  required: true
};

export default EmployeeView;

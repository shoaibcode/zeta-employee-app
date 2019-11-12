import React, { useState, useEffect } from "react";
import "./styles/css/sup_helpers.css";

import {
  getEmployeesRequest,
  updateEmployeeRequest,
  deleteEmployeeRequest,
  createEmployeeRequest
} from "./utils/request";
import PaginationFooter from "./components/PaginationFooter";
import EmployeeManage from "./components/EmployeeManage";
import EmployeeList from "./components/EmployeeList";

const perCount = 5;

function Employees() {
  // Local State
  const [employees, setEmployees] = useState([]);
  const [employeePerPage, changeEmployeePerPage] = useState(0);
  const [currentPage, changeCurrentPage] = useState(1);
  const [showModal, toggleModal] = useState(false);
  const [activeEmployee, changeActiveEmployee] = useState(undefined);
  const [sortBy, toggleSort] = useState({ key: "id", ASC: true });

  const start = perCount * currentPage - perCount;
  const last = currentPage * perCount;

  // Side Effect
  useEffect(() => {
    getEmployeesRequest().then(employees => {
      setEmployees(employees);

      const employeePerPage = Math.ceil(employees.length / perCount);
      changeEmployeePerPage(employeePerPage);
    });
  }, []);

  // API Calls
  const createNewEmployee = employee => {
    // Todo: Think about this?
    createEmployeeRequest(employee).then(employee => {
      setEmployees([...employees, employee]);
    });
    toggleModal(false);
  };

  const editEmployee = updatedEmployee => {
    const newEmployees = employees.map((employee, employeeIndex) => {
      if (employee.id === updatedEmployee.id) {
        return updatedEmployee;
      }

      return employee;
    });

    updateEmployeeRequest(updatedEmployee, updatedEmployee.id);
    setEmployees(newEmployees);
    toggleModal(false);
    changeActiveEmployee(undefined);
  };

  const deleteEmployee = index => {
    const newEmployees = employees.filter((employee, employeeIndex) => {
      return index !== employeeIndex;
    });

    setEmployees(newEmployees);
    deleteEmployeeRequest(employees[index].id);
  };

  const derieveEmployeesFromState = () => {
    let newEmployee = employees.sort((a, b) => {
      if (sortBy.ASC) {
        return parseInt(b[sortBy.key], 10) - parseInt(a[sortBy.key], 10);
      } else {
        return parseInt(a[sortBy.key], 10) - parseInt(b[sortBy.key], 10);
      }
    });

    console.log({ start, last });
    return newEmployee.slice(start, last);
  };

  const onActionHandler = ({ key, employee, index }) => {
    if (key === "delete") {
      deleteEmployee(index);
    } else if (key === "edit") {
      changeActiveEmployee(employee);
      toggleModal(true);
    }
  };

  return (
    <div className="overlay-container">
      <div className="w-percent-70 mr-auto">
        <div className="flex-hbox flex-main-end">
          <button
            className="pd-sm br-radius-sm bg-info cursor-pointer"
            onClick={() => toggleModal(true)}
          >
            Create Employee
          </button>
        </div>
        <table className="mr-t-xxl w-percent-100">
          <thead>
            <tr className="br-sm">
              <th
                className="br-b-xs w-px-80"
                scope="col"
                onClick={() => {
                  if (sortBy.key !== "id") {
                    toggleSort({ key: "id", ASC: true });
                  } else {
                    toggleSort({ key: "id", ASC: !sortBy.ASC });
                  }
                }}
              >
                ID
                {sortBy.key === "id" && (
                  <span className="mr-l-sm">
                    <i className={`arrow ${sortBy.ASC ? "down" : "up"}`} />
                  </span>
                )}
              </th>
              <th className="br-b-xs" scope="col">
                Full Name
              </th>
              <th
                className="br-b-xs"
                scope="col"
                onClick={() => {
                  if (sortBy.key !== "employeeCode") {
                    toggleSort({ key: "employeeCode", ASC: true });
                  } else {
                    toggleSort({ key: "employeeCode", ASC: !sortBy.ASC });
                  }
                }}
              >
                Employee Code{" "}
                {sortBy.key === "employeeCode" && (
                  <span>
                    <i className={`arrow ${sortBy.ASC ? "down" : "up"}`} />
                  </span>
                )}
              </th>
              <th className="br-b-xs" scope="col">
                Job Title
              </th>
              <th className="br-b-xs" scope="col">
                Phone Number
              </th>
              <th className="br-b-xs" scope="col">
                Email ID
              </th>
              <th className="br-b-xs" scope="col">
                Region
              </th>
              <th className="br-b-xs" scope="col">
                DOB
              </th>
              <th className="br-b-xs" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <EmployeeList
            list={derieveEmployeesFromState()}
            onActionHandler={onActionHandler}
          />
        </table>

        {showModal && (
          <EmployeeManage
            employee={activeEmployee}
            onSubmit={activeEmployee ? editEmployee : createNewEmployee}
            onCancel={() => toggleModal(false)}
            title={activeEmployee ? "Edit Employee" : "Create Employee"}
          />
        )}

        <PaginationFooter
          perPage={employeePerPage}
          onClick={changeCurrentPage}
          currentPage={currentPage}
          onNext={() => {
            changeCurrentPage(currentPage + 1);
          }}
          onPrevious={() => {
            changeCurrentPage(currentPage - 1);
          }}
        />
      </div>
    </div>
  );
}

export default Employees;

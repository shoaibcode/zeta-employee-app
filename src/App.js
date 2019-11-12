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
import EmployeeView from "./components/EmployeeView";
import Input from "./components/Input";

const perCount = 5;

function Employees() {
  // Local State
  const [employees, setEmployees] = useState([]);
  const [employeePerPage, changeEmployeePerPage] = useState(0);
  const [currentPage, changeCurrentPage] = useState(1);
  const [showModal, toggleModal] = useState(false);
  const [activeEmployee, changeActiveEmployee] = useState(undefined);
  const [sortBy, toggleSort] = useState({ key: "id", ASC: true });
  const [viewModal, toggleViewModal] = useState(false);
  const [filterOptionSelected, changeFilterOptionSelected] = useState(
    "preferredFullName"
  );
  const [filterText, changeFilterText] = useState("");

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
    let filteredEmployees = [];
    if (filterText) {
      employees.forEach(employee => {
        if (
          employee[filterOptionSelected]
            .toLowerCase()
            .includes(filterText.trim().toLowerCase())
        ) {
          filteredEmployees.push(employee);
        }
      });
    } else {
      filteredEmployees = employees;
    }

    let sortedEmployee = filteredEmployees.sort((a, b) => {
      if (sortBy.ASC) {
        return parseInt(b[sortBy.key], 10) - parseInt(a[sortBy.key], 10);
      } else {
        return parseInt(a[sortBy.key], 10) - parseInt(b[sortBy.key], 10);
      }
    });

    return sortedEmployee.slice(start, last);
  };

  const onActionHandler = ({ key, employee, index }) => {
    if (key === "view") {
      changeActiveEmployee(employee);
      toggleViewModal(true);
    } else if (key === "edit") {
      changeActiveEmployee(employee);
      toggleModal(true);
    } else if (key === "delete") {
      deleteEmployee(index);
    }
  };

  return (
    <div className="overlay-container">
      <div className="w-percent-80 mr-auto">
        <div className="flex-hbox flex-main-end pd-tb-md">
          <button
            className="pd-sm br-radius-sm bg-info cursor-pointer"
            onClick={() => toggleModal(true)}
          >
            Create Employee
          </button>
        </div>

        <div className="flex-hbox">
          <div>
            <select
              value={filterOptionSelected}
              onChange={event => {
                changeFilterOptionSelected(event.target.value);
              }}
            >
              <option value="preferredFullName">Full Name</option>
              <option value="jobTitleName">Title</option>
              <option value="emailAddress">Email Address</option>
              <option value="region">Region</option>
            </select>
          </div>
          <div>
            <Input
              type="text"
              value={filterText}
              onChange={changeFilterText}
              placeholder="Enter Search text"
            />
          </div>
        </div>

        <table className="mr-t-xxl w-percent-100">
          <thead>
            <tr className="br-sm pb-b-sm">
              <th
                className="br-b-xs pd-sm text-muted w-px-80 cursor-pointer"
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
              <th className="br-b-xs pd-sm text-muted" scope="col">
                Full Name
              </th>
              <th
                className="br-b-xs pd-sm text-muted cursor-pointer"
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
              <th className="br-b-xs pd-sm text-muted" scope="col">
                Job Title
              </th>
              <th className="br-b-xs pd-sm text-muted" scope="col">
                Phone Number
              </th>
              <th className="br-b-xs pd-sm text-muted" scope="col">
                Email ID
              </th>
              <th className="br-b-xs pd-sm text-muted" scope="col">
                Region
              </th>
              <th className="br-b-xs pd-sm text-muted" scope="col">
                DOB
              </th>
              <th className="br-b-xs pd-sm text-muted" scope="col">
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
            onCancel={() => {
              changeActiveEmployee(undefined);
              toggleModal(false);
            }}
            title={activeEmployee ? "Edit Employee" : "Create Employee"}
          />
        )}

        {viewModal && (
          <EmployeeView
            employee={activeEmployee}
            toggleViewModal={toggleViewModal}
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

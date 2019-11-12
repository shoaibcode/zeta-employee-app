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
  const [employees, setEmployees] = useState([]);
  const [employeePerPage, changeEmployeePerPage] = useState(0);
  const [currentPage, changeCurrentPage] = useState(1);
  const [showModal, toggleModal] = useState(false);
  const [activeEmployee, changeActiveEmployee] = useState(undefined);

  const start = perCount * currentPage - perCount;
  const last = currentPage * perCount - 1;

  useEffect(() => {
    getEmployeesRequest().then(employees => {
      setEmployees(employees);

      const employeePerPage = Math.ceil(employees.length / perCount);
      changeEmployeePerPage(employeePerPage);
    });
  }, []);

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
    return employees.slice(start, last);
  };

  const onActionHandler = ({ key, employee, index }) => {
    console.log(key === "edit");

    if (key === "delete") {
      deleteEmployee(index);
    } else if (key === "edit") {
      changeActiveEmployee(employee);
      toggleModal(true);
    }
  };

  return (
    <div className="App">
      <div className="flex-hbox w-px-800">
        <button className="flex-main-end" onClick={() => toggleModal(true)}>
          Create Employee
        </button>
      </div>
      <table className="w-percent-70 mr-auto mr-t-xxl">
        <thead>
          <tr className="br-sm">
            <th className="br-b-xs" scope="col">
              ID
            </th>
            <th className="br-b-xs" scope="col">
              FullName
            </th>
            <th className="br-b-xs" scope="col">
              Employee Code
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
        onNext={() => {
          changeCurrentPage(currentPage + 1);
        }}
        onPrevious={() => {
          changeCurrentPage(currentPage - 1);
        }}
      />
    </div>
  );
}

export default Employees;

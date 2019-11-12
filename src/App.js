import React, { useState, useEffect } from "react";
import "./styles/css/sup_helpers.css";

import { getEmployees, editEmployee, createEmployee } from "./utils/request";
import PaginationFooter from "./components/PaginationFooter";
import EmployeeManage from "./components/EmployeeManage";

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
    getEmployees().then(employees => {
      setEmployees(employees);

      const employeePerPage = Math.ceil(employees.length / perCount);
      changeEmployeePerPage(employeePerPage);
    });
  }, []);

  const createNewEmployee = employee => {
    createEmployee(employee);
    setEmployees([...employees, employee]);
    toggleModal(false);
  };

  const editEmployee = (updatedEmployee, index) => {
    const newEmployees = employees.map((employee, employeeIndex) => {
      if (index === employeeIndex) {
        return updatedEmployee;
      }

      return employee;
    });

    editEmployee(updatedEmployee);
    setEmployees(newEmployees);
    toggleModal(false);
  };

  const derieveEmployeesFromState = () => {
    return employees.slice(start, last);
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
        <tbody>
          {employees.length ? (
            derieveEmployeesFromState().map((employee, index) => {
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

              return (
                <tr key={index}>
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
                </tr>
              );
            })
          ) : (
            <div className="text-center mr-tb-md">loading...</div>
          )}
        </tbody>
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

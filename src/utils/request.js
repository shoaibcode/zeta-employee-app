const BASE_API_ENDPOINT = "http://localhost:8080/employees";

export const getEmployees = () => {
  return fetch(BASE_API_ENDPOINT).then(res => res.json());
};

export const createEmployee = data => {
  return fetch(BASE_API_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => res.json());
};

export const editEmployee = data => {
  return fetch(BASE_API_ENDPOINT, {
    method: "PUT",
    body: JSON.stringify(data)
  }).then(res => res.json());
};

export const deleteEmployee = employeeId => {
  return fetch(`${BASE_API_ENDPOINT}/${employeeId}`, {
    method: "DELETE"
  }).then(res => res.json());
};

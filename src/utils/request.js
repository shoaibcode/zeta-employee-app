const BASE_API_ENDPOINT = "http://localhost:8080/employees";

export const getEmployeesRequest = () => {
  return APICall({
    url: `${BASE_API_ENDPOINT}`,
    method: "GET"
  });
};

export const createEmployeeRequest = data => {
  return APICall({
    url: `${BASE_API_ENDPOINT}`,
    method: "POST",
    data
  });
};

export const updateEmployeeRequest = (data, employeeId) => {
  return APICall({
    url: `${BASE_API_ENDPOINT}/${employeeId}`,
    method: "PUT",
    data
  });
};

export const deleteEmployeeRequest = employeeId => {
  return APICall({
    url: `${BASE_API_ENDPOINT}/${employeeId}`,
    method: "DELETE",
    data: null
  });
};

export const APICall = ({
  url = BASE_API_ENDPOINT,
  method = "GET",
  data = null
}) => {
  const fetchOptions = {
    headers: {
      "Content-Type": "application/json"
    },
    method
  };

  if (data) {
    fetchOptions["body"] = JSON.stringify(data);
  }
  return fetch(url, fetchOptions).then(res => res.json());
};

import React from "react";
import PropTypes from "prop-types";

const Input = ({ type = "text", value, onChange, required, placeholder }) => {
  return (
    <input
      type={type}
      className="w-percent-100 pd-xs"
      value={value}
      onChange={event => onChange(event.target.value)}
      required={required}
      placeholder={placeholder}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  required: true,
  placeholder: ""
};

export default Input;

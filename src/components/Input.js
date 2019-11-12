import React from "react";
import PropTypes from "prop-types";

const Input = ({ type = "text", value, onChange, required }) => {
  return (
    <input
      type={type}
      className="w-percent-100 pd-xs"
      value={value}
      onChange={event => onChange(event.target.value)}
      required={required}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool
};

Input.defaultProps = {
  required: true
};

export default Input;

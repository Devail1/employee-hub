import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({ options, label, name, value, onChange }) => {
  return (
    <div className="relative w-full flex flex-col gap-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 text-left">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full rounded-lg border-gray-200 h-10 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChange}
        required
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-sm">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Dropdown;

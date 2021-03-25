import React from "react";
import "./EditableField.css";
import Constants from "./Constants";
const { genderOptions, fieldLabelMap } = Constants;

const EditableField = ({
  fieldName,
  fieldType,
  value,
  handleChange,
  isEditable = false,
}) => {
  return (
    <div className="fieldWrapper">
      <label>{fieldLabelMap[fieldName]}</label>
      {isEditable ? (
        fieldType == "select" ? (
          <select
            value={value}
            onChange={(e) => handleChange(e, "gender")}
          >
            {Object.keys(genderOptions).map((option) => (
              <option key={option} value={option}>
                {genderOptions[option]}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={fieldType}
            value={value}
            onChange={(e) => handleChange(e, fieldName)}
          />
        )
      ) : (
        <div>
          <span>{fieldName == "gender"? genderOptions[value]:value}</span>
        </div>
      )}
    </div>
  );
};
export default EditableField;

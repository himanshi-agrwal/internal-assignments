
import React from "react";
import "./EditableField.css";
const fieldLabelMap = {
    "first_name" : "First Name",
    "last_name" : "Last Name",
    "age": "Age",
    "gender": "Gender",
    "phone_number": "Phone No."
}
const EditableField = ({fieldName, fieldType, value, handleChange, isEditable=false}) =>{
    return(
        <div className="fieldWrapper"><label>{fieldLabelMap[fieldName]}</label>
        {isEditable?
            <input type={fieldType} value= {value} onChange={(e)=> handleChange(e, fieldName)}/>:
            <div><span>{value}</span></div>
        }</div>
    )
}
export default EditableField;
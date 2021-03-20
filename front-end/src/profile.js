import React, { Component, useState } from "react";
import axios from "axios";
import EditableField from "./EditableField";
import util from "./util";

const Profile = ({ location, history }) => {
  const [data, setData] = useState(location.state.data);
  const [currentData, setCurrentData] = useState(location.state.data);
  const [selectedFile, setFile] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
    console.log(selectedFile);
    //   axios.post("api/uploadfile", formData);
  };
  const saveData = () => {
    fetch("http://localhost:8000/api/profile", {
      method: "POST",
      body: JSON.stringify({
        email: "email",
        // profile: {
        //         first_name : firstName,
        //         last_name: lastName,
        //         phone_number: phoneNumber,
        //         age: age,
        //         gender: gender
        // }
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleFieldChange = (e, fieldName) => {
    setData({ ...data, [fieldName]: e.target.value });
  };
  const handleLogOut = () => {
    util.removeToken();
    history.push("/");
  };
  return (
    <div>
      <button className="LogoutBtn customButton" onClick={handleLogOut}>
        Logout
      </button>
      <h2 style={{ textAlign: "center" }}>User details</h2>
      <div className="editCancel">
        <button
          className="customButton"
          onClick={() => {
            setIsEditable(!isEditable);
            if (isEditable) {
              setData(currentData);
            }
          }}
        >
          {isEditable ? "Cancel" : "Edit"}
        </button>
      </div>
      <EditableField
        fieldName="first_name"
        fieldType="text"
        value={data.first_name}
        handleChange={handleFieldChange}
        isEditable={isEditable}
      />
      <EditableField
        fieldName="last_name"
        fieldType="text"
        value={data.last_name}
        handleChange={handleFieldChange}
        isEditable={isEditable}
      />
      <EditableField
        fieldName="age"
        fieldType="number"
        value={data.age}
        handleChange={handleFieldChange}
        isEditable={isEditable}
      />
      <EditableField
        fieldName="phone_number"
        fieldType="number"
        value={data.phone_number}
        handleChange={handleFieldChange}
        isEditable={isEditable}
      />
      <EditableField
        fieldName="gender"
        fieldType="text"
        value={data.gender}
        handleChange={handleFieldChange}
        isEditable={isEditable}
      />
      <div className="fieldWrapper">
        <label>Upload Profile Pic</label>
        <div className="fileUpload">
          <input type="file" onChange={onFileChange} />
          <div>
            <span title={selectedFile ? selectedFile.name : "No file chosen"}>
              {selectedFile ? selectedFile.name : "No file chosen"}
            </span>
            <i className="fas fa-cloud-upload"></i>
          </div>
        </div>
        <button
          className="customButton"
          onClick={onFileUpload}
          disabled={!selectedFile}
        >
          Upload
        </button>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        style={{ marginTop: "24px" }}
        onClick={saveData}
      >
        Save
      </button>
    </div>
  );
};

export default Profile;

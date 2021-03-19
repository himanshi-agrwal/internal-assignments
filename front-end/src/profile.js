import React, { Component, useState } from 'react';
import axios from 'axios';

import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const Profile = (props) => {
    const [firstName, setFirstName] = useState(props.location.data.data.first_name)
    const [lastName, setLastName] = useState(props.location.data.data.last_name)
    const [age, setAge] = useState(props.location.data.data.age.toString())
    const [phoneNumber, setPhoneNumber] = useState(props.location.data.data.phone_number)
    const [gender, setGender] = useState(props.location.data.data.gender)
    const [selectedFile, setFile] = useState(null);
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const onFileUpload= ()=>{
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "myFile",
        selectedFile,
        selectedFile.name
      );
    
      // Details of the uploaded file
      console.log(selectedFile);
    
      // Request made to the backend api
      // Send formData object
    //   axios.post("api/uploadfile", formData);

    };
    const saveData = () => {
        fetch("http://localhost:8000/api/profile",{
            method: 'POST',
            body: JSON.stringify({
              email:"email",
              profile: {
                      first_name : firstName,
                      last_name: lastName,
                      phone_number: phoneNumber,
                      age: age,
                      gender: gender
              }
            }),
            headers: {
                'Content-Type': 'application/json',
            }
          }).then((data) => {console.log(data)})
            .catch((e) => {console.log(e)});
    }
    return( 
        <div>
            <div className="form-group">
            <strong>
                    <label >First Name: </label>
            </strong>
            <EditText 
            name="fname"
            type="text"
            value={firstName} 
            onChange={setFirstName}/>
            </div>
            <strong>
                <label >Last Name: </label>
            </strong>
            <EditText 
            name="lname"
            type="text"
            value={lastName}
            onChange={setLastName} />
            <strong>
                <label >Age: </label>
            </strong>
            <EditText 
            name="age"
            type="text"
            value={age} 
            onChange = {setAge}/>
            <strong>
                <label >Gender: </label>
            </strong>
            <EditText 
            name="gender"
            type="text"
            value={gender} 
            onChange={setGender}/>
            <strong>
                <label >Phone no: </label>
            </strong>
            <EditText 
            name="phone_number"
            type="text"
            value={phoneNumber}
            onChange={setPhoneNumber} />
             <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                  Upload!
                </button>
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={saveData}>Save</button>

      </div>
    );
};

export default Profile
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import FormElement from "./FormElement";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [code, setCode] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    
    Auth.signUp({ username: email, password, 
        attributes: { email, 'custom:firstName': firstName, 'custom:lastName': lastName } })
      .then((data) => {
        console.log(data);
        setWaitingForCode(true);
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmSignUp = (e) => {
    e.preventDefault();

    Auth.confirmSignUp(email, code)
      .then((data) => {
        console.log(data);
        setWaitingForCode(false);
        setEmail("");
        setFirstName("");
        setLastName("");
        setCode("");
      })
      .catch((err) => console.log(err));
  };

  const resendCode = () => {
    Auth.resendSignUp(email)
      .then(() => {
        console.log("code resent successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="form">
      {!waitingForCode && (
            <form>
            <h3>Sign Up</h3>
            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary btn-block" onClick={signUp}>Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <a href="/sign-in">Sign In?</a>
            </p>
        </form>

      )}
      {waitingForCode && (
        <form>
            <div className="form-group">
                <label>Code</label>
                <input type="text" className="form-control" placeholder="Enter code" value={code} onChange={(e) => setCode(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={confirmSignUp}>
            Confirm Sign Up
          </button>
          <button type="button" className="btn btn-primary btn-block" onClick={resendCode}>
            Resend code
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
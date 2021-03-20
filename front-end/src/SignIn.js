import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {Spinner} from "react-bootstrap";
import util from "./util.js";

const SignIn = ({history, location}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    setErrorMessage("");
    Auth.signIn({
      username: email,
      password,
    })
      .then((user) => {
        const token = user["signInUserSession"]["idToken"]["jwtToken"]
        const tokenKey = `t_${email}`
        localStorage.setItem('tokenKey', tokenKey);
        localStorage.setItem(tokenKey, token);
        util.fetchData().then(data => {
          if(data.status == 200){ 
            setEmail("");
            setPassword("");
            history.push({pathname: "/profile", state:{data: data.data}});
          }
          else{
            setErrorMessage(data.data)
          }
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
      });
  };
  return (
    <div className="form">
        <form>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={signIn}>Submit</button>
                {errorMessage && <p className="errorMsg">{errorMessage}</p>}
                <p className="forgot-password text-right">
                    Not registered <Link to="/sign-up">Sign Up?</Link>
                </p>
        </form>
    </div>
  );
};

export default SignIn;
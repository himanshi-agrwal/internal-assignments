import React, { useState } from "react";
import { Auth } from "aws-amplify";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    Auth.signIn({
      username: email,
      password,
    })
      .then((user) => {
        // setIdToken(user["signInUserSession"]["idToken"]["jwtToken"]);
        fetchData(user["signInUserSession"]["idToken"]["jwtToken"]);
        setEmail("");
        setPassword("");
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchData = (token) => {
    fetch("http://localhost:8000/api/profile",{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` ,
      }
    }).then((data) => {console.log(data)})
      .catch((e) => {console.log(e)});
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
                <p className="forgot-password text-right">
                    Not registered <a href="/sign-up">Sign Up?</a>
                </p>
            </form>

    </div>
  );
};

export default SignIn;
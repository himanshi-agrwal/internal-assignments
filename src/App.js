import React, { useEffect } from "react";
import Amplify from "aws-amplify";
import logo from "./logo.svg";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import "./App.css";

const App = () => {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile Management</h1>
        <h2>Authentication for Profile Management using AWS Cognito</h2>
      </header>
      <SignUp />
      <SignIn />
    </div>
  );
};

export default App;
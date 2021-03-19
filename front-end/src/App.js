import React, { useEffect } from "react";
import Amplify from "aws-amplify";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import profile from "./profile";


// const App = () => {
  // useEffect(() => {
  //   Amplify.configure({
  //     Auth: {
  //       region: process.env.REACT_APP_REGION,
  //       userPoolId: process.env.REACT_APP_USER_POOL_ID,
  //       userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  //     },
  //   });
  // });

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Profile Management</h1>
//         <h2>Authentication for Profile Management using AWS Cognito</h2>
//       </header>
//       <SignUp />
//       <SignIn />
//     </div>
//   );
// };

// export default App;

function App() {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });
  return (<Router>
    <div className="App">
      <header className="App-header">
        <h1>Profile Management</h1>
        <h2>Authentication for Profile Management using AWS Cognito</h2>
       </header>


      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/profile" component={profile} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;


import React, { useEffect, useState } from "react";
import Amplify from "aws-amplify";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import utils from "./util";
import { Spinner } from "react-bootstrap";
import Profile from "./profile";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
function App(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });
  useEffect(() => {
    const token = utils.getToken();
    const publicRedirectPath = window.location.pathname.includes("profile")
      ? "/"
      : window.location.pathname;
    if (token) {
      utils.fetchData().then((data) => {
        if (data.status === 200) {
          history.push({ pathname: "/profile", state: { data: data.data } });
        } else {
          history.push(publicRedirectPath);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
      history.push(publicRedirectPath);
    }
  }, []);
  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  return (
    <Router history={history}>
      <div className="App">
        <header className="App-header">
          <h1>Profile Management</h1>
          <h2>Authentication for Profile Management using AWS Cognito</h2>
        </header>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;

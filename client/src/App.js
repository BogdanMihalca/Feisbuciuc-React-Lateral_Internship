import React from "react";
import { Route, Router } from "react-router-dom";
import history from "./history";
import Main from "./pages/mainPage/Main";
import SignIn from "./pages/signInPage/SignIn";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Route path="/" exact component={SignIn} />
          <Route path="/main" component={Main} />
        </div>
      </Router>
    </div>
  );
};
export default App;

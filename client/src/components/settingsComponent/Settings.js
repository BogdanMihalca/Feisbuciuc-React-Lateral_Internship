import React from "react";
import "./settings.css";
import history from "../../history";
import api from "../../apis/api";

class Settings extends React.Component {
  state = { loginout: false };
  signOut() {
    localStorage.removeItem("LogedInUser");
    api.logOutUser();
    history.push("/");
  }
  render() {
    return (
      <div className="ui container settings-page">
        <button onClick={this.signOut}>Sign Out me</button>
      </div>
    );
  }
}
export default Settings;

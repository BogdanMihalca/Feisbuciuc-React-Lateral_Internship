import React from "react";
import {} from "react-router-dom";
import logo from "../../images/logo.png";
import "./signIn.css";
import history from "../../history";
import api from "../../apis/api";

class SignIn extends React.Component {
  state = { enteredEmail: "", enteredPassword: "", errorMessage: "" };

  componentDidMount() {
    if (localStorage.getItem("LogedInUser"))
      //persistent auth
      history.push("/main");
  }

  signInMethod = async (event) => {
    event.preventDefault();
    api
      .loginOrRegisterUser({
        email: this.state.enteredEmail,
        password: this.state.enteredPassword,
      })
      .then((res) => {
        if (res.data.authenticatedUser) {
          //if the user is succesfully created/logedIn
          localStorage.setItem(
            "LogedInUser",
            JSON.stringify(res.data.authenticatedUser)
          );
          history.push("/main");
        } else {
          this.setState({
            errorMessage:
              "An error has occured, check your password or email to be correct",
          });
        }
      })
      .catch((err) => {
        this.setState({
          errorMessage:
            "An error has occured, check your password or email to be correct",
        });
      });
  };

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <img src={logo} className="image logo" alt="logo" />
          <form className="ui large form" onSubmit={this.signInMethod}>
            <div className="ui stacked segment">
              <h2 className="ui green image header">
                <div className="content">
                  Sign-in or Register to your account
                </div>
              </h2>
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="enter your email"
                    onChange={(e) => {
                      this.setState({ enteredEmail: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    onChange={(e) => {
                      this.setState({ enteredPassword: e.target.value });
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="ui fluid large green submit button"
              >
                Sign In / Register
              </button>
              <div
                className="ui error message"
                style={{
                  display: `${this.state.errorMessage ? "block" : "none"}`,
                }}
              >
                {this.state.errorMessage}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default SignIn;

import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import profile_img from "../../images/profile.png";
import logo from "../../images/logo_white.png";

class Header extends React.Component {
  render() {
    return (
      <div className="ui fixed menu top-nav">
        <div className="ui container">
          <Link to={"/main"} className="header item">
            <img className="logo logo-header" src={logo} alt="logo" />
          </Link>
          <div className="right menu right-menu">
            <div className="ui search">
              <div className="ui icon input search-field">
                <input className="prompt" type="text" placeholder="Search..." />
                <i className="search icon"></i>
              </div>
              <div className="results"></div>
            </div>
            <img
              src={
                this.props.user == null
                  ? profile_img
                  : this.props.user.profile_pic.url
              }
              alt="user"
              className="user-image"
            />
            <h3 className="username">
              {this.props.user == null ? "user" : this.props.user.email}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;

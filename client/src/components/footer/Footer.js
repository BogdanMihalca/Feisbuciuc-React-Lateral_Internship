import React from "react";
import { NavLink } from "react-router-dom";
import "./footer.css";
class Footer extends React.Component {
  render() {
    return (
      <div
        className="ui bottom fixed  menu bottom-nav"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <NavLink
          exact
          to="/main"
          className="item item-bottom"
          activeClassName="active"
        >
          Home
        </NavLink>
        <NavLink
          exact
          to="/main/market"
          activeClassName="active"
          className="item item-bottom"
        >
          Market
        </NavLink>
        <NavLink
          exact
          to="/main/settings"
          activeClassName="active"
          className="item item-bottom"
        >
          Settings
        </NavLink>
      </div>
    );
  }
}
export default Footer;

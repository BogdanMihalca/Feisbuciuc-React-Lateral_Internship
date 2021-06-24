import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Market from "../../components/market/Market";
import Settings from "../../components/settingsComponent/Settings";
import history from "../../history";

//firebase
import "firebase/analytics";
import "firebase/auth";
class Main extends React.Component {
  state = { user: null };

  componentDidMount() {
    this.setState(
      { user: JSON.parse(localStorage.getItem("LogedInUser")) },
      () => {
        if (this.state.user == null) history.push("/");
      }
    );
  }

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <Header user={this.state.user} />
          <Route path="/main" exact component={Feed} />
          <Route path="/main/market" exact component={Market} />
          <Route path="/main/settings" exact component={Settings} />
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
export default Main;

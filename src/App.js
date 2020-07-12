import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./component/login/Login";
import Admin from "./component/admin/Admin";
import "./App.less";
export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />{" "}
            <Route path="/" component={Admin} />{" "}
          </Switch>{" "}
        </BrowserRouter>{" "}
      </div>
    );
  }
}

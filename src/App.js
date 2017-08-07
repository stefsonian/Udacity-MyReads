import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Books from "./components/Books";
import Search from "./components/Search";

class BooksApp extends Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route path="/" exact={true} component={Books} />
        <Route path="/search" component={Search} />
      </div>
    );
  }
}

export default BooksApp;

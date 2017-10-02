import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Books from "./components/Books";
import Search from "./components/Search";

class BooksApp extends Component {
  handleShelfChange(book, newShelf) {
    console.log(`Placing '${book.title}' on the ${newShelf} shelf`);
    BooksAPI.update(book, newShelf);
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/"
          exact={true}
          render={() => <Books handleShelfChange={this.handleShelfChange} />}
        />
        <Route
          path="/search"
          render={() => <Search handleShelfChange={this.handleShelfChange} />}
        />
      </div>
    );
  }
}

export default BooksApp;

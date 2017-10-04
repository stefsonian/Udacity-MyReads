import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Books from "./components/Books";
import Search from "./components/Search";

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = { books: [] };
    this.handleShelfChange = this.handleShelfChange.bind(this);
    this.fetchAllBooks = this.fetchAllBooks.bind(this);
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  handleShelfChange(book, newShelf) {
    console.log(`Placing '${book.title}' on the ${newShelf} shelf`);
    BooksAPI.update(book, newShelf).then(this.fetchAllBooks());
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/"
          exact={true}
          render={() =>
            <Books
              books={this.state.books}
              handleShelfChange={this.handleShelfChange}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <Search
              books={this.state.books}
              handleShelfChange={this.handleShelfChange}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;

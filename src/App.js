import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Books from "./components/Books";
import Search from "./components/Search";
import Four0Four from "./components/Four0Four";

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

  handleShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
      this.setState(previousState => ({
        books: previousState.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Switch>
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
          <Route component={Four0Four} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;

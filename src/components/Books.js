import React, { Component } from "react";
import _ from "lodash";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI.js";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };

    this.handleShelfChange = this.handleShelfChange.bind(this);
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
    this.optimisticUpdate(book, newShelf);
    this.props.handleShelfChange(book, newShelf);
  }

  optimisticUpdate(book, shelf) {
    // Optimistically perform the update for a snappier user experience
    // The change is rolled back if the DB update is unsuccessful.
    let books = this.state.books;
    let index = _.findIndex(books, { id: book.id });
    books[index].shelf = shelf;
    this.setState({ books });
  }

  filterByStatus(status) {
    return this.state.books.filter(book => book.shelf === status);
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              title="Currently reading"
              books={this.filterByStatus("currentlyReading")}
              handleShelfChange={this.handleShelfChange}
            />
            <Shelf
              title="Want to read"
              books={this.filterByStatus("wantToRead")}
              handleShelfChange={this.handleShelfChange}
            />
            <Shelf
              title="Read"
              books={this.filterByStatus("read")}
              handleShelfChange={this.handleShelfChange}
            />
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Books;

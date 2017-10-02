import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class Search extends Component {
  state = { term: "", books: [] };

  resetBooks() {
    this.setState({ books: [] });
  }

  handleChange(event) {
    let term = event.target.value;
    this.setState({ term });
    term.length > 0 ? this.performSearch(term) : this.resetBooks();
  }

  performSearch(term) {
    BooksAPI.search(term, 50).then(
      books =>
        books.constructor === Array // check if any books found
          ? this.setState({ books })
          : this.resetBooks() // clear books state if no match found
    );
  }

  renderBooks() {
    return this.state.books.map(book =>
      <Book
        key={book.id}
        data={book}
        handleShelfChange={this.props.handleShelfChange}
      />
    );
  }

  handleShelfChange(book, newShelf) {
    console.log(`Placing '${book.title}' on the ${newShelf} shelf`);
    BooksAPI.update(book, newShelf);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              value={this.state.term}
              onChange={this.handleChange.bind(this)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.renderBooks()}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

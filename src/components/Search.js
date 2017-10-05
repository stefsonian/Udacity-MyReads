import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "", books: [] };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.performSearch = this.performSearch.bind(this);
  }

  getShelf(book, shelfBooks) {
    const shelfBook = shelfBooks.find(b => b.id === book.id);
    return shelfBook ? shelfBook.shelf : "none";
  }

  componentWillReceiveProps(nextProps) {
    const books = this.state.books.map(book => {
      const shelf = this.getShelf(book, nextProps.books);
      return { ...book, shelf };
    });
    this.setState({ books });
  }

  resetBooks() {
    this.setState({ books: [] });
  }

  performSearch(term) {
    BooksAPI.search(term, 50).then(result => {
      if (result.constructor !== Array) {
        this.resetBooks();
      } else {
        const books = result.map(book => {
          const shelf = this.getShelf(book, this.props.books);
          return { ...book, shelf };
        });
        this.setState({ books });
      }
    });
  }

  handleTermChange(event) {
    let term = event.target.value;
    this.setState({ term });
    term.length > 0 ? this.performSearch(term) : this.resetBooks();
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
            <DebounceInput
              minLength={1}
              debounceTimeout={500}
              value={this.state.term}
              onChange={this.handleTermChange}
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

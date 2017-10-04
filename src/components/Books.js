import React from "react";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

const Books = props => {
  const filterByStatus = status => {
    return props.books.filter(book => book.shelf === status);
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf
            title="Currently reading"
            books={filterByStatus("currentlyReading")}
            handleShelfChange={props.handleShelfChange}
          />
          <Shelf
            title="Want to read"
            books={filterByStatus("wantToRead")}
            handleShelfChange={props.handleShelfChange}
          />
          <Shelf
            title="Read"
            books={filterByStatus("read")}
            handleShelfChange={props.handleShelfChange}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

export default Books;

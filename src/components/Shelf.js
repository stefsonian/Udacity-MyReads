import React from "react";
import Book from "./Book";

const Shelf = props => {
  const { title, books } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {title}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => {
            return (
              <Book
                key={book.title}
                data={book}
                handleShelfChange={props.handleShelfChange}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Shelf;

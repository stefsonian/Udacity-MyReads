import React from "react";

const Book = props => {
  const { title, authors, shelf } = props.data;
  const image = props.data.hasOwnProperty("imageLinks")
    ? props.data.imageLinks.thumbnail
    : "";

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${image}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={event =>
                props.handleShelfChange(props.data, event.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {title ? title : ""}
        </div>
        <div className="book-authors">
          {authors
            ? authors.map(author =>
                <div key={author}>
                  {author}
                </div>
              )
            : ""}
        </div>
      </div>
    </li>
  );
};

export default Book;

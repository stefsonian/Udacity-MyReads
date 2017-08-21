import React, { Component } from "react";

class Book extends Component {
  state = {
    shelf: ""
  };

  handleChange(e) {
    console.log(e);
  }

  render() {
    const { title, authors } = this.props.data;
    const image = this.props.data.imageLinks.thumbnail;

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
                value={this.state.shelf}
                onChange={this.handleChange.bind(this)}
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
            {title}
          </div>
          <div className="book-authors">
            {authors.map(author =>
              <div key={author}>
                {author}
              </div>
            )}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;

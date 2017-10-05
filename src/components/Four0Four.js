import React from "react";
import { Link } from "react-router-dom";

const Four0Four = () => {
  const styles = {
    display: "flex",
    justifyContent: "center"
  };

  return (
    <div>
      <div style={styles}>
        <h1>There is nothing here</h1>
      </div>
      <div style={styles}>
        <h2>
          <Link to="/">Click here to go to the book shelf</Link>
        </h2>
      </div>
    </div>
  );
};

export default Four0Four;

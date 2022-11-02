import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorBox = ({ author = {}, authorId = "" }) => {
  return (
    <div className="author">
      <div className="author-image">
        <img src={author?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3>
          <Link to={`/author/${author?.userName}?id=${authorId}`}>
            {author?.displayName}
          </Link>
        </h3>
        <p>
          {author?.desc ||
            "Gastronomy atmosphere set aside. Slice butternut cooking home.Delicious romantic undisturbed raw platter will meld. ThickSkewers skillet natural, smoker soy sauce wait roux. Gastronomy atmosphere set aside. Slice butternut cooking home."}
        </p>
      </div>
    </div>
  );
};

AuthorBox.propTypes = {
  author: PropTypes.object.isRequired,
  authorId: PropTypes.string.isRequired,
};

export default AuthorBox;

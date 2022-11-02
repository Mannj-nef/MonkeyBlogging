import React from "react";
import PropTypes from "prop-types";

const Progress = ({ progress = 0, className = "" }) => {
  return (
    <div
      className={`absolute bottom-0 left-0 w-0 h-1 transition-all bg-green-400 image-upload-progress ${className}`}
      style={{
        width: `${Math.ceil(progress)}%`,
      }}
    ></div>
  );
};

Progress.propTypes = {
  progress: PropTypes.number,
  className: PropTypes.string,
};

export default Progress;

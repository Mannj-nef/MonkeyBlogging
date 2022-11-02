import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../button/Button";
import { IconDelete } from "../icons";
import { Progress } from "../loading";

const ImageUploadStyled = styled.div`
  height: ${(props) => props.height};
  border-radius: ${(props) => props.rounder};
  overflow: hidden;
  label {
    height: 100%;
    border-radius: ${(props) => props.rounder};
    cursor: pointer;
    background-color: ${(props) => props.theme.color.grayF3};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-delete {
    --size: 40px;
    --position: 20px;
    padding: 10px;
    position: absolute;
    color: ${(props) => props.theme.color.red};
    background: ${(props) => props.theme.color.grayF3};
    opacity: 0.6;
    border-radius: 100%;
    width: var(--size);
    height: var(--size);
    top: var(--position);
    right: var(--position);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
  }
  &:hover .icon-delete {
    display: flex;
  }
`;

const ImageUpload = (props) => {
  const {
    className = "",
    height = "250px",
    rounder = "20px",
    progress,
    image,
    imageDone,
    onRemoveImage,
    ...rest
  } = props;

  return (
    <ImageUploadStyled className="relative" height={height} rounder={rounder}>
      <label>
        {image ? (
          <div className="w-full h-full">
            <img
              src={image}
              alt=""
              className={`w-full h-full object-cover rounded-[${rounder}]`}
            />
          </div>
        ) : (
          <>
            <input
              type="file"
              className={`hidden-input ${className}`}
              disabled={!!image}
              {...rest}
            />
            <div className="flex flex-col items-center text-center pointer-events-none">
              <div className="max-w-[80px] mb-5">
                <img
                  src="/img-upload.png"
                  alt="upload-img"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold">Choose photo</p>
            </div>
          </>
        )}
      </label>
      <Button
        type="button"
        className="icon-delete"
        style={!image ? { opacity: 0, visibility: "hidden" } : {}}
        handle={onRemoveImage}
      >
        <IconDelete className="w-10 h-10"></IconDelete>
      </Button>
      {!imageDone && <Progress progress={progress}></Progress>}
    </ImageUploadStyled>
  );
};

ImageUpload.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  rounder: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string,
  imageDone: PropTypes.bool,
  onRemoveImage: PropTypes.func,
};

export default ImageUpload;

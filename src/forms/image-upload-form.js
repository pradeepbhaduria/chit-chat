import React, { useRef } from 'react';
import { saveImageMessageInDB } from '../firebase/cloudstore-db';

const ImageUploadForm = ({ showToastMessage, user }) => {
  const imageElement = useRef();

  const onMediaFileSelected = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (!file.type.match('image.*')) {
      showToastMessage('You can only share images');
      return;
    }

    // Clear the selection in the file picker input.
    // imageFormElement.reset();

    if (!user) {
      showToastMessage('You must sign-in first');
      return;
    }

    saveImageMessageInDB(file, user);
  };

  return (
    <div id="image-form">
      <input
        ref={imageElement}
        onChange={onMediaFileSelected}
        id="mediaCapture"
        type="file"
        accept="image/*"
        capture="camera"
      />
      <button
        onClick={() => imageElement.current.click()}
        id="submitImage"
        title="Add an image"
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white"
      >
        <i className="material-icons">image</i>
      </button>
    </div>
  );
};

export default ImageUploadForm;

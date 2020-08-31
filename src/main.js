import React, { useState, useRef } from 'react';
import { saveMessageInDB } from './firebase/firestore-db';
import Messages from './messages';
import { ImageUploadForm } from './forms';

const Main = ({ user }) => {
  const signInSnackbarElement = useRef();
  const currentMessageElement = useRef();
  const [currentMessage, setCurrentMessage] = useState('');

  const showToastMessage = (message) => {
    // Display a message to the user using a Toast.
    var data = {
      message,
      timeout: 2000,
    };
    signInSnackbarElement.current.MaterialSnackbar.showSnackbar(data);
  };

  const resetCurrentMessage = () => {
    setCurrentMessage('');
    // TODO: Check the significance of the below
    currentMessageElement.current.parentNode.MaterialTextfield.boundUpdateClassesHandler();
  };

  const onMessageFormSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      showToastMessage('You must sign-in first');
      return;
    }

    if (currentMessage) {
      const { displayName, photoURL } = user;
      saveMessageInDB(currentMessage, displayName, photoURL).then(() => {
        resetCurrentMessage();
      });
    }
  };

  return (
    <main className="mdl-layout__content mdl-color--grey-100">
      <div
        id="messages-card-container"
        className="mdl-cell mdl-cell--12-col mdl-grid"
      >
        <div
          id="messages-card"
          className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop"
        >
          <div className="mdl-card__supporting-text mdl-color-text--grey-600">
            <Messages />
            <form onSubmit={onMessageFormSubmit} id="message-form" action="#">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  ref={currentMessageElement}
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  className="mdl-textfield__input"
                  type="text"
                  id="message"
                  autoComplete="off"
                />
                <label className="mdl-textfield__label" htmlFor="message">
                  Message...
                </label>
              </div>
              <button
                id="submit"
                disabled={currentMessage ? false : true}
                type="submit"
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
              >
                Send
              </button>
            </form>
            <ImageUploadForm showToastMessage={showToastMessage} user={user} />
          </div>
        </div>

        <div
          ref={signInSnackbarElement}
          id="must-signin-snackbar"
          className="mdl-js-snackbar mdl-snackbar"
        >
          <div className="mdl-snackbar__text"></div>
          <button className="mdl-snackbar__action" type="button"></button>
        </div>
      </div>
    </main>
  );
};

export default Main;

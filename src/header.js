import React from 'react';
import { signIn, signOut } from './firebase/firebase-auth';

const Header = ({ user }) => {
  let userPicElementStyle = {};

  const saveMessagingDeviceToken = () => {
    // TODO 10: Save the device token in the realtime datastore
  };

  const addSizeToGoogleProfilePic = (url) => {
    if (
      url.indexOf('googleusercontent.com') !== -1 &&
      url.indexOf('?') === -1
    ) {
      return url + '?sz=150';
    }
    return url;
  };
  if (user) {
    // User is signed in!
    const { photoURL } = user;
    userPicElementStyle = {
      backgroundImage: 'url(' + addSizeToGoogleProfilePic(photoURL) + ')',
    };

    // We save the Firebase Messaging Device token and enable notifications.
    saveMessagingDeviceToken();
  }

  const isSignedIn = user ? true : false;

  return (
    <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
      <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
        <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
          <h3>
            <i className="material-icons">chat_bubble_outline</i> Chit Chat
          </h3>
        </div>
        <div id="user-container">
          <div
            hidden={!isSignedIn}
            id="user-pic"
            style={userPicElementStyle}
          ></div>
          <div hidden={!isSignedIn} id="user-name">
            {user && user.displayName}
          </div>
          <button
            hidden={!isSignedIn}
            id="sign-out"
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
            onClick={signOut}
          >
            Sign-out
          </button>
          <button
            id="sign-in"
            hidden={isSignedIn}
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
            onClick={signIn}
          >
            <i className="material-icons">account_circle</i>Sign-in with Google
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

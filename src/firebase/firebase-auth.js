import * as firebase from 'firebase/app';
import 'firebase/auth';

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

const getProfilePicUrl = () => {
  return (
    (firebase.auth().currentUser && firebase.auth().currentUser.photoURL) ||
    '/images/profile_placeholder.png'
  );
};

// Returns the signed-in user's display name.
const getUserName = () => {
  return firebase.auth().currentUser && firebase.auth().currentUser.displayName;
};

const getCurrentUser = () => firebase.auth().currentUser;

// Listen to auth state changes. Fired every time user signs in or signs out
const initFirebaseAuth = (authStateObserver) => {
  firebase.auth().onAuthStateChanged(authStateObserver);
};

export {
  getCurrentUser,
  signIn,
  signOut,
  getProfilePicUrl,
  getUserName,
  initFirebaseAuth,
};

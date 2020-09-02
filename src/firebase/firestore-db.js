import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { getCurrentUser } from './firebase-auth';

const COLLECTION_NAME = 'messages';
const MESSAGE_LIMIT = 100;

const saveMessageInDB = (messageText, userName, profilePicUrl, imageUrl) => {
  const messageContent = {
    name: userName,
    profilePicUrl: profilePicUrl,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  if (messageText) messageContent.text = messageText;
  if (imageUrl) messageContent.imageUrl = imageUrl;

  return firebase
    .firestore()
    .collection(COLLECTION_NAME)
    .add(messageContent)
    .catch((error) => {
      console.error('Error writing new message to database', error);
    });
};

const retrieveMessagesFromDB = (cb) => {
  firebase
    .firestore()
    .collection(COLLECTION_NAME)
    .orderBy('timestamp', 'asc')
    .limit(MESSAGE_LIMIT)
    .onSnapshot((snapshot) => {
      const messages = [];
      snapshot.forEach(function (doc) {
        messages.push({ id: doc.id, ...doc.data() });
      });
      cb(messages);
    });
};

const saveFCMTokenInDB = (currentToken) => {
  firebase
    .firestore()
    .collection('fcmTokens')
    .doc(currentToken)
    .set({ uid: getCurrentUser().uid });
};

export { retrieveMessagesFromDB, saveMessageInDB, saveFCMTokenInDB };

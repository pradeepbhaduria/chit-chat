import * as firebase from 'firebase/app';
import 'firebase/firestore';

const COLLECTION_NAME = 'messages';

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
    .limit(12)
    .onSnapshot((snapshot) => {
      const messages = [];
      snapshot.forEach(function (doc) {
        messages.push({ id: doc.id, ...doc.data() });
      });
      cb(messages);
    });
};

export { retrieveMessagesFromDB, saveMessageInDB };

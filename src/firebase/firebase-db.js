import * as firebase from 'firebase/app';
import 'firebase/firestore';

const COLLECTION_NAME = 'messages';

const saveMessageInDB = (messageText, userName, profilePicUrl) => {
  return firebase
    .firestore()
    .collection(COLLECTION_NAME)
    .add({
      name: userName,
      text: messageText,
      profilePicUrl: profilePicUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
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
      console.log('messages retrieved from firestore-', messages);
      cb(messages);
    });
};

export { retrieveMessagesFromDB, saveMessageInDB };

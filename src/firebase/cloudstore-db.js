import * as firebase from 'firebase/app';
import 'firebase/storage';
import { saveMessageInDB } from './firestore-db';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

const saveImageMessageInDB = (file, user) => {
  const { displayName, photoURL, uid } = user;
  saveMessageInDB(undefined, displayName, photoURL, LOADING_IMAGE_URL)
    .then((messageRef) => {
      // 2 - Upload the image to Cloud Storage.
      var filePath = uid + '/' + messageRef.id + '/' + file.name;
      return firebase
        .storage()
        .ref(filePath)
        .put(file)
        .then((fileSnapshot) => {
          // 3 - Generate a public URL for the file.
          return fileSnapshot.ref.getDownloadURL().then((url) => {
            // 4 - Update the chat message placeholder with the image's URL.
            return messageRef.update({
              imageUrl: url,
              storageUri: fileSnapshot.metadata.fullPath,
            });
          });
        });
    })
    .catch((error) => {
      console.error(
        'There was an error uploading a file to Cloud Storage:',
        error
      );
    });
};

export { saveImageMessageInDB };

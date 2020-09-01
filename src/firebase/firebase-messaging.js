import * as firebase from 'firebase/app';
import 'firebase/messaging';

import { saveFCMTokenInDB } from './firestore-db';

// FCM device token
const saveMessagingDeviceToken = () => {
  firebase
    .messaging()
    .getToken()
    .then((currentToken) => {
      if (currentToken) {
        console.log('Got FCM device token:', currentToken);
        // Saving the Device Token to the datastore.
        saveFCMTokenInDB(currentToken);
      } else {
        // Need to request permissions to show notifications.
        requestNotificationsPermissions();
      }
    })
    .catch(function (error) {
      console.error('Unable to get messaging token.', error);
    });
};

// Requests permission to show notifications.
const requestNotificationsPermissions = () => {
  console.log('Requesting notifications permission...');
  firebase
    .messaging()
    .requestPermission()
    .then(() => {
      // Notification permission granted.
      saveMessagingDeviceToken();
    })
    .catch(function (error) {
      console.error('Unable to get permission to notify.', error);
    });
};

export { saveMessagingDeviceToken };

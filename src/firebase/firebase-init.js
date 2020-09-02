import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { initFirebaseAuth } from './firebase-auth';

const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

const init = (authObserver) => {
  console.log('init firebase');
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

    firebase.analytics();
    initFirebaseAuth(authObserver);
  }
};

export { init };

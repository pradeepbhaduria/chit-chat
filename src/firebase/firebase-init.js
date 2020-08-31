import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { initFirebaseAuth } from './firebase-auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAisBUwzn1o-qrYXFCgfzaPusHNWn3Y4ks',
  authDomain: 'chit-chat-abd92.firebaseapp.com',
  databaseURL: 'https://chit-chat-abd92.firebaseio.com',
  projectId: 'chit-chat-abd92',
  storageBucket: 'chit-chat-abd92.appspot.com',
  messagingSenderId: '796260349168',
  appId: '1:796260349168:web:266bee94b687778c6efe35',
  measurementId: 'G-13Q50GX7E7',
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

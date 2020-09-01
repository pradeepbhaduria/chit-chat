importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js'
);

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
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
firebase.messaging();

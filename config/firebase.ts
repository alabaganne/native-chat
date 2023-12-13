// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDeBedgLLGMQDAcBO9BG4Dez9Ri2boeC8w',
  authDomain: 'native-chat-c7562.firebaseapp.com',
  projectId: 'native-chat-c7562',
  storageBucket: 'native-chat-c7562.appspot.com',
  messagingSenderId: '830189822865',
  appId: '1:830189822865:web:c2d65614e9534e48467030',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

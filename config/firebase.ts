// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB5caO25jZeSjsqLoBmiDFvwj7NplTcHA8',
  authDomain: 'native-chat-1ae48.firebaseapp.com',
  projectId: 'native-chat-1ae48',
  storageBucket: 'native-chat-1ae48.appspot.com',
  messagingSenderId: '800214412238',
  appId: '1:800214412238:web:79cf91caa038e594e1999f',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

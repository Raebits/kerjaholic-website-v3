import firebase from 'firebase/app';

function FirebaseConfiguration()
{
  const firebaseConfig = {
    apiKey: "AIzaSyDf4XIIW9vIY88ZaIRztbJdx5cC3v4y4ug",
    authDomain: "kerjaholic-project.firebaseapp.com",
    databaseURL: "https://kerjaholic-project.firebaseio.com",
    projectId: "kerjaholic-project",
    storageBucket: "kerjaholic-project.appspot.com",
    messagingSenderId: "17773254584",
    appId: "1:17773254584:web:1d11fa3b369362a3efa14d"
  };
  
    //@M - Initializing firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
}

export default FirebaseConfiguration
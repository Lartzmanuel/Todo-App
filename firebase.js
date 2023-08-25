
const firebaseConfig = {
    apiKey: "AIzaSyC9MbtxaaYkEysoVXJA6UZJlUYjbZ_kO_Y",
    authDomain: "todo-app-f393c.firebaseapp.com",
    projectId: "todo-app-f393c",
    storageBucket: "todo-app-f393c.appspot.com",
    messagingSenderId: "443245635508",
    appId: "1:443245635508:web:f8bd00b42eb13a513074e1",
    measurementId: "G-5Q7WQ6YW69"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
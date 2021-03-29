import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBgo9gW4HW2AY01z8JQXF8AIBnPFbSbodY",
    authDomain: "vue-3-resynq.firebaseapp.com",
    projectId: "vue-3-resynq",
    storageBucket: "vue-3-resynq.appspot.com",
    messagingSenderId: "69237159572",
    appId: "1:69237159572:web:02ef7a6e9dd271980ca681"
  };

  // Initialize firebase
  firebase.initializeApp(firebaseConfig)

  // Initialize services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  // Initialize timestamp
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, projectAuth, timestamp }

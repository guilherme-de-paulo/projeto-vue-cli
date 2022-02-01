import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA87LjKGUZYgSWBDL0JhHP8BEQLNyL67Fg",
  authDomain: "agenda-compromissos.firebaseapp.com",
  projectId: "agenda-compromissos",
  storageBucket: "agenda-compromissos.appspot.com",
  messagingSenderId: "271528777775",
  appId: "1:271528777775:web:69108f22c8bfa27b374eda"
  };

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const profileCollection = db.collection('profile')
const tasksCollection = db.collection('tasks')

export {
    db, auth, profileCollection, tasksCollection
}
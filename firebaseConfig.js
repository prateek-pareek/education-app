import {FirebaseApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {initializeApp} from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDo99J0800ioPZ8HOkDZE_5DnXtRZYaV6o',
  authDomain: 'skillconnect-34ad9.firebaseapp.com',
  projectId: 'skillconnect-34ad9',
  storageBucket: 'skillconnect-34ad9.firebasestorage.app',
  messagingSenderId: '477322964738',
  appId: '1:477322964738:web:477cfd428a03d9e93f5c1b',
  measurementId: 'G-0P29H95E96',
}

const app = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db, googleProvider, facebookProvider}

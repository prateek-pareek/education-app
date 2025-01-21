import { FirebaseApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyAk8EoMhJjZkV917dN84F8Dt1308MynBCA",
  authDomain: "skillconnect-8fd96.firebaseapp.com",
  projectId: "skillconnect-8fd96",
  storageBucket: "skillconnect-8fd96.firebasestorage.app",
  messagingSenderId: "553487939376",
  appId: "1:553487939376:web:c6618802290e487797faf5",
  measurementId: "G-G531KYMTH0"
};


const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const db = getFirestore(app)

export { auth, db, googleProvider, facebookProvider }
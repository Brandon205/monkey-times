import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBn8L4Mu2RXjQl4xO6MWUzTNO3rHVBYHMI",
    authDomain: "cubex-754a0.firebaseapp.com",
    projectId: "cubex-754a0",
    storageBucket: "cubex-754a0.appspot.com",
    messagingSenderId: "149822201328",
    appId: "1:149822201328:web:08fbd1c1de41667dd7d135",
    measurementId: "G-JJKN6VFCB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();

export async function getUserWithUsername(username) {
    const q = query(collection(firestore, 'users'), where('username', '==', username), limit(1))

    const userDoc = await getDocs(q)
    console.log(userDoc)
    return userDoc;
}
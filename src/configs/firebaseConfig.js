import {initializeApp} from 'firebase/app';
import {FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA0Jt4G51mGu-o79RXC454OxoMrllFonNg",
    authDomain: "eventurax-82489.firebaseapp.com",
    projectId: "eventurax-82489",
    storageBucket: "eventurax-82489.firebasestorage.app",
    messagingSenderId: "1047864029708",
    appId: "1:1047864029708:web:11addae84a2c6a934e7429",
    measurementId: "G-1007H7R66C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export {auth, googleProvider, facebookProvider, signInWithPopup, twitterProvider};
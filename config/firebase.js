import * as firebase from 'firebase';
import 'firebase/auth';
import "firebase/firestore";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCzKFTAgLRh0TZVlg932nEwUfZ4ss8VIN4",
    authDomain: "gitfolio-3754d.firebaseapp.com",
    databaseURL: "https://gitfolio-3754d.firebaseio.com",
    projectId: "gitfolio-3754d",
    storageBucket: "gitfolio-3754d.appspot.com",
    messagingSenderId: "352624670316",
    appId: "1:352624670316:web:0b84b6f398e8b37c8b4a49",
    measurementId: "G-Q1EZDK3LEQ"
};

try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
} catch (e) {
    console.log(e.message);
    // TODO:
    // firebase.analytics();
}

// export { firebaseConfig };
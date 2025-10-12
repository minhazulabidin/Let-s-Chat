import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA1ARt_dpOkmgDPwvz3P1FCi8BQrNZLpaE",
    authDomain: "letschat-20edc.firebaseapp.com",
    projectId: "letschat-20edc",
    storageBucket: "letschat-20edc.firebasestorage.app",
    messagingSenderId: "1001226271621",
    appId: "1:1001226271621:web:fe645eea52113b1b6422ec",
    measurementId: "G-DEFYSBBDDN"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
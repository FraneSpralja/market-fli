import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDQtqtyQws9v3-VYPIJcvfW4cze4c3npcM",
    authDomain: "fli-market.firebaseapp.com",
    projectId: "fli-market",
    storageBucket: "fli-market.appspot.com",
    messagingSenderId: "865311625471",
    appId: "1:865311625471:web:6cd25cf8c6617c3959fcca"
};

const app = initializeApp(firebaseConfig);

export default app;
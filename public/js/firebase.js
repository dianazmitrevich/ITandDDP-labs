// импортируйте Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
// import 'https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js';
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// import { initializeApp } from "firebase/app";

// настройте Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDOVzLbZ1IKLifDttXtOoTLbbDMA62cGNQ",
    authDomain: "itandddp-labs.firebaseapp.com",
    projectId: "itandddp-labs",
    storageBucket: "itandddp-labs.appspot.com",
    messagingSenderId: "157064708029",
    appId: "1:157064708029:web:d8f7aff35381352ddd5cd4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Get a list of cities from your database
async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}

// получите ссылку на базу данных

// --------------

console.log(app);
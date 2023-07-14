// Arquivo/Script para a conexão com o Banco de Dados(DB)-FireStore (este arquivo pode se chamar de: db.js; dbConnection.js; dbFirebase.js; etc)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCADWZQ8H68gAEu2R9gAeqQGbhawEcBTw4",
  authDomain: "cursosujeito-490cd.firebaseapp.com",
  projectId: "cursosujeito-490cd",
  storageBucket: "cursosujeito-490cd.appspot.com",
  messagingSenderId: "855034620395",
  appId: "1:855034620395:web:90cd677922e87549a051ae",
  measurementId: "G-RKRV462PNW"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// Instancia a const "db" e exporta para ser usada em outros arquivos:
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, auth };
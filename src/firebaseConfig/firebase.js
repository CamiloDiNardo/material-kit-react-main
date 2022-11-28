// configuracion de firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
// json con parametros de firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAOFprTCA7Hjg6bxXVpmZ9eSYUyQhSEt8M',
  authDomain: 'pizzeria-45208.firebaseapp.com',
  projectId: 'pizzeria-45208',
  storageBucket: 'pizzeria-45208.appspot.com',
  messagingSenderId: '109575160762',
  appId: '1:109575160762:web:4c1e69fca3aa0a7dc0d383',
};

// pasamos el json como parametro
const app = initializeApp(firebaseConfig);
// nos conectamos a la base de datos y ya la podemos usar importandola en un componente
export const db = getFirestore(app);
export const auth = getAuth(app);

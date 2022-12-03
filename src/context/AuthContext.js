/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
/* signInwithPopup: sirve para que salga una ventanita y asi elegis el
correo de google que quieras
Google,Facebook,Twitter AuthProvider: es el provider de estos servicios
onAuthStateChanged: sirve para recuperar todos los datos del usuario
signOut: sirve para cerrar sesion 
createUserWithEmailAndPassword: para crear el usuario (primero va email
  y contraseña y despues lo demas sino da error.) aparece en la consola
  de firebase el correo si se creo.
signInWithEmailAndPassword: para iniciar sesion con los usuarios ya creados
 sendPasswordResetEmail: */
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig/firebase';

const AuthContext = createContext([]);

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  /* en user guardamos los datos de los usuarios nc si va null o no. */
  const [user, Setuser] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    /* nos devuelve el usuario */
    onAuthStateChanged(auth, (user) => {
      if (user) {
        Setuser(user); /* si hay un usuario q lo guarde en setuser */
      } else {
        Setuser('');
      }
    });
  }, []);
  // Cerrar Sesion
  const cerrarSesion = () => {
    signOut(auth);
    navigate('/register', { replace: true });
  };
  /* con esto hacemos que al apretar click en el boton salga la ventana para
elegir el correo de google para iniciar sesion */
  /* usamos async/await para esperar a que esa login este echo y despues 
redirigir, sino redirige antes. */
  /* el signInWithPopup tiene q recibir 2 parametros para funcionar el auth
y el provider  */
  const loginGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };
  const loginFacebook = async () => {
    const facebookProvider = new FacebookAuthProvider();
    await signInWithPopup(auth, facebookProvider);
  };
  const loginTwitter = async () => {
    const TwitterProvider = new TwitterAuthProvider();
    await signInWithPopup(auth, TwitterProvider);
  };
  // Registrar email
  const registrerEmailandPassword = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password, data.firstname, data.lastname);
    navigate('/login', { replace: true });
  };
  /* Logear usuario OJO no podemos poner en el registro y el login el mismo
parametro xq sino no registra el usuario */
  const loginEmailandPassword = async (value) => {
    await signInWithEmailAndPassword(auth, value.email, value.password);
    navigate('/dashboard/app', { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        loginGoogle,
        loginFacebook,
        loginTwitter,
        user,
        cerrarSesion,
        registrerEmailandPassword,
        loginEmailandPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

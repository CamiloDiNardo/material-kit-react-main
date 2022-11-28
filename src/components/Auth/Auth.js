import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
/* este componente nos verifica si hay un usuario o si no lo hay */
export const Auth = ({ children }) => {
  const { user } = useAuthContext();
  /* si no hay un usuario nos va a redireccionar a el login */
  if (!user) return <Navigate to="/dashboard/login" />;
  /* sino al children. */
  return <>{children}</>;
};

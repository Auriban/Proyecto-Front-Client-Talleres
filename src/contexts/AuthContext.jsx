import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * Contexto para autenticación.
 * Contiene el objeto devuelto por useAuth() (usuario, funciones como login/logout, etc.).
 * @type {React.Context<any>}
 */
export const AuthContext = createContext();

/**
 * Provider del contexto de autenticación.
 *
 * Envuelve la aplicación y proporciona el valor obtenido de useAuth().
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Nodos hijos que recibirán el contexto.
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
  // Hook personalizado que encapsula la lógica de auth 
  const authValue = useAuth();

  // Proveer el valor a los componentes descendientes.
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para consumir el contexto de autenticación.
 *
 * Lanza un error si se usa fuera de <AuthProvider>
 *
 * @returns {any} Valor del contexto (lo que devuelve useAuth()).
 * @throws {Error} Si no hay contexto (uso fuera del Provider).
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Mensaje claro en español para debugging en desarrollo.
    throw new Error('useAuthContext debe usarse dentro de <AuthProvider>');
  }
  return context;
};
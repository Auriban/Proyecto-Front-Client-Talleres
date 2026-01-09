import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

// Contexto
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const authValue = useAuth();
  
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar en componentes
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de <AuthProvider>');
  }
  return context;
};

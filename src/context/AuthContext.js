import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const usersDB = [
    {
      email: 'admin@example.com',
      password: 'admin123',
      nombre: 'Administrador',
      rol: 'admin'
    },
    {
      email: 'santiago@universidad.edu',
      password: 'estudiante',
      nombre: 'Santiago Rodriguez',
      rol: 'user'
    }
  ];

  useEffect(() => {
    // Verificar sesión al cargar
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al parsear usuario:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = usersDB.find(u => 
          u.email === email && u.password === password
        );

        if (foundUser) {
          const userData = {
            email: foundUser.email,
            nombre: foundUser.nombre,
            rol: foundUser.rol
          };
          
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('authUser', JSON.stringify(userData));
          resolve({ success: true, user: userData });
        } else {
          reject(new Error("Credenciales incorrectas"));
        }
      }, 500); 
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
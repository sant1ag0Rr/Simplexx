import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';
import MainLayout from './MainLayout';
import AdminPanel from './AdminPanel'; // Importa desde la carpeta

const Router = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Ruta pública */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={user?.rol === 'admin' ? "/admin" : "/"} /> : <Login />} 
      />

      {/* Ruta para usuarios normales */}
      <Route 
        path="/" 
        element={
          isAuthenticated && user?.rol === 'user' 
            ? <MainLayout /> 
            : <Navigate to={isAuthenticated ? "/admin" : "/login"} />
        } 
      />

      {/* Ruta para admin */}
      <Route 
        path="/admin" 
        element={
          isAuthenticated && user?.rol === 'admin' 
            ? <AdminPanel /> 
            : <Navigate to={isAuthenticated ? "/" : "/login"} />
        } 
      />

      {/* Redirección para rutas no encontradas */}
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? (user?.rol === 'admin' ? "/admin" : "/") : "/login"} />} 
      />
    </Routes>
  );
};

export default Router;
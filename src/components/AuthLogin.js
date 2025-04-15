import React, { useState } from 'react';
import { MOCK_USERS, MOCK_ROLES } from '../mock/users';

const AuthLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (user) {
      onLogin(user);
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Simplex
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Gestión Académica Inteligente
          </p>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}
          <button 
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;
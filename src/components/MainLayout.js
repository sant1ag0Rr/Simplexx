import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ChatbotAssistant from './ChatbotAssistant';
import SolicitudesManager from './SolicitudesManager';
import Foro from './Foro';

const MainLayout = ({ onCreateSolicitud }) => {
  const [currentView, setCurrentView] = useState('chatbot');
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Simplex</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('profile')}
              className="flex items-center space-x-2"
            >
              <span className="w-8 h-8 rounded-full bg-white text-blue-800 flex items-center justify-center font-bold">
                {user?.nombre?.charAt(0)}
              </span>
              <span>{user?.nombre}</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white text-blue-800 rounded-lg hover:bg-gray-100 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex space-x-4 p-2">
          <button
            onClick={() => setCurrentView('chatbot')}
            className={`px-4 py-2 rounded-lg transition ${
              currentView === 'chatbot'
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Asistente Virtual
          </button>
          <button
            onClick={() => setCurrentView('solicitudes')}
            className={`px-4 py-2 rounded-lg transition ${
              currentView === 'solicitudes'
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Solicitudes
          </button>
          <button
            onClick={() => setCurrentView('foro')}
            className={`px-4 py-2 rounded-lg transition ${
              currentView === 'foro'
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Foro
          </button>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-8">
        {currentView === 'chatbot' && <ChatbotAssistant />}
        {currentView === 'solicitudes' && (
          <SolicitudesManager onCreateSolicitud={onCreateSolicitud} />
        )}
        {currentView === 'foro' && <Foro />}
      </main>
    </div>
  );
};

export default MainLayout;


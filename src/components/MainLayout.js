import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import ChatbotAssistant from './ChatbotAssistant';
import SolicitudesManager from './SolicitudesManager';
import Foro from './Foro';

// Componente para la sección de inicio
const HomeSection = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo para reservas (reemplazar con API real)
  const espacios = [
    {
      id: 1,
      nombre: "Auditorio Principal",
      imagen: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      capacidad: "200 personas"
    },
    {
      id: 2,
      nombre: "Sala de Conferencias A",
      imagen: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      capacidad: "50 personas"
    },
    {
      id: 3,
      nombre: "Laboratorio de Computación",
      imagen: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      capacidad: "30 personas"
    }
  ];

  // Simulación de API de noticias
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        // En producción, reemplazar con:
        // const response = await fetch('https://api.udem.edu.co/noticias');
        // const data = await response.json();
        
        // Datos de ejemplo
        const data = [
          {
            id: 1,
            titulo: "Semana de la Innovación",
            fecha: "2025-05-15",
            resumen: "Charlas y talleres sobre innovación tecnológica"
          },
          {
            id: 2,
            titulo: "Nuevo laboratorio de IA",
            fecha: "2025-05-19",
            resumen: "Ya puedes inscribirte para usar el nuevo laboratorio de Inteligencia Artificial."
          }
        ];
        setNoticias(data);
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  return (
    <div className="space-y-8">
      {/* Sección de Noticias UDEM */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-6">Noticias UDEM</h2>
        {loading ? (
          <p>Cargando noticias...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {noticias.map(noticia => (
              <div key={noticia.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-red-700">{noticia.titulo}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(noticia.fecha).toLocaleDateString('es-ES')}
                </p>
                <p className="text-gray-700">{noticia.resumen}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección de Reserva de Espacios */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-6">Reserva de Espacios</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {espacios.map(espacio => (
            <div key={espacio.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img 
                src={espacio.imagen} 
                alt={espacio.nombre} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-red-700">{espacio.nombre}</h3>
                <p className="text-gray-600 mb-4">Capacidad: {espacio.capacidad}</p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition">
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const MainLayout = ({ onCreateSolicitud }) => {
  const [currentView, setCurrentView] = useState('home'); // Cambiado a 'home' como vista inicial
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con color rojo */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Universidad de Medellín</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('profile')}
              className="flex items-center space-x-2 hover:bg-red-700 px-3 py-1 rounded transition"
            >
              <span className="w-8 h-8 rounded-full bg-white text-red-800 flex items-center justify-center font-bold">
                {user?.nombre?.charAt(0)}
              </span>
              <span>{user?.nombre}</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white text-red-800 rounded-lg hover:bg-gray-100 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Barra de navegación con color rojo */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex space-x-4 p-2 overflow-x-auto">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'home'
                ? 'bg-red-100 text-red-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setCurrentView('chatbot')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'chatbot'
                ? 'bg-red-100 text-red-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Asistente Virtual
          </button>
          <button
            onClick={() => setCurrentView('solicitudes')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'solicitudes'
                ? 'bg-red-100 text-red-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Solicitudes
          </button>
          <button
            onClick={() => setCurrentView('foro')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'foro'
                ? 'bg-red-100 text-red-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Foro
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="container mx-auto p-4 md:p-8">
        {currentView === 'home' && <HomeSection />}
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
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getSolicitudes, actualizarEstado, resolverSolicitud } from '../mock/api';

const AdminPanel = () => {
  const { user, logout } = useContext(AuthContext);
  const [solicitudes, setSolicitudes] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [respuestaActual, setRespuestaActual] = useState('');
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar solicitudes al montar el componente
  useEffect(() => {
    const cargarSolicitudes = () => {
      setIsLoading(true);
      try {
        const data = getSolicitudes();
        setSolicitudes(data);
      } catch (error) {
        console.error("Error al cargar solicitudes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarSolicitudes();
  }, []);

  // Filtrar solicitudes según estado
  const solicitudesFiltradas = solicitudes.filter(s => {
    if (filtro === 'todas') return true;
    return s.estado === filtro;
  });

  // Cambiar estado de una solicitud
  const cambiarEstado = (id, nuevoEstado) => {
    try {
      actualizarEstado(id, nuevoEstado);
      setSolicitudes(getSolicitudes());
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  // Responder a una solicitud
  const handleResponder = (id) => {
    if (!respuestaActual) return;
    
    try {
      resolverSolicitud(id, respuestaActual);
      setSolicitudes(getSolicitudes());
      setRespuestaActual('');
      setSelectedSolicitud(null);
    } catch (error) {
      console.error("Error al responder:", error);
    }
  };

  // Formatear fecha
  const formatFecha = (fechaString) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(fechaString).toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium">{user?.nombre || 'Administrador'}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white text-purple-800 rounded-lg hover:bg-gray-100 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          {/* Filtros */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {['todas', 'pendiente', 'aprobada', 'rechazada'].map((opcion) => (
                <button
                  key={opcion}
                  onClick={() => setFiltro(opcion)}
                  className={`px-4 py-2 rounded-lg transition ${
                    filtro === opcion 
                      ? 'bg-purple-100 text-purple-800 font-medium shadow-inner' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {opcion === 'todas' ? 'Todas' : 
                   opcion === 'pendiente' ? 'Pendientes' :
                   opcion === 'aprobada' ? 'Aprobadas' : 'Rechazadas'}
                </button>
              ))}
            </div>
          </div>

          {/* Listado de solicitudes */}
          <div className="divide-y divide-gray-200">
            {isLoading ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">Cargando solicitudes...</p>
              </div>
            ) : solicitudesFiltradas.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No hay solicitudes {filtro !== 'todas' ? `en estado ${filtro}` : ''}
              </div>
            ) : (
              solicitudesFiltradas.map((solicitud) => (
                <div key={solicitud.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800">
                            {solicitud.tipo || 'Solicitud sin tipo'}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="font-medium">{solicitud.usuario || 'Usuario anónimo'}</span> · 
                            {solicitud.email && ` · ${solicitud.email}`} · 
                            {solicitud.fecha && ` · ${formatFecha(solicitud.fecha)}`}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          solicitud.estado === 'pendiente' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : solicitud.estado === 'aprobada' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {solicitud.estado || 'sin-estado'}
                        </span>
                      </div>
                      
                      <p className="mt-3 text-gray-700 whitespace-pre-line">
                        {solicitud.descripcion || 'Sin descripción'}
                      </p>

                      {solicitud.respuesta && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-sm font-medium text-blue-800">Respuesta:</p>
                          <p className="text-gray-700 mt-1 whitespace-pre-line">{solicitud.respuesta}</p>
                        </div>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-2 md:w-48">
                      {solicitud.estado === 'pendiente' && (
                        <>
                          <button
                            onClick={() => cambiarEstado(solicitud.id, 'aprobada')}
                            className="w-full px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition text-sm"
                          >
                            Aprobar
                          </button>
                          <button
                            onClick={() => setSelectedSolicitud(selectedSolicitud === solicitud.id ? null : solicitud.id)}
                            className="w-full px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition text-sm"
                          >
                            {selectedSolicitud === solicitud.id ? 'Cancelar' : 'Responder'}
                          </button>
                          <button
                            onClick={() => cambiarEstado(solicitud.id, 'rechazada')}
                            className="w-full px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition text-sm"
                          >
                            Rechazar
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Formulario de respuesta */}
                  {selectedSolicitud === solicitud.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <textarea
                        value={respuestaActual}
                        onChange={(e) => setRespuestaActual(e.target.value)}
                        placeholder="Escribe tu respuesta aquí..."
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => {
                            setSelectedSolicitud(null);
                            setRespuestaActual('');
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleResponder(solicitud.id)}
                          disabled={!respuestaActual}
                          className={`px-4 py-2 rounded-lg transition ${
                            respuestaActual
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Enviar respuesta
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
import React, { useState } from 'react';
import { MOCK_SOLICITUDES_ADMIN } from '../mock/solicitudesAdmin';

const AdminSolicitudesManager = () => {
  const [solicitudes, setSolicitudes] = useState(MOCK_SOLICITUDES_ADMIN);
  const [filtro, setFiltro] = useState({ estado: '', tipo: '' });
  const [busqueda, setBusqueda] = useState('');

  const filtrarSolicitudes = () => {
    return solicitudes.filter(solicitud => 
      (filtro.estado ? solicitud.estado === filtro.estado : true) &&
      (filtro.tipo ? solicitud.tipo === filtro.tipo : true) &&
      (busqueda ? solicitud.estudiante.toLowerCase().includes(busqueda.toLowerCase()) : true)
    );
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes(solicitudes.map(solicitud => 
      solicitud.id === id ? { ...solicitud, estado: nuevoEstado } : solicitud
    ));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Gestión de Solicitudes</h2>
        
        <div className="flex space-x-4 mb-6">
          <select 
            value={filtro.estado}
            onChange={(e) => setFiltro({...filtro, estado: e.target.value})}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Todos los Estados</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Rechazado">Rechazado</option>
          </select>

          <select 
            value={filtro.tipo}
            onChange={(e) => setFiltro({...filtro, tipo: e.target.value})}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Todos los Tipos</option>
            <option value="Cambio de Carrera">Cambio de Carrera</option>
            <option value="Inscripción de Curso">Inscripción de Curso</option>
          </select>

          <input 
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por estudiante"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {filtrarSolicitudes().map(solicitud => (
          <div 
            key={solicitud.id} 
            className="bg-gray-50 p-4 rounded-lg mb-3 border flex justify-between items-center"
          >
            <div>
              <div className="flex items-center mb-2">
                <h3 className="font-bold mr-4">{solicitud.estudiante}</h3>
                <span 
                  className={`px-3 py-1 rounded-full text-sm ${
                    solicitud.estado === 'Aprobado' 
                      ? 'bg-green-100 text-green-800' 
                      : solicitud.estado === 'En Revisión'
                      ? 'bg-yellow-100 text-yellow-800'
                      : solicitud.estado === 'Pendiente'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {solicitud.estado}
                </span>
              </div>
              <p className="text-gray-600">{solicitud.tipo}</p>
              <p className="text-sm text-gray-500">{solicitud.descripcion}</p>
              <span className="text-xs text-gray-400">{solicitud.fecha}</span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => cambiarEstado(solicitud.id, 'Aprobado')}
                className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
              >
                Aprobar
              </button>
              <button 
                onClick={() => cambiarEstado(solicitud.id, 'Rechazado')}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
              >
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSolicitudesManager;
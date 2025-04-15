import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { enviarSolicitud } from '../mock/api';

const SolicitudesManager = () => {
  const { user } = useContext(AuthContext);

  // Estados del formulario
  const [selectedCategory, setSelectedCategory] = useState('academicas');
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Tipos de solicitudes disponibles
  const tiposSolicitudes = {
    academicas: [
      'Horarios',
      'Cambio de grupo',
      'Notas',
      'Información de docente',
      'Programas académicos'
    ],
    administrativas: [
      'Solicitud de documentos',
      'Pagos y reembolsos',
      'Reserva de espacios'
    ],
    pqrsf: [
      'Petición',
      'Queja',
      'Reclamo',
      'Sugerencia',
      'Felicitación'
    ]
  };

  const handleSubmit = async () => {
    if (!selectedSolicitud || !descripcion) return;

    setIsSubmitting(true);

    try {
      const nuevaSolicitud = {
        tipo: selectedSolicitud,
        descripcion,
        categoria: selectedCategory,
        usuario: user?.nombre || 'Anónimo',
        email: user?.email || '',
        estado: 'pendiente'
      };

      await enviarSolicitud(nuevaSolicitud);
      
      setSuccessMessage('¡Solicitud enviada correctamente!');
      setSelectedSolicitud(null);
      setDescripcion('');
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      setSuccessMessage('Error al enviar la solicitud');
    } finally {
      setIsSubmitting(false);
    }
  };

  const obtenerSolicitudes = () => {
    return tiposSolicitudes[selectedCategory] || [];
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <h2 className="text-2xl font-bold">Gestión de Solicitudes</h2>
      </div>

      <div className="p-6">
        {/* Selector de categoría */}
        <div className="flex space-x-4 mb-6">
          {Object.keys(tiposSolicitudes).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedSolicitud(null);
              }}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === cat
                  ? 'bg-green-100 text-green-800 font-medium'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat === 'academicas'
                ? 'Académicas'
                : cat === 'administrativas'
                ? 'Administrativas'
                : 'PQRSF'}
            </button>
          ))}
        </div>

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className={`mb-4 p-3 rounded-lg ${successMessage.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {successMessage}
          </div>
        )}

        {/* Listado de solicitudes o formulario */}
        {!selectedSolicitud ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {obtenerSolicitudes().map((solicitud) => (
              <div
                key={solicitud}
                onClick={() => setSelectedSolicitud(solicitud)}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <h3 className="text-lg font-semibold mb-2">{solicitud}</h3>
                <p className="text-gray-600">Haz clic para solicitar</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Solicitud: {selectedSolicitud}</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción detallada
                  </label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe tu solicitud con detalles..."
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedSolicitud(null);
                      setDescripcion('');
                    }}
                    className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!descripcion || isSubmitting}
                    className={`flex-1 py-2 rounded-lg transition ${
                      descripcion && !isSubmitting
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitudesManager;
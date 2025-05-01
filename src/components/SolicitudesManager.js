import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { enviarSolicitud } from '../mock/api';
import styles from './SolicitudesManager.module.css';

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
    <div className={styles.managerContainer}>
      <div className={styles.managerHeader}>
        <h2 className={styles.managerTitle}>Gestión de Solicitudes</h2>
      </div>

      <div className="p-6">
        {/* Selector de categoría */}
        <div className={styles.categoryTabs}>
          {Object.keys(tiposSolicitudes).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedSolicitud(null);
              }}
              className={`${styles.categoryTab} ${
                selectedCategory === cat 
                  ? styles.activeCategory 
                  : styles.inactiveCategory
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
          <div className={`${styles.message} ${
            successMessage.includes('Error') 
              ? styles.errorMessage 
              : styles.successMessage
          }`}>
            {successMessage}
          </div>
        )}

        {/* Listado de solicitudes o formulario */}
        {!selectedSolicitud ? (
          <div className={styles.requestsGrid}>
            {obtenerSolicitudes().map((solicitud) => (
              <div
                key={solicitud}
                onClick={() => setSelectedSolicitud(solicitud)}
                className={styles.requestCard}
              >
                <h3 className={styles.requestTitle}>{solicitud}</h3>
                <p className={styles.requestPrompt}>Haz clic para solicitar</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.requestForm}>
            <h3 className={styles.formTitle}>Solicitud: {selectedSolicitud}</h3>

            <div>
              <label className={styles.formLabel}>
                Descripción detallada
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className={styles.formTextarea}
                placeholder="Describe tu solicitud con detalles..."
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formButtons}>
              <button
                onClick={() => {
                  setSelectedSolicitud(null);
                  setDescripcion('');
                }}
                className={styles.cancelButton}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!descripcion || isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? (
                  <span className={styles.loadingText}>
                    Enviando
                    <span className={styles.loadingDot}></span>
                    <span className={styles.loadingDot}></span>
                    <span className={styles.loadingDot}></span>
                  </span>
                ) : (
                  'Enviar Solicitud'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitudesManager;
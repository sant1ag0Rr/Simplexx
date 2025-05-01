import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getSolicitudes, actualizarEstado, resolverSolicitud } from '../mock/api';
import styles from './AdminPanel.module.css';

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
    <div className={styles.adminContainer}>
      {/* Header */}
      <header className={styles.adminHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.adminTitle}>Panel de Administración</h1>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.nombre || 'Administrador'}</span>
            <button
              onClick={logout}
              className={styles.logoutButton}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className={styles.mainContent}>
        <div className={styles.requestCard}>
          {/* Filtros */}
          <div className={styles.filterContainer}>
            <div className={styles.filterButtons}>
              {['todas', 'pendiente', 'aprobada', 'rechazada'].map((opcion) => (
                <button
                  key={opcion}
                  onClick={() => setFiltro(opcion)}
                  className={`${styles.filterButton} ${
                    filtro === opcion 
                      ? styles.filterButtonActive 
                      : styles.filterButtonInactive
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
          <div className={styles.requestList}>
            {isLoading ? (
              <div className={styles.loadingState}>
                <p>Cargando solicitudes...</p>
              </div>
            ) : solicitudesFiltradas.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No hay solicitudes {filtro !== 'todas' ? `en estado ${filtro}` : ''}</p>
              </div>
            ) : (
              solicitudesFiltradas.map((solicitud) => (
                <div key={solicitud.id} className={styles.requestItem}>
                  <div className={styles.requestHeader}>
                    <div className={styles.requestContent}>
                      <h3 className={styles.requestTitle}>
                        {solicitud.tipo || 'Solicitud sin tipo'}
                      </h3>
                      <p className={styles.requestMeta}>
                        <span>{solicitud.usuario || 'Usuario anónimo'}</span>
                        {solicitud.email && ` · ${solicitud.email}`}
                        {solicitud.fecha && ` · ${formatFecha(solicitud.fecha)}`}
                      </p>
                      
                      <p className={styles.requestDescription}>
                        {solicitud.descripcion || 'Sin descripción'}
                      </p>

                      {solicitud.respuesta && (
                        <div className={styles.requestResponse}>
                          <p className={styles.responseLabel}>Respuesta:</p>
                          <p className={styles.responseText}>{solicitud.respuesta}</p>
                        </div>
                      )}
                    </div>

                    {/* Estado */}
                    <span className={`${styles.requestStatus} ${
                      solicitud.estado === 'pendiente' 
                        ? styles.statusPending
                        : solicitud.estado === 'aprobada'
                          ? styles.statusApproved
                          : styles.statusRejected
                    }`}>
                      {solicitud.estado || 'sin-estado'}
                    </span>

                    {/* Acciones */}
                    {solicitud.estado === 'pendiente' && (
                      <div className={styles.requestActions}>
                        <button
                          onClick={() => cambiarEstado(solicitud.id, 'aprobada')}
                          className={`${styles.actionButton} ${styles.approveButton}`}
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => setSelectedSolicitud(selectedSolicitud === solicitud.id ? null : solicitud.id)}
                          className={`${styles.actionButton} ${styles.respondButton}`}
                        >
                          {selectedSolicitud === solicitud.id ? 'Cancelar' : 'Responder'}
                        </button>
                        <button
                          onClick={() => cambiarEstado(solicitud.id, 'rechazada')}
                          className={`${styles.actionButton} ${styles.rejectButton}`}
                        >
                          Rechazar
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Formulario de respuesta */}
                  {selectedSolicitud === solicitud.id && (
                    <div className={styles.responseForm}>
                      <textarea
                        value={respuestaActual}
                        onChange={(e) => setRespuestaActual(e.target.value)}
                        placeholder="Escribe tu respuesta aquí..."
                        rows={3}
                        className={styles.responseTextarea}
                      />
                      <div className={styles.formActions}>
                        <button
                          onClick={() => {
                            setSelectedSolicitud(null);
                            setRespuestaActual('');
                          }}
                          className={styles.cancelButton}
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleResponder(solicitud.id)}
                          disabled={!respuestaActual}
                          className={`${styles.submitButton} ${
                            respuestaActual
                              ? styles.submitButtonActive
                              : styles.submitButtonDisabled
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
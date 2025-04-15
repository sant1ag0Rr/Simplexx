// mock/api.js
let solicitudes = [];

export const enviarSolicitud = (solicitud) => {
  const nuevaSolicitud = {
    ...solicitud,
    id: Date.now(),
    estado: 'pendiente',
    fecha: new Date().toISOString()
  };
  solicitudes.push(nuevaSolicitud);
  return nuevaSolicitud;
};

export const getSolicitudes = () => [...solicitudes];

export const actualizarEstado = (id, nuevoEstado) => {
  const solicitudIndex = solicitudes.findIndex(sol => sol.id === id);
  if (solicitudIndex !== -1) {
    solicitudes[solicitudIndex].estado = nuevoEstado;
  }
};

// ¡Asegúrate de que esta función esté presente y exportada!
export const resolverSolicitud = (id, respuesta) => {
  const solicitudIndex = solicitudes.findIndex(sol => sol.id === id);
  if (solicitudIndex !== -1) {
    solicitudes[solicitudIndex] = {
      ...solicitudes[solicitudIndex],
      respuesta,
      estado: 'resuelta'
    };
    return true;
  }
  return false;
};
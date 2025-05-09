import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Configuración global de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos máximo de espera
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Busca información en la API de la UdeM
 * @param {string} query - Término de búsqueda
 * @returns {Promise<{source: string, results: Array}>}
 */
export const searchUdemInfo = async (query) => {
  try {
    const response = await api.get('/api/search', {
      params: { query }
    });
    
    return {
      success: true,
      source: response.data.source || 'UDEM API',
      results: response.data.results || []
    };
    
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Error al conectar con el servidor'
    };
  }
};

/**
 * Búsqueda local en los datos mock
 * @param {string} query 
 * @param {object} localData 
 * @returns {object|null}
 */
export const searchLocalData = (query, localData) => {
  const queryLower = query.toLowerCase();
  
  // Búsqueda en programas
  if (queryLower.includes('programa') || queryLower.includes('carrera')) {
    return {
      source: 'Base de datos local',
      results: localData.programas.map(p => ({
        titulo: p.nombre,
        contenido: `${p.facultad} - Duración: ${p.duracion}`,
        tipo: 'programa'
      }))
    };
  }
  
  // Búsqueda en fechas importantes
  if (queryLower.includes('inscripción') || queryLower.includes('matrícula')) {
    return {
      source: 'Base de datos local',
      results: [{
        titulo: 'Fechas importantes',
        contenido: `Inscripciones: ${localData.fechasImportantes.inscripciones}\nMatrícula: ${localData.fechasImportantes.matriculaFinanciera}\nClases: ${localData.fechasImportantes.inicioClases}`,
        tipo: 'fechas'
      }]
    };
  }
  
  return null;
};
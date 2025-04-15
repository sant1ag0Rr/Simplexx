import React, { useState } from 'react';
import { UDEM_INFO } from '../mock/udemData';
import { callOpenAI } from '../services/openaiService';

const ChatbotAssistant = () => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocalQuery = (question) => {
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes('programa') || questionLower.includes('carrera')) {
      return {
        answer: `Programas disponibles:\n${UDEM_INFO.programas.map(p => 
          `• ${p.nombre} (${p.facultad}) - ${p.duracion}`
        ).join('\n')}`,
        source: 'local'
      };
    }
    
    if (questionLower.includes('inscripción') || questionLower.includes('matrícula')) {
      return {
        answer: `Fechas importantes:\n• Inscripciones: ${UDEM_INFO.fechasImportantes.inscripciones}\n• Matrícula: ${UDEM_INFO.fechasImportantes.matriculaFinanciera}\n• Clases: ${UDEM_INFO.fechasImportantes.inicioClases}`,
        source: 'local'
      };
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    
    const userMessage = { role: 'user', content: query };
    setConversation(prev => [...prev, userMessage]);
    
    try {
      const localResponse = handleLocalQuery(query);
      
      if (localResponse) {
        setConversation(prev => [...prev, { 
          role: 'assistant', 
          content: localResponse.answer,
          source: localResponse.source
        }]);
        setQuery('');
        return;
      }
      
      const response = await callOpenAI(query, UDEM_INFO);
      const aiAnswer = response.choices[0].message.content;
      
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: aiAnswer,
        source: 'AI'
      }]);
      
    } catch (err) {
      setError('Error al conectar con el servicio. Verifica tu conexión o API key.');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <h2 className="text-2xl font-bold">Asistente UdeM</h2>
        <p className="text-blue-100">Pregunta sobre programas, fechas y trámites</p>
      </div>
      
      <div className="p-6 h-96 overflow-y-auto">
        {conversation.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p>¡Hola! Soy el asistente de la Universidad de Medellín.</p>
              <p>Pregúntame sobre:</p>
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>Programas académicos</li>
                <li>Fechas de inscripción</li>
                <li>Información de contacto</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-4 whitespace-pre-line ${
                    msg.role === 'user' 
                      ? 'bg-blue-100 text-blue-900' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                  {msg.source && (
                    <div className="mt-1 text-xs text-gray-500">
                      Fuente: {msg.source === 'local' ? 'Base de datos UdeM' : 'GPT-3.5 Turbo'}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-4 max-w-xs">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: ¿Qué programas ofrece la UdeM?"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ChatbotAssistant;

// DONE

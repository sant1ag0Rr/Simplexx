import React, { useState } from 'react';
import { UDEM_INFO } from '../mock/udemData';
import { callOpenAI } from '../services/openaiService';
import { searchUdemInfo, searchLocalData } from '../api/apiService';
import styles from './ChatbotAssistant.module.css';

const ChatbotAssistant = () => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    
    // Agregar mensaje del usuario
    setConversation(prev => [...prev, {
      role: 'user',
      content: query
    }]);

    try {
      // 1. Primero buscar en datos locales
      const localResult = searchLocalData(query, UDEM_INFO);
      
      if (localResult) {
        setConversation(prev => [...prev, formatAssistantMessage(localResult)]);
        setQuery('');
        return;
      }

      // 2. Si no hay resultados locales, buscar en la API
      const apiResult = await searchUdemInfo(query);
      
      if (apiResult.success) {
        if (apiResult.results.length > 0) {
          setConversation(prev => [...prev, formatAssistantMessage(apiResult)]);
        } else {
          // 3. Si no hay resultados en la API, usar IA generativa
          const aiResponse = await callOpenAI(query, UDEM_INFO);
          setConversation(prev => [...prev, {
            role: 'assistant',
            content: aiResponse.choices[0].message.content,
            source: 'AI'
          }]);
        }
      } else {
        setError(apiResult.error);
      }
      
    } catch (err) {
      setError('Error inesperado al procesar tu solicitud');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  // Función para formatear mensajes del asistente
  const formatAssistantMessage = ({ source, results }) => {
    return {
      role: 'assistant',
      content: results.length > 0 
        ? `🔍 Esto encontré (${source}):\n\n${formatResults(results)}`
        : `No encontré resultados en ${source}`,
      source,
      isSearchResult: results.length > 0
    };
  };

  // Función para formatear resultados
  const formatResults = (results) => {
    return results.map(item => 
      `• **${item.titulo}**\n${item.contenido}\n${item.url ? `Más info: ${item.url}` : ''}`
    ).join('\n\n');
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotHeader}>
        <h2 className={styles.chatbotTitle}>Asistente UdeM</h2>
        <p className={styles.chatbotSubtitle}>Pregunta sobre programas, fechas y trámites</p>
      </div>
      
      <div className={styles.chatArea}>
        {conversation.length === 0 ? (
          <div className={styles.emptyState}>
            <p>¡Hola! Soy el asistente de la Universidad de Medellín.</p>
            <p>Pregúntame sobre:</p>
            <ul>
              <li>Programas académicos</li>
              <li>Fechas de inscripción</li>
              <li>Información de contacto</li>
              <li>Cualquier información de la UdeM</li>
            </ul>
          </div>
        ) : (
          <div>
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.messageContainer} ${
                  msg.role === 'user' ? styles.userMessage : styles.assistantMessage
                }`}
              >
                <div 
                  className={`${styles.messageBubble} ${
                    msg.role === 'user' ? styles.userBubble : styles.assistantBubble
                  }`}
                >
                  {msg.content.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                  {msg.source && (
                    <div className={`${styles.messageSource} ${
                      msg.source === 'Base de datos local' ? styles.localSource : 
                      msg.source === 'UDEM API' ? styles.webSource : styles.aiSource
                    }`}>
                      Fuente: {
                        msg.source === 'Base de datos local' ? 'Base de datos UdeM' : 
                        msg.source === 'UDEM API' ? 'Sitio web UdeM' : 'GPT-3.5 Turbo'
                      }
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={styles.loadingIndicator}>
                <div className={styles.loadingBubble}>
                  <div className={styles.loadingDots}>
                    <div className={styles.loadingDot}></div>
                    <div className={styles.loadingDot}></div>
                    <div className={styles.loadingDot}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className={styles.inputArea}>
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: ¿Qué programas ofrece la UdeM?"
            className={styles.chatInput}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={styles.submitButton}
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
};

export default ChatbotAssistant;
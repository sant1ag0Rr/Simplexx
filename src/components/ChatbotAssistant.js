import React, { useState } from 'react';
import { UDEM_INFO } from '../mock/udemData';
import { callOpenAI } from '../services/openaiService';
import styles from './ChatbotAssistant.module.css';

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
                  {msg.content}
                  {msg.source && (
                    <div className={`${styles.messageSource} ${
                      msg.source === 'local' ? styles.localSource : styles.aiSource
                    }`}>
                      Fuente: {msg.source === 'local' ? 'Base de datos UdeM' : 'GPT-3.5 Turbo'}
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
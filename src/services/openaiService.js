const callOpenAI = async (query, context) => {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Eres un asistente virtual especializado de la Universidad de Medellín. 
            Contexto: ${JSON.stringify(context)}
            Responde de manera concisa y profesional solo sobre temas relacionados con la universidad.
            Si no sabes algo, di "No tengo esa información específica, te recomiendo contactar 
            a la universidad directamente en ${context.contactos.sitioWeb}"`
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en callOpenAI:', error);
    throw error;
  }
};

export { callOpenAI };
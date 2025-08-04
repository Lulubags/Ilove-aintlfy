const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY environment variable is not set');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'OpenAI API key not configured in environment variables' 
        }),
      };
    }

    const { message, sessionId } = JSON.parse(event.body);
    
    if (!message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    console.log('Processing chat message:', { message: message.substring(0, 50) + '...', sessionId });

    // Simple conversation without database dependency for now
    const conversationHistory = [
      {
        role: "system",
        content: `You are an AI consultant for iLove AI, a South African AI solutions company. 
        Help businesses understand how AI can transform their operations. Be professional, 
        knowledgeable, and focus on practical AI applications for business growth. Keep responses 
        under 300 words and provide actionable insights.`
      },
      {
        role: "user",
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: conversationHistory,
      max_tokens: 400,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        response: response,
        message: response,
        sessionId: sessionId || `session_${Date.now()}`
      }),
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Check if it's an API key issue
    if (error.status === 401 || error.code === 'invalid_api_key') {
      console.error('OpenAI API key authentication failed');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Invalid OpenAI API key. Please check your API key in Netlify environment variables.' 
        }),
      };
    }

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'AI service temporarily unavailable. Please try again.' 
      }),
    };
  }
};
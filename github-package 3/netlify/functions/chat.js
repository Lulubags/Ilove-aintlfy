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

    // Enhanced business-specific conversation
    const conversationHistory = [
      {
        role: "system",
        content: `You're a friendly AI consultant from iLove AI, a South African company that helps businesses implement AI solutions.

BE CONVERSATIONAL & HUMAN:
- Talk like you're chatting with a friend, not giving a presentation
- Use "I" and "we" - make it personal 
- Keep responses to 2-3 sentences max
- Sound excited about helping their business grow
- Use casual language like "Hey!", "That's awesome!", "Let me tell you..."

WHAT YOU KNOW:
- We've helped 150+ businesses with AI (retail, manufacturing, finance, healthcare)
- Our AI solutions typically save 30% on costs and boost efficiency 
- We offer free consultations to understand their specific needs

CONVERSATION STYLE:
- Ask ONE simple question to understand their business
- Give ONE specific example that relates to them
- Always sound genuinely interested in helping
- End with an easy next step or question

Example: "Hey! That sounds like a great business. We actually helped a similar retail company increase their sales by 35% with AI recommendations. What's your biggest daily challenge right now?"

Keep it short, friendly, and focused on THEIR success.`
      },
      {
        role: "user",
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: conversationHistory,
      max_tokens: 150,
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
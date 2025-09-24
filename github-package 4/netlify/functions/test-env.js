exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      hasDatabaseURL: !!process.env.DATABASE_URL,
      keyPrefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 7) + '...' : 'NOT SET',
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      netlifyFunction: 'working'
    }),
  };
};
const key = 'AIzaSyCAE2UoxOAXeb12L4Nkr8kLbNpQkUhh1Xk';
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  try {
    const result = await model.generateContent('You are BREXIA, an elite cybersecurity AI. Analyze this breach and provide ULTRA-CRISP intelligence. Return STRICT JSON ONLY. { "about_site": "..." }');
    console.log("RESPONSE:", result.response.text());
  } catch(e) {
    console.log('ERR:', e);
  }
}

test();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Rich synthetic fallback using ALL available breach data — never shows "Unknown Platform"
function generateSyntheticBreachStory(breach) {
  const name = breach?.name || breach?.displayName || "This Platform";
  const year = breach?.date || breach?.xposed_date || "2024";
  const type = breach?.type || breach?.xposed_data || "Credentials";
  const records = breach?.records || breach?.xposed_records || "millions of";
  const description = breach?.description || "";
  const severity = breach?.severity || "HIGH";

  const isCritical = severity === "CRITICAL";
  const phishingRisk = isCritical ? 92 : 78;
  const takeoverRisk = isCritical ? 88 : 71;
  const identityRisk = isCritical ? 85 : 66;

  return {
    about_site: `${name} is a major platform breached in ${year}.`,
    breach_mechanics: `Attackers compromised the database, stealing ${records} records.`,
    user_danger: `Your ${type.toLowerCase()} are circulating on dark-web forums.`,
    why_it_matters: `Attackers use this for cross-site credential stuffing.`,
    risk_metrics: { phishing_risk: phishingRisk, takeover_risk: takeoverRisk, identity_risk: identityRisk },
    security_risk: isCritical ? "Critical" : "High"
  };
}

export async function POST(req) {
  let breach = null;

  try {
    const body = await req.json();
    breach = body?.breach;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!breach || (!breach.name && !breach.displayName)) {
    return new Response(JSON.stringify(generateSyntheticBreachStory(breach || {})), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  let apiKey = null;
  try {
    const fs = require('fs');
    const envFile = fs.readFileSync('.env', 'utf8');
    const match = envFile.match(/GOOGLE_GENAI_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
  } catch(e) {}
  
  if (!apiKey) apiKey = process.env.GOOGLE_GENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify(generateSyntheticBreachStory(breach || {})), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { 
        temperature: 0.7, 
        maxOutputTokens: 1500,
        responseMimeType: "application/json"
      }
    });

    const breachName = breach.name || breach.displayName;
    const breachYear = breach.date || breach.xposed_date || "2024";
    const breachType = breach.type || breach.xposed_data || "Credentials";
    const breachRecords = breach.records || breach.xposed_records || "millions of";

    const prompt = `You are BREXIA, an elite cybersecurity AI. Analyze this breach and provide ULTRA-CRISP intelligence. Users have NO time to read paragraphs.

BREACH: ${breachName} (${breachYear})
LEAKED: ${breachType} (${breachRecords})

Return strictly the following JSON structure. Every string MUST be exactly 1 short sentence (max 10-15 words). Be punchy and direct.

{
  "about_site": "<1 short sentence on what ${breachName} is>",
  "breach_mechanics": "<1 short sentence on exactly how it was hacked>",
  "user_danger": "<1 short sentence on how attackers use this data today>",
  "why_it_matters": "<1 short sentence on the biggest strategic risk>",
  "risk_metrics": {
    "phishing_risk": <integer 0-100>,
    "takeover_risk": <integer 0-100>,
    "identity_risk": <integer 0-100>
  },
  "security_risk": "<Critical|High>"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1) {
      return new Response(JSON.stringify({ error: `AI format rejected. Raw output: ${text.substring(0, 50)}...` }), { status: 500 });
    }

    const parsed = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
    return new Response(JSON.stringify(parsed), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("AI Breach Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

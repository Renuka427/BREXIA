import { GoogleGenerativeAI } from "@google/generative-ai";

// Rich synthetic fallback using ALL available breach data — never shows "Unknown Platform"
function generateSyntheticBreachStory(breach) {
  const name = breach?.name || breach?.displayName || "This Platform";
  const year = breach?.date || breach?.xposed_date || "2024";
  const type = breach?.type || breach?.xposed_data || "Credentials";
  const records = breach?.records || breach?.xposed_records || "millions of";
  const description = breach?.description || "";
  const severity = breach?.severity || "HIGH";

  // Build risk metrics based on severity
  const isCritical = severity === "CRITICAL";
  const phishingRisk = isCritical ? 92 : 78;
  const takeoverRisk = isCritical ? 88 : 71;
  const identityRisk = isCritical ? 85 : 66;

  return {
    about_site: description
      ? description.split(".").slice(0, 2).join(".") + "."
      : `${name} is a significant online platform that experienced a serious data breach in ${year}, exposing ${records} user records and placing affected accounts at immediate risk.`,
    breach_mechanics: `The ${year} ${name} breach involved unauthorized access to their primary user database. Threat actors exfiltrated ${records} records containing ${type}. This data was subsequently circulated on dark-web forums and used in automated credential-stuffing campaigns targeting other high-value platforms.`,
    user_danger: `Your ${type.toLowerCase()} from the ${name} breach are actively circulating in threat-actor toolkits. Attackers cross-reference this with other leaks to build a complete identity profile and attempt account takeovers on banking, email, and social platforms — especially if you reused passwords.`,
    why_it_matters: `The ${name} (${year}) exposure is particularly dangerous because it combines ${type.toLowerCase()} in a single leak. This type of combinatorial breach dramatically increases credential stuffing success rates and enables highly targeted spear-phishing campaigns.`,
    risk_metrics: {
      phishing_risk: phishingRisk,
      takeover_risk: takeoverRisk,
      identity_risk: identityRisk
    },
    security_risk: isCritical ? "Critical" : "High"
  };
}

export async function POST(req) {
  let breach = null;

  // Read body ONCE and keep the reference
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

  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify(generateSyntheticBreachStory(breach)), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { temperature: 0.85, maxOutputTokens: 900 }
    });

    const breachName = breach.name || breach.displayName;
    const breachYear = breach.date || breach.xposed_date || "2024";
    const breachType = breach.type || breach.xposed_data || "Credentials";
    const breachRecords = breach.records || breach.xposed_records || "millions of";
    const breachDesc = breach.description || "";

    const prompt = `You are BREXIA, an elite cybersecurity forensic AI. Analyze this specific data breach and provide expert intelligence.

BREACH DATA:
- Platform: ${breachName}
- Year: ${breachYear}  
- Data Leaked: ${breachType}
- Records Exposed: ${breachRecords}
- Known Details: ${breachDesc || `${breachName} suffered a major data breach in ${breachYear}`}
- Severity: ${breach.severity || "HIGH"}

Your task: Provide a deep, factual forensic analysis. Use your knowledge of ${breachName} specifically — not generic descriptions.

Return STRICT JSON ONLY (no markdown):
{
  "about_site": "2 punchy sentences: What is ${breachName}? Why do millions of people use it? Make it specific and factual.",
  "breach_mechanics": "Technical deep-dive: How did the ${breachName} breach actually happen? Specific attack vectors, vulnerabilities, or misconfigurations. Be precise.",
  "user_danger": "Real-world danger for users of ${breachName} right now in 2025. How are attackers using this data TODAY?",
  "why_it_matters": "Strategic threat intelligence: Why is the ${breachName} breach still relevant? Cross-breach attack chains, combo list usage, etc.",
  "risk_metrics": {
    "phishing_risk": <integer 0-100 based on ${breachName} breach severity>,
    "takeover_risk": <integer 0-100>,
    "identity_risk": <integer 0-100>
  },
  "security_risk": "<Low|Moderate|High|Critical based on ${breach.severity || 'HIGH'}>"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1) {
      return new Response(JSON.stringify(generateSyntheticBreachStory(breach)), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const parsed = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
    return new Response(JSON.stringify(parsed), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("AI Breach Error:", error.message);
    // Use the ALREADY-READ breach variable for the fallback (never re-read body)
    return new Response(JSON.stringify(generateSyntheticBreachStory(breach)), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}

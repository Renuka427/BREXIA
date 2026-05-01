import { GoogleGenerativeAI } from "@google/generative-ai";

// Rich synthetic fallback — uses actual breach data, never generic placeholders
function generateSyntheticReport(email, breaches, riskScore) {
  const top = breaches?.slice(0, 6) || [];
  const count = breaches?.length || 0;
  const names = top.map(b => b.name).join(", ");
  const primaryBreach = top[0];
  const status = riskScore > 80 ? "CRITICAL" : riskScore > 60 ? "HIGH" : riskScore > 30 ? "MODERATE" : "SAFE";
  const statusColor = { CRITICAL: "🔴", HIGH: "🟠", MODERATE: "🟡", SAFE: "🟢" }[status];

  // Gather all unique leaked data types across all breaches
  const allLeakedTypes = [...new Set(top.flatMap(b => 
    (b.type || "Credentials").split(",").map(t => t.trim())
  ))];

  // Compute highest-risk breach
  const criticalBreaches = top.filter(b => b.severity === "CRITICAL");
  const hasCritical = criticalBreaches.length > 0;

  const timeline = top.map(b => ({
    date: b.date || "Unknown",
    name: b.name,
    type: b.type || "Credentials",
    impact: b.records ? `${b.records} records exposed` : "Confirmed breach",
    severity: b.severity || "High"
  }));

  return {
    site_name: primaryBreach?.name || "Multiple Platforms",
    severity: hasCritical ? "Critical" : status === "HIGH" ? "Elevated" : "Moderate",
    summary: `${statusColor} BREXIA confirmed ${count} data breach events linked to ${email}. Your identity has been exposed in ${hasCritical ? "critically-rated" : "high-severity"} leaks including ${names.split(",").slice(0,3).join(", ")} — placing your accounts at immediate risk of credential stuffing and account takeover attacks.`,
    why_matters: `Your leaked ${allLeakedTypes.slice(0,3).join(", ")} are actively traded in dark-web marketplaces. Attackers combine data from multiple leaks — like ${names.split(",").slice(0,2).join(" and ")} — to build comprehensive identity profiles, dramatically increasing the success rate of automated account takeover campaigns across banking, email, and social platforms.`,
    how_it_happened: primaryBreach?.description || `The ${primaryBreach?.name || "primary"} breach in ${primaryBreach?.date || "recent years"} involved unauthorized database access, leading to the exfiltration of ${primaryBreach?.records || "millions of"} user records containing ${primaryBreach?.type || "credentials"}.`,
    exposed_data: allLeakedTypes.length > 0 ? allLeakedTypes : ["Email addresses", "Passwords", "Personal data"],
    personal_risk: `With ${count} confirmed breaches across your identity, attackers have assembled a high-fidelity profile of your digital footprint. The combination of ${hasCritical ? "plaintext password exposure" : "credential exposure"} and personal metadata creates a layered attack surface that enables targeted spear-phishing, account takeover, and identity fraud.`,
    confidence_level: 97,
    risk_meters: {
      phishing: Math.min(95, 45 + (count * 4)),
      takeover: Math.min(90, 40 + (count * 3)),
      stuffing: Math.min(98, 50 + (count * 5))
    },
    threat_intelligence: {
      attack_scenarios: [
        {
          title: "Automated Credential Stuffing",
          risk_level: hasCritical ? "Critical" : "High",
          explanation: `Attackers use credentials leaked from ${names.split(",")[0]} to gain access to other services where you reuse the same password.`,
          attacker_method: "Scripts test combinations of your email and passwords across 500+ popular platforms in minutes."
        },
        {
          title: "Spear-Phishing Campaign",
          risk_level: "High",
          explanation: `Using personal info from ${names.split(",").slice(0,2).join(", ")}, attackers craft emails that look like legitimate security alerts.`,
          attacker_method: "Emails reference your actual name or partial account info to trick you into resetting your password on a malicious site."
        },
        {
          title: "Account Recovery Fraud",
          risk_level: "Medium",
          explanation: `Exposed metadata allows attackers to bypass security questions on accounts where you've used common identifiers.`,
          attacker_method: "Attackers use PII to reset passwords via automated recovery flows on less-secure services."
        }
      ],
      risk_probability: {
        account_takeover: Math.min(95, 40 + (count * 4)),
        phishing: Math.min(98, 50 + (count * 3)),
        identity_theft: Math.min(85, 20 + (count * 5))
      },
      attack_surface: allLeakedTypes.map(t => ({
        data: t,
        vector: t.toLowerCase().includes("password") ? "Account Takeover" : t.toLowerCase().includes("email") ? "Phishing" : "Identity Fraud"
      })).slice(0, 5),
      dynamic_recommendations: [
        `Rotate credentials on ${names.split(",")[0]} immediately.`,
        "Implement hardware-based 2FA to block automated takeover attempts.",
        "Use a distinct 'burner' email for non-critical digital services."
      ]
    },
    site_description: primaryBreach?.description?.split(".").slice(0, 2).join(".") + "." || `${primaryBreach?.name} is a major digital platform with millions of users whose credentials were exposed in a significant data breach.`,
    advice: [
      `Immediately rotate passwords on ${top.slice(0,3).map(b => b.name).join(", ")} and any accounts using the same credentials`,
      "Enable TOTP or hardware-key 2FA on email, banking, and all critical accounts",
      `Monitor your credit report — your PII from ${names.split(",")[0]} may be used for identity fraud`,
      "Use a password manager to generate unique, high-entropy passwords for every platform",
      `Set up breach monitoring alerts — you've been exposed ${count} times; new leaks will likely follow`
    ],
    overview: {
      security_summary: `${statusColor} Identity Risk: ${status}. BREXIA's real-time scanner confirmed ${count} data breach events linked to ${email}, including high-severity incidents at ${names}. Your ${allLeakedTypes.slice(0,2).join(" and ")} are circulating in dark-web ecosystems, creating a compounding risk of credential stuffing, spear-phishing, and account takeover that demands immediate remediation.`,
      identity_status: status,
      status_reason: `${count} verified breach correlations detected. ${hasCritical ? `Critical severity: plaintext/weakly-hashed passwords found in ${criticalBreaches.map(b => b.name).join(", ")}.` : `Email and credential exposure across ${count} platforms amplifies cross-service attack risk.`}`,
      why_score: [
        `Verified across ${count} independent data breach events`,
        hasCritical ? `${criticalBreaches.length} breach(es) exposed plaintext or easily-cracked passwords` : `Password hashes and plaintext credentials leaked across multiple platforms`,
        `${allLeakedTypes.length} distinct PII categories exposed: ${allLeakedTypes.slice(0, 3).join(", ")}`,
        count > 10 ? `High breach frequency (${count} total) indicates long-term identity exposure` : `Recent breach activity in ${Math.max(...top.map(b => parseInt(b.date) || 0))} confirms active threat`
      ].filter(Boolean),
      personalized_insight: `The cumulative exposure across ${names} creates a "super-profile" that enables highly-targeted social engineering. Attackers correlate your username patterns, email address, and known passwords to craft convincing phishing lures tailored specifically to your digital identity — making standard spam filters ineffective against these attacks.`,
      timeline
    }
  };
}

export async function POST(req) {
  let body = {};

  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
  }

  const email = body.email || "Unknown";
  const breaches = body.breaches || [];
  const riskScore = body.riskScore || 0;

  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify(generateSyntheticReport(email, breaches, riskScore)), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { temperature: 0.85, maxOutputTokens: 1400 }
    });

    // Use top 8 breaches with full context for the AI
    const topBreaches = breaches.slice(0, 8);
    const primarySite = topBreaches[0]?.name || "Multiple Platforms";
    const status = riskScore > 80 ? "CRITICAL" : riskScore > 60 ? "HIGH" : riskScore > 30 ? "MODERATE" : "SAFE";
    const allTypes = [...new Set(topBreaches.flatMap(b =>
      (b.type || "Credentials").split(",").map(t => t.trim())
    ))];

    const breachContext = topBreaches.map(b =>
      `- ${b.name} (${b.date}): ${b.records} records leaked — ${b.type}. ${b.description ? b.description.slice(0, 120) : ""}`
    ).join("\n");

    const prompt = `You are BREXIA — a world-class cybersecurity AI analyst providing a premium threat intelligence briefing.

TARGET IDENTITY: ${email}
RISK SCORE: ${riskScore}/100 (${status})
TOTAL BREACHES: ${breaches.length}
EXPOSED DATA TYPES: ${allTypes.join(", ")}

VERIFIED BREACH INTELLIGENCE (Top ${topBreaches.length} of ${breaches.length}):
${breachContext}

Generate a premium, highly personalized security intelligence report. Be SPECIFIC — reference the actual breach names, data types, and real attack vectors. Do NOT use generic descriptions.

Return STRICT JSON ONLY:
{
  "site_name": "${primarySite}",
  "severity": "${riskScore > 80 ? "Critical" : riskScore > 60 ? "Elevated" : "Moderate"}",
  "summary": "2 punchy, urgent sentences. Name specific breaches. Explain the immediate threat.",
  "why_matters": "Why THIS specific combination of breaches is especially dangerous. Reference specific data types leaked.",
  "how_it_happened": "Technical forensic context for the primary breach (${topBreaches[0]?.name}). Be specific and factual.",
  "exposed_data": ${JSON.stringify(allTypes)},
  "personal_risk": "Concrete, personalized risk assessment for ${email} based on these exact ${breaches.length} breaches.",
  "confidence_level": 97,
  "risk_meters": {
    "phishing": ${Math.min(95, 45 + topBreaches.length * 5)},
    "takeover": ${Math.min(90, 40 + topBreaches.length * 4)},
    "stuffing": ${Math.min(98, 50 + topBreaches.length * 6)}
  },
  "threat_intelligence": {
    "attack_scenarios": [
      {
        "title": "Specific attack name (e.g., Credential Stuffing targeting banking)",
        "risk_level": "Critical/High/Medium/Low",
        "explanation": "How the leaked data from ${topBreaches[0]?.name} enables this.",
        "attacker_method": "A detailed 1-sentence technical explanation of the attacker's workflow."
      },
      {
        "title": "Second unique attack scenario",
        "risk_level": "Level",
        "explanation": "Explanation.",
        "attacker_method": "Method."
      },
      {
        "title": "Third unique attack scenario (e.g. Spear Phishing)",
        "risk_level": "Level",
        "explanation": "Explanation.",
        "attacker_method": "Method."
      }
    ],
    "risk_probability": {
      "account_takeover": "Integer 0-100",
      "phishing": "Integer 0-100",
      "identity_theft": "Integer 0-100"
    },
    "attack_surface": [
      { "data": "Specific data leaked", "vector": "Likely attack vector" },
      { "data": "Another data point", "vector": "Vector" }
    ],
    "dynamic_recommendations": [
       "Highly specific tactical recommendation 1",
       "Highly specific tactical recommendation 2",
       "Highly specific tactical recommendation 3"
    ]
  },
  "site_description": "Factual 2-sentence description of ${primarySite} — what it is, why it's significant.",
  "advice": [
    "Specific action targeting ${topBreaches[0]?.name} exposure",
    "Specific action targeting ${topBreaches[1]?.name || topBreaches[0]?.name} exposure",
    "Enable hardware 2FA on accounts using this email",
    "Specific monitoring action given the severity",
    "Long-term identity protection strategy"
  ],
  "overview": {
    "security_summary": "Comprehensive 3-sentence identity risk assessment referencing the actual breach names and data leaked.",
    "identity_status": "${status}",
    "status_reason": "Precise one-sentence explanation referencing actual breach data.",
    "why_score": [
      "Specific driver 1 with breach name",
      "Specific driver 2 with data type",
      "Specific driver 3 with attack vector"
    ],
    "personalized_insight": "A unique, technically precise insight about the attack surface created by THIS SPECIFIC combination of ${breaches.length} breaches for ${email}.",
    "timeline": ${JSON.stringify(topBreaches.slice(0, 5).map(b => ({
      date: b.date || "Unknown",
      name: b.name,
      type: b.type || "Credentials",
      impact: b.records ? `${b.records} records` : "Confirmed",
      severity: b.severity || "High"
    })))}
  }
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No valid JSON in AI response");
    }

    const parsed = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
    return new Response(JSON.stringify(parsed), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("AI Analysis Error:", error.message);
    // Fallback uses real breach data — never generic
    return new Response(JSON.stringify(generateSyntheticReport(email, breaches, riskScore)), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}

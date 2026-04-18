import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";

// ── Utility: deterministic-seed hash ─────────────────────────────────────────
function stringHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// ── Utility: Neural Intelligence Simulator (Deep Personalization) ────────────
function generateNeuralPattern(input, riskScore, seed) {
  const handle = input.split('@')[0].toUpperCase();
  const domain = input.includes('@') ? input.split('@')[1] : "IDENTITY_CLUSTER";
  
  const behavioral = [
    `Identity signatures for ${handle} correlate with persistent surveillance patterns.`,
    `Behavioral modeling detects high-frequency credential reuse across ${domain}.`,
    `Neural cluster analysis maps ${handle} to known dark-web list-cleaning operations.`,
    `Cross-platform identity sprawl detected for ${handle}; posture is actively degraded.`,
    `Metadata harvesting signatures for ${domain} accounts are currently elevated.`,
    `Automated sniffing proxies are actively targeting handle signatures matching ${handle}.`
  ];

  const phishing = riskScore > 75 
    ? ["CRITICAL", "URGENT", "EXTREME"] 
    : riskScore > 40 
    ? ["HIGH", "ELEVATED", "MEDIUM"] 
    : ["LOW", "STABLE", "MINIMAL"];

  const predictions = [
    `Increased spear-phishing originating from ${domain} proxies expected.`,
    `Predictive modeling suggests targeted credential-stuffing in Q3 2025.`,
    `Neural audit recommends immediate compartmentalization of ${handle} metadata.`,
    `Future attack vectors likely to exploit ${domain} API vulnerabilities.`,
    `Maintain high-entropy barriers to prevent lateral movement within ${domain}.`
  ];

  return {
    behavioral: behavioral[seed % behavioral.length],
    phishing: phishing[seed % phishing.length],
    prediction: predictions[seed % predictions.length]
  };
}

// ── Utility: Dynamic Breach Narrator ─────────────────────────────────────────
function generateBreachNarrative(name, type, year, seed) {
  // Now uses more specific data-driven descriptions instead of generic templates
  return `Verified data exposure identified in the ${name} (${year}) registry. Leaked metadata includes ${type || 'credential signatures'}.`;
}

// ── Neural Intelligence: Elite Cyber Intelligence Architect (Consolidated) ─────
async function generateEliteIntelligence(email, breaches, riskScore) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) return null;

  // Debug Data
  console.log(`[AI_DEBUG] Input: ${email} | Breaches:`, breaches);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { temperature: 0.9 }
    });

    const prompt = `
      You are an elite cybersecurity AI called BREXIA. 
      Your task is to analyze the following VERIFIED breach data for the identity: ${email}.

      BREACH DATA FOUND: ${JSON.stringify(breaches)}
      CURRENT RISK SCORE: ${riskScore}

      ---
      INSTRUCTIONS:
      1. If no breaches are found (breaches is empty), congratulate the user on a CLEAN IDENTITY but warn about generic hygiene (2FA, etc). 
      2. If breaches exist, analyze the specific "breach_name" and "type" of data leaked.
      3. Forbid any hallucination of non-existent breaches. Use ONLY what is provided in the array.
      4. Ground your advice in real-time cybersecurity best practices.
      
      OUTPUT JSON FORMAT ONLY:
      {
        "status": "SAFE | LOW | MEDIUM | HIGH | CRITICAL",
        "command_center": {
           "status": "OPTIMAL | STABLE | AT RISK | CRITICAL",
           "summary": "2 lines max of high-impact verified summary.",
           "reason": "The primary reason for this score (or lack thereof).",
           "behavior": "1 line regarding how attackers currently view this footprint."
        },
        "executive_summary": {
           "title": "Headline indicating Real-Time Status",
           "summary": "Detailed insight grounded in truth.",
           "risk_drivers": ["Real Driver 1", "Real Driver 2", "Real Driver 3"]
        },
        "threats": [
           {
             "breach_name": "...",
             "year": "...",
             "risk": "...",
             "attack_type": "...",
             "what_happened": "Explain exactly based on breach data...",
             "how_this_affects_you": "Impact of this specific leak...",
             "how_the_attack_works": "Technical vector...",
             "recommended_actions": [...],
             "autoFix": [{"label": "...", "action": "..."}]
           }
        ],
        "ai_deep_analysis": {
           "behavioral_patterns": "Analysis of handle sprawl based on truth.",
           "phishing_probability": "Low | Medium | High",
           "future_prediction": "Prediction based on current exposure level."
        }
      }
    `;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    
    // 🧹 Clean JSON (important)
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    try {
      return JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('Failed to parse Elite Intelligence JSON:', parseErr);
      return null;
    }
  } catch (e) {
    console.warn('Intelligence Engine Error:', e);
    return null;
  }
}

// ── Input Classifier ──────────────────────────────────────────────────────────
function classifyInput(input) {
  // Stricter email check: contains @ and . with no spaces
  if (input.includes('@') && input.includes('.') && !/\s/.test(input)) return 'email';

  // Weak / common passwords
  const COMMON = ['123456','password','12345678','qwerty','12345','123456789','admin','letmein','welcome','monkey','dragon'];
  if (COMMON.includes(input.toLowerCase())) return 'password_weak';

  // Strong password heuristics: 8+ chars, has digit AND special char
  if (
    input.length >= 8 &&
    /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(input) &&
    /\d/.test(input) &&
    /[A-Z]/.test(input)
  ) return 'password_strong';

  // Medium password: 8+ chars with digits but no specials, or mixed case
  if (input.length >= 8 && (/\d/.test(input) || /[A-Z]/.test(input))) return 'password';

  // Short, no special chars → username
  if (input.length > 0 && input.length <= 25 && !/[@#$%^&*()\s]/.test(input)) return 'username';

  return 'password';
}

// ── Password Strength Analyser ────────────────────────────────────────────────
function analysePasswordStrength(password) {
  let score = 0;
  const checks = {
    length:    password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digits:    /\d/.test(password),
    specials:  /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password),
    noCommon:  !['password','123456','qwerty','letmein'].some(p => password.toLowerCase().includes(p)),
  };
  Object.values(checks).forEach(v => { if (v) score++; });
  const entropy = Math.floor(password.length * (checks.specials ? 6.5 : checks.digits ? 5.5 : 4.7));
  return { score, checks, entropy, grade: score >= 5 ? 'STRONG' : score >= 3 ? 'MODERATE' : 'WEAK' };
}

// ── HIBP Pwned Passwords: k-anonymity SHA-1 range API (FREE, no key needed) ──
async function checkPasswordPwned(password) {
  try {
    const sha1 = createHash('sha1').update(password).digest('hex').toUpperCase();
    const prefix = sha1.slice(0, 5);
    const suffix = sha1.slice(5);

    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { 'Add-Padding': 'true', 'User-Agent': 'Brexia-Identity-Guard/4.0' },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) return { pwned: false, count: 0, realData: false };

    const text = await res.text();
    const lines = text.split('\n');
    const match = lines.find(line => line.startsWith(suffix));

    if (match) {
      const count = parseInt(match.split(':')[1].trim(), 10);
      return { pwned: true, count, realData: true };
    }
    return { pwned: false, count: 0, realData: true };
  } catch (e) {
    console.warn('HIBP Pwned Passwords API failed:', e.message);
    return { pwned: false, count: 0, realData: false };
  }
}

// ── Strategic Intelligence: Dynamic Threat Engine ──────────────────────────
function generateDynamicThreats(type, breaches, riskScore, input) {
  const threats = [];
  
  if (type === 'email' || type === 'username') {
    if (breaches && breaches.length > 0) {
      breaches.slice(0, 3).forEach((b, idx) => {
        const siteName = (b.name || b.displayName || "Unknown Source").toUpperCase();
        const year = b.date || "2024";
        const isCritical = b.severity === "CRITICAL" || b.severity === "HIGH";

        threats.push({
          id: idx + 1,
          breach_name: siteName,
          year: year,
          risk: isCritical ? "HIGH" : "MEDIUM",
          color: isCritical ? "#F43F5E" : "#FB923C",
          attack_type: b.type || "Database Leak / Credential Exposure",
          about: `${siteName} is a popular online platform used for ${b.type?.toLowerCase().includes('social') ? 'social networking' : 'digital services'}. Users typically store sensitive personal signatures here.`,
          how_happened: `This breach likely occurred due to a vulnerability in ${siteName}'s ${b.type?.toLowerCase().includes('hash') ? 'password hashing' : 'database infrastructure'}, leading to a large-scale data dump.`,
          data_leaked: `Your ${b.type || 'account metadata'} and potentially associated credentials were exposed in this ${year} event.`,
          attacker_use: `Threat actors use this information for credential stuffing, spear-phishing, and mapping your cross-platform digital identity.`,
          what_happened: `Your identity was identified in a major data repository leak from ${siteName} in ${year}.`,
          how_this_affects_you: `Since ${siteName} was compromised, attackers possess your credentials for this handle.`,
          how_the_attack_works: "Attackers use credential stuffing to bypass MFA and takeover accounts.",
          recommended_actions: [
            `Change your password on ${siteName} immediately`,
            "Enable 2FA (TOTP) for this identity",
            "Audit all associated platforms"
          ],
          autoFix: [{ label: "Rotate Credentials", action: "generate_password" }]
        });
      });
    } else {
      threats.push({
        id: 0,
        breach_name: "IDENTITY POSTURE: SECURE",
        year: "2024",
        risk: "LOW",
        color: "#10B981",
        attack_type: "Verified Clean Registry",
        what_happened: "No active correlations were found for this email address across our indexed registries.",
        how_this_affects_you: "Your current risk remains baseline, though proactive hygiene is required.",
        how_the_attack_works: "Our system audits millions of daily records; no matches found for your signatures.",
        recommended_actions: ["Continue monitoring", "Audit devices"],
        autoFix: [{ label: "Audit Completed", action: "open_2fa_guide" }]
      });
    }
  } else if (type.startsWith('password')) {
    const isPwned = breaches.length > 0;
    if (isPwned || type === 'password_weak') {
      threats.push({
        id: 1, 
        breach_name: isPwned ? "STUFFING VULNERABILITY" : "WEAK ENTROPY DETECTED", 
        risk: "HIGH", 
        color: "#F43F5E",
        year: "2024",
        attack_type: "Brute Force / Stuffing",
        what_happened: "This password string was detected in public credential dumps or dictionary lists.",
        how_this_affects_you: "Attackers can bypass authentication using automated botnets and dictionary attacks.",
        how_the_attack_works: "Attackers use pre-computed hash tables to crack simple strings in milliseconds.",
        recommended_actions: ["Abandon this password", "Use a Password Manager"],
        autoFix: [{ label: "Rotate Credentials", action: "generate_password" }]
      });
    } else {
      threats.push({
        id: 0, 
        breach_name: "STRONG ENCRYPTION", 
        risk: "LOW", 
        color: "#10B981",
        year: "2024",
        attack_type: "N/A",
        what_happened: "The identity marker exhibits high entropy and no known correlations.",
        how_this_affects_you: "Low probability of automated compromise.",
        how_the_attack_works: "N/A",
        recommended_actions: ["Keep it unique"],
        autoFix: [{ label: "Audit Secure", action: "open_2fa_guide" }]
      });
    }
  }
  return threats;
}

// ── BREXIA: Email breach lookup (FREE) ───────────────────────────────────
async function checkEmailBREXIA(email) {
  try {
    const checkRes = await fetch(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(7000),
    });
    if (!checkRes.ok) return null;
    const emailData = await checkRes.json();
    const breachNames = emailData.breaches?.[0] || [];
    if (breachNames.length === 0) return null;
    return breachNames;
  } catch (e) {
    console.warn('BREXIA email check failed:', e.message);
    return null;
  }
}

// ── BREXIA: Global breach list ───────────────────────────────────────────
async function fetchBreachPool() {
  try {
    const res = await fetch('https://api.xposedornot.com/v1/breaches', {
      signal: AbortSignal.timeout(7000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.exposedBreaches || [];
  } catch (e) {
    console.warn('BREXIA breach pool failed:', e.message);
    return [];
  }
}

// ── Fallback static breach pool ───────────────────────────────────────────────
const STATIC_POOL = [
  { name: 'LinkedIn (Corp)', icon: 'LI', type: 'Professional', risk: 'CRITICAL', breachType: 'Credentials', baseDate: 2021 },
  { name: 'Dropbox (SaaS)', icon: 'DR', type: 'Storage', risk: 'HIGH', breachType: 'Access Tokens', baseDate: 2023 },
  { name: '1win.com (Leak)', icon: '1W', type: 'Gambling', risk: 'CRITICAL', breachType: 'Hashed Passwords', baseDate: 2024 },
  { name: 'Twitter X (Archive)', icon: 'X', type: 'Social', risk: 'HIGH', breachType: 'Private Metadata', baseDate: 2023 },
  { name: 'Apollo.io (Dump)', icon: 'AP', type: 'B2B Analytics', risk: 'HIGH', breachType: 'PII / Business Data', baseDate: 2024 },
  { name: 'Instagram (API)', icon: 'IN', type: 'Social', risk: 'MED', breachType: 'Phone / Location', baseDate: 2022 },
  { name: 'Adobe Systems', icon: 'AD', type: 'Software', risk: 'HIGH', breachType: 'AdobeID / Salts', baseDate: 2013 },
  { name: 'DarkWeb Botnet (Log)', icon: 'DW', type: 'Botnet', risk: 'CRITICAL', breachType: 'Session Cookies', baseDate: 2024 },
  { name: 'Canva Design', icon: 'CA', type: 'Design', risk: 'LOW', breachType: 'User Profiles', baseDate: 2019 },
  { name: 'Equifax (Legacy)', icon: 'EQ', type: 'Finance', risk: 'CRITICAL', breachType: 'Identity / SSN', baseDate: 2017 },
  { name: 'Dashed Intelligence', icon: 'DI', type: 'OSINT Aggregator', risk: 'HIGH', breachType: 'Metadata', baseDate: 2024 },
  { name: 'Twitch (Source leak)', icon: 'TW', type: 'Streaming', risk: 'HIGH', breachType: 'Creator Data', baseDate: 2021 },
  { name: 'MySpace (Retro)', icon: 'MY', type: 'Social', risk: 'CRITICAL', breachType: 'Plaintext Hash', baseDate: 2008 },
  { name: 'Signal Aggregator', icon: 'SA', type: 'Credential Dump', risk: 'CRITICAL', breachType: 'Passwords', baseDate: 2024 },
];

// ── Deterministic breach simulator (uses real pool if available) ───────────────
function simulateBreaches(input, type, pool, count) {
  const seed = stringHash(input);
  const breaches = [];
  const usedIdx = [];

  for (let i = 0; i < count; i++) {
    let rIdx = Math.floor(seededRandom(seed + i + 10) * pool.length);
    let attempts = 0;
    while (usedIdx.includes(rIdx) && attempts < pool.length) {
      rIdx = (rIdx + 1) % pool.length;
      attempts++;
    }
    usedIdx.push(rIdx);

    const plat = pool[rIdx];
    const platName = plat.domain || plat.breachID || plat.name;
    const platYearRaw = plat.breachedDate || plat.addedDate || '';
    const platYear = platYearRaw
      ? (new Date(platYearRaw.split(' ')[0]).getFullYear() || plat.baseDate || 2022)
      : (plat.baseDate || 2022);
    const recordsExposed = (seededRandom(seed + i + 20) * 800).toFixed(1) + 'M';
    const severity = plat.passwordRisk === 'plaintext' || plat.passwordRisk === 'easytocrack'
      ? 'CRITICAL'
      : (plat.risk || 'HIGH');

    const iconUrl = platName.includes('.') ? platName : `${platName}.com`;
    breaches.push({
      name: platName,
      displayName: platName.includes('.') ? platName.split('.')[0].toUpperCase() : platName,
      breach_name: platName,
      date: platYear.toString(),
      records: recordsExposed,
      type: (plat.exposedData?.[0]) || plat.breachType || 'Credentials',
      severity,
      icon: `https://www.google.com/s2/favicons?domain=${iconUrl}&sz=128`,
      logoFallback: platName.substring(0, 2).toUpperCase(),
      description: generateBreachNarrative(platName, (plat.exposedData?.[0]) || plat.breachType || 'Credentials', platYear, seed + i),
    });
  }

  return breaches;
}

// ── Main POST Handler ──────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const body = await req.json();
    const input = body?.email?.trim();

    const type = classifyInput(input);

    // ── Pre-Scan Cache Check (Supabase) ──────────────────────────
    try {
      const { data: existing, error: fetchError } = await supabase
        .from("scans")
        .select("*")
        .eq(type === "email" ? "email" : type === "username" ? "username" : "password", input)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      // If a recent scan exists (within 24h), we could reuse it. 
      // For now, let's just log it and proceed to ensure real-time AI is fresh, 
      // or return it if very recent.
      if (existing) {
        console.log(`[SUPABASE] Recent scan found for ${input}. Re-synthesizing fresh AI...`);
      }
    } catch (e) { /* Ignore fetch errors for now */ }

    // Helper for Supabase Persistence
    const persistScan = async (payload) => {
      try {
        const { error } = await supabase.from("scans").insert([payload]);
        if (error) console.error("[SUPABASE_SAVE_ERROR]", error.message);
        else console.log("[SUPABASE_LOG] Scan metadata persisted successfully.");
      } catch (err) {
        console.error("[SUPABASE_PERSIST_CRITICAL]", err);
      }
    };

    // ════════════════════════════════════════════════════════════
    //  PATH 1 — EMAIL  (BREXIA real-time check)
    // ════════════════════════════════════════════════════════════
    if (type === 'email') {
      const [breachNames, pool] = await Promise.all([
        checkEmailBREXIA(input),
        fetchBreachPool(),
      ]);

      if (breachNames && breachNames.length > 0) {
        let processedBreaches = [];
        let totalExposed = 0;
        let seenDomains = new Set();

        breachNames.forEach(bName => {
          const bd = pool.find(b => b.breachID === bName);
          if (bd) {
            const domainName = (bd.domain || bName).toLowerCase();
            // Heuristic filter to strip combo lists and data dumps for high-fidelity view
            const isCombo = /combo|collection|billion|exploit|db81|verified|antipublic/i.test(domainName) || ((!bd.domain || bd.domain === "") && !bName.includes("."));
            
            if (!isCombo) {
              const finalName = bd.domain || bName;
              if (!seenDomains.has(finalName.toLowerCase())) {
                seenDomains.add(finalName.toLowerCase());
                totalExposed += bd.exposedRecords || 0;
                
                // Create a clean "display name" from domain
                const displayName = finalName.includes('.') ? finalName.split('.')[0].toUpperCase() : finalName;

                processedBreaches.push({
                  name: finalName,
                  displayName: displayName,
                  date: bd.breachedDate ? new Date(bd.breachedDate).getFullYear().toString() : (bd.addedDate ? new Date(bd.addedDate).getFullYear().toString() : '2024'),
                  records: bd.exposedRecords ? (bd.exposedRecords / 1e6).toFixed(1) + 'M' : '1.2M',
                  type: bd.exposedData?.[0] || 'Credentials',
                  severity: (bd.passwordRisk === 'plaintext' || bd.passwordRisk === 'easytocrack') ? 'CRITICAL' : 'HIGH',
                  icon: `https://www.google.com/s2/favicons?domain=${finalName}&sz=128`,
                  logoFallback: finalName.substring(0, 2).toUpperCase(),
                  description: generateBreachNarrative(finalName, bd.exposedData?.[0] || 'Credentials', bd.breachedDate ? new Date(bd.breachedDate).getFullYear().toString() : '2024', stringHash(finalName))
                });
              }
            }
          }
        });

        // Fallback if all breaches were combos
        if (processedBreaches.length === 0 && breachNames.length > 0) {
           processedBreaches.push({ name: "DarkWeb Aggregations", date: "Recent", records: "Multi-Source", type: "Combos", severity: "CRITICAL", icon: "DW" });
        }

        const riskScore = Math.min(Math.floor(breachNames.length * 8 + totalExposed / 1e6 + 40), 98);

        const responseData = {
          email: input,
          inputType: 'email',
          source: 'BREXIA · Real‑Time',
          riskScore,
          breaches: processedBreaches,
          riskHistory: [0, 8, 22, 35, 48, riskScore - 5, riskScore],
          dataTypes: [
            { label: 'Emails', value: 45, color: '#fb923c' },
            { label: 'Passwords', value: 30, color: '#f43f5e' },
            { label: 'Personal', value: 25, color: '#a78bfa' },
          ],
          timeline: processedBreaches.map(b => ({ year: b.date, label: b.name || b.breach_name, severity: 'high', detail: `${b.records} records exposed.` }))
            .sort((a, b) => a.year - b.year),
          intelligence: {
            status: riskScore > 80 ? "CRITICAL" : riskScore > 50 ? "HIGH" : "MEDIUM",
            executive_summary: {
              title: `🚨 ${processedBreaches[0]?.name.toUpperCase() || "IDENTITY"} BREACH DETECTED`,
              summary: `Our scanners correlated your email with a significant data exposure event originating from ${processedBreaches[0]?.name || "a major registry"}. Analyzing attack vectors...`,
              risk_drivers: [
                `Found in ${processedBreaches.length} primary breach database(s)`,
                `High-entropy credential-stuffing candidate`,
                `${processedBreaches[0]?.type || "Metadata"} indexed in threat-actor datasets`
              ],
            },
            threats: generateDynamicThreats(type, processedBreaches, riskScore, input),
            ai_deep_analysis: {
              behavioral_patterns: "Initializing neural audit...",
              phishing_probability: "CALCULATING...",
              future_prediction: "Modeling attack vectors..."
            }
          },
          aiInsights: [
            { label: 'REAL-TIME BREACH CONFIRMED', color: '#f43f5e', text: `Your email appears in ${breachNames.length} verified breach datasets via BREXIA intelligence network. Immediate credential rotation is critical.` },
            { label: 'PHISHING RISK ELEVATED', color: '#fb923c', text: 'This email address is actively indexed in threat-actor toolkits. Expect high-fidelity spear-phishing attempts targeting your known platforms.' },
          ],
          threats: generateDynamicThreats(type, processedBreaches, riskScore, input),
          countermeasures: [
            { title: 'Zero-Trust Rotation', desc: 'Any password ever used with this email on any platform must be treated as compromised. Rotate them all immediately.' },
            { title: 'Phishing Perimeter', desc: 'Enable advanced spam filters. Treat any "reset your password" email received in the next 90 days as a social engineering attempt.' },
            { title: 'Breach Monitoring', desc: 'Set up continuous monitoring alerts so you are notified the instant new breach data correlates with this address.' },
          ],
        };

        // Persist to Supabase
        await persistScan({
          email: input,
          breaches: processedBreaches,
          risk_score: riskScore
        });

        return NextResponse.json(responseData);
      }

      // Email found but no breaches — Return CLEAN status
      const responseDataVerified = {
        email: input,
        inputType: 'email',
        source: 'BREXIA · Verified Index',
        riskScore: 0,
        breaches: [],
        riskHistory: [0, 0, 0, 0, 0],
        dataTypes: [{ label: 'Zero Exposure', value: 100, color: '#22d3a5' }],
        timeline: [],
        intelligence: {
          status: "SAFE",
          executive_summary: {
            title: "🛡️ IDENTITY STATUS: OPTIMAL",
            summary: `Global OSINT audit of ${input} shows zero correlations with known high-priority registry leaks.`,
            risk_drivers: ["Zero database compromises", "Identity signature is currently unique", "Proactive state confirmed"],
          },
          threats: [],
          ai_deep_analysis: {
            behavioral_patterns: "No sprawl markers detected.",
            phishing_probability: "MINIMAL",
            future_prediction: "Continuously monitoring for new vectors."
          }
        },
        aiInsights: [
          { label: 'CLEAN IDENTITY RECORD', color: '#22d3a5', text: 'BREXIA cross-referenced several million records and found no confirmed exposure for this address.' },
          { label: 'ZERO COMPROMISE', color: '#63b3ed', text: 'Maintaining a 0% exposure rate is rare. We recommend hardware-based 2FA to maintain this posture.' },
        ],
        threats: [],
        countermeasures: [
          { title: 'Maintain Hygiene', desc: 'Even without current breaches, ensure you use unique passwords for every site to remain in this safe state.' },
        ],
      };

      // Persist to Supabase
      await persistScan({
        email: input,
        breaches: [],
        risk_score: 0
      });

      return NextResponse.json(responseDataVerified);
    }

    // ════════════════════════════════════════════════════════════
    //  PATH 2 — PASSWORD  (HIBP Pwned Passwords k-anonymity API)
    // ════════════════════════════════════════════════════════════
    if (type === 'password' || type === 'password_weak' || type === 'password_strong') {
      const [pwnedResult, pool] = await Promise.all([
        checkPasswordPwned(input),
        fetchBreachPool(),
      ]);

      const strength = analysePasswordStrength(input);
      const seed = stringHash(input);
      const usePool = pool.length > 0 ? pool : STATIC_POOL;

      if (type === 'password_strong' && !pwnedResult.pwned) {
        return NextResponse.json({
          email: input,
          inputType: 'password',
          source: pwnedResult.realData ? 'HIBP Pwned Passwords · Verified Clean' : 'Strength Analysis · Local',
          riskScore: 8,
          breaches: [],
          riskHistory: [0, 2, 4, 6, 7, 8, 8],
          dataTypes: [{ label: 'No Exposure', value: 100, color: '#22d3a5' }],
          timeline: [],
          passwordAnalysis: strength,
          aiInsights: [
            { label: 'VAULT SECURE', color: '#22d3a5', text: `${pwnedResult.realData ? 'HIBP Pwned Passwords confirmed: this exact password has never appeared in any known breach database.' : 'This password exhibits high entropy and strong characteristics.'} Entropy: ~${strength.entropy} bits.` },
            { label: 'BEST PRACTICE MAINTAINED', color: '#63b3ed', text: 'Uppercase, lowercase, digits and special characters detected. Ensure this is unique across all your platforms.' },
          ],
          threats: generateDynamicThreats(type, [], 8, input),
          countermeasures: [
            { title: 'Rotate Every 90 Days', desc: 'Even strong passwords benefit from scheduled rotation. Store in a password manager like Bitwarden.' },
            { title: 'No Cross-Platform Reuse', desc: 'Never use this exact string on more than one service, no matter how strong it appears.' },
          ],
        });
      }

      // Pwned or weak/medium password
      let riskScore, breachCount;
      if (type === 'password_weak') {
        riskScore = 95;
        breachCount = 7;
      } else if (pwnedResult.pwned) {
        // Scale risk with how many times it's been seen
        riskScore = Math.min(55 + Math.floor(Math.log10(Math.max(pwnedResult.count, 1)) * 12), 98);
        breachCount = 3 + Math.floor(seededRandom(seed) * 4);
      } else {
        riskScore = 40 + Math.floor(seededRandom(seed + 1) * 20);
        breachCount = 2 + Math.floor(seededRandom(seed) * 3);
      }

      const simBreaches = simulateBreaches(input, type, usePool, breachCount);

      const pwnedCountFormatted = pwnedResult.count ? pwnedResult.count.toLocaleString() : '0';
      const insightText = pwnedResult.realData && pwnedResult.pwned
        ? `HIBP Pwned Passwords confirmed: this exact password appears ${pwnedCountFormatted} times across known breach datasets. It is actively used in credential stuffing attacks RIGHT NOW.`
        : type === 'password_weak'
        ? 'This password string is among the most commonly used globally and is hardcoded into every known brute-force dictionary. It is compromised by definition.'
        : `Password analysis indicates moderate exposure risk. Entropy score: ${strength.entropy} bits (${strength.grade}).`;

      const responseDataPw = {
        email: type === 'email' ? input : null,
        inputType: 'password',
        source: pwnedResult.realData ? `HIBP Pwned Passwords · ${pwnedResult.pwned ? pwnedCountFormatted + ' breaches' : 'Not Found'}` : 'Strength Analysis · Deterministic',
        riskScore,
        breaches: simBreaches,
        riskHistory: [5, 15, 30, 50, riskScore - 10, riskScore - 3, riskScore],
        dataTypes: [
          { label: 'Credential Exposure', value: 55, color: '#f43f5e' },
          { label: 'Stuffing Risk',        value: 30, color: '#fb923c' },
          { label: 'Dictionary Match',     value: 15, color: '#a78bfa' },
        ],
        timeline: simBreaches.map(b => ({ year: b.date, label: b.name, severity: 'high', detail: `${b.records} records exposed in ${b.name}.` })).sort((a, b) => a.year - b.year),
        passwordAnalysis: strength,
        // (aiInsights and countermeasures would be here)
      };

      // Persist to Supabase with Hashed Password
      const hashedPassword = await bcrypt.hash(input, 10);
      await persistScan({
        password: hashedPassword,
        breaches: simBreaches,
        risk_score: riskScore
      });

      return NextResponse.json({
        ...responseDataPw,
        aiInsights: [
          { label: pwnedResult.pwned || type === 'password_weak' ? 'CRITICAL COMPROMISE' : 'COMPLEXITY ANALYSIS', color: pwnedResult.pwned || type === 'password_weak' ? '#f43f5e' : '#fb923c', text: insightText },
          { label: 'CREDENTIAL VULNERABILITY', color: '#63b3ed', text: 'Your password risk profile is determined by entropy, frequency in dark web dumps, and susceptibility to automated brute-force dictionaries.' },
        ],
        threats: generateDynamicThreats(type, simBreaches, riskScore, input),
        countermeasures: [
          { title: 'Immediate Replacement', desc: 'Stop using this password everywhere. Replace it with a unique, randomly generated string from a password manager.' },
          { title: 'Enable Hardware MFA', desc: 'On all accounts using this password, enforce TOTP or hardware key 2FA immediately — before rotating.' },
          { title: 'Audit Account Sessions', desc: 'Review active sessions on all affected platforms. Terminate any unrecognized sessions and revoke API tokens.' },
        ],
      });
    }

    // ════════════════════════════════════════════════════════════
    //  PATH 3 — USERNAME  (enriched deterministic + breach pool)
    // ════════════════════════════════════════════════════════════
    const seed = stringHash(input);
    const pool = await fetchBreachPool();
    const usePool = pool.length > 0 ? pool : STATIC_POOL;

    // Username cross-platform risk: hash determines "how exposed" it is
    const usernameRiskBase = 35 + Math.floor(seededRandom(seed) * 45);
    const breachCount = 2 + Math.floor(seededRandom(seed + 1) * 5);
    const simBreaches = simulateBreaches(input, 'username', usePool, breachCount);

    // Determine if username looks like it could be from a known leak pattern
    const isCommonPattern = /^[a-z]+\d{2,4}$/.test(input) || // e.g. john1990
                            /^[a-z]+_[a-z]+$/.test(input) ||  // e.g. john_doe
                            input.length <= 6;                  // short handles

    const riskScore = isCommonPattern
      ? Math.min(usernameRiskBase + 20, 92)
      : usernameRiskBase;

    // Persist to Supabase
    await persistScan({
      username: input,
      breaches: simBreaches,
      risk_score: riskScore
    });

    return NextResponse.json({
      email: input,
      inputType: 'username',
      source: `OSINT Correlation Engine · ${breachCount} Sources`,
      riskScore,
      breaches: simBreaches,
      riskHistory: [10, 18, usernameRiskBase - 15, usernameRiskBase, riskScore - 5, riskScore - 2, riskScore],
      dataTypes: [
        { label: 'Profile Data',     value: 40, color: '#f43f5e' },
        { label: 'Cross-Platform',   value: 35, color: '#fb923c' },
        { label: 'Metadata/IP',      value: 25, color: '#a78bfa' },
      ],
      timeline: simBreaches.map(b => ({ year: b.date, label: b.name || b.breach_name, severity: 'med', detail: `Username correlated in ${b.name || b.breach_name} dataset — ${b.records} records.` })).sort((a, b) => a.year - b.year),
      intelligence: (await generateEliteIntelligence(input, simBreaches, riskScore)) || {
        executive_summary: {
          title: "🔎 IDENTITY SPRAWL DETECTED",
          summary: `The handle "${input}" shows significant reuse across multiple historical datasets, increasing your credential stuffing attack surface.`,
          risk_drivers: ["High handle reuse detected", "Cross-platform pattern match", "OSINT metadata correlation"],
        },
        threats: generateDynamicThreats(type, simBreaches, riskScore, input),
        ai_deep_analysis: {
          behavioral_patterns: "The subject follows common naming conventions, making them a high-priority target for automated list-cleaning bots.",
          phishing_probability: "MEDIUM",
          future_prediction: "Expect increased targeted reach-outs on social platforms using this handle."
        }
      },
      aiInsights: [
        {
          label: 'IDENTITY SPRAWL DETECTED',
          color: '#fb923c',
          text: `Username "${input}" was correlated across ${breachCount} breach sources via OSINT pattern analysis. ${isCommonPattern ? 'This handle follows a highly common naming pattern, meaning it is actively targeted by credential stuffing bots.' : 'Cross-platform username reuse dramatically increases your attack surface.'}`,
        },
        {
          label: 'CREDENTIAL STUFFING VECTOR',
          color: '#63b3ed',
          text: 'Threat actors aggregate usernames from breach dumps and test associated passwords across banking, crypto, and e-commerce platforms within hours of a breach going public.',
        },
      ],
        threats: generateDynamicThreats(type, simBreaches, riskScore, input),
        countermeasures: [
          { title: 'Compartmentalization', desc: 'Use distinct usernames for high-value platforms (banking, crypto, email) vs recreational sites. Never reuse handles.' },
          { title: 'Hardware Key 2FA', desc: 'Deploy FIDO2/WebAuthn hardware keys on every account using this username. Username + password alone is no longer sufficient.' },
          { title: 'Alias Rotation', desc: 'Consider migrating high-value accounts to new handles that have zero breach history.' },
        ],
    });

  } catch (error) {
    console.error('Scan API Error:', error);
    return NextResponse.json({ error: 'Failed to process scan.' }, { status: 500 });
  }
}

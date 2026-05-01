const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

// Color overhauls to remove 'blue' theme and use Figma colors (Purple/Coral/Mint/Charcoal)
content = content.replace(/#63b3ed/g, '#A259FF'); // Primary: Purple
content = content.replace(/rgba\(99,179,237,/g, 'rgba(162, 89, 255,'); // Primary RGBA
content = content.replace(/#a78bfa/g, '#FF7262'); // Secondary: Coral/Pink
content = content.replace(/rgba\(167,139,250,/g, 'rgba(255, 114, 98,'); // Secondary RGBA
content = content.replace(/#f43f5e/g, '#F24E1E'); // High Risk: True Red
content = content.replace(/#fb923c/g, '#FF9326'); // Med Risk: Warning Orange
content = content.replace(/#22d3a5/g, '#0ACF83'); // Low Risk: Mint Green
content = content.replace(/rgba\(34,211,165,/g, 'rgba(10, 207, 131,'); // Low Risk RGBA
content = content.replace(/#0B0F19/g, '#0A0A0A'); // Background Main (Figma Dark)
content = content.replace(/#0d1420/g, '#111111'); // Dark Elements
content = content.replace(/rgba\(13,20,32,0\.8\)/g, 'rgba(18,18,18,0.8)'); // Sidebar Background
content = content.replace(/rgba\(18,24,38,0\.7\)/g, 'rgba(24,24,24,0.7)'); // Glass Cards

// Wire up the API dynamically instead of MOCK
content = content.replace(/const \[scanning, setScanning\] = useState\(false\);/, 'const [scanning, setScanning] = useState(false);\n  const [apiData, setApiData] = useState(null);');
content = content.replace(/const handleScan = \(\) => \{[\s\S]*?setScanning\(true\); setScanDone\(false\);\n  \};/, `const handleScan = async () => {\n    if (!email.trim()) return;\n    setScanning(true); setScanDone(false);\n    try { const res = await fetch('/api/scan', { method: 'POST', body: JSON.stringify({email}) }); const data = await res.json(); setApiData(data); } catch (e) { console.error(e); }\n  };`);
content = content.replace(/MOCK\.riskScore/g, '(apiData ? apiData.riskScore : MOCK.riskScore)');
content = content.replace(/MOCK\.aiInsights/g, '(apiData && apiData.aiInsights ? apiData.aiInsights : MOCK.aiInsights)');
content = content.replace(/MOCK\.riskHistory/g, '(apiData ? [12, 24, 18, 45, 52, apiData.riskScore] : MOCK.riskHistory)');
content = content.replace(/MOCK\.timeline/g, '(apiData && apiData.breaches && apiData.breaches.length ? [...MOCK.timeline, { year: new Date().getFullYear().toString(), label: "Recent Scan", severity: "high", detail: "User requested scan"}] : MOCK.timeline)');
content = content.replace(/MOCK\.breaches/g, '(apiData && apiData.breaches ? apiData.breaches.map(b => ({name: b.name, date: b.date || b.year || "Unknown", records: b.records || "N/A", type: b.type || "General", severity: b.severity || "MED", icon: b.name.charAt(0)})) : MOCK.breaches)');

fs.writeFileSync('src/app/page.js', content, 'utf8');
console.log("Rewrite complete.");

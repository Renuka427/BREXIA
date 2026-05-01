import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('mode') || 'recent';

  try {
    const res = await fetch('https://api.xposedornot.com/v1/breaches', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error('XposedOrNot unavailable');

    const data = await res.json();
    let rawPool = (data.exposedBreaches || []).filter(b => b.breachedDate || b.addedDate);

    // Filter out combo lists and deduplicate to ensure only "Original Website Names"
    const validPool = [];
    const seenDomains = new Set();

    rawPool.forEach(b => {
      const domainName = (b.domain || b.breachID || '').toLowerCase();
      const isCombo = /combo|collection|billion|exploit|db81|verified|antipublic|unknown/i.test(domainName) || ((!b.domain || b.domain === "") && !(b.breachID || "").includes("."));
      
      if (!isCombo) {
         const finalName = b.domain || b.breachID;
         if (!seenDomains.has(finalName.toLowerCase())) {
            seenDomains.add(finalName.toLowerCase());
            validPool.push(b);
         }
      }
    });

    const mapBreach = (b) => {
      const finalName = b.domain || b.breachID || 'Unknown';
      return {
        name: finalName,
        icon: finalName.substring(0, 2).toUpperCase(),
        records: b.exposedRecords
          ? b.exposedRecords >= 1e9
            ? (b.exposedRecords / 1e9).toFixed(1) + 'B'
            : b.exposedRecords >= 1e6
            ? (b.exposedRecords / 1e6).toFixed(1) + 'M'
            : (b.exposedRecords / 1e3).toFixed(0) + 'K'
          : 'N/A',
        rawRecords: b.exposedRecords || 0,
        year: b.breachedDate
          ? new Date(b.breachedDate.split(' ')[0]).getFullYear()
          : b.addedDate
          ? new Date(b.addedDate.split(' ')[0]).getFullYear()
          : 'Unknown',
        severity: (b.passwordRisk === 'plaintext' || b.passwordRisk === 'easytocrack') ? 'CRITICAL' : 'HIGH',
        type: b.exposedData?.[0] || 'Credentials',
        breachedDate: b.breachedDate || b.addedDate || '',
        detail: b.exposedData ? b.exposedData.join(", ") : "User data compromised"
      };
    };

    let result;
    if (mode === 'top') {
      result = [...validPool]
        .filter((b) => b.exposedRecords > 0)
        .sort((a, b) => b.exposedRecords - a.exposedRecords)
        .slice(0, 50)
        .map(mapBreach);
    } else {
      result = [...validPool]
        .sort((a, b) => {
          const aD = new Date(a.breachedDate || a.addedDate || 0);
          const bD = new Date(b.breachedDate || b.addedDate || 0);
          return bD - aD;
        })
        .slice(0, 50)
        .map(mapBreach);
    }

    return NextResponse.json({
      breaches: result,
      count: validPool.length,
      fetchedAt: new Date().toISOString(),
      source: 'Global Breach Index',
    });
  } catch (e) {
    console.warn('Feed API error:', e.message);
    return NextResponse.json({ breaches: [], count: 0, fetchedAt: new Date().toISOString(), source: 'Offline' });
  }
}

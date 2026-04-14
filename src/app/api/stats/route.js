import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch the full breach pool from XposedOrNot to compute live stats
    const res = await fetch('https://api.xposedornot.com/v1/breaches', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error('XposedOrNot unreachable');

    const data = await res.json();
    const pool = data.exposedBreaches || [];

    // Aggregate stats from real breach pool
    let totalRecords = 0;
    let criticalCount = 0;
    const yearMap = {};

    pool.forEach((b) => {
      totalRecords += b.exposedRecords || 0;
      if (b.passwordRisk === 'plaintext' || b.passwordRisk === 'easytocrack') criticalCount++;
      const year = b.breachedDate
        ? new Date(b.breachedDate.split(' ')[0]).getFullYear()
        : null;
      if (year && year >= 2010) yearMap[year] = (yearMap[year] || 0) + 1;
    });

    // Build year trend (last 10 years)
    const currentYear = new Date().getFullYear();
    const yearTrend = [];
    for (let y = currentYear - 9; y <= currentYear; y++) {
      yearTrend.push({ year: y, count: yearMap[y] || 0 });
    }

    // Top 6 biggest breaches by record count
    const topBreaches = [...pool]
      .filter((b) => b.exposedRecords > 0)
      .sort((a, b) => b.exposedRecords - a.exposedRecords)
      .slice(0, 6)
      .map((b) => ({
        name: b.domain || b.breachID,
        icon: (b.domain || b.breachID).substring(0, 2).toUpperCase(),
        records: b.exposedRecords,
        recordsFormatted:
          b.exposedRecords >= 1e9
            ? (b.exposedRecords / 1e9).toFixed(1) + 'B'
            : b.exposedRecords >= 1e6
            ? (b.exposedRecords / 1e6).toFixed(1) + 'M'
            : b.exposedRecords >= 1e3
            ? (b.exposedRecords / 1e3).toFixed(1) + 'K'
            : b.exposedRecords.toString(),
        year: b.breachedDate
          ? new Date(b.breachedDate.split(' ')[0]).getFullYear()
          : 'Unknown',
        severity:
          b.passwordRisk === 'plaintext' || b.passwordRisk === 'easytocrack'
            ? 'CRITICAL'
            : 'HIGH',
        type: b.exposedData?.[0] || 'Credentials',
      }));

    // Most recent 5 breaches by breach date
    const recentBreaches = [...pool]
      .filter((b) => b.breachedDate || b.addedDate)
      .sort((a, b) => {
        const aD = new Date(a.breachedDate || a.addedDate);
        const bD = new Date(b.breachedDate || b.addedDate);
        return bD - aD;
      })
      .slice(0, 5)
      .map((b) => ({
        name: b.domain || b.breachID,
        icon: (b.domain || b.breachID).substring(0, 2).toUpperCase(),
        records: b.exposedRecords
          ? (b.exposedRecords / 1e6).toFixed(1) + 'M'
          : 'Unknown',
        year: b.breachedDate
          ? new Date(b.breachedDate.split(' ')[0]).getFullYear()
          : 'Unknown',
        severity:
          b.passwordRisk === 'plaintext' || b.passwordRisk === 'easytocrack'
            ? 'CRITICAL'
            : 'HIGH',
        type: b.exposedData?.[0] || 'Credentials',
      }));

    return NextResponse.json({
      totalBreaches: pool.length,
      totalRecords,
      totalRecordsFormatted:
        totalRecords >= 1e12
          ? (totalRecords / 1e12).toFixed(2) + 'T'
          : totalRecords >= 1e9
          ? (totalRecords / 1e9).toFixed(1) + 'B'
          : (totalRecords / 1e6).toFixed(0) + 'M',
      criticalCount,
      topBreaches,
      recentBreaches,
      yearTrend,
      fetchedAt: new Date().toISOString(),
      source: 'XposedOrNot · Live Global Pool',
    });
  } catch (e) {
    console.warn('Stats API error:', e.message);
    // Return plausible fallback so the UI degrades gracefully
    return NextResponse.json({
      totalBreaches: 1486,
      totalRecords: 18700000000,
      totalRecordsFormatted: '18.7B',
      criticalCount: 287,
      topBreaches: [],
      recentBreaches: [],
      yearTrend: [],
      fetchedAt: new Date().toISOString(),
      source: 'Offline Estimate · API Unavailable',
    });
  }
}

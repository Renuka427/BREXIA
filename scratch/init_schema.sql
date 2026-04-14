-- Initial Schema for BREXIA

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target TEXT NOT NULL,
    type TEXT NOT NULL,
    risk_score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending',
    summary TEXT,
    advisory TEXT,
    insight TEXT,
    priority TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS breaches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID REFERENCES scans(id) ON DELETE CASCADE,
    source TEXT NOT NULL,
    breach_date DATE,
    exposed_data TEXT[],
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS countermeasures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID REFERENCES scans(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT,
    status TEXT DEFAULT 'open',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Realtime
-- Check if publication exists, if not create it, then add table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        CREATE PUBLICATION supabase_realtime;
    END IF;
END $$;

ALTER PUBLICATION supabase_realtime ADD TABLE scans;

-- 3. Security (Allow anonymous access as requested)
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE breaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE countermeasures ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for an "auth-less" experience
DROP POLICY IF EXISTS "Allow anonymous read scans" ON scans;
CREATE POLICY "Allow anonymous read scans" ON scans FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow anonymous insert scans" ON scans;
CREATE POLICY "Allow anonymous insert scans" ON scans FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow anonymous update scans" ON scans;
CREATE POLICY "Allow anonymous update scans" ON scans FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow anonymous read breaches" ON breaches;
CREATE POLICY "Allow anonymous read breaches" ON breaches FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow anonymous insert breaches" ON breaches;
CREATE POLICY "Allow anonymous insert breaches" ON breaches FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous read countermeasures" ON countermeasures;
CREATE POLICY "Allow anonymous read countermeasures" ON countermeasures FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow anonymous insert countermeasures" ON countermeasures;
CREATE POLICY "Allow anonymous insert countermeasures" ON countermeasures FOR INSERT WITH CHECK (true);

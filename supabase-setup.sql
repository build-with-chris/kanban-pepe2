-- Erstelle Tabellen für gemeinsamen Workspace ohne Login
-- Diese Tabellen ermöglichen es allen Teammitgliedern, die gleichen Daten zu sehen

-- Tabelle für Kanban-Karten
CREATE TABLE IF NOT EXISTS shared_cards (
    id SERIAL PRIMARY KEY,
    workspace_id TEXT NOT NULL DEFAULT 'pepe-dom-shared',
    title TEXT NOT NULL,
    description TEXT,
    tags TEXT[],
    status TEXT NOT NULL DEFAULT 'todo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabelle für Wochenziele
CREATE TABLE IF NOT EXISTS shared_goals (
    id SERIAL PRIMARY KEY,
    workspace_id TEXT NOT NULL DEFAULT 'pepe-dom-shared',
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Erstelle Indexe für bessere Performance
CREATE INDEX IF NOT EXISTS idx_shared_cards_workspace ON shared_cards(workspace_id);
CREATE INDEX IF NOT EXISTS idx_shared_goals_workspace ON shared_goals(workspace_id);

-- Erlaube öffentlichen Zugriff (ohne Login)
-- WICHTIG: Diese Einstellungen ermöglichen es jedem, die Daten zu lesen und zu schreiben
-- Das ist gewollt für ein gemeinsames Team-Board ohne Login

-- Row Level Security (RLS) deaktivieren für öffentlichen Zugriff
ALTER TABLE shared_cards DISABLE ROW LEVEL SECURITY;
ALTER TABLE shared_goals DISABLE ROW LEVEL SECURITY;

-- Erstelle Policies für öffentlichen Zugriff
CREATE POLICY "Enable all operations for everyone" ON shared_cards FOR ALL USING (true);
CREATE POLICY "Enable all operations for everyone" ON shared_goals FOR ALL USING (true);

-- Aktiviere Realtime für Live-Updates
ALTER PUBLICATION supabase_realtime ADD TABLE shared_cards;
ALTER PUBLICATION supabase_realtime ADD TABLE shared_goals;

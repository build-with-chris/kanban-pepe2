-- Update für bestehende Supabase-Datenbank
-- Fügt die author-Spalte zu shared_goals hinzu

-- Füge author-Spalte hinzu (falls sie noch nicht existiert)
ALTER TABLE shared_goals 
ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Unbekannt';

-- Füge completed_at-Spalte hinzu (falls sie noch nicht existiert)
ALTER TABLE shared_goals 
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Update bestehende Einträge (falls author NULL ist)
UPDATE shared_goals 
SET author = 'Unbekannt' 
WHERE author IS NULL;

-- Stelle sicher, dass die Spalten nicht NULL sein können
ALTER TABLE shared_goals 
ALTER COLUMN author SET NOT NULL;

-- Erstelle Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_shared_goals_author ON shared_goals(author);
CREATE INDEX IF NOT EXISTS idx_shared_goals_completed_at ON shared_goals(completed_at);

-- Teste die Tabelle
SELECT * FROM shared_goals LIMIT 1;

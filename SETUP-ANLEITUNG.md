# 🎪 Pepe-Dom Kanban Board - Setup Anleitung

## Gemeinsamer Storage ohne Login für das ganze Team

Diese Anleitung zeigt Ihnen, wie Sie das Kanban Board so einrichten, dass alle Teammitglieder die gleichen Aufgaben sehen können - unabhängig vom Gerät oder Browser.

## 🚀 Schnellstart (5 Minuten)

### Schritt 1: Supabase-Projekt erstellen

1. Gehen Sie zu [supabase.com](https://supabase.com)
2. Klicken Sie auf "Start your project"
3. Melden Sie sich mit GitHub an (kostenlos)
4. Klicken Sie "New Project"
5. Wählen Sie eine Organisation und geben Sie einen Projektnamen ein (z.B. "pepe-dom-kanban")
6. Wählen Sie ein Passwort für die Datenbank
7. Wählen Sie eine Region (z.B. "Central EU" für Deutschland)
8. Klicken Sie "Create new project"

### Schritt 2: Datenbank-Tabellen erstellen

1. Warten Sie, bis das Projekt erstellt ist (ca. 2 Minuten)
2. Gehen Sie im Dashboard zu "SQL Editor" (linke Seitenleiste)
3. Klicken Sie "New query"
4. Kopieren Sie den gesamten Inhalt aus der Datei `supabase-setup.sql`
5. Fügen Sie ihn in den Editor ein
6. Klicken Sie "Run" (oder Strg+Enter)

### Schritt 3: API-Credentials kopieren

1. Gehen Sie zu "Settings" → "API" (linke Seitenleiste)
2. Kopieren Sie die "Project URL" (beginnt mit https://)
3. Kopieren Sie den "anon public" Key (langer String)

### Schritt 4: Anwendung konfigurieren

1. Öffnen Sie die Datei `index.html`
2. Suchen Sie nach diesen Zeilen (ca. Zeile 737-738):
   ```javascript
   const SUPABASE_URL = 'https://your-project.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```
3. Ersetzen Sie die Werte mit Ihren kopierten Credentials:
   ```javascript
   const SUPABASE_URL = 'https://ihr-projekt.supabase.co';
   const SUPABASE_ANON_KEY = 'ihr-anon-key-hier';
   ```

### Schritt 5: Testen

1. Öffnen Sie `index.html` in einem Browser
2. Erstellen Sie eine neue Karte
3. Öffnen Sie die gleiche Seite in einem anderen Browser/Inkognito-Modus
4. Die Karte sollte automatisch erscheinen! 🎉

## 🔧 Wie es funktioniert

- **Kein Login erforderlich**: Alle Teammitglieder können sofort loslegen
- **Live-Sync**: Änderungen erscheinen sofort bei allen anderen
- **Geräteübergreifend**: Funktioniert auf Handy, Tablet, Computer
- **Browser-unabhängig**: Chrome, Firefox, Safari, Edge - alles funktioniert
- **Offline-Fallback**: Falls die Verbindung weg ist, nutzt es lokalen Speicher

## 🌍 Für das Team freigeben

### Option 1: Datei teilen
- Laden Sie die `index.html` auf einen Webserver hoch
- Teilen Sie den Link mit dem Team

### Option 2: Lokal nutzen
- Jeder öffnet die `index.html` lokal
- Alle nutzen die gleichen Supabase-Credentials
- Daten werden automatisch synchronisiert

### Option 3: GitHub Pages (kostenlos)
1. Laden Sie den Code auf GitHub hoch
2. Aktivieren Sie GitHub Pages
3. Teilen Sie den Link mit dem Team

## 🔒 Sicherheit

- Die Datenbank ist öffentlich zugänglich (gewollt für Team-Zugriff)
- Jeder kann lesen und schreiben
- Für sensible Daten sollten Sie ein Login-System implementieren
- Für ein internes Team-Board ist das völlig ausreichend

## 🆘 Troubleshooting

### "Bitte Supabase-Credentials eintragen"
- Die Credentials sind noch nicht konfiguriert
- Folgen Sie Schritt 4 der Anleitung

### "Offline" Status
- Prüfen Sie Ihre Internetverbindung
- Die App funktioniert auch offline mit lokalem Speicher

### Karten erscheinen nicht bei anderen
- Prüfen Sie, ob die SQL-Befehle korrekt ausgeführt wurden
- Prüfen Sie die Supabase-Credentials
- Öffnen Sie die Browser-Konsole (F12) für Fehlermeldungen

## 📱 Mobile Nutzung

Das Board ist vollständig responsive und funktioniert perfekt auf:
- Smartphones
- Tablets  
- Desktop-Computern
- Alle modernen Browser

## 🎯 Features

- ✅ Kanban-Board mit 4 Spalten
- ✅ Wochenziele mit Checkboxen
- ✅ Drag & Drop zwischen Spalten
- ✅ Tags für Kategorisierung
- ✅ E-Mail-Erinnerungen
- ✅ Live-Sync zwischen allen Geräten
- ✅ Offline-Funktionalität
- ✅ Kein Login erforderlich

Viel Erfolg mit Ihrem gemeinsamen Pepe-Dom Kanban Board! 🎪

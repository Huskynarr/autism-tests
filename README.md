# Autism-Tests - Online-Testplattform

Eine moderne, webbasierte Plattform für standardisierte Autismus-Tests und -Fragebögen in deutscher Sprache.

## 🔬 Enthaltene Tests

- **AQ-50** (Autism Spectrum Quotient) - Screening-Test für Autismus-Spektrum-Störungen
- **RAADS-R** (Ritvo Autism Asperger Diagnostic Scale-Revised) - Diagnostisches Instrument für Erwachsene
- **ADOS-2** (Autism Diagnostic Observation Schedule) - Strukturierte Beobachtungs-Assessment

## 🛠️ Technischer Stack

- **Frontend**: React 18 mit Vite
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages
- **Sprache**: TypeScript/JavaScript
- **Package Manager**: npm

## 📋 Voraussetzungen

- Node.js (Version 18 oder höher)
- npm (Version 8 oder höher)
- Git

## 🚀 Installation und Setup

### 1. Repository klonen
```bash
git clone https://github.com/Huskynarr/autism-tests.git
cd autism-tests
```

### 2. Abhängigkeiten installieren
```bash
npm install
```

### 3. Entwicklungsserver starten
```bash
npm run dev
```

Die Anwendung ist dann unter `http://localhost:5173` erreichbar.

## 📁 Projektstruktur

```
autism-tests/
├── public/              # Statische Assets
├── src/
│   ├── components/      # React-Komponenten
│   ├── tests/          # Test-Komponenten (AQ-50, RAADS-R, ADOS-2)
│   ├── utils/          # Hilfsfunktionen
│   ├── styles/         # CSS-Dateien
│   └── main.jsx        # Einstiegspunkt
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Verfügbare Scripts

```bash
# Entwicklungsserver starten
npm run dev

# Projekt für Produktion bauen
npm run build

# Build lokal testen
npm run preview

# Code-Qualität prüfen
npm run lint

# Tests ausführen
npm test
```

## 🌍 Deployment auf GitHub Pages

### 1. Build erstellen
```bash
npm run build
```

### 2. GitHub Pages konfigurieren
1. Repository-Einstellungen öffnen
2. "Pages" → "Source" → "GitHub Actions" auswählen
3. Workflow wird automatisch ausgeführt

### 3. Automatisches Deployment
Bei jedem Push auf `main` wird die Seite automatisch aktualisiert.

## 🧪 Entwicklung

### Neuen Test hinzufügen
1. Komponente in `src/tests/` erstellen
2. Test-Logik implementieren
3. Routing aktualisieren
4. Tests schreiben

### Styling-Guidelines
- Tailwind CSS für alle Styles verwenden
- Responsive Design für Mobile und Desktop
- Accessibility-Standards befolgen
- Deutsche Texte und Übersetzungen

## 📊 Test-Features

- **Interaktive Fragebögen** mit Fortschrittsanzeige
- **Ergebnis-Auswertung** mit visueller Darstellung
- **PDF-Export** der Testergebnisse
- **Responsive Design** für alle Geräte
- **Barrierefreiheit** nach WCAG-Richtlinien

## 🤝 Beitragen

1. Fork des Repositories erstellen
2. Feature-Branch erstellen (`git checkout -b feature/amazing-feature`)
3. Änderungen committen (`git commit -m 'Add amazing feature'`)
4. Branch pushen (`git push origin feature/amazing-feature`)
5. Pull Request erstellen

## 📝 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe `LICENSE` Datei für Details.

## ⚠️ Wichtige Hinweise

- Diese Tests ersetzen **keine professionelle Diagnose**
- Alle Testergebnisse sind nur als Orientierungshilfe zu verstehen
- Bei Verdacht auf Autismus-Spektrum-Störung sollte professionelle Hilfe gesucht werden

## 📞 Support

Bei Fragen oder Problemen:
- Issues auf GitHub erstellen
- [E-Mail](mailto:admin@huskynarr.de) senden

---

**Entwickelt mit ❤️ für die Autismus-Community**

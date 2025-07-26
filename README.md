# Online Test Plattform: AQ-50, RAADS-R, ADOS-2

Dieses Projekt stellt eine Online-Plattform bereit, auf der folgende Tests durchgeführt werden können:

- **AQ-50 (Autismus-Spektrum-Quotient)**
- **RAADS-R (Ritvo Autism Asperger Diagnostic Scale-Revised)**
- **ADOS-2 (Autism Diagnostic Observation Schedule, Modul 2)**

Nach Abschluss des Tests erhalten Nutzer eine automatisierte Auswertung. Optional kann ein PDF mit Hinweisen als Vorlage für den Arztbesuch und Kontaktmöglichkeiten zu Ansprechstellen heruntergeladen werden.

## Features

- **Online Testdurchführung** für AQ-50, RAADS-R und ADOS-2
- **Automatische Auswertung** nach Testabschluss
- **PDF-Export:** Download eines Ergebnisdokuments für Arzt oder Beratung
- **Hinweise und Ansprechstellen** werden nach Abschluss angezeigt

## Tech Stack

- **React** (Frontend)
- **Tailwind CSS** (Styling)
- **Deployment:** GitHub Pages

## Lokale Entwicklung

1. Repository klonen:

   ```bash
   git clone https://github.com/Huskynarr/autism-tests.git
   cd autism-tests
   ```

2. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

3. Entwicklungsserver starten:

   ```bash
   npm run dev
   ```

## Deployment auf GitHub Pages

Das Projekt ist für die Veröffentlichung auf **GitHub Pages** konfiguriert. Zum Deployen:

1. Repository auf GitHub anlegen.
2. Build ausführen:

   ```bash
   npm run build
   ```

3. Deploy Script ausführen (z.B. mit `gh-pages`):

   ```bash
   npm run deploy
   ```

Weitere Infos findest du in der Datei [`package.json`](./package.json).

## Hinweise

- Die Testergebnisse ersetzen keine ärztliche Diagnose.
- Die PDF-Vorlage enthält wichtige Hinweise für den Arztbesuch und Kontaktadressen zu Beratungsstellen.
- Datenschutz: Es werden keine Daten gespeichert oder weitergegeben.

---

**Lizenz:** MIT  
**Autor:** Huskynarr
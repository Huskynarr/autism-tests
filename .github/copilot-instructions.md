# 🤖 Copilot Instructions for Autism Tests Platform

## Projektüberblick

- **Architektur:**
  - Hauptlogik in `src/`:
    - `core/TestEngine.js`: Definiert und verwaltet alle Testtypen (AQ, M-CHAT, SRS), Scoring-Algorithmen und Testregistrierung.
    - `assessment/AutismAssessment.js`: Session-Management, Fortschritt, Antwortverarbeitung, Ergebnis- und Empfehlungslogik.
    - `index.js`: Express-Server, API-Endpunkte, statische Auslieferung, Routing.
  - Frontend in `public/index.html` und `assets/app.js` (UI, API-Calls, Navigation).
  - Tests in `tests/autism-tests.test.js` (umfassende Unit- und Integrationstests).

## Workflows & Befehle

- **Starten (Dev/Prod):**
  - `npm start` (prod), `npm run dev` (dev, identisch)
- **Tests:**
  - `npm test` (einmalig), `npm run test:watch` (watch mode)
- **Linting:**
  - `npm run lint` (ESLint, siehe `.eslintrc.js`)
- **Build:**
  - `npm run build` (Platzhalter, kein echter Build-Prozess)

## Test- und Bewertungslogik

- Testdefinitionen und Scoring sind in `TestEngine.js` gekapselt. Neue Tests werden über `registerTest()` hinzugefügt.
- Session-IDs werden in `AutismAssessment.js` generiert und verwaltet (keine persistente Speicherung).
- Empfehlungen werden dynamisch aus den Ergebnissen abgeleitet (`generateRecommendations`).

## API-Design

- REST-API unter `/api`:
  - `/api/tests` (GET): Liste aller Tests
  - `/api/assessment/start` (POST): Session starten
  - `/api/assessment/:sessionId` (GET): Session-Status
  - `/api/assessment/:sessionId/answer` (POST): Antwort abgeben
  - `/api/health` (GET): Health-Check
- Siehe `docs/api.md` für vollständige Beispiele und Response-Formate.

## Deployment

- Siehe `docs/deployment.md` für PM2, Docker, Nginx, Cloud-Deployments.
- Keine persistente Datenbank, Sessions sind temporär (im Speicher).
- Health-Check: `/api/health` (wird für Monitoring und Docker-Healthchecks genutzt).

## Konventionen & Besonderheiten

- **Keine persistente Speicherung:** Alle Sessions und Antworten sind flüchtig.
- **Testdaten:** Testfragen sind gekürzt, echte Instrumente haben mehr Items.
- **Frontend-API-Calls:** Siehe `assets/app.js` für alle API-Interaktionen.
- **ESLint:** Strikte Regeln, keine ungenutzten Variablen, 4er-Indent, Semikolons, Single-Quotes.
- **Sicherheit:** Keine sensiblen Daten im Repo, `.env` wird ignoriert.
- **Erweiterbarkeit:** Neue Tests können durch Hinzufügen zu `TestEngine.js` und API-Integration im Frontend ergänzt werden.

## Beispiele

- **Neuen Test hinzufügen:**
  - In `TestEngine.js` mit `registerTest()` registrieren.
  - API-Integration im Frontend (`app.js`) sicherstellen.
- **Test-Session starten:**
  - POST `/api/assessment/start` mit `{ testId, participantInfo, ... }`
- **Antwort abgeben:**
  - POST `/api/assessment/:sessionId/answer` mit `{ value }`

## Weitere Ressourcen

- Siehe `README.md` für Features, Roadmap, wissenschaftliche Hintergründe und Konfigurationshinweise.
- Siehe `docs/` für API- und Deployment-Dokumentation.

---

**Hinweis:** Diese Plattform ist ausschließlich für Screening- und Bildungszwecke gedacht. Keine medizinische Diagnose!

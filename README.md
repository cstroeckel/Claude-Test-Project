# Budget-Tracker

Web-App zum Erfassen von Buchungen (Name, Beschreibung, Datum, Betrag, zusätzliche Kosten)
mit KPIs für Ausgaben, zusätzliche Kosten und Gesamtkosten pro Monat.
Die Daten bleiben im Browser (localStorage).

**Stack:** React 19, TypeScript, Vite, Tailwind CSS, React Router, Zustand, Vitest

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script               | Zweck                         |
| -------------------- | ----------------------------- |
| `npm run dev`        | Dev-Server mit Hot Reload     |
| `npm run build`      | Typecheck + Production-Build  |
| `npm test`           | Tests einmalig ausführen      |
| `npm run test:watch` | Tests im Watch-Modus          |
| `npm run lint`       | Linting (oxlint)              |
| `npm run format`     | Code mit Prettier formatieren |

## Roadmap

- [x] Setup, Routing-Grundgerüst, Tailwind, CI
- [x] Buchungen anlegen, bearbeiten, löschen (Formular mit Validierung)
- [x] KPIs: Ausgaben, zusätzliche Kosten, Gesamtkosten mit Monatsfilter
- [ ] CSV/JSON-Export und -Import
- [ ] Charts und Suche

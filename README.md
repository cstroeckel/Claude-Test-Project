# Budget-Tracker

Web-App zum Erfassen von Ausgaben und Einnahmen, mit Kategorien, Monatsbudgets und Auswertungen.
Die Daten bleiben im Browser (localStorage).

**Stack:** React 19, TypeScript, Vite, Tailwind CSS, React Router, Vitest

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
- [ ] Datenmodell, Store und Rechenlogik mit Tests
- [ ] Buchungen erfassen, bearbeiten, löschen
- [ ] Kategorien und Filter
- [ ] Dashboard mit Charts
- [ ] Budgets und Warnungen
- [ ] CSV/JSON-Export und -Import

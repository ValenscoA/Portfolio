# Note Manager

Initial full-stack scaffold for a note management application. The client uses
Vue 3, Vite, Vue Router, JavaScript, and plain CSS. The server uses Node.js,
Express, and SQLite.

This first version contains placeholder pages and a health endpoint only. Note
CRUD, validation, and database schema work are intentionally deferred.

## Requirements

- Node.js 22 or newer
- npm

## Setup

Install all workspace dependencies from this directory:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Copy each environment example before local development:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

On PowerShell, use:

```powershell
Copy-Item client/.env.example client/.env
Copy-Item server/.env.example server/.env
```

## Run locally

Start the client and server together:

```bash
npm run dev
```

The client runs at `http://localhost:5173` and the API at
`http://localhost:3000`. Check the server at `GET /api/health`.

You can also run either application separately:

```bash
npm run dev:client
npm run dev:server
```

## Build

Build the Vue client:

```bash
npm run build
```

# Dojo Kids Survey Platform

Production-ready MERN survey app with frontend and backend deployed independently and connected via environment variables.

## Stack

- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Monorepo structure

- `client/`: frontend app
- `server/`: backend API

## Environment variables

### Backend (`server/.env`)

Copy `server/.env.example` to `server/.env` and set:

- `PORT`: backend port
- `MONGODB_URI`: MongoDB connection string
- `CLIENT_ORIGIN`: comma-separated list of allowed frontend origins for CORS

Example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dojo-survey
CLIENT_ORIGIN=https://dojo-survey.vercel.app,https://dojo-survey.netlify.app
```

### Frontend (`client/.env`)

Copy `client/.env.example` to `client/.env` and set:

- `VITE_API_BASE_URL`: full backend API base URL (should include `/api`)
- `VITE_DEV_API_PROXY_TARGET`: optional local dev proxy target for Vite

Example:

```env
VITE_API_BASE_URL=https://dojo-survey-api.onrender.com/api
VITE_DEV_API_PROXY_TARGET=http://localhost:5000
```

## Local development

Install all dependencies:

```bash
npm install
```

Run both apps:

```bash
npm run dev
```

Run only frontend:

```bash
npm run dev:client
```

Run only backend:

```bash
npm run dev:server
```

## Production deployment (different platforms)

1. Deploy backend (`server/`) to a Node host (Render, Railway, Fly.io, etc.).
2. Set backend env vars (`MONGODB_URI`, `CLIENT_ORIGIN`, `PORT`).
3. Deploy frontend (`client/`) to a static host (Vercel, Netlify, Cloudflare Pages, etc.).
4. Set frontend env var `VITE_API_BASE_URL` to your deployed backend API URL ending in `/api`.
5. Re-deploy frontend after updating env vars.

## API endpoints

- `GET /api/health`
- `GET /api/survey`
- `POST /api/survey`

## Notes

- Axios is pinned to `1.8.4` (not `0.30.4` or `1.14.1`).
- Backend CORS allows only origins listed in `CLIENT_ORIGIN`.

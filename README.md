# Asset Manager MERN (Clean Copy)

This is a clean MERN rebuild of the current Asset Manager website in a separate folder.

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Project structure

- client: React app (UI copied from the current Asset Manager website)
- server: Express API with MongoDB persistence

## Setup

1. Open terminal in this folder:

   `asset-manager-mern`

2. Install dependencies:

   `npm install`

3. Configure server env:

   Copy `server/.env.example` to `server/.env`

4. Make sure MongoDB is running and update `MONGODB_URI` if needed.

## Run

- Start client + server together:

  `npm run dev`

- Start only frontend:

  `npm run dev:client`

- Start only backend:

  `npm run dev:server`

## Build

- Build frontend:

  `npm run build`

## API

- `POST /api/survey` submit survey response
- `GET /api/survey` get survey stats
- `GET /api/health` health check

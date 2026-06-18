# Task Tracker Web App

A personal productivity app that helps users manage goals across time-boxed cycles, track daily tasks, and automatically score execution progress.

## What It Does

Users log in with Google, create **Cycles** (time-boxed sprints with a start and end date), define **Goals** within each cycle, and break goals down into **Tasks** and **Tactics**. Every time a task is completed, the server automatically updates a **DailyScore** — no manual tracking required.

## Tech Stack
- **frontend :**react js, tailwind , shad cn , axios
- 
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Auth:** Google OAuth 2.0 via Passport.js + JWT
- **Logging:** Morgan

## Project  backend Structure

```
├── config/
│   └── config.js           # Environment variable definitions
├── middleware/
│   └── auth.js             # JWT verification middleware
├── models/
│   ├── User.js
│   ├── Cycle.js
│   ├── Goal.js
│   ├── Task.js             # Contains Mongoose hooks for DailyScore sync
│   ├── Tactic.js
│   └── DailyScore.js       # Auto-computed execution score
├── controllers/            # Business logic for each resource
├── routes/                 # Route definitions (all protected by JWT)
├── blueprints/             # Response transformers (cycleBlueprint, goalBlueprint)
└── passport/
    └── passport.js         # Google OAuth strategy
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/google` | Initiate Google OAuth login |
| GET | `/auth/google/callback` | OAuth callback — issues JWT |
| GET/POST/PUT/DELETE | `/api/cycles` | Manage cycles |
| GET/POST/PUT/DELETE | `/api/goals` | Manage goals within a cycle |
| GET/POST/PUT/DELETE | `/api/tasks` | Manage tasks (triggers score updates) |
| GET | `/api/daily-score` | Get score for a specific date |
| GET | `/api/daily-score/daily-trend` | Daily scores across a cycle |
| GET | `/api/daily-score/weekly-trend` | Weekly average scores across a cycle |
| GET | `/api/users` | Get current user profile |

All `/api/*` routes require a valid `Authorization: Bearer <token>` header.



## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Google OAuth app credentials

cd server

### Environment Variables
Create a `.env` file in the server  root:

```env
MONGODB_URL=mongodb://...
GOOGLE_AUTH_CLIENT_ID=...
GOOGLE_AUTH_CLIENT_SECRET=...
GOOGLE_AUTH_SERVER_CALLBACK=http://localhost:3000/auth/google/callback
GOOGLE_AUTH_CLIENT_URL_SUCCESS=http://localhost:5173
```

### Install & Run

```bash
npm install
npm run dev
```

Server starts on port `3000` by default (or `PORT` env variable).

cd client 
 ```bash
pnpm install
pnpm dev
```
frontend starts on port `5173` by default (or `PORT` env variable).

## Auth Flow

1. Client navigates to `GET /auth/google`
2. User completes Google consent screen
3. Server creates or retrieves the user by `googleId`
4. JWT is signed and the client is redirected to `<GOOGLE_AUTH_CLIENT_URL_SUCCESS>/success?token=...`
5. Client stores the token and sends it as `Authorization: Bearer <token>` on all subsequent requests

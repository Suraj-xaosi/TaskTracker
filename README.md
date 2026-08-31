# Workcycle — Task Tracker Web App

A personal productivity app that helps users manage goals across time-boxed cycles, track daily tasks, and automatically see their execution progress.

**Live demo:** https://workcycle-dashboard.vercel.app

---

## What It Does

- Log in with **Google**
- Create **Cycles** — time-boxed sprints with a start and end date
- Define **Goals** within each cycle
- Break goals down into **Tasks** and **Tactics**
- Every time a task is completed, the server automatically recalculates a **Daily Execution Score** — no manual tracking needed

---

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS + shadcn/ui
- Axios for API calls
- React DnD (drag-and-drop tasks)
- Recharts / D3 (progress visuals)

**Backend**
- Node.js + Express.js
- MongoDB with Mongoose
- Google OAuth 2.0 (Passport.js) + JWT for auth
- Morgan for request logging

---

## Project Structure

```
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── components/     # UI components, organized by feature
│       ├── context/        # React Context (Auth, Cycle, Task)
│       ├── services/       # API call wrappers (axios)
│       └── pages/          # Route-level pages
│
└── server/                 # Express backend
    ├── config/             # Environment variable definitions
    ├── middleware/          # JWT verification middleware
    ├── models/             # Mongoose schemas (User, Cycle, Goal, Task, Tactic, DailyScore)
    ├── controllers/        # Business logic for each resource
    ├── routes/             # Route definitions (all protected by JWT)
    ├── blueprints/         # Response shape transformers
    └── passport/           # Google OAuth strategy
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/google` | Start Google OAuth login |
| GET | `/auth/google/callback` | OAuth callback — issues JWT |
| GET/POST/PUT/DELETE | `/api/cycles` | Manage cycles |
| GET/POST/PUT/DELETE | `/api/goals` | Manage goals within a cycle |
| GET/POST/PUT/DELETE | `/api/tasks` | Manage tasks (triggers score updates) |
| GET | `/api/daily-score` | Get score for a specific date |
| GET | `/api/daily-score/daily-trend` | Daily scores across a cycle |
| GET | `/api/daily-score/weekly-trend` | Weekly average scores across a cycle |
| GET | `/api/users` | Get current user profile |

All `/api/*` routes require a valid `Authorization: Bearer <token>` header.

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- Google OAuth app credentials

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
MONGODB_URL=mongodb://...
JWT_SECRET=your_jwt_secret
GOOGLE_AUTH_CLIENT_ID=...
GOOGLE_AUTH_CLIENT_SECRET=...
GOOGLE_AUTH_SERVER_CALLBACK=http://localhost:3000/auth/google/callback
GOOGLE_AUTH_CLIENT_URL_SUCCESS=http://localhost:5173
```

Run the server:

```bash
npm run dev
```

Server starts on port `3000` by default (or your `PORT` env variable).

### 2. Frontend Setup

```bash
cd client
pnpm install
pnpm dev
```

Frontend starts on port `5173` by default.

---

## Auth Flow

1. Client navigates to `GET /auth/google`
2. User completes the Google consent screen
3. Server finds or creates the user by `googleId`
4. Server signs a JWT and redirects the client to `<GOOGLE_AUTH_CLIENT_URL_SUCCESS>/success?token=...`
5. Client stores the token and sends it as `Authorization: Bearer <token>` on every subsequent request

---

## How the Execution Score Works

- Each `Task` document has Mongoose hooks that run on save, update, and delete.
- Whenever a task is created, completed, or its status changes, the hook updates a `DailyScore` document for that day (`tasksTotal` and `tasksCompleted`).
- The `DailyScore` model recalculates `executionScore = (tasksCompleted / tasksTotal) * 100` automatically after every change — so the score is always up to date without any manual calculation on the frontend.

---

## License
 portfolio project

![alt text](<Screenshot 2026-08-22 135319.png>)
![alt text](<Screenshot 2026-08-22 133907.png>)
![alt text](<Screenshot 2026-08-22 135210.png>)

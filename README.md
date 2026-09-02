# Meridian Advisory — Consulting Platform

A sample full-stack platform for a US-based consulting firm helping international investors
(with a focus on Dubai/Gulf clients) acquire businesses and enter the US market. Built as
independent Spring Boot microservices with a React frontend, MongoDB, and deployed on Railway.

## Architecture

```
                         ┌─────────────────┐
   Browser  ───────────► │   Frontend       │  (React + Vite, served by nginx)
                         └────────┬─────────┘
                                  │ REST (JSON)
                                  ▼
                         ┌─────────────────┐
                         │   api-gateway    │  Spring Cloud Gateway — single entry point
                         │   :8080          │
                         └───┬────┬─────┬───┘
             ┌───────────────┘    │     └───────────────┐
             ▼                    ▼                     ▼
   ┌──────────────────┐ ┌────────────────────┐ ┌───────────────────┐
   │  user-service     │ │ consultation-service│ │ notification-service│
   │  :8081             │ │ :8082                │ │ :8083                │
   │  signup/login, JWT │ │ services, case      │ │ notifications,      │
   │  user profiles     │ │ studies, requests   │ │ messaging threads   │
   └────────┬──────────┘ └──────────┬──────────┘ └──────────┬──────────┘
            │                       │                        │
            ▼                       ▼                        ▼
       userdb                consultationdb            notificationdb
                      (all in one MongoDB instance, separate databases)
```

**Auth model:** `user-service` is the only service that issues JWTs (on signup/login). All
other services verify the same token using a shared `JWT_SECRET` — no synchronous calls back
to `user-service` are needed to authenticate a request. The frontend always talks to the
gateway; the gateway routes by path prefix to the right service.

| Service | Port | Responsibility |
|---|---|---|
| `api-gateway` | 8080 | Routes `/api/**` to the right backend service, handles CORS |
| `user-service` | 8081 | Signup, login, JWT issuance, user/consultant directory |
| `consultation-service` | 8082 | Service catalog, case studies, consultation request pipeline |
| `notification-service` | 8083 | In-app notifications, per-consultation messaging |
| `frontend` | — | React app (Vite build, served by nginx) |

## Sample data

Each service seeds sample data on first boot (skipped if data already exists):

- **user-service**: 1 admin, 2 consultants, 2 Dubai-based sample clients
- **consultation-service**: 6 service offerings, 4 case studies, 2 sample consultation requests
- **notification-service**: sample notifications and a message thread tied to the seeded requests

**Sample logins** (password shown is the seeded password):

| Role | Email | Password |
|---|---|---|
| Admin | admin@meridianadvisory.com | Admin123! |
| Consultant | james.calloway@meridianadvisory.com | Consult123! |
| Client | omar.almansoori@example.ae | Client123! |

## Running locally

Requires Docker and Docker Compose.

```bash
docker compose up --build
```

This starts MongoDB, all four backend services, and the frontend (nginx) together, wired up
with internal Docker networking. Once it's up:

- Frontend: http://localhost:3000
- API gateway: http://localhost:8080

To run services individually during development (e.g. in an IDE), start a local MongoDB and
set `MONGO_URI` per service (see each service's `application.yml` for the env vars it reads),
then `npm run dev` in `frontend/` with `VITE_API_URL=http://localhost:8080` in a `.env` file.

## Deploying to Railway

Each service in this repo (`api-gateway`, `user-service`, `consultation-service`,
`notification-service`, `frontend`) has its own `Dockerfile` and `railway.json`, so they deploy
as five separate Railway services from one repo using Railway's **Root Directory** setting.

### 1. Create the project and database

1. In Railway, create a new project.
2. Add a **MongoDB** database (Railway's MongoDB template, or point `MONGO_URI` at MongoDB
   Atlas if you'd rather not run Mongo on Railway). Note the connection string — you'll set it
   per service below with a different database name in the path (`/userdb`, `/consultationdb`,
   `/notificationdb`).

### 2. Deploy the four backend services

For each of `user-service`, `consultation-service`, `notification-service`, `api-gateway`:

1. "New Service" → "Deploy from GitHub repo" → select this repo.
2. Under **Settings → Root Directory**, set it to the service's folder (e.g. `user-service`).
   Railway will detect the `Dockerfile` automatically.
3. Under **Variables**, set:
   - `MONGO_URI` — e.g. `mongodb://<user>:<pass>@<host>:<port>/userdb` (skip for `api-gateway`)
   - `JWT_SECRET` — **the same value across all four backend services**, at least 32 characters
   - Railway sets `PORT` automatically; each service already reads `${PORT}`.
4. For `api-gateway` specifically, also set:
   - `USER_SERVICE_URL` → the internal URL of user-service, e.g. `http://user-service.railway.internal:8081`
   - `CONSULTATION_SERVICE_URL` → `http://consultation-service.railway.internal:8082`
   - `NOTIFICATION_SERVICE_URL` → `http://notification-service.railway.internal:8083`

   (Use Railway's private networking domains — each service's internal hostname is
   `<service-name>.railway.internal`, visible under that service's Settings → Networking.)
5. Generate a public domain only for `api-gateway` (Settings → Networking → Generate Domain).
   The three backend services don't need public domains — they only need to be reachable
   privately by the gateway.

### 3. Deploy the frontend

1. "New Service" → same repo, **Root Directory** = `frontend`.
2. Under **Variables**, set `VITE_API_URL` to the api-gateway's **public** Railway domain
   (e.g. `https://api-gateway-production-xxxx.up.railway.app`). Because Vite bakes env vars in
   at build time, this must also be set as a **build-time variable** (Railway does this
   automatically for variables set on the service before a deploy — just make sure it's set
   before the first build, and redeploy if you add it afterward).
3. Generate a public domain for the frontend service.

### 4. Verify

Visit the frontend's public URL, sign in with one of the sample accounts above, and confirm the
dashboard loads data — that confirms the frontend → gateway → services → MongoDB path is wired
correctly end to end.

## Notes on making this production-ready

This is a working starting point, not a hardened production system. Before real users touch it:

- Rotate `JWT_SECRET` to a securely generated value and store it in a secrets manager.
- Add rate limiting on `/api/auth/**` (signup/login) at the gateway.
- Restrict CORS `allowedOriginPatterns` to your real frontend domain instead of `*`.
- Add email delivery (e.g. via SES/SendGrid) so `notification-service` can send real emails, not
  just in-app notifications.
- Add request validation/logging middleware and centralized log aggregation across services.
- Consider moving each service to its own MongoDB cluster/user with least-privilege credentials
  instead of one shared instance.

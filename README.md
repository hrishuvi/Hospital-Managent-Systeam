# Hospital Management System

A working full-stack Hospital Management System MVP built as a portfolio project to demonstrate secure application development, role-based access control, dashboard workflows, and modern deployment practices.

## Current MVP Features

- Secure login using JWT
- Password hashing with bcrypt
- Protected API routes
- Admin dashboard with KPIs
- Patient management
- Appointment management
- Audit log tracking
- Responsive React UI
- Express backend API
- Docker Compose setup

## Demo Login

```text
Email: admin@hospital.local
Password: Admin@123
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, CSS |
| Backend | Node.js, Express.js |
| Auth | JWT, bcrypt |
| Validation | Zod |
| Security | Helmet, CORS |
| DevOps | Docker, Docker Compose |

## Quick Start

### Option 1: Run with Docker

```bash
git clone https://github.com/hrishuvi/Hospital-Managent-Systeam.git
cd Hospital-Managent-Systeam
docker compose up --build
```

Open:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000/api/health
```

### Option 2: Run locally

```bash
git clone https://github.com/hrishuvi/Hospital-Managent-Systeam.git
cd Hospital-Managent-Systeam
npm install
npm run install:all
npm run dev
```

Or run separately:

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Project Structure

```text
Hospital-Managent-Systeam/
├── client/
│   ├── src/
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   └── Dockerfile
├── server/
│   ├── src/
│   │   └── index.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── docs/
│   ├── PROJECT_PLAN.md
│   └── SECURITY.md
├── docker-compose.yml
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/dashboard` | Dashboard stats |
| GET | `/api/patients` | List patients |
| POST | `/api/patients` | Create patient |
| GET | `/api/appointments` | List appointments |
| POST | `/api/appointments` | Create appointment |
| GET | `/api/audit-logs` | List audit logs |

## Security Focus

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Input validation using Zod
- Helmet security headers
- CORS configuration
- Audit logging for sensitive actions
- Environment-based secrets

## Planned Next Improvements

- PostgreSQL database integration
- Prisma ORM schema
- User and role management
- Doctor dashboard
- Billing module
- Lab reports module
- GitHub Actions CI/CD
- Unit and API tests

## Portfolio Value

This project demonstrates:

- Full-stack development
- Secure backend engineering
- Authentication and authorization
- API design
- Healthcare workflow modelling
- Docker-based deployment readiness

## Author

Hrishikesh Sathe

GitHub: [hrishuvi](https://github.com/hrishuvi)

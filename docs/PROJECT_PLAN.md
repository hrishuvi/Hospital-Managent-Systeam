# Hospital Management System - Implementation Plan

## Goal

Build a clean, secure, portfolio-ready hospital management platform that can be shown to recruiters for software, cybersecurity, support, and cloud roles.

## MVP Scope

The first working version should include:

1. User login
2. Role-based dashboard
3. Patient registration
4. Appointment booking
5. Doctor view
6. Admin view
7. Basic billing
8. Audit log table

## Suggested Repository Structure

```text
hospital-management-system/
├── client/
│   ├── src/
│   ├── package.json
│   └── README.md
├── server/
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── README.md
├── docs/
│   ├── PROJECT_PLAN.md
│   ├── API_SPEC.md
│   └── SECURITY.md
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Database Tables

Recommended initial tables:

- users
- roles
- patients
- doctors
- appointments
- prescriptions
- lab_reports
- invoices
- audit_logs

## Authentication Flow

1. User logs in with email and password
2. Backend validates password hash
3. Backend returns JWT access token
4. Frontend stores token securely
5. Protected routes check JWT and role

## Security Controls

- Hash passwords using bcrypt
- Never commit real secrets
- Validate all API input
- Use authorization middleware
- Log sensitive actions
- Use HTTPS in production
- Add rate limiting for login endpoint

## Recruiter Demo Script

Use this explanation in interviews:

"I built this project to demonstrate secure full-stack development. It includes role-based access, patient workflows, appointment scheduling, billing, and audit logging. I focused on real-world security practices such as password hashing, JWT authentication, validation, and access control."

## Next Build Tasks

- Create React frontend
- Create Express backend
- Add Prisma schema
- Add login API
- Add patient CRUD API
- Add appointment module
- Add Docker setup

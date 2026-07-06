import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));

const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@hospital.local',
    role: 'ADMIN',
    passwordHash: bcrypt.hashSync('Admin@123', 10),
  },
];

let patients = [
  { id: 1, name: 'John Doe', age: 36, phone: '+353 111 222', condition: 'General checkup', status: 'Stable' },
  { id: 2, name: 'Aisha Khan', age: 29, phone: '+353 333 444', condition: 'Blood test follow-up', status: 'Pending' },
];

let appointments = [
  { id: 1, patientName: 'John Doe', doctor: 'Dr Smith', date: '2026-07-10', time: '10:30', status: 'Confirmed' },
  { id: 2, patientName: 'Aisha Khan', doctor: 'Dr Brown', date: '2026-07-11', time: '14:00', status: 'Pending' },
];

let auditLogs = [
  { id: 1, action: 'System initialized', actor: 'system', createdAt: new Date().toISOString() },
];

function addAudit(action, actor = 'system') {
  auditLogs.unshift({ id: auditLogs.length + 1, action, actor, createdAt: new Date().toISOString() });
}

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const patientSchema = z.object({
  name: z.string().min(2),
  age: z.coerce.number().int().min(0).max(130),
  phone: z.string().min(5),
  condition: z.string().min(2),
  status: z.string().default('Pending'),
});

const appointmentSchema = z.object({
  patientName: z.string().min(2),
  doctor: z.string().min(2),
  date: z.string().min(8),
  time: z.string().min(4),
  status: z.string().default('Pending'),
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'hospital-management-api' });
});

app.post('/api/auth/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid login data' });

  const user = users.find((u) => u.email === parsed.data.email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  addAudit('User logged in', user.email);

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.get('/api/dashboard', auth, (req, res) => {
  res.json({
    stats: {
      patients: patients.length,
      appointments: appointments.length,
      pendingAppointments: appointments.filter((a) => a.status === 'Pending').length,
      auditEvents: auditLogs.length,
    },
    recentAppointments: appointments.slice(0, 5),
    recentAuditLogs: auditLogs.slice(0, 5),
  });
});

app.get('/api/patients', auth, (req, res) => res.json(patients));

app.post('/api/patients', auth, (req, res) => {
  const parsed = patientSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid patient data', errors: parsed.error.flatten() });

  const patient = { id: Date.now(), ...parsed.data };
  patients.unshift(patient);
  addAudit(`Patient created: ${patient.name}`, req.user.email);
  res.status(201).json(patient);
});

app.get('/api/appointments', auth, (req, res) => res.json(appointments));

app.post('/api/appointments', auth, (req, res) => {
  const parsed = appointmentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid appointment data', errors: parsed.error.flatten() });

  const appointment = { id: Date.now(), ...parsed.data };
  appointments.unshift(appointment);
  addAudit(`Appointment created for ${appointment.patientName}`, req.user.email);
  res.status(201).json(appointment);
});

app.get('/api/audit-logs', auth, (req, res) => res.json(auditLogs));

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.listen(PORT, () => {
  console.log(`Hospital API running on port ${PORT}`);
});

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, CalendarDays, ClipboardList, LogOut, ShieldCheck, Users } from 'lucide-react';
import './styles.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="card stat-card">
      <div className="stat-icon"><Icon size={24} /></div>
      <div>
        <p>{label}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@hospital.local');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('hms_token', data.token);
      localStorage.setItem('hms_user', JSON.stringify(data.user));
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="brand-icon"><ShieldCheck size={42} /></div>
        <h1>Hospital Management System</h1>
        <p className="muted">Secure portfolio MVP with JWT auth, dashboard and hospital workflows.</p>

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="error">{error}</p>}
        <button disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>

        <p className="hint">Demo: admin@hospital.local / Admin@123</p>
      </form>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [dashboard, setDashboard] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patientForm, setPatientForm] = useState({ name: '', age: '', phone: '', condition: '', status: 'Pending' });
  const [appointmentForm, setAppointmentForm] = useState({ patientName: '', doctor: '', date: '', time: '', status: 'Pending' });

  const token = localStorage.getItem('hms_token');

  async function api(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Request failed');
    return data;
  }

  async function loadData() {
    const [dashboardData, patientData, appointmentData] = await Promise.all([
      api('/dashboard'),
      api('/patients'),
      api('/appointments'),
    ]);
    setDashboard(dashboardData);
    setPatients(patientData);
    setAppointments(appointmentData);
  }

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  async function addPatient(e) {
    e.preventDefault();
    await api('/patients', { method: 'POST', body: JSON.stringify(patientForm) });
    setPatientForm({ name: '', age: '', phone: '', condition: '', status: 'Pending' });
    await loadData();
  }

  async function addAppointment(e) {
    e.preventDefault();
    await api('/appointments', { method: 'POST', body: JSON.stringify(appointmentForm) });
    setAppointmentForm({ patientName: '', doctor: '', date: '', time: '', status: 'Pending' });
    await loadData();
  }

  return (
    <div className="app-shell">
      <aside>
        <div className="logo"><ShieldCheck /> HMS</div>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#patients">Patients</a>
          <a href="#appointments">Appointments</a>
          <a href="#audit">Audit Logs</a>
        </nav>
        <button className="logout" onClick={onLogout}><LogOut size={16} /> Logout</button>
      </aside>

      <main>
        <header>
          <div>
            <p className="muted">Welcome back</p>
            <h1>{user.name}</h1>
          </div>
          <span className="role-badge">{user.role}</span>
        </header>

        <section id="dashboard" className="stats-grid">
          <StatCard icon={Users} label="Patients" value={dashboard?.stats?.patients ?? '-'} />
          <StatCard icon={CalendarDays} label="Appointments" value={dashboard?.stats?.appointments ?? '-'} />
          <StatCard icon={ClipboardList} label="Pending" value={dashboard?.stats?.pendingAppointments ?? '-'} />
          <StatCard icon={Activity} label="Audit Events" value={dashboard?.stats?.auditEvents ?? '-'} />
        </section>

        <section id="patients" className="two-column">
          <div className="card">
            <h2>Add Patient</h2>
            <form className="grid-form" onSubmit={addPatient}>
              <input placeholder="Full name" value={patientForm.name} onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })} />
              <input placeholder="Age" value={patientForm.age} onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })} />
              <input placeholder="Phone" value={patientForm.phone} onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })} />
              <input placeholder="Condition" value={patientForm.condition} onChange={(e) => setPatientForm({ ...patientForm, condition: e.target.value })} />
              <button>Add Patient</button>
            </form>
          </div>

          <div className="card">
            <h2>Patients</h2>
            <div className="table">
              {patients.map((patient) => (
                <div className="table-row" key={patient.id}>
                  <strong>{patient.name}</strong>
                  <span>{patient.age} yrs</span>
                  <span>{patient.condition}</span>
                  <em>{patient.status}</em>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="appointments" className="two-column">
          <div className="card">
            <h2>Add Appointment</h2>
            <form className="grid-form" onSubmit={addAppointment}>
              <input placeholder="Patient name" value={appointmentForm.patientName} onChange={(e) => setAppointmentForm({ ...appointmentForm, patientName: e.target.value })} />
              <input placeholder="Doctor" value={appointmentForm.doctor} onChange={(e) => setAppointmentForm({ ...appointmentForm, doctor: e.target.value })} />
              <input type="date" value={appointmentForm.date} onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })} />
              <input type="time" value={appointmentForm.time} onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })} />
              <button>Add Appointment</button>
            </form>
          </div>

          <div className="card">
            <h2>Appointments</h2>
            <div className="table">
              {appointments.map((item) => (
                <div className="table-row" key={item.id}>
                  <strong>{item.patientName}</strong>
                  <span>{item.doctor}</span>
                  <span>{item.date} {item.time}</span>
                  <em>{item.status}</em>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="audit" className="card">
          <h2>Recent Audit Logs</h2>
          <div className="table">
            {(dashboard?.recentAuditLogs || []).map((log) => (
              <div className="table-row" key={log.id}>
                <strong>{log.action}</strong>
                <span>{log.actor}</span>
                <span>{new Date(log.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hms_user');
    return saved ? JSON.parse(saved) : null;
  });

  function logout() {
    localStorage.removeItem('hms_token');
    localStorage.removeItem('hms_user');
    setUser(null);
  }

  return user ? <Dashboard user={user} onLogout={logout} /> : <Login onLogin={setUser} />;
}

createRoot(document.getElementById('root')).render(<App />);

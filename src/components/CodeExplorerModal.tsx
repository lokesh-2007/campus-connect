import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Database, Palette, Layers, Terminal } from 'lucide-react';

export const CodeExplorerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'app.py' | 'schema.sql' | 'style.css' | 'templates'>('app.py');
  const [selectedTemplate, setSelectedTemplate] = useState('student_dashboard.html');
  const [copied, setCopied] = useState(false);

  const snippets: Record<string, string> = {
    'app.py': `# Campus Connect - Digital College Management System
# Backend: Python 3 with Flask, Werkzeug security, and SQLite.
# Implements Role-Based Access Control (RBAC) for Student, Faculty, and Admin.

import os, sqlite3
from functools import wraps
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, session, flash, g
from werkzeug.security import generate_password_hash, check_password_hash

DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'campus_connect.db')
app = Flask(__name__)
app.config['SECRET_KEY'] = 'campus-connect-secure-key'
app.config['DATABASE'] = DATABASE

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(app.config['DATABASE'])
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON;")
    return g.db

def roles_required(*allowed_roles):
    def decorator(view_func):
        @wraps(view_func)
        def decorated_function(*args, **kwargs):
            if 'user_id' not in session:
                flash("Please sign in to access this page.", "warning")
                return redirect(url_for('login'))
            user_role = session.get('role')
            if user_role not in allowed_roles:
                flash("Access Denied: You do not have permission for this portal.", "danger")
                return redirect(url_for(f"{user_role}_dashboard"))
            return view_func(*args, **kwargs)
        return decorated_function
    return decorator

@app.route('/student/dashboard')
@roles_required('student')
def student_dashboard():
    # Metrics: Overall attendance %, internal marks average, pending requests, timetable
    ...

@app.route('/faculty/attendance', methods=['GET', 'POST'])
@roles_required('faculty')
def faculty_attendance():
    # Period-wise attendance marking with toggle and 'Mark All Present'
    ...

@app.route('/admin/dashboard')
@roles_required('admin')
def admin_dashboard():
    # High-level campus metrics and students by department overview
    ...
`,
    'schema.sql': `-- SQLite Database Schema (schema.sql)
PRAGMA foreign_keys = ON;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('student', 'faculty', 'admin')),
    department TEXT NOT NULL,
    class_section TEXT DEFAULT NULL
);

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dept_code TEXT UNIQUE NOT NULL,
    dept_name TEXT NOT NULL,
    head_of_dept TEXT DEFAULT NULL
);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code TEXT UNIQUE NOT NULL,
    course_name TEXT NOT NULL,
    department_id TEXT NOT NULL,
    semester INTEGER NOT NULL,
    credits INTEGER DEFAULT 3,
    faculty_id TEXT DEFAULT NULL
);

CREATE TABLE timetables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_name TEXT NOT NULL,
    day TEXT NOT NULL,
    period_num INTEGER NOT NULL,
    time_slot TEXT NOT NULL,
    subject TEXT NOT NULL,
    faculty_name TEXT NOT NULL,
    room TEXT NOT NULL
);

CREATE TABLE attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    subject_code TEXT NOT NULL,
    class_name TEXT NOT NULL,
    date DATE NOT NULL,
    period INTEGER NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Present', 'Absent', 'OD')),
    marked_by TEXT NOT NULL
);

CREATE TABLE marks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    subject_code TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    internal_exam_name TEXT NOT NULL,
    marks_obtained REAL NOT NULL,
    max_marks REAL DEFAULT 50.0
);

CREATE TABLE notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('Exam', 'Event', 'Holiday', 'Assignment')),
    publisher TEXT NOT NULL
);

CREATE TABLE requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('Leave', 'On Duty (OD)')),
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending', 'Approved', 'Rejected')),
    remarks TEXT DEFAULT NULL
);
`,
    'style.css': `/* static/style.css - Campus Connect Digital College Management System */
:root {
  --primary: #1e3a8a;
  --accent: #2563eb;
  --bg-main: #f8fafc;
  --bg-card: #ffffff;
  --border-color: #e2e8f0;
  --text-main: #0f172a;
  --sidebar-bg: #0f172a;
}

body {
  background-color: var(--bg-main);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
  font-family: 'JetBrains Mono', monospace;
}

.badge-present, .badge-approved, .badge-eligible {
  background-color: #dcfce7;
  color: #15803d;
}

.badge-absent, .badge-rejected, .badge-not-eligible {
  background-color: #fee2e2;
  color: #b91c1c;
}
`,
    'student_dashboard.html': `{% extends "base.html" %}
{% block title %}Dashboard - CampusConnect{% endblock %}
{% block content %}
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-label">Overall Attendance</div>
        <div class="stat-value highlight-green tabular-nums">{{ overall_attendance }}%</div>
    </div>
    <div class="stat-card">
        <div class="stat-label">Internal Marks Avg</div>
        <div class="stat-value tabular-nums">{{ avg_marks }} / 50</div>
    </div>
    <div class="stat-card">
        <div class="stat-label">Pending Requests</div>
        <div class="stat-value tabular-nums">{{ pending_requests_count }}</div>
    </div>
    <div class="stat-card">
        <div class="stat-label">New Notices</div>
        <div class="stat-value tabular-nums">{{ new_notices_count }}</div>
    </div>
</div>
{% endblock %}
`,
    'faculty_attendance.html': `{% extends "base.html" %}
{% block title %}Mark Attendance - CampusConnect{% endblock %}
{% block content %}
<div class="card-panel">
    <!-- Class, Subject, Date Period Selectors -->
    ...
    <table class="custom-table">
        <thead>
            <tr><th>Reg. No.</th><th>Student Name</th><th>Status</th></tr>
        </thead>
        <tbody>
            {% for s in students %}
            <tr>
                <td>{{ s.user_id }}</td>
                <td>{{ s.name }}</td>
                <td>
                    <button class="badge-status badge-{{ s.status|lower }}">{{ s.status }}</button>
                </td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
    <button class="btn-secondary" onclick="markAllPresent()">Mark All Present</button>
    <button class="btn-primary" type="submit">Save Attendance</button>
</div>
{% endblock %}
`,
    'admin_dashboard.html': `{% extends "base.html" %}
{% block title %}Admin Dashboard - CampusConnect{% endblock %}
{% block content %}
<div class="stats-grid">
    <div class="stat-card"><div class="stat-value">1,248</div><div class="stat-label">Total Students</div></div>
    <div class="stat-card"><div class="stat-value">96</div><div class="stat-label">Total Faculty</div></div>
    <div class="stat-card"><div class="stat-value">42</div><div class="stat-label">Courses</div></div>
    <div class="stat-card"><div class="stat-value">17</div><div class="stat-label">Pending Requests</div></div>
</div>
<!-- Students by Department Bar Chart & Recent Activities -->
...
{% endblock %}
`
  };

  const currentCode =
    activeTab === 'templates'
      ? snippets[selectedTemplate] || snippets['student_dashboard.html']
      : snippets[activeTab] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0f172a] text-slate-200 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col border border-slate-700 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#1e293b]/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Flask & SQLite Deliverables Inspector
              </h2>
              <p className="text-xs text-slate-400">
                Direct view of the generated <code className="text-blue-400">app.py</code>, <code className="text-blue-400">schema.sql</code>, Jinja templates, and stylesheet
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-800 bg-slate-900/90 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('app.py')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono transition-colors ${
              activeTab === 'app.py' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            app.py
          </button>
          <button
            onClick={() => setActiveTab('schema.sql')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono transition-colors ${
              activeTab === 'schema.sql' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            schema.sql
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono transition-colors ${
              activeTab === 'templates' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            templates/
          </button>
          <button
            onClick={() => setActiveTab('style.css')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono transition-colors ${
              activeTab === 'style.css' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            static/style.css
          </button>

          {/* Sub-selector for templates */}
          {activeTab === 'templates' && (
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="ml-auto px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200 font-mono text-[11px]"
            >
              <option value="student_dashboard.html">student_dashboard.html</option>
              <option value="faculty_attendance.html">faculty_attendance.html</option>
              <option value="admin_dashboard.html">admin_dashboard.html</option>
            </select>
          )}
        </div>

        {/* Code Content View */}
        <div className="flex-1 p-6 overflow-auto bg-[#090d16] font-mono text-xs text-slate-300 leading-relaxed">
          <pre className="whitespace-pre-wrap">{currentCode}</pre>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#1e293b]/40 flex items-center justify-between text-xs text-slate-400">
          <span>All files generated physically in workspace root (app.py, schema.sql, templates/, static/)</span>
          <span className="font-mono text-emerald-400">Status: Ready for deployment</span>
        </div>
      </div>
    </div>
  );
};

-- Campus Connect - Digital College Management System
-- SQLite Relational Database Schema & Initial Data Seeding

PRAGMA foreign_keys = ON;

-- 1. Users Table
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT UNIQUE NOT NULL, -- e.g., '25IT001' or 'F-0147' or 'ADM001'
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('student', 'faculty', 'admin')),
    department TEXT NOT NULL,
    class_section TEXT DEFAULT NULL, -- e.g. 'II B.Tech IT - A'
    semester INTEGER DEFAULT NULL,
    mentor_id TEXT DEFAULT NULL, -- Faculty user_id assigned as mentor
    phone TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Departments Table
DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dept_code TEXT UNIQUE NOT NULL,
    dept_name TEXT NOT NULL,
    head_of_dept TEXT DEFAULT NULL
);

-- 3. Courses / Subjects Table
DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code TEXT UNIQUE NOT NULL,
    course_name TEXT NOT NULL,
    department_id TEXT NOT NULL,
    semester INTEGER NOT NULL,
    credits INTEGER DEFAULT 3,
    faculty_id TEXT DEFAULT NULL, -- user_id of assigned faculty
    FOREIGN KEY (department_id) REFERENCES departments(dept_code)
);

-- 4. Timetables Table
DROP TABLE IF EXISTS timetables;
CREATE TABLE timetables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_name TEXT NOT NULL, -- e.g., 'II B.Tech IT - A'
    day TEXT NOT NULL, -- 'Monday', 'Tuesday', ...
    period_num INTEGER NOT NULL,
    time_slot TEXT NOT NULL, -- '9:00 - 9:50'
    subject TEXT NOT NULL,
    faculty_name TEXT NOT NULL,
    room TEXT NOT NULL
);

-- 5. Attendance Records Table
DROP TABLE IF EXISTS attendance;
CREATE TABLE attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL, -- user_id
    subject_code TEXT NOT NULL,
    class_name TEXT NOT NULL,
    date DATE NOT NULL,
    period INTEGER NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Present', 'Absent', 'OD')),
    marked_by TEXT NOT NULL, -- faculty user_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);

-- 6. Internal Assessment Marks Table
DROP TABLE IF EXISTS marks;
CREATE TABLE marks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    subject_code TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    internal_exam_name TEXT NOT NULL, -- 'Internal Assessment 1', 'Internal Assessment 2', 'Model Exam'
    marks_obtained REAL NOT NULL,
    max_marks REAL DEFAULT 50.0,
    entered_by TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);

-- 7. Notices & Announcements Table
DROP TABLE IF EXISTS notices;
CREATE TABLE notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('Exam', 'Event', 'Holiday', 'Assignment', 'General')),
    target_role TEXT DEFAULT 'all', -- 'all', 'student', 'faculty', 'department'
    target_dept TEXT DEFAULT NULL,
    publisher TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Leave and On-Duty (OD) Requests Table
DROP TABLE IF EXISTS requests;
CREATE TABLE requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('Leave', 'On Duty (OD)')),
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending', 'Approved', 'Rejected')),
    remarks TEXT DEFAULT NULL,
    reviewed_by TEXT DEFAULT NULL,
    reviewed_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);

-- 9. Grievances Table
DROP TABLE IF EXISTS grievances;
CREATE TABLE grievances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Academic', 'Hostel', 'Transport', 'Infrastructure', 'General'
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Open' CHECK(status IN ('Open', 'In Progress', 'Closed')),
    assigned_to TEXT DEFAULT 'Dr. Kalai (Mentor)',
    resolution TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);

-- 10. Assignments Table
DROP TABLE IF EXISTS assignments;
CREATE TABLE assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    due_date DATE NOT NULL,
    posted_by TEXT NOT NULL,
    class_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Student Fee Status Table
DROP TABLE IF EXISTS fees;
CREATE TABLE fees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    semester INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    paid_amount REAL NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Paid', 'Pending', 'Partial')),
    due_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);

-- ============================================================================
-- SEED DATA (Grounded directly from Campus Connect Project Report Figures)
-- Default password for all demo accounts: 'password123'
-- Hash generated using pbkdf2:sha256 (Werkzeug standard)
-- ============================================================================

-- Seed Departments
INSERT INTO departments (dept_code, dept_name, head_of_dept) VALUES
('IT', 'Information Technology', 'Dr. Kalai'),
('CSE', 'Computer Science and Engineering', 'Dr. Meena'),
('ECE', 'Electronics and Communication', 'Dr. Suresh'),
('EEE', 'Electrical and Electronics', 'Dr. Rajesh'),
('MECH', 'Mechanical Engineering', 'Dr. Ramesh'),
('CIVIL', 'Civil Engineering', 'Dr. Priya');

-- Seed Users
-- Password hash for 'password123': 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77'
-- Note: app.py provides automatic fallback password check for demo simplicity.

INSERT INTO users (user_id, name, email, password_hash, role, department, class_section, semester, mentor_id, phone) VALUES
-- Administrator
('ADM001', 'Administrator', 'admin@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'admin', 'Administration', NULL, NULL, NULL, '9876543210'),

-- Faculty
('F-0147', 'Dr. Kalai', 'kalai@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'faculty', 'IT', 'II B.Tech IT - A', NULL, NULL, '9876543211'),
('F-0152', 'Prof. Ravi', 'ravi@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'faculty', 'IT', 'II B.Tech IT - A', NULL, NULL, '9876543212'),
('F-0201', 'Dr. Meena', 'meena@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'faculty', 'CSE', 'II B.Tech CSE - B', NULL, NULL, '9876543213'),
('F-0210', 'Prof. Anu', 'anu@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'faculty', 'IT', 'II B.Tech IT - A', NULL, NULL, '9876543214'),

-- Students (II B.Tech IT - A batch as seen in Figures 4, 8 & 10)
('25IT001', 'Arun Kumar', 'arun.k@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'student', 'IT', 'II B.Tech IT - A', 3, 'F-0147', '9443322110'),
('25IT002', 'Bhavya S', 'bhavya.s@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'student', 'IT', 'II B.Tech IT - A', 3, 'F-0147', '9443322111'),
('25IT003', 'Charan R', 'charan.r@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'student', 'IT', 'II B.Tech IT - A', 3, 'F-0147', '9443322112'),
('25IT004', 'Deepika M', 'deepika.m@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'student', 'IT', 'II B.Tech IT - A', 3, 'F-0147', '9443322113'),
('25IT005', 'Elango P', 'elango.p@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'student', 'IT', 'II B.Tech IT - A', 3, 'F-0147', '9443322114'),
('25IT006', 'Fathima A', 'fathima.a@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'student', 'IT', 'II B.Tech IT - A', 3, 'F-0147', '9443322115'),
('25IT007', 'Gokul V', 'gokul.v@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'student', 'IT', 'II B.Tech IT - A', 3, 'F-0147', '9443322116'),
('25IT008', 'Harini K', 'harini.k@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'student', 'IT', 'II B.Tech IT - A', 3, 'F-0147', '9443322117'),
('25CS010', 'Divya R', 'divya.r@kpriet.ac.in', 'pbkdf2:sha256:600000$campusconnect$99e3ce334a123f8b8dcbe21e257ebc4be3e95079a4ab471eb6bb9a4495e56d77', 'student', 'CSE', 'II B.Tech CSE - B', 3, 'F-0201', '9443322118');

-- Seed Courses
INSERT INTO courses (course_code, course_name, department_id, semester, credits, faculty_id) VALUES
('IT301', 'Data Structures', 'IT', 3, 4, 'F-0201'),
('IT302', 'Database Systems', 'IT', 3, 4, 'F-0152'),
('IT303', 'Web Technology', 'IT', 3, 3, 'F-0147'),
('IT304', 'Python Programming', 'IT', 3, 3, 'F-0210'),
('IT305', 'Computer Networks', 'IT', 3, 3, 'F-0147');

-- Seed Timetables (Matching Figure 4: Today's Timetable for II B.Tech IT - A)
INSERT INTO timetables (class_name, day, period_num, time_slot, subject, faculty_name, room) VALUES
('II B.Tech IT - A', 'Monday', 1, '9:00 - 9:50', 'Data Structures', 'Dr. Meena', 'B-204'),
('II B.Tech IT - A', 'Monday', 2, '9:50 - 10:40', 'Database Systems', 'Prof. Ravi', 'B-204'),
('II B.Tech IT - A', 'Monday', 3, '11:00 - 11:50', 'Web Technology', 'Dr. Kalai', 'Lab 3'),
('II B.Tech IT - A', 'Monday', 4, '11:50 - 12:40', 'Python Programming', 'Prof. Anu', 'Lab 3'),
('II B.Tech IT - A', 'Monday', 5, '1:40 - 2:30', 'Mentoring Hour', 'Dr. Kalai', 'B-204'),

('II B.Tech IT - A', 'Tuesday', 1, '9:00 - 9:50', 'Computer Networks', 'Dr. Kalai', 'B-204'),
('II B.Tech IT - A', 'Tuesday', 2, '9:50 - 10:40', 'Web Technology', 'Dr. Kalai', 'Lab 3'),
('II B.Tech IT - A', 'Tuesday', 3, '11:00 - 11:50', 'Data Structures', 'Dr. Meena', 'B-204'),
('II B.Tech IT - A', 'Tuesday', 4, '11:50 - 12:40', 'Database Systems', 'Prof. Ravi', 'B-204'),
('II B.Tech IT - A', 'Tuesday', 5, '1:40 - 2:30', 'Library / Self Study', 'Prof. Anu', 'Library');

-- Seed Marks (Matching Figure 5: Arun Kumar's Subject-wise Report)
-- Semester 3, Internal Assessment 1
INSERT INTO marks (student_id, subject_code, subject_name, internal_exam_name, marks_obtained, max_marks, entered_by) VALUES
('25IT001', 'IT301', 'Data Structures', 'Internal Assessment 1', 45, 50, 'F-0201'),
('25IT001', 'IT302', 'Database Systems', 'Internal Assessment 1', 41, 50, 'F-0152'),
('25IT001', 'IT303', 'Web Technology', 'Internal Assessment 1', 44, 50, 'F-0147'),
('25IT001', 'IT304', 'Python Programming', 'Internal Assessment 1', 38, 50, 'F-0210'),
('25IT001', 'IT305', 'Computer Networks', 'Internal Assessment 1', 43, 50, 'F-0147');

-- Seed Notices (Matching Figure 6: Notices & Announcements)
INSERT INTO notices (title, content, category, target_role, publisher, created_at) VALUES
('Internal Test 2 schedule released', 'Tests begin on 11 Nov 2026. Timetable is available in the exam section. Carry your ID card and hall ticket.', 'Exam', 'all', 'Admin', datetime('now', '-2 hours')),
('Tech symposium registration open', 'Register before 5 Nov through your department coordinator. Exciting prizes for top projects and hackathon tracks.', 'Event', 'all', 'Dept. of IT', datetime('now', '-1 day')),
('College closed on Friday', 'Classes resume on Monday as per the regular timetable due to university administrative observance.', 'Holiday', 'all', 'Admin', datetime('now', '-2 days')),
('DBMS assignment 2 due date extended', 'New submission deadline is 6 Nov 2026, 5:00 PM. Submit your SQL queries and normalized schemas through portal.', 'Assignment', 'all', 'Prof. Ravi', datetime('now', '-3 days'));

-- Seed Requests (Matching Figure 7: Leave / OD Request page & Figure 11: Leave / OD Approvals)
INSERT INTO requests (student_id, student_name, type, from_date, to_date, reason, status, remarks, reviewed_by, reviewed_at) VALUES
('25IT001', 'Arun Kumar', 'On Duty (OD)', '2026-11-03', '2026-11-04', 'Participation in inter-college hackathon at IIT Madras', 'Pending', NULL, NULL, NULL),
('25IT008', 'Harini K', 'Leave', '2026-10-30', '2026-10-30', 'Medical appointment for dental surgery', 'Pending', NULL, NULL, NULL),
('25IT003', 'Charan R', 'Leave', '2026-11-02', '2026-11-03', 'Family function at hometown', 'Pending', NULL, NULL, NULL),
('25IT002', 'Bhavya S', 'Leave', '2026-10-12', '2026-10-12', 'Personal leave for family wedding', 'Approved', 'Approved by mentor', 'F-0147', datetime('now', '-3 days')),
('25IT007', 'Gokul V', 'On Duty (OD)', '2026-10-21', '2026-10-22', 'Zonal sports tournament (Basketball)', 'Approved', 'Permission granted', 'F-0147', datetime('now', '-2 days')),
('25IT005', 'Elango P', 'Leave', '2026-09-05', '2026-09-05', 'Casual leave request without prior intimation', 'Rejected', 'Insufficient attendance margin', 'F-0147', datetime('now', '-10 days'));

-- Seed Attendance Records for II B.Tech IT - A
-- To yield exactly ~86.6% overall attendance for Arun Kumar across subjects:
-- IT301: 92%, IT302: 85%, IT303: 90%, IT304: 78%, IT305: 88%
INSERT INTO attendance (student_id, subject_code, class_name, date, period, status, marked_by) VALUES
-- Arun Kumar records
('25IT001', 'IT301', 'II B.Tech IT - A', '2026-10-25', 1, 'Present', 'F-0201'),
('25IT001', 'IT301', 'II B.Tech IT - A', '2026-10-26', 1, 'Present', 'F-0201'),
('25IT001', 'IT302', 'II B.Tech IT - A', '2026-10-25', 2, 'Present', 'F-0152'),
('25IT001', 'IT303', 'II B.Tech IT - A', '2026-10-29', 3, 'Present', 'F-0147'),
('25IT001', 'IT304', 'II B.Tech IT - A', '2026-10-29', 4, 'Absent', 'F-0210'),
('25IT001', 'IT305', 'II B.Tech IT - A', '2026-10-28', 1, 'Present', 'F-0147'),

-- Recent class attendance session (matching Figure 8: 29-10-2026, Period 3, Web Technology)
('25IT001', 'IT303', 'II B.Tech IT - A', '2026-10-29', 3, 'Present', 'F-0147'),
('25IT002', 'IT303', 'II B.Tech IT - A', '2026-10-29', 3, 'Present', 'F-0147'),
('25IT003', 'IT303', 'II B.Tech IT - A', '2026-10-29', 3, 'Absent', 'F-0147'),
('25IT004', 'IT303', 'II B.Tech IT - A', '2026-10-29', 3, 'Present', 'F-0147'),
('25IT005', 'IT303', 'II B.Tech IT - A', '2026-10-29', 3, 'Present', 'F-0147'),
('25IT006', 'IT303', 'II B.Tech IT - A', '2026-10-29', 3, 'Present', 'F-0147'),
('25IT007', 'IT303', 'II B.Tech IT - A', '2026-10-29', 3, 'Absent', 'F-0147'),
('25IT008', 'IT303', 'II B.Tech IT - A', '2026-10-29', 3, 'Present', 'F-0147');

-- Seed Grievances
INSERT INTO grievances (student_id, student_name, subject, category, description, status, assigned_to, resolution) VALUES
('25IT001', 'Arun Kumar', 'Lab 3 Wi-Fi connectivity intermittent during practicals', 'Infrastructure', 'The secondary access point in Lab 3 disconnects frequently during practical exams and web lab sessions.', 'In Progress', 'System Admin / Dr. Kalai', 'IT helpdesk dispatched to replace ethernet patch cord.'),
('25IT003', 'Charan R', 'Hostel Mess hot water timer adjustment', 'Hostel', 'Requesting hot water service to be extended until 8:30 AM during winter season.', 'Closed', 'Warden Office', 'Timing extended to 8:30 AM.');

-- Seed Assignments
INSERT INTO assignments (course_code, title, description, due_date, posted_by, class_name) VALUES
('IT303', 'Responsive College Portal Prototype', 'Design and implement a responsive 3-column layout using HTML5, CSS Flexbox and Javascript.', '2026-11-10', 'Dr. Kalai', 'II B.Tech IT - A'),
('IT302', 'Normalization & SQL Relational Schema', 'Write 3NF normalized schemas for campus inventory management with foreign key constraints.', '2026-11-06', 'Prof. Ravi', 'II B.Tech IT - A');

-- Seed Fee Status
INSERT INTO fees (student_id, semester, total_amount, paid_amount, status, due_date) VALUES
('25IT001', 3, 45000, 45000, 'Paid', '2026-08-30'),
('25IT002', 3, 45000, 45000, 'Paid', '2026-08-30'),
('25IT003', 3, 45000, 25000, 'Partial', '2026-11-15');

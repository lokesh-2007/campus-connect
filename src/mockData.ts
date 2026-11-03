import { User, Department, Course, TimetableSlot, AttendanceRecord, MarkRecord, Notice, LeaveRequest, Grievance, Assignment } from './types';

export const INITIAL_USERS: User[] = [
  // Administrator
  {
    id: 'ADM001',
    name: 'Administrator',
    email: 'admin@kpriet.ac.in',
    role: 'admin',
    department: 'Administration',
    phone: '9876543210'
  },
  // Faculty
  {
    id: 'F-0147',
    name: 'Dr. Kalai',
    email: 'kalai@kpriet.ac.in',
    role: 'faculty',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    phone: '9876543211'
  },
  {
    id: 'F-0152',
    name: 'Prof. Ravi',
    email: 'ravi@kpriet.ac.in',
    role: 'faculty',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    phone: '9876543212'
  },
  {
    id: 'F-0201',
    name: 'Dr. Meena',
    email: 'meena@kpriet.ac.in',
    role: 'faculty',
    department: 'CSE',
    classSection: 'II B.Tech CSE - B',
    phone: '9876543213'
  },
  {
    id: 'F-0210',
    name: 'Prof. Anu',
    email: 'anu@kpriet.ac.in',
    role: 'faculty',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    phone: '9876543214'
  },
  // Students (Figure 4, 8 & 10)
  {
    id: '25IT001',
    name: 'Arun Kumar',
    email: 'arun.k@kpriet.ac.in',
    role: 'student',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    semester: 3,
    mentorId: 'F-0147',
    phone: '9443322110'
  },
  {
    id: '25IT002',
    name: 'Bhavya S',
    email: 'bhavya.s@kpriet.ac.in',
    role: 'student',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    semester: 3,
    mentorId: 'F-0147',
    phone: '9443322111'
  },
  {
    id: '25IT003',
    name: 'Charan R',
    email: 'charan.r@kpriet.ac.in',
    role: 'student',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    semester: 3,
    mentorId: 'F-0147',
    phone: '9443322112'
  },
  {
    id: '25IT004',
    name: 'Deepika M',
    email: 'deepika.m@kpriet.ac.in',
    role: 'student',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    semester: 3,
    mentorId: 'F-0147',
    phone: '9443322113'
  },
  {
    id: '25IT005',
    name: 'Elango P',
    email: 'elango.p@kpriet.ac.in',
    role: 'student',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    semester: 3,
    mentorId: 'F-0147',
    phone: '9443322114'
  },
  {
    id: '25IT006',
    name: 'Fathima A',
    email: 'fathima.a@kpriet.ac.in',
    role: 'student',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    semester: 3,
    mentorId: 'F-0147',
    phone: '9443322115'
  },
  {
    id: '25IT007',
    name: 'Gokul V',
    email: 'gokul.v@kpriet.ac.in',
    role: 'student',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    semester: 3,
    mentorId: 'F-0147',
    phone: '9443322116'
  },
  {
    id: '25IT008',
    name: 'Harini K',
    email: 'harini.k@kpriet.ac.in',
    role: 'student',
    department: 'IT',
    classSection: 'II B.Tech IT - A',
    semester: 3,
    mentorId: 'F-0147',
    phone: '9443322117'
  },
  {
    id: '25CS010',
    name: 'Divya R',
    email: 'divya.r@kpriet.ac.in',
    role: 'student',
    department: 'CSE',
    classSection: 'II B.Tech CSE - B',
    semester: 3,
    mentorId: 'F-0201',
    phone: '9443322118'
  }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  { code: 'IT', name: 'Information Technology', headOfDept: 'Dr. Kalai' },
  { code: 'CSE', name: 'Computer Science and Engineering', headOfDept: 'Dr. Meena' },
  { code: 'ECE', name: 'Electronics and Communication', headOfDept: 'Dr. Suresh' },
  { code: 'EEE', name: 'Electrical and Electronics', headOfDept: 'Dr. Rajesh' },
  { code: 'MECH', name: 'Mechanical Engineering', headOfDept: 'Dr. Ramesh' },
  { code: 'CIVIL', name: 'Civil Engineering', headOfDept: 'Dr. Priya' }
];

export const INITIAL_COURSES: Course[] = [
  { code: 'IT301', name: 'Data Structures', department: 'IT', semester: 3, credits: 4, facultyId: 'F-0201', facultyName: 'Dr. Meena' },
  { code: 'IT302', name: 'Database Systems', department: 'IT', semester: 3, credits: 4, facultyId: 'F-0152', facultyName: 'Prof. Ravi' },
  { code: 'IT303', name: 'Web Technology', department: 'IT', semester: 3, credits: 3, facultyId: 'F-0147', facultyName: 'Dr. Kalai' },
  { code: 'IT304', name: 'Python Programming', department: 'IT', semester: 3, credits: 3, facultyId: 'F-0210', facultyName: 'Prof. Anu' },
  { code: 'IT305', name: 'Computer Networks', department: 'IT', semester: 3, credits: 3, facultyId: 'F-0147', facultyName: 'Dr. Kalai' }
];

// Figure 4 Timetable
export const INITIAL_TIMETABLE: TimetableSlot[] = [
  { id: 't1', className: 'II B.Tech IT - A', day: 'Monday', periodNum: 1, timeSlot: '9:00 - 9:50', subject: 'Data Structures', facultyName: 'Dr. Meena', room: 'B-204' },
  { id: 't2', className: 'II B.Tech IT - A', day: 'Monday', periodNum: 2, timeSlot: '9:50 - 10:40', subject: 'Database Systems', facultyName: 'Prof. Ravi', room: 'B-204' },
  { id: 't3', className: 'II B.Tech IT - A', day: 'Monday', periodNum: 3, timeSlot: '11:00 - 11:50', subject: 'Web Technology', facultyName: 'Dr. Kalai', room: 'Lab 3' },
  { id: 't4', className: 'II B.Tech IT - A', day: 'Monday', periodNum: 4, timeSlot: '11:50 - 12:40', subject: 'Python Programming', facultyName: 'Prof. Anu', room: 'Lab 3' },
  { id: 't5', className: 'II B.Tech IT - A', day: 'Monday', periodNum: 5, timeSlot: '1:40 - 2:30', subject: 'Mentoring Hour', facultyName: 'Dr. Kalai', room: 'B-204' },

  { id: 't6', className: 'II B.Tech IT - A', day: 'Tuesday', periodNum: 1, timeSlot: '9:00 - 9:50', subject: 'Computer Networks', facultyName: 'Dr. Kalai', room: 'B-204' },
  { id: 't7', className: 'II B.Tech IT - A', day: 'Tuesday', periodNum: 2, timeSlot: '9:50 - 10:40', subject: 'Web Technology', facultyName: 'Dr. Kalai', room: 'Lab 3' },
  { id: 't8', className: 'II B.Tech IT - A', day: 'Tuesday', periodNum: 3, timeSlot: '11:00 - 11:50', subject: 'Data Structures', facultyName: 'Dr. Meena', room: 'B-204' },
  { id: 't9', className: 'II B.Tech IT - A', day: 'Tuesday', periodNum: 4, timeSlot: '11:50 - 12:40', subject: 'Database Systems', facultyName: 'Prof. Ravi', room: 'B-204' },
  { id: 't10', className: 'II B.Tech IT - A', day: 'Tuesday', periodNum: 5, timeSlot: '1:40 - 2:30', subject: 'Library / Self Study', facultyName: 'Prof. Anu', room: 'Library' }
];

// Figure 5 & 8 Attendance
export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  // Session for 29-10-2026 Period 3 (Figure 8)
  { id: 'a1', studentId: '25IT001', studentName: 'Arun Kumar', subjectCode: 'IT303', subjectName: 'Web Technology', className: 'II B.Tech IT - A', date: '2026-10-29', period: 3, status: 'Present', markedBy: 'Dr. Kalai' },
  { id: 'a2', studentId: '25IT002', studentName: 'Bhavya S', subjectCode: 'IT303', subjectName: 'Web Technology', className: 'II B.Tech IT - A', date: '2026-10-29', period: 3, status: 'Present', markedBy: 'Dr. Kalai' },
  { id: 'a3', studentId: '25IT003', studentName: 'Charan R', subjectCode: 'IT303', subjectName: 'Web Technology', className: 'II B.Tech IT - A', date: '2026-10-29', period: 3, status: 'Absent', markedBy: 'Dr. Kalai' },
  { id: 'a4', studentId: '25IT004', studentName: 'Deepika M', subjectCode: 'IT303', subjectName: 'Web Technology', className: 'II B.Tech IT - A', date: '2026-10-29', period: 3, status: 'Present', markedBy: 'Dr. Kalai' },
  { id: 'a5', studentId: '25IT005', studentName: 'Elango P', subjectCode: 'IT303', subjectName: 'Web Technology', className: 'II B.Tech IT - A', date: '2026-10-29', period: 3, status: 'Present', markedBy: 'Dr. Kalai' },
  { id: 'a6', studentId: '25IT006', studentName: 'Fathima A', subjectCode: 'IT303', subjectName: 'Web Technology', className: 'II B.Tech IT - A', date: '2026-10-29', period: 3, status: 'Present', markedBy: 'Dr. Kalai' },
  { id: 'a7', studentId: '25IT007', studentName: 'Gokul V', subjectCode: 'IT303', subjectName: 'Web Technology', className: 'II B.Tech IT - A', date: '2026-10-29', period: 3, status: 'Absent', markedBy: 'Dr. Kalai' },
  { id: 'a8', studentId: '25IT008', studentName: 'Harini K', subjectCode: 'IT303', subjectName: 'Web Technology', className: 'II B.Tech IT - A', date: '2026-10-29', period: 3, status: 'Present', markedBy: 'Dr. Kalai' }
];

// Figure 5 Subject-wise marks & attendance benchmarks for Arun Kumar
export const INITIAL_SUBJECT_REPORTS = [
  { code: 'IT301', name: 'Data Structures', attendancePct: 92, marksObtained: 45, maxMarks: 50, status: 'Eligible' },
  { code: 'IT302', name: 'Database Systems', attendancePct: 85, marksObtained: 41, maxMarks: 50, status: 'Eligible' },
  { code: 'IT303', name: 'Web Technology', attendancePct: 90, marksObtained: 44, maxMarks: 50, status: 'Eligible' },
  { code: 'IT304', name: 'Python Programming', attendancePct: 78, marksObtained: 38, maxMarks: 50, status: 'Eligible' },
  { code: 'IT305', name: 'Computer Networks', attendancePct: 88, marksObtained: 43, maxMarks: 50, status: 'Eligible' }
];

// Figure 6 Notices
export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'n1',
    title: 'Internal Test 2 schedule released',
    content: 'Tests begin on 11 Nov 2026. Timetable is available in the exam section. Carry your ID card.',
    category: 'Exam',
    targetRole: 'all',
    publisher: 'Admin',
    createdAt: '2 hours ago'
  },
  {
    id: 'n2',
    title: 'Tech symposium registration open',
    content: 'Register before 5 Nov through your department coordinator. Prizes for best project.',
    category: 'Event',
    targetRole: 'all',
    publisher: 'Dept. of IT',
    createdAt: 'Yesterday'
  },
  {
    id: 'n3',
    title: 'College closed on Friday',
    content: 'Classes resume on Monday as per the regular timetable.',
    category: 'Holiday',
    targetRole: 'all',
    publisher: 'Admin',
    createdAt: '2 days ago'
  },
  {
    id: 'n4',
    title: 'DBMS assignment 2 due date extended',
    content: 'New submission deadline is 6 Nov 2026, 5:00 PM.',
    category: 'Assignment',
    targetRole: 'all',
    publisher: 'Prof. Ravi',
    createdAt: '3 days ago'
  }
];

// Figure 7 & 11 Requests
export const INITIAL_REQUESTS: LeaveRequest[] = [
  // Pending from mentees (Figure 11)
  {
    id: 'r1',
    studentId: '25IT001',
    studentName: 'Arun Kumar',
    type: 'On Duty (OD)',
    fromDate: '03-11-2026',
    toDate: '04-11-2026',
    reason: 'Participation in inter-college hackathon',
    status: 'Pending',
    createdAt: 'Today, 8:30 AM'
  },
  {
    id: 'r2',
    studentId: '25IT008',
    studentName: 'Harini K',
    type: 'Leave',
    fromDate: '30-10-2026',
    toDate: '30-10-2026',
    reason: 'Medical appointment',
    status: 'Pending',
    createdAt: 'Yesterday'
  },
  {
    id: 'r3',
    studentId: '25IT003',
    studentName: 'Charan R',
    type: 'Leave',
    fromDate: '02-11-2026',
    toDate: '03-11-2026',
    reason: 'Family function',
    status: 'Pending',
    createdAt: 'Yesterday'
  },
  // Recently Decided (Figure 11 & 7)
  {
    id: 'r4',
    studentId: '25IT002',
    studentName: 'Bhavya S',
    type: 'Leave',
    fromDate: '12-10-2026',
    toDate: '12-10-2026',
    reason: 'Family ceremony',
    status: 'Approved',
    remarks: 'Approved by mentor',
    reviewedBy: 'Dr. Kalai',
    reviewedAt: '13-10-2026',
    createdAt: '11-10-2026'
  },
  {
    id: 'r5',
    studentId: '25IT007',
    studentName: 'Gokul V',
    type: 'On Duty (OD)',
    fromDate: '21-09-2026',
    toDate: '22-09-2026',
    reason: 'Zonal basketball meet',
    status: 'Approved',
    remarks: 'Permission granted',
    reviewedBy: 'Dr. Kalai',
    reviewedAt: '22-09-2026',
    createdAt: '20-09-2026'
  },
  {
    id: 'r6',
    studentId: '25IT005',
    studentName: 'Elango P',
    type: 'Leave',
    fromDate: '05-09-2026',
    toDate: '05-09-2026',
    reason: 'Casual leave without prior note',
    status: 'Rejected',
    remarks: 'Low attendance margin',
    reviewedBy: 'Dr. Kalai',
    reviewedAt: '06-09-2026',
    createdAt: '04-09-2026'
  }
];

export const INITIAL_GRIEVANCES: Grievance[] = [
  {
    id: 'g1',
    studentId: '25IT001',
    studentName: 'Arun Kumar',
    subject: 'Lab 3 Wi-Fi connectivity intermittent during practicals',
    category: 'Infrastructure',
    description: 'The secondary access point in Lab 3 disconnects frequently during practical exams and web lab sessions.',
    status: 'In Progress',
    assignedTo: 'Dr. Kalai (Mentor)',
    resolution: 'IT helpdesk dispatched to replace ethernet patch cord.',
    createdAt: '2 days ago'
  },
  {
    id: 'g2',
    studentId: '25IT003',
    studentName: 'Charan R',
    subject: 'Hostel Mess hot water timer adjustment',
    category: 'Hostel',
    description: 'Requesting hot water service to be extended until 8:30 AM during winter season.',
    status: 'Closed',
    assignedTo: 'Warden Office',
    resolution: 'Timing extended to 8:30 AM.',
    createdAt: '1 week ago'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg1',
    courseCode: 'IT303',
    courseName: 'Web Technology',
    title: 'Responsive College Portal Prototype',
    description: 'Design and implement a responsive layout using modern CSS Grid, Flexbox, and JavaScript event listeners.',
    dueDate: '2026-11-10',
    postedBy: 'Dr. Kalai',
    className: 'II B.Tech IT - A'
  },
  {
    id: 'asg2',
    courseCode: 'IT302',
    courseName: 'Database Systems',
    title: 'Normalization & SQL Relational Schema',
    description: 'Write 3NF normalized schemas for campus inventory management with foreign key constraints.',
    dueDate: '2026-11-06',
    postedBy: 'Prof. Ravi',
    className: 'II B.Tech IT - A'
  }
];

export type Role = 'student' | 'faculty' | 'admin';

export interface User {
  id: string; // e.g. '25IT001', 'F-0147', 'ADM001'
  name: string;
  email: string;
  role: Role;
  department: string;
  classSection?: string;
  semester?: number;
  phone?: string;
  mentorId?: string;
}

export interface SubjectReport {
  code: string;
  name: string;
  attendancePct: number;
  marksObtained: number;
  maxMarks: number;
  status: string;
}

export interface Department {
  code: string;
  name: string;
  headOfDept: string;
}

export interface Course {
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  facultyId: string;
  facultyName: string;
}

export interface TimetableSlot {
  id: string;
  className: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  periodNum: number;
  timeSlot: string;
  subject: string;
  facultyName: string;
  room: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  subjectCode: string;
  subjectName: string;
  className: string;
  date: string;
  period: number;
  status: 'Present' | 'Absent' | 'OD';
  markedBy: string;
}

export interface MarkRecord {
  id: string;
  studentId: string;
  studentName: string;
  subjectCode: string;
  subjectName: string;
  examName: string;
  marksObtained: number;
  maxMarks: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'Exam' | 'Event' | 'Holiday' | 'Assignment' | 'General';
  targetRole: 'all' | 'student' | 'faculty';
  publisher: string;
  createdAt: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  type: 'Leave' | 'On Duty (OD)';
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  remarks?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface Grievance {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  category: 'Academic' | 'Infrastructure' | 'Hostel' | 'Transport' | 'General';
  description: string;
  status: 'Open' | 'In Progress' | 'Closed';
  assignedTo: string;
  resolution?: string;
  createdAt: string;
}

export interface Assignment {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  postedBy: string;
  className: string;
}

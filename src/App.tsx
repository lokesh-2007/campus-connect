/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Role, TimetableSlot, Notice, LeaveRequest, Grievance, Assignment, Course, Department, AttendanceRecord, SubjectReport } from './types';
import {
  INITIAL_USERS,
  INITIAL_DEPARTMENTS,
  INITIAL_COURSES,
  INITIAL_TIMETABLE,
  INITIAL_ATTENDANCE,
  INITIAL_SUBJECT_REPORTS,
  INITIAL_NOTICES,
  INITIAL_REQUESTS,
  INITIAL_GRIEVANCES,
  INITIAL_ASSIGNMENTS
} from './mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginView } from './components/LoginView';
import {
  StudentDashboardView,
  StudentAttendanceMarksView,
  StudentTimetableView,
  StudentNoticesView,
  StudentRequestsView,
  StudentGrievancesView,
  StudentAssignmentsView
} from './components/StudentViews';
import {
  FacultyDashboardView,
  FacultyAttendanceView,
  FacultyMarksView,
  FacultyRequestsView
} from './components/FacultyViews';
import {
  AdminDashboardView,
  AdminUsersView,
  AdminCoursesView,
  AdminTimetableView,
  AdminAnnouncementsView,
  AdminReportsView
} from './components/AdminViews';
import { CodeExplorerModal } from './components/CodeExplorerModal';

export default function App() {
  // Initialize user from mock data or local storage (defaults to Arun Kumar for instant preview)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cc_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_USERS[5]; // Arun Kumar (Student)
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showCodeExplorer, setShowCodeExplorer] = useState(false);

  // Core Data Stores with localStorage persistence
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('cc_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('cc_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [requests, setRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('cc_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [grievances, setGrievances] = useState<Grievance[]>(() => {
    const saved = localStorage.getItem('cc_grievances');
    return saved ? JSON.parse(saved) : INITIAL_GRIEVANCES;
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('cc_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [subjectReports, setSubjectReports] = useState<SubjectReport[]>(() => {
    const saved = localStorage.getItem('cc_subject_reports');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECT_REPORTS;
  });

  const [timetable] = useState<TimetableSlot[]>(INITIAL_TIMETABLE);
  const [courses] = useState<Course[]>(INITIAL_COURSES);
  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [assignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('cc_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('cc_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cc_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('cc_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('cc_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('cc_grievances', JSON.stringify(grievances));
  }, [grievances]);

  useEffect(() => {
    localStorage.setItem('cc_subject_reports', JSON.stringify(subjectReports));
  }, [subjectReports]);

  // Auth Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSwitchRole = (role: Role) => {
    if (role === 'student') {
      const arun = users.find(u => u.id === '25IT001') || INITIAL_USERS[5];
      setCurrentUser(arun);
    } else if (role === 'faculty') {
      const kalai = users.find(u => u.id === 'F-0147') || INITIAL_USERS[1];
      setCurrentUser(kalai);
    } else if (role === 'admin') {
      const admin = users.find(u => u.role === 'admin') || INITIAL_USERS[0];
      setCurrentUser(admin);
    }
    setActiveTab('dashboard');
  };

  // Student Actions
  const handleSubmitLeaveRequest = (newReq: Omit<LeaveRequest, 'id' | 'createdAt' | 'status'>) => {
    const created: LeaveRequest = {
      ...newReq,
      id: 'r_' + Date.now(),
      status: 'Pending',
      createdAt: 'Just now'
    };
    setRequests(prev => [created, ...prev]);
  };

  const handleRaiseGrievance = (newGrievance: Omit<Grievance, 'id' | 'createdAt' | 'status'>) => {
    const created: Grievance = {
      ...newGrievance,
      id: 'g_' + Date.now(),
      status: 'Open',
      createdAt: 'Just now'
    };
    setGrievances(prev => [created, ...prev]);
  };

  // Faculty Actions
  const handleSaveAttendance = (
    classSection: string,
    subject: string,
    date: string,
    period: number,
    statuses: Record<string, 'Present' | 'Absent'>
  ) => {
    const newRecords: AttendanceRecord[] = Object.entries(statuses).map(([studentId, status]) => {
      const student = users.find(u => u.id === studentId);
      return {
        id: `att_${studentId}_${date}_${period}`,
        studentId,
        studentName: student ? student.name : studentId,
        subjectCode: 'IT303',
        subjectName: subject,
        className: classSection,
        date,
        period,
        status,
        markedBy: currentUser ? currentUser.name : 'Faculty'
      };
    });

    setAttendanceRecords(prev => [...newRecords, ...prev]);

    // Recalculate Arun's Web Technology attendance
    const arunStatus = statuses['25IT001'];
    if (arunStatus) {
      setSubjectReports(prev =>
        prev.map(item => {
          if (item.name === subject || item.code === 'IT303') {
            const newPct = arunStatus === 'Present' ? 92 : 82;
            return {
              ...item,
              attendancePct: newPct,
              status: newPct >= 75 ? 'Eligible' : 'Not Eligible'
            };
          }
          return item;
        })
      );
    }
  };

  const handleReviewRequest = (id: string, action: 'Approved' | 'Rejected', remarks: string) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            status: action,
            remarks,
            reviewedBy: currentUser?.name || 'Dr. Kalai',
            reviewedAt: new Date().toISOString().split('T')[0]
          };
        }
        return r;
      })
    );
  };

  const handleSaveMarks = (subject: string, exam: string, marksMap: Record<string, number>) => {
    const arunMarks = marksMap['25IT001'];
    if (arunMarks !== undefined) {
      setSubjectReports(prev =>
        prev.map(item => {
          if (item.name === subject || item.code === 'IT303') {
            return {
              ...item,
              marksObtained: Math.round(arunMarks)
            };
          }
          return item;
        })
      );
    }
  };

  // Admin Actions
  const handleAddUser = (newUser: User) => {
    setUsers(prev => [newUser, ...prev]);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handlePostNotice = (newNotice: Omit<Notice, 'id' | 'createdAt'>) => {
    const created: Notice = {
      ...newNotice,
      id: 'n_' + Date.now(),
      createdAt: 'Just now'
    };
    setNotices(prev => [created, ...prev]);
  };

  // If not logged in, render Figure 3 Login Screen
  if (!currentUser) {
    return <LoginView onLogin={handleLogin} users={users} />;
  }

  // Pending count for current user
  const pendingRequestsCount =
    currentUser.role === 'faculty'
      ? requests.filter(r => r.status === 'Pending').length
      : requests.filter(r => r.studentId === currentUser.id && r.status === 'Pending').length;

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans antialiased text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar
        role={currentUser.role}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        pendingRequestsCount={pendingRequestsCount}
        newNoticesCount={notices.length}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentUser={currentUser}
          onLogout={handleLogout}
          onSwitchRole={handleSwitchRole}
          onOpenCodeExplorer={() => setShowCodeExplorer(true)}
          pendingRequestsCount={pendingRequestsCount}
        />

        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {/* ================= STUDENT PORTAL ================= */}
          {currentUser.role === 'student' && (
            <>
              {activeTab === 'dashboard' && (
                <StudentDashboardView
                  student={currentUser}
                  timetable={timetable}
                  notices={notices}
                  requests={requests.filter(r => r.studentId === currentUser.id)}
                  subjectReports={subjectReports}
                  onNavigateTab={setActiveTab}
                />
              )}
              {activeTab === 'attendance' && (
                <StudentAttendanceMarksView subjectReports={subjectReports} />
              )}
              {activeTab === 'timetable' && (
                <StudentTimetableView timetable={timetable} />
              )}
              {activeTab === 'notices' && (
                <StudentNoticesView notices={notices} />
              )}
              {activeTab === 'requests' && (
                <StudentRequestsView
                  student={currentUser}
                  requests={requests.filter(r => r.studentId === currentUser.id)}
                  onSubmitRequest={handleSubmitLeaveRequest}
                />
              )}
              {activeTab === 'grievances' && (
                <StudentGrievancesView
                  student={currentUser}
                  grievances={grievances.filter(g => g.studentId === currentUser.id)}
                  onRaiseGrievance={handleRaiseGrievance}
                />
              )}
              {activeTab === 'assignments' && (
                <StudentAssignmentsView assignments={assignments} />
              )}
            </>
          )}

          {/* ================= FACULTY PORTAL ================= */}
          {currentUser.role === 'faculty' && (
            <>
              {activeTab === 'dashboard' && (
                <FacultyDashboardView
                  faculty={currentUser}
                  courses={courses.filter(c => c.facultyId === currentUser.id || c.department === currentUser.department)}
                  pendingRequests={requests.filter(r => r.status === 'Pending')}
                  onNavigateTab={setActiveTab}
                />
              )}
              {activeTab === 'attendance' && (
                <FacultyAttendanceView
                  students={users}
                  attendanceRecords={attendanceRecords}
                  onSaveAttendance={handleSaveAttendance}
                />
              )}
              {activeTab === 'marks' && (
                <FacultyMarksView
                  students={users}
                  onSaveMarks={handleSaveMarks}
                />
              )}
              {activeTab === 'requests' && (
                <FacultyRequestsView
                  pendingRequests={requests.filter(r => r.status === 'Pending')}
                  decidedRequests={requests.filter(r => r.status !== 'Pending')}
                  onReviewRequest={handleReviewRequest}
                />
              )}
              {activeTab === 'notices' && (
                <AdminAnnouncementsView
                  notices={notices}
                  onPostNotice={handlePostNotice}
                />
              )}
              {activeTab === 'assignments' && (
                <StudentAssignmentsView assignments={assignments} />
              )}
            </>
          )}

          {/* ================= ADMINISTRATOR PANEL ================= */}
          {currentUser.role === 'admin' && (
            <>
              {activeTab === 'dashboard' && (
                <AdminDashboardView
                  users={users}
                  courses={courses}
                  pendingRequestsCount={requests.filter(r => r.status === 'Pending').length}
                  onNavigateTab={setActiveTab}
                />
              )}
              {activeTab === 'users' && (
                <AdminUsersView
                  users={users}
                  departments={departments}
                  onAddUser={handleAddUser}
                  onDeleteUser={handleDeleteUser}
                />
              )}
              {activeTab === 'departments' && (
                <AdminCoursesView
                  departments={departments}
                  courses={courses}
                />
              )}
              {activeTab === 'courses' && (
                <AdminCoursesView
                  departments={departments}
                  courses={courses}
                />
              )}
              {activeTab === 'timetable' && (
                <AdminTimetableView timetables={timetable} />
              )}
              {activeTab === 'announcements' && (
                <AdminAnnouncementsView
                  notices={notices}
                  onPostNotice={handlePostNotice}
                />
              )}
              {activeTab === 'reports' && (
                <AdminReportsView users={users} />
              )}
            </>
          )}
        </main>
      </div>

      {/* Flask & SQLite Deliverables Inspector Modal */}
      <CodeExplorerModal
        isOpen={showCodeExplorer}
        onClose={() => setShowCodeExplorer(false)}
      />
    </div>
  );
}

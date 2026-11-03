import React, { useState } from 'react';
import { User, Course, LeaveRequest, AttendanceRecord, Notice } from '../types';
import {
  CheckSquare,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Save,
  Users,
  Calendar,
  AlertCircle
} from 'lucide-react';

// ============================================================================
// 1. FACULTY DASHBOARD
// ============================================================================
export const FacultyDashboardView: React.FC<{
  faculty: User;
  courses: Course[];
  pendingRequests: LeaveRequest[];
  onNavigateTab: (tab: string) => void;
}> = ({ faculty, courses, pendingRequests, onNavigateTab }) => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Assigned Courses
          </div>
          <div className="text-3xl font-extrabold text-blue-600 tabular-nums">
            {courses.length}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Pending Mentee Requests
          </div>
          <div className="text-3xl font-extrabold text-amber-600 tabular-nums">
            {pendingRequests.length}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Today's Lectures
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 tabular-nums">
            2
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Courses */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">My Assigned Courses</h2>
            <button
              onClick={() => onNavigateTab('attendance')}
              className="text-xs font-semibold px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Mark Attendance
            </button>
          </div>

          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c.code} className="p-3.5 bg-slate-50/70 border border-slate-200/60 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900">{c.name}</div>
                  <div className="text-xs text-slate-500 font-mono">
                    {c.code} · Dept of {c.department} · Sem {c.semester}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    {c.credits} Credits
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Requests Preview */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Mentee Approvals Queue</h2>
            <button
              onClick={() => onNavigateTab('requests')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Review All ({pendingRequests.length}) &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {pendingRequests.slice(0, 3).map((r) => (
              <div key={r.id} className="p-3 bg-slate-50 border border-slate-200/60 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{r.studentName}</div>
                  <div className="text-xs text-slate-500">
                    {r.type} · {r.reason}
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('requests')}
                  className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. MARK ATTENDANCE (Figure 8)
// ============================================================================
interface FacultyAttendanceProps {
  students: User[];
  attendanceRecords: AttendanceRecord[];
  onSaveAttendance: (classSection: string, subject: string, date: string, period: number, statuses: Record<string, 'Present' | 'Absent'>) => void;
}

export const FacultyAttendanceView: React.FC<FacultyAttendanceProps> = ({
  students,
  attendanceRecords,
  onSaveAttendance
}) => {
  const [selectedClass, setSelectedClass] = useState('II B.Tech IT - A');
  const [selectedSubject, setSelectedSubject] = useState('Web Technology');
  const [selectedDate, setSelectedDate] = useState('2026-10-29');
  const [selectedPeriod, setSelectedPeriod] = useState(3);
  const [saveBanner, setSaveBanner] = useState(false);

  // Filter students for the class
  const classStudents = students.filter(s => s.role === 'student' && s.classSection === selectedClass);

  // State of attendance map matching Figure 8
  // 25IT001 Arun Present, 25IT002 Bhavya Present, 25IT003 Charan Absent,
  // 25IT004 Deepika Present, 25IT005 Elango Present, 25IT006 Fathima Present,
  // 25IT007 Gokul Absent, 25IT008 Harini Present
  const [statusMap, setStatusMap] = useState<Record<string, 'Present' | 'Absent'>>({
    '25IT001': 'Present',
    '25IT002': 'Present',
    '25IT003': 'Absent',
    '25IT004': 'Present',
    '25IT005': 'Present',
    '25IT006': 'Present',
    '25IT007': 'Absent',
    '25IT008': 'Present'
  });

  const toggleStudent = (id: string) => {
    setStatusMap(prev => ({
      ...prev,
      [id]: prev[id] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, 'Present' | 'Absent'> = {};
    classStudents.forEach(s => {
      updated[s.id] = 'Present';
    });
    setStatusMap(updated);
  };

  const handleSave = () => {
    onSaveAttendance(selectedClass, selectedSubject, selectedDate, selectedPeriod, statusMap);
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 4000);
  };

  // Live counts (Figure 8)
  const presentCount = Object.values(statusMap).filter(v => v === 'Present').length;
  const absentCount = Object.values(statusMap).filter(v => v === 'Absent').length;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
      {saveBanner && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Attendance saved successfully for {selectedClass} ({selectedSubject})!</span>
        </div>
      )}

      {/* Top Filter Selectors matching Figure 8 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="II B.Tech IT - A">II B.Tech IT - A</option>
            <option value="II B.Tech CSE - B">II B.Tech CSE - B</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="Web Technology">Web Technology</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Database Systems">Database Systems</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Date · Period
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 font-mono"
            />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(Number(e.target.value))}
              className="w-20 px-2 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value={1}>P1</option>
              <option value={2}>P2</option>
              <option value={3}>P3</option>
              <option value={4}>P4</option>
              <option value={5}>P5</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Attendance Table (Figure 8) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              <th className="pb-3 w-1/4">Reg. No.</th>
              <th className="pb-3 w-1/2">Student Name</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {classStudents.map((s) => {
              const status = statusMap[s.id] || 'Present';
              const isPresent = status === 'Present';
              return (
                <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 font-mono font-bold text-slate-700 text-xs sm:text-sm tabular-nums">
                    {s.id}
                  </td>
                  <td className="py-3 font-semibold text-slate-900 text-xs sm:text-sm">
                    {s.name}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleStudent(s.id)}
                      className={`inline-flex items-center justify-center min-w-[84px] text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-2xs ${
                        isPresent
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                      }`}
                    >
                      {status}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Action Strip & Real-Time Count (Figure 8) */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleMarkAllPresent}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Mark All Present
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Attendance</span>
          </button>
        </div>

        <div className="text-xs font-semibold text-slate-500 tabular-nums">
          <span className="text-emerald-700 font-bold">Present: {presentCount}</span>
          <span className="mx-2 text-slate-300">·</span>
          <span className="text-rose-700 font-bold">Absent: {absentCount}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. LEAVE / OD APPROVALS (Figure 11)
// ============================================================================
interface FacultyRequestsProps {
  pendingRequests: LeaveRequest[];
  decidedRequests: LeaveRequest[];
  onReviewRequest: (id: string, action: 'Approved' | 'Rejected', remarks: string) => void;
}

export const FacultyRequestsView: React.FC<FacultyRequestsProps> = ({
  pendingRequests,
  decidedRequests,
  onReviewRequest
}) => {
  const [remarksMap, setRemarksMap] = useState<Record<string, string>>({});

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    const remark = remarksMap[id] || (action === 'Approved' ? 'Approved by mentor' : 'Declined');
    onReviewRequest(id, action, remark);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-8">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Leave / OD Approvals</h2>
        <p className="text-xs text-slate-500">Requests from your mentees</p>
      </div>

      {/* Pending Items (Figure 11: Arun Kumar OD, Harini K Leave, Charan R Leave) */}
      <div className="space-y-4">
        {pendingRequests.map((req) => (
          <div
            key={req.id}
            className="p-5 border border-slate-200 rounded-xl bg-white shadow-2xs flex flex-wrap items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{req.studentName}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    req.type.includes('OD')
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {req.type}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono tabular-nums">
                {req.fromDate} &rarr; {req.toDate}
              </div>
              <div className="text-xs text-slate-600">{req.reason}</div>
            </div>

            {/* Action buttons matching Figure 11 */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Remarks (optional)"
                value={remarksMap[req.id] || ''}
                onChange={(e) =>
                  setRemarksMap((prev) => ({ ...prev, [req.id]: e.target.value }))
                }
                className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-36 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleAction(req.id, 'Approved')}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => handleAction(req.id, 'Rejected')}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-2xs transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        {pendingRequests.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
            No pending requests in your mentee review queue.
          </div>
        )}
      </div>

      {/* Recently Decided (Figure 11: Bhavya S Leave Approved, Gokul V OD Approved, Elango P Leave Rejected) */}
      <div className="pt-6 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Recently Decided</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                <th className="pb-3">Student Name</th>
                <th className="pb-3">Type</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {decidedRequests.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 font-semibold text-slate-900 text-xs sm:text-sm">
                    {d.studentName}
                  </td>
                  <td className="py-3 text-xs text-slate-600">{d.type}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                        d.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. UPLOAD MARKS
// ============================================================================
export const FacultyMarksView: React.FC<{
  students: User[];
  onSaveMarks: (subject: string, exam: string, marks: Record<string, number>) => void;
}> = ({ students, onSaveMarks }) => {
  const [selectedClass, setSelectedClass] = useState('II B.Tech IT - A');
  const [selectedSubject, setSelectedSubject] = useState('Web Technology');
  const [selectedExam, setSelectedExam] = useState('Internal Assessment 1');
  const [marksState, setMarksState] = useState<Record<string, number>>({
    '25IT001': 44,
    '25IT002': 41,
    '25IT003': 39,
    '25IT004': 46,
    '25IT005': 36,
    '25IT006': 43,
    '25IT007': 35,
    '25IT008': 45
  });

  const classStudents = students.filter(s => s.role === 'student' && s.classSection === selectedClass);

  const handleSave = () => {
    onSaveMarks(selectedSubject, selectedExam, marksState);
    alert('Assessment marks saved successfully!');
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Upload Internal Marks</h2>
        <p className="text-xs text-slate-500">Record assessment results (Max marks: 50)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900"
          >
            <option value="II B.Tech IT - A">II B.Tech IT - A</option>
            <option value="II B.Tech CSE - B">II B.Tech CSE - B</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900"
          >
            <option value="Web Technology">Web Technology</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Database Systems">Database Systems</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Assessment</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900"
          >
            <option value="Internal Assessment 1">Internal Assessment 1</option>
            <option value="Internal Assessment 2">Internal Assessment 2</option>
            <option value="Model Examination">Model Examination</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              <th className="pb-3 w-1/4">Reg. No.</th>
              <th className="pb-3 w-1/2">Student Name</th>
              <th className="pb-3 text-right">Marks (Max: 50)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {classStudents.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 font-mono font-bold text-slate-700 text-xs sm:text-sm tabular-nums">
                  {s.id}
                </td>
                <td className="py-3 font-semibold text-slate-900 text-xs sm:text-sm">
                  {s.name}
                </td>
                <td className="py-3 text-right">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    value={marksState[s.id] ?? 40}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setMarksState((prev) => ({ ...prev, [s.id]: val }));
                    }}
                    className="w-20 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-right font-mono text-sm font-bold tabular-nums focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
        >
          Save Assessment Marks
        </button>
      </div>
    </div>
  );
};

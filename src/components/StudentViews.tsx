import React, { useState } from 'react';
import { User, TimetableSlot, Notice, LeaveRequest, Grievance, Assignment } from '../types';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Plus,
  BookOpen,
  ArrowRight,
  Filter,
  Check,
  X,
  FileText
} from 'lucide-react';

// ============================================================================
// 1. STUDENT DASHBOARD (Figure 4)
// ============================================================================
interface StudentDashboardProps {
  student: User;
  timetable: TimetableSlot[];
  notices: Notice[];
  requests: LeaveRequest[];
  subjectReports: { code: string; name: string; attendancePct: number; marksObtained: number; maxMarks: number; status: string }[];
  onNavigateTab: (tab: string) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardProps> = ({
  student,
  timetable,
  notices,
  requests,
  subjectReports,
  onNavigateTab
}) => {
  // Calculations
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const overallAttendance = Math.round(
    subjectReports.reduce((acc, curr) => acc + curr.attendancePct, 0) / subjectReports.length
  ) || 87;
  const avgMarks = Math.round(
    subjectReports.reduce((acc, curr) => acc + curr.marksObtained, 0) / subjectReports.length
  ) || 42;

  // Filter Monday timetable as Today's Timetable matching Figure 4
  const todaysTimetable = timetable.filter(t => t.day === 'Monday');

  return (
    <div className="space-y-6">
      {/* 4 Metric KPI Cards matching Figure 4 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Overall Attendance
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 tabular-nums">
            {overallAttendance}%
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Internal Marks Avg
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {avgMarks} <span className="text-lg font-normal text-slate-400">/ 50</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Pending Requests
          </div>
          <div className="text-3xl font-extrabold text-amber-600 tabular-nums">
            {pendingCount}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            New Notices
          </div>
          <div className="text-3xl font-extrabold text-blue-600 tabular-nums">
            {notices.length}
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Today's Timetable + Latest Notices matching Figure 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Timetable */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Today's Timetable</h2>
                <p className="text-xs text-slate-500">{student.classSection || 'II B.Tech IT - A'}</p>
              </div>
              <button
                onClick={() => onNavigateTab('timetable')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Full Week</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                    <th className="pb-3 w-28">Period</th>
                    <th className="pb-3">Subject</th>
                    <th className="pb-3">Faculty</th>
                    <th className="pb-3 text-right">Room</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  {todaysTimetable.map((slot) => (
                    <tr key={slot.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 text-xs font-medium text-slate-500 tabular-nums">
                        <span className="font-bold text-slate-800">{slot.periodNum}</span> · {slot.timeSlot.split(' - ')[0]}
                      </td>
                      <td className="py-3 font-semibold text-slate-900 text-xs sm:text-sm">{slot.subject}</td>
                      <td className="py-3 text-xs text-slate-600">{slot.facultyName}</td>
                      <td className="py-3 text-xs font-medium text-slate-700 text-right">{slot.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Latest Notices */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Latest Notices</h2>
                <p className="text-xs text-slate-500">Official college broadcasts</p>
              </div>
              <button
                onClick={() => onNavigateTab('notices')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {notices.slice(0, 4).map((notice) => (
                <div key={notice.id} className="p-3 bg-slate-50/80 border border-slate-200/60 rounded-lg hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        notice.category === 'Exam'
                          ? 'bg-rose-100 text-rose-700'
                          : notice.category === 'Event'
                          ? 'bg-amber-100 text-amber-800'
                          : notice.category === 'Holiday'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      {notice.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{notice.createdAt}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{notice.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. ATTENDANCE & MARKS (Figure 5)
// ============================================================================
interface StudentAttendanceMarksProps {
  subjectReports: { code: string; name: string; attendancePct: number; marksObtained: number; maxMarks: number; status: string }[];
}

export const StudentAttendanceMarksView: React.FC<StudentAttendanceMarksProps> = ({ subjectReports }) => {
  const overallAttendance = (
    subjectReports.reduce((acc, curr) => acc + curr.attendancePct, 0) / subjectReports.length
  ).toFixed(1);

  const totalObtained = subjectReports.reduce((acc, curr) => acc + curr.marksObtained, 0);
  const totalMax = subjectReports.reduce((acc, curr) => acc + curr.maxMarks, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Subject-wise Report</h2>
            <p className="text-xs text-slate-500">Semester 3 · Internal Assessment 1</p>
          </div>
          <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Mandatory Eligibility Cutoff: <span className="font-bold text-slate-800">75%</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 border-b border-slate-100">
                <th className="pb-3 w-1/4">Subject</th>
                <th className="pb-3 w-2/5">Attendance</th>
                <th className="pb-3 w-1/6 text-center">Internal Marks</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjectReports.map((report) => {
                const isEligible = report.attendancePct >= 75;
                return (
                  <tr key={report.code} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4">
                      <div className="font-bold text-slate-900 text-sm">{report.name}</div>
                      <div className="text-xs text-slate-400 font-mono">{report.code}</div>
                    </td>
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isEligible ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${report.attendancePct}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-bold tabular-nums w-10 text-right ${
                            isEligible ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          {report.attendancePct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-sm font-bold text-slate-800 tabular-nums">
                        {report.marksObtained}
                      </span>{' '}
                      <span className="text-xs text-slate-400">/ {report.maxMarks}</span>
                    </td>
                    <td className="py-4 text-right">
                      <span
                        className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                          isEligible
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {isEligible ? 'Eligible' : 'Not Eligible'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Summary Cards (Figure 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Overall Attendance
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 tabular-nums">
            {overallAttendance}%
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Total Marks
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {totalObtained} <span className="text-lg font-normal text-slate-400">/ {totalMax}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Minimum Required
          </div>
          <div className="text-3xl font-extrabold text-slate-700 tabular-nums">
            75%
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. WEEKLY TIMETABLE
// ============================================================================
export const StudentTimetableView: React.FC<{ timetable: TimetableSlot[] }> = ({ timetable }) => {
  const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'> = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Weekly Academic Schedule</h2>
        <p className="text-xs text-slate-500">II B.Tech Information Technology - Section A</p>
      </div>

      <div className="space-y-6">
        {days.map((day) => {
          const slots = timetable.filter((t) => t.day === day);
          return (
            <div key={day} className="border border-slate-200/70 rounded-xl p-4 bg-slate-50/40">
              <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                {day}
              </h3>
              {slots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                  {slots.map((s) => (
                    <div
                      key={s.id}
                      className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors"
                    >
                      <div className="flex justify-between items-center text-[11px] text-slate-500 mb-1 font-mono">
                        <span className="font-bold text-blue-700">Period {s.periodNum}</span>
                        <span>{s.room}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 leading-tight mb-1">{s.subject}</div>
                      <div className="text-[11px] text-slate-500">{s.facultyName}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{s.timeSlot}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">No scheduled lectures on this day.</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 4. NOTICES (Figure 6)
// ============================================================================
export const StudentNoticesView: React.FC<{ notices: Notice[] }> = ({ notices }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filtered = filterCategory === 'all'
    ? notices
    : notices.filter(n => n.category.toLowerCase() === filterCategory.toLowerCase());

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Notices & Announcements</h2>
          <p className="text-xs text-slate-500">Published by administration and faculty</p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['all', 'Exam', 'Event', 'Holiday', 'Assignment'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Notices' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((notice) => (
          <div
            key={notice.id}
            className="p-5 border border-slate-200 rounded-xl hover:border-slate-300 transition-all bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                  notice.category === 'Exam'
                    ? 'bg-rose-100 text-rose-700'
                    : notice.category === 'Event'
                    ? 'bg-amber-100 text-amber-800'
                    : notice.category === 'Holiday'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {notice.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {notice.publisher} · {notice.createdAt}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">{notice.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{notice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 5. LEAVE / OD REQUEST (Figure 7)
// ============================================================================
interface StudentRequestsProps {
  requests: LeaveRequest[];
  student: User;
  onSubmitRequest: (req: Omit<LeaveRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const StudentRequestsView: React.FC<StudentRequestsProps> = ({
  requests,
  student,
  onSubmitRequest
}) => {
  const [type, setType] = useState<'Leave' | 'On Duty (OD)'>('On Duty (OD)');
  const [fromDate, setFromDate] = useState('2026-11-03');
  const [toDate, setToDate] = useState('2026-11-04');
  const [reason, setReason] = useState('Participation in inter-college hackathon');
  const [submittedBanner, setSubmittedBanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    onSubmitRequest({
      studentId: student.id,
      studentName: student.name,
      type,
      fromDate,
      toDate,
      reason
    });

    setSubmittedBanner(true);
    setReason('');
    setTimeout(() => setSubmittedBanner(false), 4000);
  };

  return (
    <div className="space-y-6">
      {submittedBanner && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Request submitted successfully to your faculty mentor (Dr. Kalai)!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Request Form (Figure 7) */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">New Request</h2>
          <p className="text-xs text-slate-500 mb-5">Apply for formal leave or on-duty approval</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="On Duty (OD)">On Duty (OD)</option>
                <option value="Leave">Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">From</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">To</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Participation in inter-college hackathon..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
            >
              Submit Request
            </button>
          </form>
        </div>

        {/* My Requests Table (Figure 7) */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">My Requests</h2>
            <p className="text-xs text-slate-500 mb-5">Live status tracking from mentor reviews</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Dates</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 font-semibold text-slate-900 text-xs sm:text-sm">
                        {req.type}
                        {req.remarks && (
                          <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                            Note: {req.remarks}
                          </div>
                        )}
                      </td>
                      <td className="py-3 text-xs text-slate-600 font-mono tabular-nums">
                        {req.fromDate} &rarr; {req.toDate}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                            req.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : req.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. GRIEVANCES
// ============================================================================
export const StudentGrievancesView: React.FC<{
  grievances: Grievance[];
  student: User;
  onRaiseGrievance: (g: Omit<Grievance, 'id' | 'createdAt' | 'status'>) => void;
}> = ({ grievances, student, onRaiseGrievance }) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'Academic' | 'Infrastructure' | 'Hostel' | 'Transport' | 'General'>('Infrastructure');
  const [description, setDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    onRaiseGrievance({
      studentId: student.id,
      studentName: student.name,
      subject,
      category,
      description,
      assignedTo: 'Dr. Kalai (Mentor)'
    });

    setSubject('');
    setDescription('');
    alert('Grievance ticket created and assigned to mentor.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Raise Grievance */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">Raise Grievance</h2>
        <p className="text-xs text-slate-500 mb-5">Confidential submission to student welfare and department</p>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="Infrastructure">Infrastructure (Wi-Fi, Labs, Air-conditioning)</option>
              <option value="Academic">Academic (Curriculum, Evaluations, Faculty)</option>
              <option value="Hostel">Hostel & Mess</option>
              <option value="Transport">Bus & Transport</option>
              <option value="General">General Administrative</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Lab 3 Wi-Fi connectivity intermittent"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Provide specific details so the redressal team can investigate quickly..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
          >
            Submit Grievance Ticket
          </button>
        </form>
      </div>

      {/* Grievance Tracker */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">Grievance Status</h2>
        <p className="text-xs text-slate-500 mb-5">Track redressal responses and resolution updates</p>

        <div className="space-y-4">
          {grievances.map((g) => (
            <div key={g.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  {g.category}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    g.status === 'Closed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : g.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {g.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{g.subject}</h3>
              <p className="text-xs text-slate-600 mb-2 leading-relaxed">{g.description}</p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                Assigned to: <strong className="text-slate-700">{g.assignedTo}</strong>
                {g.resolution && (
                  <div className="text-emerald-700 font-semibold mt-1">
                    Resolution: {g.resolution}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. ASSIGNMENTS
// ============================================================================
export const StudentAssignmentsView: React.FC<{ assignments: Assignment[] }> = ({ assignments }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Coursework Assignments</h2>
        <p className="text-xs text-slate-500">Active submissions and assessment deadlines</p>
      </div>

      <div className="space-y-4">
        {assignments.map((asg) => (
          <div key={asg.id} className="p-5 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded">
                {asg.courseCode} · {asg.courseName}
              </span>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded">
                Due: {asg.dueDate}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">{asg.title}</h3>
            <p className="text-xs text-slate-600 mb-3">{asg.description}</p>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">Posted by {asg.postedBy}</span>
              <button
                onClick={() => alert(`Assignment submission recorded for '${asg.title}'!`)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
              >
                Submit Assignment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

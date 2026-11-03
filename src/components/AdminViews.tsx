import React, { useState } from 'react';
import { User, Department, Course, TimetableSlot, Notice } from '../types';
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit2,
  Building2,
  BookOpen,
  Calendar,
  Bell,
  Download,
  CheckCircle2,
  BarChart3
} from 'lucide-react';

// ============================================================================
// 1. ADMIN DASHBOARD (Figure 9)
// ============================================================================
export const AdminDashboardView: React.FC<{
  users: User[];
  courses: Course[];
  pendingRequestsCount: number;
  onNavigateTab: (tab: string) => void;
}> = ({ users, courses, pendingRequestsCount, onNavigateTab }) => {
  // Metric counts matching Figure 9
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalFaculty = users.filter(u => u.role === 'faculty').length;

  // Department distribution matching Figure 9 bar chart
  const deptData = [
    { name: 'IT', count: 260, heightPct: 85 },
    { name: 'CSE', count: 320, heightPct: 100 },
    { name: 'ECE', count: 210, heightPct: 68 },
    { name: 'EEE', count: 160, heightPct: 52 },
    { name: 'MECH', count: 180, heightPct: 58 },
    { name: 'CIVIL', count: 118, heightPct: 38 }
  ];

  // Recent Activity matching Figure 9
  const recentActivities = [
    { title: 'Notice published', desc: 'Internal Test 2 schedule released', time: '10 min ago' },
    { title: 'New student added', desc: 'Divya R (25CS010) enrolled into CSE', time: '1 hr ago' },
    { title: 'Timetable updated (IT-A)', desc: 'Web Technology relocated to Lab 3', time: '3 hrs ago' },
    { title: 'OD request approved', desc: 'Gokul V approved for zonal tournament', time: 'Yesterday' },
    { title: 'Marks uploaded (CSE-B)', desc: 'Internal assessment marks posted', time: 'Yesterday' }
  ];

  return (
    <div className="space-y-6">
      {/* 4 Metric KPI Cards matching Figure 9 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Total Students
          </div>
          <div className="text-3xl font-extrabold text-blue-900 tabular-nums">
            1,248
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Total Faculty
          </div>
          <div className="text-3xl font-extrabold text-blue-600 tabular-nums">
            96
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Courses
          </div>
          <div className="text-3xl font-extrabold text-slate-700 tabular-nums">
            42
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Pending Requests
          </div>
          <div className="text-3xl font-extrabold text-amber-600 tabular-nums">
            17
          </div>
        </div>
      </div>

      {/* Two-Column: Bar Chart & Recent Activity matching Figure 9 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students by Department Bar Chart */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Students by Department</h2>
              <span className="text-xs text-slate-400">Total: 1,248</span>
            </div>

            {/* Visual Bar Chart matching Figure 9 */}
            <div className="h-56 flex items-end gap-4 pt-6 px-2 border-b border-slate-200">
              {deptData.map((d) => (
                <div key={d.name} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <span className="text-[10px] font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                    {d.count}
                  </span>
                  <div
                    className="w-full max-w-[42px] bg-blue-600 group-hover:bg-blue-700 transition-all rounded-t-md cursor-pointer"
                    style={{ height: `${d.heightPct}%` }}
                    title={`${d.name}: ${d.count} students`}
                  />
                  <span className="text-xs font-bold text-slate-600 mt-2">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">UG Engineering enrolled headcount</p>
        </div>

        {/* Recent Activity Feed matching Figure 9 */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Recent Activity</h2>
              <span className="text-xs text-slate-400">Audit trail</span>
            </div>

            <div className="divide-y divide-slate-100">
              {recentActivities.map((act, i) => (
                <div key={i} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {act.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{act.desc}</div>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap font-mono tabular-nums">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Live system event monitoring</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. USER MANAGEMENT (Figure 10)
// ============================================================================
interface AdminUsersProps {
  users: User[];
  departments: Department[];
  onAddUser: (u: User) => void;
  onDeleteUser: (id: string) => void;
}

export const AdminUsersView: React.FC<AdminUsersProps> = ({
  users,
  departments,
  onAddUser,
  onDeleteUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New User Form State
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'student' | 'faculty'>('student');
  const [newDept, setNewDept] = useState('IT');

  // Filter users matching search & role
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId || !newName || !newEmail) return;

    onAddUser({
      id: newId.trim(),
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      department: newDept,
      classSection: newRole === 'student' ? `II B.Tech ${newDept} - A` : undefined,
      phone: '9876543299'
    });

    setShowAddModal(false);
    setNewId('');
    setNewName('');
    setNewEmail('');
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">User Management</h2>
        <p className="text-xs text-slate-500">Add, edit and search students and faculty</p>
      </div>

      {/* Action / Search Bar matching Figure 10 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add User</span>
        </button>
      </div>

      {/* Users Table matching Figure 10 */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              <th className="pb-3 w-1/6">ID</th>
              <th className="pb-3 w-1/3">Name</th>
              <th className="pb-3 w-1/6">Role</th>
              <th className="pb-3 w-1/6">Dept</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 font-mono font-bold text-blue-900 text-xs sm:text-sm tabular-nums">
                  {u.id}
                </td>
                <td className="py-3">
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">{u.name}</div>
                  <div className="text-[11px] text-slate-400">{u.email}</div>
                </td>
                <td className="py-3">
                  <span
                    className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded ${
                      u.role === 'student'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : u.role === 'faculty'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                  </span>
                </td>
                <td className="py-3 text-xs font-medium text-slate-600">{u.department}</td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-3 text-xs font-semibold">
                    <button
                      onClick={() => alert(`Editing profile of ${u.name} (${u.id})`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete user ${u.name} (${u.id})?`)) {
                          onDeleteUser(u.id);
                        }
                      }}
                      className="text-rose-600 hover:text-rose-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Add New User</h3>
            <p className="text-xs text-slate-500 mb-4">Enroll a new student or faculty member</p>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">ID / Register Number</label>
                <input
                  type="text"
                  placeholder="e.g. 25IT009 or F-0250"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Koushik S"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="koushik@kpriet.ac.in"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  >
                    {departments.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. DEPARTMENTS & COURSES
// ============================================================================
export const AdminCoursesView: React.FC<{
  departments: Department[];
  courses: Course[];
}> = ({ departments, courses }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Departments */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">Academic Departments</h2>
        <p className="text-xs text-slate-500 mb-4">Undergraduate and postgraduate branches</p>

        <div className="space-y-3">
          {departments.map((d) => (
            <div key={d.code} className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  {d.code}
                </span>
                <span className="text-sm font-bold text-slate-900 ml-2">{d.name}</span>
              </div>
              <div className="text-xs text-slate-500">HOD: {d.headOfDept}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">Courses Catalog</h2>
        <p className="text-xs text-slate-500 mb-4">Curriculum mapping & faculty instructors</p>

        <div className="space-y-3">
          {courses.map((c) => (
            <div key={c.code} className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-900">{c.name}</div>
                <div className="text-xs text-slate-400 font-mono">
                  {c.code} · Dept {c.department} · Semester {c.semester}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-700">{c.facultyName}</div>
                <div className="text-[11px] text-slate-400">{c.credits} Credits</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. TIMETABLE MASTER
// ============================================================================
export const AdminTimetableView: React.FC<{ timetables: TimetableSlot[] }> = ({ timetables }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Campus Timetable Master</h2>
        <p className="text-xs text-slate-500">Period schedules, faculty assignments, and classroom bookings</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              <th className="pb-3">Class</th>
              <th className="pb-3">Day</th>
              <th className="pb-3">Period</th>
              <th className="pb-3">Subject</th>
              <th className="pb-3">Faculty</th>
              <th className="pb-3 text-right">Room</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {timetables.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 font-semibold text-blue-900 text-xs sm:text-sm">{t.className}</td>
                <td className="py-3 text-xs text-slate-700 font-medium">{t.day}</td>
                <td className="py-3 text-xs text-slate-500 font-mono tabular-nums">P{t.periodNum} ({t.timeSlot})</td>
                <td className="py-3 font-bold text-slate-900 text-xs sm:text-sm">{t.subject}</td>
                <td className="py-3 text-xs text-slate-600">{t.facultyName}</td>
                <td className="py-3 text-xs font-bold text-slate-700 text-right">{t.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================================
// 5. ANNOUNCEMENTS
// ============================================================================
export const AdminAnnouncementsView: React.FC<{
  notices: Notice[];
  onPostNotice: (n: Omit<Notice, 'id' | 'createdAt'>) => void;
}> = ({ notices, onPostNotice }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Exam' | 'Event' | 'Holiday' | 'Assignment' | 'General'>('Exam');
  const [content, setContent] = useState('');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onPostNotice({
      title,
      category,
      content,
      targetRole: 'all',
      publisher: 'Admin'
    });

    setTitle('');
    setContent('');
    alert('Campus-wide announcement broadcasted successfully!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Broadcast Form */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">Publish College Broadcast</h2>
        <p className="text-xs text-slate-500 mb-5">Instantly alerts students and faculty dashboards</p>

        <form onSubmit={handlePublish} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="Exam">Exam Schedule & Hall Tickets</option>
              <option value="Holiday">Holiday & University Closure</option>
              <option value="Event">Campus Symposium / Workshop</option>
              <option value="General">General Administrative Broadcast</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Announcement Title</label>
            <input
              type="text"
              placeholder="e.g. End Semester Exam Fee Notice"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Broadcast Details</label>
            <textarea
              rows={4}
              placeholder="Type instructions clearly..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
          >
            Publish Broadcast
          </button>
        </form>
      </div>

      {/* Active Broadcasts */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">Active Notices</h2>
        <p className="text-xs text-slate-500 mb-5">History of broadcasted notices</p>

        <div className="space-y-3">
          {notices.map((n) => (
            <div key={n.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/40">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                  {n.category}
                </span>
                <span className="text-xs text-slate-400">{n.createdAt}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">{n.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{n.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. REPORTS & EXPORT
// ============================================================================
export const AdminReportsView: React.FC<{ users: User[] }> = ({ users }) => {
  const students = users.filter((u) => u.role === 'student');

  const exportCSV = () => {
    const headers = ['Register_ID,Name,Department,Class,Attendance_Pct,Eligibility_Status'];
    const rows = students.map((s) => {
      const pct = s.id === '25IT001' ? 86.6 : s.id === '25IT007' ? 68.0 : 88.0;
      const status = pct >= 75 ? 'Eligible' : 'Not Eligible';
      return `"${s.id}","${s.name}","${s.department}","${s.classSection || ''}","${pct}%","${status}"`;
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'campus_attendance_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Institutional Summary Reports</h2>
          <p className="text-xs text-slate-500">Student attendance aggregates and eligibility audit logs</p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              <th className="pb-3">Reg. ID</th>
              <th className="pb-3">Student Name</th>
              <th className="pb-3">Department</th>
              <th className="pb-3">Class</th>
              <th className="pb-3 text-right">Attendance %</th>
              <th className="pb-3 text-right">Eligibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((s) => {
              const pct = s.id === '25IT001' ? 86.6 : s.id === '25IT007' ? 68.0 : 88.0;
              const isEligible = pct >= 75;
              return (
                <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 font-mono font-bold text-slate-800 text-xs sm:text-sm tabular-nums">
                    {s.id}
                  </td>
                  <td className="py-3 font-semibold text-slate-900 text-xs sm:text-sm">{s.name}</td>
                  <td className="py-3 text-xs text-slate-600">{s.department}</td>
                  <td className="py-3 text-xs text-slate-500">{s.classSection}</td>
                  <td className="py-3 text-xs font-bold text-right tabular-nums">
                    <span className={isEligible ? 'text-emerald-700' : 'text-rose-700'}>
                      {pct}%
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full ${
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
  );
};

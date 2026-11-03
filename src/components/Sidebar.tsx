import React from 'react';
import { Role } from '../types';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  FileText,
  Bell,
  Clock,
  AlertCircle,
  Users,
  Building2,
  BookOpen,
  BarChart3,
  GraduationCap
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface SidebarProps {
  role: Role;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  pendingRequestsCount: number;
  newNoticesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeTab,
  onSelectTab,
  pendingRequestsCount,
  newNoticesCount
}) => {
  const studentNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'attendance', label: 'Attendance & Marks', icon: CheckSquare },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'notices', label: 'Notices', icon: Bell, badge: newNoticesCount },
    { id: 'requests', label: 'Leave / OD', icon: Clock, badge: pendingRequestsCount },
    { id: 'grievances', label: 'Grievances', icon: AlertCircle }
  ];

  const facultyNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Mark Attendance', icon: CheckSquare },
    { id: 'marks', label: 'Upload Marks', icon: FileText },
    { id: 'requests', label: 'Requests', icon: Clock, badge: pendingRequestsCount },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'assignments', label: 'Assignments', icon: BookOpen }
  ];

  const adminNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'reports', label: 'Reports', icon: BarChart3 }
  ];

  const navItems = role === 'student' ? studentNavItems : role === 'faculty' ? facultyNavItems : adminNavItems;

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800">
      {/* Brand Header matching Figures */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-white tracking-tight flex items-center">
              Campus<span className="text-blue-400">Connect</span>
            </div>
            <div className="text-[11px] font-medium text-slate-400 capitalize">
              {role === 'student' && 'Student Portal'}
              {role === 'faculty' && 'Faculty Portal'}
              {role === 'admin' && 'Administrator Panel'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-3 flex-1 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex flex-col gap-1">
        <div className="text-slate-400 font-semibold">Campus Connect v1.0</div>
        <div>CONNECT · MANAGE · SIMPLIFY</div>
      </div>
    </aside>
  );
};

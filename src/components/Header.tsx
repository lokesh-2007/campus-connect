import React from 'react';
import { User, Role } from '../types';
import { LogOut, Code, UserCheck, Shield, GraduationCap, Briefcase } from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  onLogout: () => void;
  onSwitchRole: (role: Role) => void;
  onOpenCodeExplorer: () => void;
  pendingRequestsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onLogout,
  onSwitchRole,
  onOpenCodeExplorer,
  pendingRequestsCount
}) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      {/* Zone 1: Greeting & Context */}
      <div>
        <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {currentUser.role === 'student' && `Hello, ${currentUser.name.split(' ')[0]}!`}
          {currentUser.role === 'faculty' && `${currentUser.name}`}
          {currentUser.role === 'admin' && 'Hello, Administrator!'}
          
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize bg-slate-100 text-slate-600 border border-slate-200">
            {currentUser.role}
          </span>
        </h1>
        <p className="text-xs text-slate-500">
          {currentUser.role === 'student' && 'Here is your academic summary for today'}
          {currentUser.role === 'faculty' && 'Faculty Portal · Academic & Mentorship Management'}
          {currentUser.role === 'admin' && 'Campus overview and administrative console'}
        </p>
      </div>

      {/* Zone 2: Fast Role Switcher & Deliverables Viewer */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Quick Role Switcher pills for testing */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
          <span className="text-slate-400 px-2 select-none text-[11px] font-semibold uppercase tracking-wider">Test As:</span>
          <button
            onClick={() => onSwitchRole('student')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              currentUser.role === 'student'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to Arun Kumar (Student)"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Student
          </button>
          <button
            onClick={() => onSwitchRole('faculty')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              currentUser.role === 'faculty'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to Dr. Kalai (Faculty)"
          >
            <Briefcase className="w-3.5 h-3.5" />
            Faculty
          </button>
          <button
            onClick={() => onSwitchRole('admin')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              currentUser.role === 'admin'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to Administrator"
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>

        {/* Flask / SQLite Deliverables Code Viewer Button */}
        <button
          onClick={onOpenCodeExplorer}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          title="Inspect app.py, schema.sql, Jinja2 templates and CSS"
        >
          <Code className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">Flask Deliverables</span>
        </button>

        {/* User Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</div>
            <div className="text-[11px] font-mono text-slate-500 tabular-nums">{currentUser.id}</div>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

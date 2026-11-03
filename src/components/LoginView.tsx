import React, { useState } from 'react';
import { Role, User } from '../types';
import { GraduationCap, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: User) => void;
  users: User[];
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, users }) => {
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [loginId, setLoginId] = useState('arun.k@kpriet.ac.in');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'student') {
      setLoginId('arun.k@kpriet.ac.in');
    } else if (role === 'faculty') {
      setLoginId('kalai@kpriet.ac.in');
    } else if (role === 'admin') {
      setLoginId('admin@kpriet.ac.in');
    }
    setPassword('password123');
  };

  const handleQuickDemo = (role: Role, email: string) => {
    setSelectedRole(role);
    setLoginId(email);
    setPassword('password123');
    setErrorMessage('');
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      onLogin(foundUser);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = loginId.trim().toLowerCase();
    const found = users.find(
      (u) =>
        (u.email.toLowerCase() === trimmed || u.id.toLowerCase() === trimmed) &&
        u.role === selectedRole
    );

    if (found) {
      onLogin(found);
    } else {
      setErrorMessage(`No ${selectedRole} account matching '${loginId}'. Try one of the 1-click demo accounts below.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 sm:p-10 text-center transition-all">
        {/* Brand Header */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">CampusConnect</h1>
        <p className="text-xs font-medium text-slate-500 mb-6">Digital College Management System</p>

        <h2 className="text-lg font-bold text-slate-900 mb-1">Welcome back!</h2>
        <p className="text-xs text-slate-500 mb-6">Log in to continue</p>

        {errorMessage && (
          <div className="mb-4 p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-left">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="text-left space-y-4">
          {/* Role pills matching Figure 3 */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Login as</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`py-2 text-xs font-semibold rounded-md transition-all ${
                  selectedRole === 'student'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('faculty')}
                className={`py-2 text-xs font-semibold rounded-md transition-all ${
                  selectedRole === 'faculty'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`py-2 text-xs font-semibold rounded-md transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Email / ID input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email / ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="e.g. arun.k@kpriet.ac.in or 25IT001"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
          >
            <span>Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-5 text-xs text-slate-400">
          <a
            href="#help"
            onClick={(e) => {
              e.preventDefault();
              alert('For testing: Any password or "password123" is accepted. You can also use the 1-click accounts below!');
            }}
            className="hover:text-blue-600 transition-colors"
          >
            Forgot password? Contact administrator.
          </a>
        </p>

        {/* 1-Click Fast Access Demo Accounts */}
        <div className="mt-6 pt-5 border-t border-dashed border-slate-200 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Demo Accounts:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemo('student', 'arun.k@kpriet.ac.in')}
              className="px-2.5 py-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg transition-colors"
            >
              <div className="text-[11px] font-bold text-slate-900">Arun Kumar</div>
              <div className="text-[10px] text-slate-500">Student (25IT001)</div>
            </button>
            <button
              onClick={() => handleQuickDemo('faculty', 'kalai@kpriet.ac.in')}
              className="px-2.5 py-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg transition-colors"
            >
              <div className="text-[11px] font-bold text-slate-900">Dr. Kalai</div>
              <div className="text-[10px] text-slate-500">Faculty (F-0147)</div>
            </button>
            <button
              onClick={() => handleQuickDemo('admin', 'admin@kpriet.ac.in')}
              className="px-2.5 py-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg transition-colors"
            >
              <div className="text-[11px] font-bold text-slate-900">Administrator</div>
              <div className="text-[10px] text-slate-500">Admin (ADM001)</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

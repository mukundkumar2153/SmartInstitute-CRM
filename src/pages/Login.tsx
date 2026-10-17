import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const { setCurrentUser, setActiveNav, showToast } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@smartinstitute.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@smartinstitute.com');
    } else if (role === 'teacher') {
      setEmail('kulkarni.teacher@smartinstitute.edu');
    } else {
      setEmail('aarav.sharma@smartinstitute.edu');
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.');
      return;
    }

    if (selectedRole === 'admin') {
      setCurrentUser({
        id: 'usr-admin-1',
        name: 'Admin User',
        email,
        role: 'admin',
        roleTitle: 'Super Admin',
        avatarInitials: 'AD'
      });
      setActiveNav('dashboard');
    } else if (selectedRole === 'teacher') {
      setCurrentUser({
        id: 'usr-prof-1',
        name: 'Prof. Kulkarni',
        email,
        role: 'teacher',
        roleTitle: 'Class Teacher · FY IT',
        avatarInitials: 'PK'
      });
      setActiveNav('teacher-portal');
    } else {
      setCurrentUser({
        id: 'usr-stu-1',
        name: 'Aarav Sharma',
        email,
        role: 'student',
        roleTitle: 'FY BSc IT · Roll 01',
        avatarInitials: 'AS'
      });
      setActiveNav('student-portal');
    }
    showToast(`Welcome back to SmartInstitute!`);
  };

  const handleSendReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please enter your email address');
      return;
    }
    setResetSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setResetSent(false);
      showToast('Password reset link sent to ' + forgotEmail);
    }, 1800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Brand Hero Section */}
      <div className="lg:w-1/2 relative bg-gradient-to-br from-[#2563EB] via-[#4338CA] to-[#6D28D9] p-8 lg:p-14 flex flex-col justify-between overflow-hidden text-white min-h-[480px] lg:min-h-screen">
        {/* Soft Glowing Ambient Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight">SmartInstitute</span>
            <span className="text-sm font-semibold px-2 py-0.5 rounded-md bg-white/20 text-white tracking-wide">CRM</span>
          </div>
        </div>

        {/* Hero Headline and Value Prop */}
        <div className="relative z-10 my-auto py-12 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
            Run your institute <br />
            <span className="text-indigo-200">smarter, not harder.</span>
          </h1>
          <p className="mt-5 text-base lg:text-lg text-indigo-100/90 leading-relaxed font-normal">
            Admissions, attendance, marks and fees — everything your institute needs, in one beautiful workspace.
          </p>

          {/* 3 Floating Stat Cards */}
          <div className="grid grid-cols-3 gap-3.5 mt-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-sm hover:bg-white/15 transition-all">
              <p className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">1,248</p>
              <p className="text-xs font-medium text-indigo-200 mt-1">Students</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-sm hover:bg-white/15 transition-all">
              <p className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">94%</p>
              <p className="text-xs font-medium text-indigo-200 mt-1">Attendance</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-sm hover:bg-white/15 transition-all">
              <p className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">82%</p>
              <p className="text-xs font-medium text-indigo-200 mt-1">Avg. score</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-indigo-200/70">
          © 2026 SmartInstituteCRM · Privacy · Terms
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          {/* Admin Portal Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
          <p className="text-sm text-slate-500 mt-1.5 mb-6">
            Sign in to continue to your dashboard
          </p>

          {/* Quick Role Picker Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
            {(['admin', 'teacher', 'student'] as UserRole[]).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleChange(role)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  selectedRole === role
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@smartinstitute.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setShowForgotModal(true);
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#5E48E8] hover:bg-[#4F38DF] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer mt-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom Note */}
          <p className="text-center text-xs text-slate-500 mt-8">
            Don't have access?{' '}
            <button 
              onClick={() => showToast('Contacting system admin at admin@smartinstitute.com')}
              className="font-semibold text-indigo-600 hover:underline cursor-pointer"
            >
              Contact your administrator
            </button>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Reset your password</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Enter your institute email and we'll send you a secure verification link to reset your account password.
            </p>
            {resetSent ? (
              <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Verification link dispatched! Redirecting...</span>
              </div>
            ) : (
              <form onSubmit={handleSendReset} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="you@smartinstitute.edu"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer shadow-sm"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

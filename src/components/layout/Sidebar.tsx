import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  BarChart2, 
  Wallet, 
  Clock, 
  Settings, 
  GraduationCap,
  LogOut,
  Award,
  BookOpen,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeNav, setActiveNav, currentUser, setCurrentUser, showToast } = useApp();

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully');
  };

  // Dynamic Navigation Items based on Role
  const role = currentUser?.role || 'admin';

  let menuItems: { id: string; label: string; icon: any }[] = [];
  let systemItems: { id: string; label: string; icon: any }[] = [];

  if (role === 'student') {
    menuItems = [
      { id: 'student-portal', label: 'My Dashboard', icon: LayoutDashboard },
      { id: 'attendance', label: 'My Attendance', icon: CalendarCheck },
      { id: 'marks', label: 'Grades & Marks', icon: Award },
      { id: 'fees', label: 'Fee Receipts', icon: Wallet },
      { id: 'timetable', label: 'Class Timetable', icon: Clock },
    ];
  } else if (role === 'teacher') {
    menuItems = [
      { id: 'teacher-portal', label: 'Faculty Dashboard', icon: LayoutDashboard },
      { id: 'attendance', label: 'Mark Attendance', icon: CalendarCheck },
      { id: 'marks', label: 'Enter Marks', icon: BarChart2 },
      { id: 'students', label: 'My Class Students', icon: Users },
      { id: 'timetable', label: 'My Timetable', icon: Clock },
    ];
  } else {
    // Admin
    menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'students', label: 'Students', icon: Users },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
      { id: 'marks', label: 'Marks', icon: BarChart2 },
      { id: 'fees', label: 'Fees', icon: Wallet },
      { id: 'timetable', label: 'Timetable', icon: Clock },
    ];
    systemItems = [
      { id: 'settings', label: 'Settings', icon: Settings },
    ];
  }

  return (
    <aside className="w-[264px] min-h-screen bg-[#0E1527] border-r border-slate-800/80 flex flex-col shrink-0 select-none">
      {/* Brand Logo Header */}
      <div className="p-6 pb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-base tracking-tight leading-none flex items-center gap-1.5">
            SmartInstitute
          </h1>
          <span className="text-xs text-slate-400 font-medium mt-1 inline-block">
            CRM · {role === 'admin' ? 'Admin' : role === 'teacher' ? 'Faculty' : 'Student'}
          </span>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 px-4 space-y-6">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase px-3 mb-2.5">
            MENU
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#5E48E8] text-white shadow-lg shadow-indigo-600/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {systemItems.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase px-3 mb-2.5">
              SYSTEM
            </p>
            <nav className="space-y-1">
              {systemItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                      isActive
                        ? 'bg-[#5E48E8] text-white shadow-lg shadow-indigo-600/30 font-semibold'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* User profile & logout footer */}
      <div className="p-4 border-t border-slate-800/60 mt-auto">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 hover:bg-slate-900 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center shrink-0">
              {currentUser?.avatarInitials || 'AD'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate leading-tight">
                {currentUser?.name || 'Admin User'}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {currentUser?.email || 'admin@smartinstitute.com'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { Search, Bell, ChevronDown, CheckCircle2, User, ShieldCheck, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { currentUser, setCurrentUser, globalSearch, setGlobalSearch, activities, showToast } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Global Search Bar */}
      <div className="w-96 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          placeholder="Search students, classes, exams..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-indigo-400 focus:outline-none transition-all"
        />
      </div>

      {/* Right Controls: Notification Bell + Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/40 relative transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2.5 right-2.5 ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                <span className="font-semibold text-xs text-slate-800">Notifications</span>
                <span className="text-[11px] font-medium text-indigo-600 hover:underline cursor-pointer">Mark all as read</span>
              </div>
              <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto mt-1">
                {activities.slice(0, 4).map((act) => (
                  <div key={act.id} className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-700 leading-snug">{act.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{act.timeAgo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Pill Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-1 pr-2.5 py-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-[#4338CA] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {currentUser?.avatarInitials || 'AD'}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {currentUser?.name || 'Admin User'}
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                {currentUser?.roleTitle || 'Super Admin'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 ml-0.5" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-800">{currentUser?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
              </div>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  showToast('Role switched to Admin');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer text-left"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <span>Admin View (Active)</span>
              </button>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  showToast('Profile settings opened');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Account Profile</span>
              </button>
              <div className="border-t border-slate-100 my-1"></div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  setCurrentUser(null);
                  showToast('Signed out');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

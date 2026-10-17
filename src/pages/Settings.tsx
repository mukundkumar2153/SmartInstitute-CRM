import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Shield, Bell, Database, School, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Settings: React.FC = () => {
  const { showToast } = useApp();

  const [instituteName, setInstituteName] = useState('SmartInstitute of Technology');
  const [academicYear, setAcademicYear] = useState('2026-27');
  const [attendanceThreshold, setAttendanceThreshold] = useState(75);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Institute preferences saved successfully!');
  };

  return (
    <div className="p-8 max-w-[1000px] mx-auto space-y-7">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
        <p className="text-xs lg:text-sm text-slate-500 font-medium mt-1">
          Manage academic rules, thresholds, institute branding and preferences
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Institute Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <School className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Institute Profile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institute Name</label>
              <input
                type="text"
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Active Academic Year</label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white"
              >
                <option value="2026-27">2026–27 (Current)</option>
                <option value="2025-26">2025–26</option>
                <option value="2027-28">2027–28 (Upcoming)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Academic Thresholds */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Attendance & Academic Rules</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Minimum Attendance Threshold (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="50"
                  max="90"
                  value={attendanceThreshold}
                  onChange={(e) => setAttendanceThreshold(Number(e.target.value))}
                  className="flex-1 accent-indigo-600 cursor-pointer"
                />
                <span className="w-12 text-center text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                  {attendanceThreshold}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Students below this percentage will be flagged for attention.</p>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Communication & Alerts</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 cursor-pointer hover:bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-slate-800">Email Notifications for Parents</p>
                <p className="text-[11px] text-slate-400">Dispatch automated emails on student absence or fee due date</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 cursor-pointer hover:bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-slate-800">SMS Gateway Integration</p>
                <p className="text-[11px] text-slate-400">Send urgent attendance SMS notifications</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#5E48E8] hover:bg-[#4F39DF] text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};

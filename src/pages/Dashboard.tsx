import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  Wallet, 
  Download, 
  Plus, 
  CalendarCheck, 
  BarChart2, 
  UserPlus, 
  Clock, 
  ChevronDown,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WEEKLY_ATTENDANCE_DATA } from '../data/mockData';
import { AddStudentModal } from '../components/modals/AddStudentModal';
import { ExportModal } from '../components/modals/ExportModal';

export const Dashboard: React.FC = () => {
  const { setActiveNav, classes, upcomingExams, activities, showToast } = useApp();
  const [selectedWeek, setSelectedWeek] = useState('This week');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-7">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-1">
            Thursday, 15 October 2026 <span className="mx-1.5">·</span> Academic Year 2026–27
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export report</span>
          </button>
          <button
            onClick={() => setIsAddStudentOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5E48E8] hover:bg-[#4F39DF] text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
              +4.2%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Total Students</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5 tracking-tight">1,248</h3>
          </div>
        </div>

        {/* Card 2: Total Teachers */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
              +2
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Total Teachers</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5 tracking-tight">64</h3>
          </div>
        </div>

        {/* Card 3: Today's Attendance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
              +1.8%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Today's Attendance</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5 tracking-tight">94.2%</h3>
          </div>
        </div>

        {/* Card 4: Fees Collected */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600">
              -3.1%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Fees Collected</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5 tracking-tight">₹18.6L</h3>
          </div>
        </div>
      </div>

      {/* Middle Row: Weekly Attendance Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Attendance Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Weekly Attendance</h2>
            <div className="relative">
              <button
                onClick={() => showToast('Switched to current academic week')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>{selectedWeek}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900 tracking-tight">93.4%</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>+2.1% vs last week</span>
            </span>
            <span className="text-xs text-slate-400 font-normal">Average across all classes</span>
          </div>

          {/* Bar Chart Container */}
          <div className="mt-6 pt-6 border-t border-slate-50">
            <div className="h-48 flex items-end justify-between gap-3 px-2">
              {WEEKLY_ATTENDANCE_DATA.map((item, index) => {
                const heightPercent = item.attendance;
                const isCurrent = item.isCurrent;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group cursor-pointer">
                    <div className="text-[11px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                      {item.attendance}%
                    </div>
                    <div className="w-full max-w-[46px] h-36 bg-slate-100/70 rounded-xl flex items-end overflow-hidden p-0.5">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-lg transition-all duration-500 ${
                          isCurrent
                            ? 'bg-[#5E48E8] shadow-md shadow-indigo-500/25'
                            : 'bg-[#D9E1FC] group-hover:bg-indigo-300'
                        }`}
                      />
                    </div>
                    <span className={`text-xs mt-3 font-semibold ${isCurrent ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity List (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Recent Activity</h2>
            <button 
              onClick={() => showToast('Opening activity audit stream')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>

          <div className="space-y-4 my-auto">
            {activities.map((act) => {
              let icon = <CalendarCheck className="w-4 h-4 text-emerald-600" />;
              let bg = 'bg-emerald-50';

              if (act.type === 'marks') {
                icon = <BarChart2 className="w-4 h-4 text-indigo-600" />;
                bg = 'bg-indigo-50';
              } else if (act.type === 'fees') {
                icon = <Wallet className="w-4 h-4 text-amber-600" />;
                bg = 'bg-amber-50';
              } else if (act.type === 'admission') {
                icon = <UserPlus className="w-4 h-4 text-sky-600" />;
                bg = 'bg-sky-50';
              }

              return (
                <div key={act.id} className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                    {icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 truncate">{act.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{act.timeAgo}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 text-center">
            <button 
              onClick={() => setActiveNav('attendance')}
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Take quick attendance</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Class Overview Table + Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Class Overview Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900">Class Overview</h2>
            <button 
              onClick={() => setActiveNav('students')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
            >
              View all classes
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">CLASS</th>
                  <th className="pb-3 font-semibold">CLASS TEACHER</th>
                  <th className="pb-3 font-semibold">STUDENTS</th>
                  <th className="pb-3 font-semibold">ATTENDANCE</th>
                  <th className="pb-3 font-semibold">AVG. MARKS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70 text-xs">
                {classes.map((cls) => (
                  <tr key={cls.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 font-bold text-slate-900">{cls.name}</td>
                    <td className="py-3.5 text-slate-600 font-medium">{cls.classTeacher}</td>
                    <td className="py-3.5 text-slate-600 font-medium">{cls.studentsCount}</td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${cls.attendancePercent >= 94 ? 'bg-emerald-500' : cls.attendancePercent >= 90 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${cls.attendancePercent}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800">{cls.attendancePercent}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 font-bold text-indigo-600">{cls.avgMarks}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Exams Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Upcoming Exams</h2>
            <button 
              onClick={() => showToast('Opening exam schedule dialog')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
            >
              Schedule
            </button>
          </div>

          <div className="space-y-3.5 my-auto">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-slate-50/70 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-50/80 border border-indigo-100 text-indigo-700 flex flex-col items-center justify-center shrink-0">
                  <span className="text-sm font-extrabold leading-none">{exam.dateDay}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 leading-none">{exam.dateMonth}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800 leading-snug truncate">{exam.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{exam.classAndTiming}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button 
              onClick={() => setActiveNav('marks')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Go to Marks Entry
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddStudentModal isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} />
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
};

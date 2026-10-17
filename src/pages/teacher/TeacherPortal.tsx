import React from 'react';
import { 
  GraduationCap, 
  CalendarCheck, 
  BarChart2, 
  Users, 
  Clock, 
  ArrowRight,
  BookOpen,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherPortal: React.FC = () => {
  const { currentUser, setActiveNav, students } = useApp();

  const classStudents = students.filter(s => s.class === 'FY BSc IT — A');

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-7">
      {/* Teacher Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-7 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 text-white font-extrabold text-xl flex items-center justify-center">
              {currentUser?.avatarInitials || 'PK'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{currentUser?.name || 'Prof. Kulkarni'}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  Faculty Portal
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Department of Computer Science <span className="mx-1.5">·</span> Class Teacher · FY BSc IT — Division A
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveNav('attendance')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5E48E8] hover:bg-[#4F39DF] text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Mark Today's Attendance</span>
            </button>
            <button
              onClick={() => setActiveNav('marks')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-all cursor-pointer"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Enter Marks</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Faculty KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">My Classes</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">2 Classes</h3>
            <p className="text-[11px] text-slate-400 mt-1">FY BSc IT — A, TY BSc IT — A</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Enrolled</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Total Students</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">112 Students</h3>
            <p className="text-[11px] text-slate-400 mt-1">Across 2 divisions</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Next: 10:00 AM</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Today's Lecture</p>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5 truncate">Data Structures</h3>
            <p className="text-[11px] text-slate-400 mt-1">Lab 4 · FY BSc IT — A</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">94.6% Avg</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Class Attendance</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">94.6%</h3>
            <p className="text-[11px] text-slate-400 mt-1">FY BSc IT — Division A</p>
          </div>
        </div>
      </div>

      {/* Two columns: Assigned Students & Faculty Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Students in class (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">FY BSc IT — Division A Students</h2>
            <button
              onClick={() => setActiveNav('attendance')}
              className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Take Attendance →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {classStudents.slice(0, 5).map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${s.avatarColor} text-white font-bold text-xs flex items-center justify-center`}>
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{s.name}</p>
                    <p className="text-[10px] text-slate-400">Roll: {s.rollNo} · {s.studentId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700">{s.attendancePercent}% Attd</span>
                  <span className="text-xs font-bold text-indigo-600">{s.marks}/50 Marks</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Schedule (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4">Today's Faculty Schedule</h2>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-100 border-l-4 border-l-emerald-500 bg-emerald-50/40">
              <span className="text-[10px] font-bold text-emerald-700">10:00 AM - 11:00 AM</span>
              <p className="text-xs font-bold text-slate-900 mt-1">Data Structures (Theory)</p>
              <p className="text-[11px] text-slate-500">FY BSc IT — A · Lab 4</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-100 border-l-4 border-l-indigo-500 bg-indigo-50/40">
              <span className="text-[10px] font-bold text-indigo-700">01:30 PM - 03:30 PM</span>
              <p className="text-xs font-bold text-slate-900 mt-1">Data Structures Lab Practical</p>
              <p className="text-[11px] text-slate-500">FY BSc IT — A (Batch 1 & 2) · Lab 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

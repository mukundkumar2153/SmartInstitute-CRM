import React, { useState, useMemo } from 'react';
import { 
  Check, 
  CheckCircle2, 
  X, 
  Clock, 
  Users, 
  Calendar as CalendarIcon, 
  ChevronDown,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AttendanceStatus } from '../types';

export const Attendance: React.FC = () => {
  const { 
    students, 
    attendanceRecords, 
    updateAttendance, 
    markAllPresent, 
    saveAttendance 
  } = useApp();

  const [selectedClass, setSelectedClass] = useState('FY BSc IT — A');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures');
  const [selectedDate, setSelectedDate] = useState('15 Oct 2026');
  const [selectedLecture, setSelectedLecture] = useState('Lecture 3 · 10:00 AM');
  const [filterTab, setFilterTab] = useState<'all' | 'present' | 'absent' | 'late'>('all');

  // Filter students by selected class
  const classStudents = useMemo(() => {
    return students.filter(s => s.class === 'FY BSc IT — A');
  }, [students]);

  // Live Count Calculations
  const stats = useMemo(() => {
    let present = 0;
    let absent = 0;
    let late = 0;

    classStudents.forEach(student => {
      const rec = attendanceRecords[student.studentId];
      const status = rec?.status || 'Present';
      if (status === 'Present') present++;
      else if (status === 'Absent') absent++;
      else if (status === 'Late') late++;
    });

    const total = classStudents.length || 60;
    const presentPct = total > 0 ? ((present / total) * 100).toFixed(1) : '0.0';
    const absentPct = total > 0 ? ((absent / total) * 100).toFixed(1) : '0.0';
    const latePct = total > 0 ? ((late / total) * 100).toFixed(1) : '0.0';

    return { total, present, absent, late, presentPct, absentPct, latePct };
  }, [classStudents, attendanceRecords]);

  // Filter students based on active tab
  const displayedStudents = useMemo(() => {
    if (filterTab === 'all') return classStudents;
    return classStudents.filter(student => {
      const status = attendanceRecords[student.studentId]?.status || 'Present';
      return status.toLowerCase() === filterTab;
    });
  }, [classStudents, attendanceRecords, filterTab]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header matching Image 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Attendance</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-1">
            Mark and review daily attendance <span className="mx-1.5">·</span> FY BSc IT — Division A
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllPresent}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Mark all present</span>
          </button>
          <button
            onClick={saveAttendance}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5E48E8] hover:bg-[#4F39DF] text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {/* 4 Filter Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Class selector */}
        <div className="bg-white rounded-2xl p-3 px-4 border border-slate-200/80 shadow-xs relative">
          <label className="block text-[11px] font-medium text-slate-400">Class</label>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs font-bold text-slate-800">{selectedClass}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Subject selector */}
        <div className="bg-white rounded-2xl p-3 px-4 border border-slate-200/80 shadow-xs relative">
          <label className="block text-[11px] font-medium text-slate-400">Subject</label>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs font-bold text-slate-800">{selectedSubject}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Date selector */}
        <div className="bg-white rounded-2xl p-3 px-4 border border-slate-200/80 shadow-xs relative">
          <label className="block text-[11px] font-medium text-slate-400">Date</label>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs font-bold text-slate-800">{selectedDate}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Lecture selector */}
        <div className="bg-white rounded-2xl p-3 px-4 border border-slate-200/80 shadow-xs relative">
          <label className="block text-[11px] font-medium text-slate-400">Lecture</label>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs font-bold text-slate-800">{selectedLecture}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Total Students</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{stats.total}</span>
                <span className="text-[11px] font-semibold text-slate-400">Class A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Present */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Present</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{stats.present}</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
                  {stats.presentPct}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Absent */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <X className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Absent</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{stats.absent}</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600">
                  {stats.absentPct}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Late */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Late</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{stats.late}</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600">
                  {stats.latePct}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student List & Attendance Marking Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Table Top Header with Tabs */}
        <div className="p-5 px-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Student List</h2>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All · {stats.total}
            </button>
            <button
              onClick={() => setFilterTab('present')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterTab === 'present'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Present · {stats.present}
            </button>
            <button
              onClick={() => setFilterTab('absent')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterTab === 'absent'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Absent · {stats.absent}
            </button>
            <button
              onClick={() => setFilterTab('late')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterTab === 'late'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Late · {stats.late}
            </button>
          </div>
        </div>

        {/* Attendance Marking Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6 w-24">ROLL NO</th>
                <th className="py-3.5 px-6">STUDENT</th>
                <th className="py-3.5 px-6 w-72">STATUS</th>
                <th className="py-3.5 px-6">REMARKS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-xs">
              {displayedStudents.map((student) => {
                const currentStatus = attendanceRecords[student.studentId]?.status || 'Present';
                const currentRemarks = attendanceRecords[student.studentId]?.remarks || '—';

                const initials = student.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2);

                return (
                  <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Roll No */}
                    <td className="py-3.5 px-6 font-semibold text-slate-700">
                      {student.rollNo}
                    </td>

                    {/* Student Info */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${student.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{student.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{student.studentId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Segmented Status Toggle (Matching Image 4) */}
                    <td className="py-3.5 px-6">
                      <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/60">
                        {/* Present Toggle */}
                        <button
                          type="button"
                          onClick={() => updateAttendance(student.studentId, 'Present')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentStatus === 'Present'
                              ? 'bg-[#10B981] text-white shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Present
                        </button>

                        {/* Absent Toggle */}
                        <button
                          type="button"
                          onClick={() => updateAttendance(student.studentId, 'Absent')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentStatus === 'Absent'
                              ? 'bg-[#EF4444] text-white shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Absent
                        </button>

                        {/* Late Toggle */}
                        <button
                          type="button"
                          onClick={() => updateAttendance(student.studentId, 'Late')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentStatus === 'Late'
                              ? 'bg-[#F59E0B] text-white shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>

                    {/* Editable Remarks */}
                    <td className="py-3.5 px-6">
                      <input
                        type="text"
                        value={currentRemarks}
                        onChange={(e) => updateAttendance(student.studentId, currentStatus, e.target.value)}
                        placeholder="Add remark..."
                        className="w-full max-w-xs px-2.5 py-1 text-xs text-slate-700 bg-transparent hover:bg-slate-50 focus:bg-white rounded-lg border border-transparent hover:border-slate-200 focus:border-indigo-400 focus:outline-none transition-all"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

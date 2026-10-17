import React, { useState } from 'react';
import { 
  CheckCircle2, 
  CalendarCheck, 
  Award, 
  Wallet, 
  Clock, 
  BookOpen, 
  Download, 
  FileText, 
  AlertCircle,
  TrendingUp,
  MapPin,
  User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentPortal: React.FC = () => {
  const { currentUser, students, marksRecords, maxMarks, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'marks' | 'fees' | 'timetable'>('overview');

  // Find logged-in student record
  const student = students.find(s => s.email === currentUser?.email || s.name === currentUser?.name) || students[0];
  const myMark = marksRecords[student.studentId] !== undefined ? marksRecords[student.studentId] : 44;
  const myPct = Math.round((myMark / maxMarks) * 100);

  const subjectAttendance = [
    { subject: 'Data Structures', attended: 24, total: 25, pct: 96, teacher: 'Prof. Kulkarni' },
    { subject: 'Computer Networks', attended: 23, total: 25, pct: 92, teacher: 'Prof. Iyer' },
    { subject: 'Applied Mathematics', attended: 20, total: 21, pct: 95, teacher: 'Prof. Deshmukh' },
    { subject: 'Digital Electronics', attended: 18, total: 20, pct: 90, teacher: 'Prof. Joshi' },
  ];

  const reportCard = [
    { subject: 'Computer Networks', exam: 'Unit Test 2', marks: myMark, max: maxMarks, grade: 'A', status: 'Passed' },
    { subject: 'Data Structures', exam: 'Unit Test 1', marks: 46, max: 50, grade: 'A+', status: 'Passed' },
    { subject: 'Applied Mathematics', exam: 'Mid-Term', marks: 42, max: 50, grade: 'A', status: 'Passed' },
    { subject: 'Web Technologies', exam: 'Practical', marks: 48, max: 50, grade: 'A+', status: 'Passed' },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-7">
      {/* Student Profile Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 rounded-3xl p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-extrabold text-xl flex items-center justify-center shadow-inner">
              {currentUser?.avatarInitials || 'AS'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{currentUser?.name || student.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Student Portal
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-1">
                {student.class} <span className="mx-1.5">·</span> Roll No: {student.rollNo} <span className="mx-1.5">·</span> ID: {student.studentId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Generating Student ID & Admit Card PDF...')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download ID Card</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-7 pt-5 border-t border-white/10 overflow-x-auto">
          {[
            { id: 'overview', label: 'My Dashboard' },
            { id: 'attendance', label: 'Attendance Breakdown' },
            { id: 'marks', label: 'Grades & Report Card' },
            { id: 'fees', label: 'Fee Receipts' },
            { id: 'timetable', label: 'Lecture Schedule' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-900 shadow-md font-extrabold'
                  : 'text-indigo-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Personal KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Attendance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Eligible
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">My Attendance</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5">{student.attendancePercent}%</h3>
            <p className="text-[11px] text-slate-400 mt-1">47 of 50 lectures attended</p>
          </div>
        </div>

        {/* Avg Marks */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              Rank #3
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Academic Score</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5">{myPct}%</h3>
            <p className="text-[11px] text-slate-400 mt-1">Grade A · Distinction</p>
          </div>
        </div>

        {/* Fees */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {student.feeStatus}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Semester Fees</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5">₹25,000</h3>
            <p className="text-[11px] text-slate-400 mt-1">Zero pending dues</p>
          </div>
        </div>

        {/* Next Exam */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              In 2 Days
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Upcoming Exam</p>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5 truncate">Unit Test 2</h3>
            <p className="text-[11px] text-slate-400 mt-1">18 Oct · Computer Networks</p>
          </div>
        </div>
      </div>

      {/* Dynamic Tab Views */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Subject Attendance Highlights (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4">Subject-wise Attendance</h2>
            <div className="space-y-4">
              {subjectAttendance.map((sub) => (
                <div key={sub.subject} className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{sub.subject}</p>
                      <p className="text-[11px] text-slate-400">{sub.teacher}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-slate-900">{sub.pct}%</span>
                      <p className="text-[10px] text-slate-400">{sub.attended}/{sub.total} sessions</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2.5">
                    <div 
                      className="h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${sub.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements & Notices (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-4">Institute Notices</h2>
              <div className="space-y-3.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">Exam Cell</span>
                  <p className="text-xs font-bold text-slate-800 mt-1.5">Unit Test 2 Schedule Released</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Please carry your hall ticket and verified college ID card.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700">Notice</span>
                  <p className="text-xs font-bold text-slate-800 mt-1.5">Diwali Vacation Notice</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Classes remain closed from 28 Oct to 5 Nov 2026.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-400">Class Representative: Rohan Mehta</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'marks' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="p-5 px-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Academic Scorecard · FY BSc IT (Sem 1)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Official provisional marks statement</p>
            </div>
            <button
              onClick={() => showToast('Downloading Official Marks Statement PDF...')}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#5E48E8] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Transcript</span>
            </button>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase">
                <th className="py-3 px-6">SUBJECT</th>
                <th className="py-3 px-6">EXAM</th>
                <th className="py-3 px-6">MARKS OBTAINED</th>
                <th className="py-3 px-6">MAX MARKS</th>
                <th className="py-3 px-6">GRADE</th>
                <th className="py-3 px-6">RESULT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportCard.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3.5 px-6 font-bold text-slate-900">{item.subject}</td>
                  <td className="py-3.5 px-6 text-slate-600">{item.exam}</td>
                  <td className="py-3.5 px-6 font-extrabold text-indigo-600">{item.marks}</td>
                  <td className="py-3.5 px-6 text-slate-500">{item.max}</td>
                  <td className="py-3.5 px-6">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                      {item.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-emerald-600">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-slate-900">Attendance Register & Log</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectAttendance.map((sub) => (
              <div key={sub.subject} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{sub.subject}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{sub.teacher}</p>
                  </div>
                  <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">
                    {sub.pct}%
                  </span>
                </div>
                <div className="mt-3">
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${sub.pct}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-medium">
                    <span>Present: {sub.attended} lectures</span>
                    <span>Total: {sub.total} lectures</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'fees' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Fee Payment History</h2>
              <p className="text-xs text-slate-400">Official fee receipts for tax and records</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
              All Dues Cleared
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Semester 1 Tuition & Lab Fees</p>
                <p className="text-[11px] text-slate-400">Receipt: REC-2026-1042 · Paid via UPI on 15 Oct 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-extrabold text-slate-900">₹25,000</span>
              <button
                onClick={() => showToast('Downloading Receipt REC-2026-1042 PDF...')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timetable' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">Today's Class Schedule (FY BSc IT — Division A)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border-l-4 border-l-indigo-500 bg-indigo-50/50">
              <span className="text-[10px] font-bold text-indigo-700">09:00 AM - 10:00 AM</span>
              <p className="text-xs font-bold text-slate-900 mt-1">Applied Mathematics</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Prof. Deshmukh · Room 301</p>
            </div>
            <div className="p-4 rounded-xl border-l-4 border-l-emerald-500 bg-emerald-50/50">
              <span className="text-[10px] font-bold text-emerald-700">10:00 AM - 11:00 AM</span>
              <p className="text-xs font-bold text-slate-900 mt-1">Data Structures</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Prof. Kulkarni · Lab 4</p>
            </div>
            <div className="p-4 rounded-xl border-l-4 border-l-purple-500 bg-purple-50/50">
              <span className="text-[10px] font-bold text-purple-700">11:30 AM - 12:30 PM</span>
              <p className="text-xs font-bold text-slate-900 mt-1">Computer Networks</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Prof. Iyer · Room 304</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

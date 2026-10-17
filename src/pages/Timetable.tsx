import React, { useState } from 'react';
import { Clock, Calendar, BookOpen, User, MapPin, ChevronDown, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Timetable: React.FC = () => {
  const { showToast } = useApp();
  const [selectedClass, setSelectedClass] = useState('FY BSc IT — A');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const schedule = [
    {
      time: '09:00 AM - 10:00 AM',
      period: 'Lecture 1',
      items: [
        { subject: 'Applied Mathematics', teacher: 'Prof. Deshmukh', room: 'Room 301', color: 'border-l-indigo-500 bg-indigo-50/50' },
        { subject: 'Digital Electronics', teacher: 'Prof. Joshi', room: 'Lab 2', color: 'border-l-teal-500 bg-teal-50/50' },
        { subject: 'Applied Mathematics', teacher: 'Prof. Deshmukh', room: 'Room 301', color: 'border-l-indigo-500 bg-indigo-50/50' },
        { subject: 'Computer Networks', teacher: 'Prof. Iyer', room: 'Room 304', color: 'border-l-purple-500 bg-purple-50/50' },
        { subject: 'Digital Electronics', teacher: 'Prof. Joshi', room: 'Lab 2', color: 'border-l-teal-500 bg-teal-50/50' },
        { subject: 'Soft Skills Seminar', teacher: 'Guest Speaker', room: 'Auditorium', color: 'border-l-amber-500 bg-amber-50/50' },
      ]
    },
    {
      time: '10:00 AM - 11:00 AM',
      period: 'Lecture 2',
      items: [
        { subject: 'Data Structures', teacher: 'Prof. Kulkarni', room: 'Lab 4', color: 'border-l-emerald-500 bg-emerald-50/50' },
        { subject: 'Data Structures', teacher: 'Prof. Kulkarni', room: 'Lab 4', color: 'border-l-emerald-500 bg-emerald-50/50' },
        { subject: 'Computer Networks', teacher: 'Prof. Iyer', room: 'Room 304', color: 'border-l-purple-500 bg-purple-50/50' },
        { subject: 'Data Structures', teacher: 'Prof. Kulkarni', room: 'Lab 4', color: 'border-l-emerald-500 bg-emerald-50/50' },
        { subject: 'Applied Mathematics', teacher: 'Prof. Deshmukh', room: 'Room 301', color: 'border-l-indigo-500 bg-indigo-50/50' },
        { subject: 'Project Lab', teacher: 'Prof. Kulkarni', room: 'Lab 4', color: 'border-l-emerald-500 bg-emerald-50/50' },
      ]
    },
    {
      time: '11:00 AM - 11:30 AM',
      period: 'Recess Break',
      isBreak: true
    },
    {
      time: '11:30 AM - 12:30 PM',
      period: 'Lecture 3',
      items: [
        { subject: 'Computer Networks', teacher: 'Prof. Iyer', room: 'Room 304', color: 'border-l-purple-500 bg-purple-50/50' },
        { subject: 'Web Technologies', teacher: 'Prof. Rane', room: 'Lab 1', color: 'border-l-pink-500 bg-pink-50/50' },
        { subject: 'Data Structures', teacher: 'Prof. Kulkarni', room: 'Lab 4', color: 'border-l-emerald-500 bg-emerald-50/50' },
        { subject: 'Web Technologies', teacher: 'Prof. Rane', room: 'Lab 1', color: 'border-l-pink-500 bg-pink-50/50' },
        { subject: 'Database Systems', teacher: 'Prof. Verma', room: 'Room 302', color: 'border-l-blue-500 bg-blue-50/50' },
        { subject: 'Sports / Library', teacher: 'Coach Patel', room: 'Gymkhana', color: 'border-l-slate-500 bg-slate-50/50' },
      ]
    }
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Academic Timetable</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-1">
            Weekly class lecture schedule & room assignments · Semester 1
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-xs cursor-pointer focus:outline-none"
            >
              <option value="FY BSc IT — A">FY BSc IT — Division A</option>
              <option value="SY BSc IT — B">SY BSc IT — Division B</option>
              <option value="TY AI & DS — A">TY AI & DS — Division A</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => showToast('Opening slot editor')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5E48E8] hover:bg-[#4F39DF] text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slot</span>
          </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-40 text-center">TIME & PERIOD</th>
                {days.map((day) => (
                  <th key={day} className="py-3.5 px-3 font-bold">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {schedule.map((row, idx) => {
                if (row.isBreak) {
                  return (
                    <tr key={idx} className="bg-slate-50/50">
                      <td colSpan={7} className="py-2.5 text-center text-xs font-bold text-slate-400 tracking-wider uppercase">
                        ☕ {row.time} · {row.period}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={idx}>
                    <td className="py-4 px-4 bg-slate-50/30 text-center border-r border-slate-100">
                      <p className="font-bold text-slate-800">{row.period}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{row.time}</p>
                    </td>
                    {row.items?.map((item, dIdx) => (
                      <td key={dIdx} className="p-2 align-top">
                        <div className={`p-2.5 rounded-xl border border-slate-100 border-l-4 ${item.color} transition-all hover:shadow-xs`}>
                          <p className="font-bold text-slate-900 leading-tight">{item.subject}</p>
                          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                            <User className="w-3 h-3 text-slate-400" />
                            <span>{item.teacher}</span>
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{item.room}</span>
                          </p>
                        </div>
                      </td>
                    ))}
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

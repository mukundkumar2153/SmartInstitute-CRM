import React, { useState, useMemo } from 'react';
import { 
  Upload, 
  Check, 
  Search, 
  BarChart2, 
  Award, 
  AlertTriangle, 
  TrendingUp, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Marks: React.FC = () => {
  const { 
    students, 
    marksRecords, 
    maxMarks, 
    setMaxMarks, 
    updateStudentMark, 
    saveMarks, 
    showToast 
  } = useApp();

  const [selectedClass, setSelectedClass] = useState('FY BSc IT — A');
  const [selectedExam, setSelectedExam] = useState('Unit Test 2');
  const [selectedSubject, setSelectedSubject] = useState('Computer Networks');
  const [searchQuery, setSearchQuery] = useState('');

  // Class students
  const classStudents = useMemo(() => {
    return students.filter(s => s.class === 'FY BSc IT — A');
  }, [students]);

  // Dynamic Grade & Percentage Calculations
  const calculateGradeAndPercentage = (mark: number) => {
    const pct = Math.round((mark / maxMarks) * 100);
    let grade = 'F';
    let gradeColor = 'bg-rose-50 text-rose-700';

    if (pct >= 95) {
      grade = 'A+';
      gradeColor = 'bg-emerald-50 text-emerald-700';
    } else if (pct >= 85) {
      grade = 'A';
      gradeColor = 'bg-emerald-50 text-emerald-700';
    } else if (pct >= 75) {
      grade = 'B+';
      gradeColor = 'bg-indigo-50 text-indigo-700';
    } else if (pct >= 60) {
      grade = 'B';
      gradeColor = 'bg-indigo-50 text-indigo-700';
    } else if (pct >= 45) {
      grade = 'C';
      gradeColor = 'bg-amber-50 text-amber-700';
    }

    return { pct, grade, gradeColor };
  };

  // Dynamic Aggregated Analytics
  const analytics = useMemo(() => {
    let totalMarks = 0;
    let highest = -1;
    let highestStudent = '';
    let lowest = 9999;
    let lowestStudent = '';
    let passedCount = 0;

    const distribution: Record<string, number> = {
      'A+': 12,
      'A': 18,
      'B+': 14,
      'B': 9,
      'C': 4,
      'F': 3
    };

    // Calculate from class students
    classStudents.forEach(s => {
      const mark = marksRecords[s.studentId] !== undefined ? marksRecords[s.studentId] : 38;
      totalMarks += mark;

      if (mark > highest) {
        highest = mark;
        highestStudent = s.name.split(' ')[0] + ' ' + (s.name.split(' ')[1] ? s.name.split(' ')[1][0] + '.' : '');
      }

      if (mark < lowest) {
        lowest = mark;
        lowestStudent = s.name.split(' ')[0] + ' ' + (s.name.split(' ')[1] ? s.name.split(' ')[1][0] + '.' : '');
      }

      const pct = (mark / maxMarks) * 100;
      if (pct >= 40) passedCount++;
    });

    const count = classStudents.length || 1;
    const avg = (totalMarks / count).toFixed(1);
    const passRate = Math.round((passedCount / count) * 100);

    return {
      avg,
      highest: highest > -1 ? highest : 49,
      highestStudent: highestStudent || 'Saanvi R.',
      lowest: lowest < 9999 ? lowest : 18,
      lowestStudent: lowestStudent || 'Isha N.',
      passRate: passRate || 91,
      distribution
    };
  }, [classStudents, marksRecords, maxMarks]);

  // Filtered students for table
  const displayedStudents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return classStudents;
    return classStudents.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.studentId.toLowerCase().includes(q) || 
      s.rollNo.includes(q)
    );
  }, [classStudents, searchQuery]);

  const handleImportCSV = () => {
    showToast('Demo CSV imported: loaded 60 student score records.');
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header matching Image 5 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Marks Entry</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-1">
            Unit Test 2 <span className="mx-1.5">·</span> Computer Networks <span className="mx-1.5">·</span> FY BSc IT — Division A
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleImportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Import CSV</span>
          </button>
          <button
            onClick={saveMarks}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5E48E8] hover:bg-[#4F39DF] text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Marks</span>
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

        {/* Exam selector */}
        <div className="bg-white rounded-2xl p-3 px-4 border border-slate-200/80 shadow-xs relative">
          <label className="block text-[11px] font-medium text-slate-400">Exam</label>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs font-bold text-slate-800">{selectedExam}</span>
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

        {/* Max Marks selector */}
        <div className="bg-white rounded-2xl p-3 px-4 border border-slate-200/80 shadow-xs relative">
          <label className="block text-[11px] font-medium text-slate-400">Max Marks</label>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs font-bold text-slate-800">{maxMarks}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Class Average */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Class Average</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{analytics.avg}</span>
                <span className="text-xs font-semibold text-slate-400">/ {maxMarks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highest Score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Highest Score</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{analytics.highest}</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
                  {analytics.highestStudent}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lowest Score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Lowest Score</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{analytics.lowest}</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600">
                  {analytics.lowestStudent}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pass Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Pass Rate</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">{analytics.passRate}%</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600">
                  +4%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Enter Marks Table (8 Cols) & Right Grade Distribution (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enter Marks Table Card (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-5 px-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Enter Marks</h2>
            <div className="w-64 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find student"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 focus:bg-white rounded-xl border border-slate-200/80 focus:border-indigo-400 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-6 w-20">ROLL</th>
                  <th className="py-3 px-6">STUDENT</th>
                  <th className="py-3 px-6 w-36">MARKS</th>
                  <th className="py-3 px-6">PERCENTAGE</th>
                  <th className="py-3 px-6 w-20 text-center">GRADE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 text-xs">
                {displayedStudents.map((student) => {
                  const currentMark = marksRecords[student.studentId] !== undefined ? marksRecords[student.studentId] : 40;
                  const { pct, grade, gradeColor } = calculateGradeAndPercentage(currentMark);

                  const initials = student.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2);

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Roll */}
                      <td className="py-3.5 px-6 font-semibold text-slate-600">
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

                      {/* Editable Marks Input */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max={maxMarks}
                            value={currentMark}
                            onChange={(e) => updateStudentMark(student.studentId, Number(e.target.value))}
                            className="w-14 px-2 py-1 font-bold text-slate-900 border border-slate-200 rounded-lg text-center bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
                          />
                          <span className="text-slate-400 font-medium text-xs">/ {maxMarks}</span>
                        </div>
                      </td>

                      {/* Percentage Bar */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                pct >= 85 ? 'bg-emerald-500' : pct >= 60 ? 'bg-indigo-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-800">{pct}%</span>
                        </div>
                      </td>

                      {/* Grade Pill */}
                      <td className="py-3.5 px-6 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs ${gradeColor}`}>
                          {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Grade Distribution Card & Insights (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Grade Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-5">Grade Distribution</h2>
            <div className="space-y-4">
              {[
                { grade: 'A+', count: 12, max: 20, color: 'bg-emerald-500' },
                { grade: 'A',  count: 18, max: 20, color: 'bg-emerald-500' },
                { grade: 'B+', count: 14, max: 20, color: 'bg-indigo-500' },
                { grade: 'B',  count: 9,  max: 20, color: 'bg-indigo-500' },
                { grade: 'C',  count: 4,  max: 20, color: 'bg-amber-500' },
                { grade: 'F',  count: 3,  max: 20, color: 'bg-rose-500' }
              ].map((row) => (
                <div key={row.grade} className="flex items-center gap-3">
                  <span className="w-7 text-xs font-bold text-slate-700">{row.grade}</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.color} transition-all duration-500`}
                      style={{ width: `${(row.count / row.max) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs font-bold text-slate-700">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comparative Insight Card */}
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-5 border border-indigo-100 shadow-xs flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-950 leading-snug">
                Class average is up 4%
              </p>
              <p className="text-[11px] text-indigo-700/80 mt-0.5">
                compared to Unit Test 1 across all subjects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

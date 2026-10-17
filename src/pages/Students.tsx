import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  MoreVertical, 
  ChevronDown, 
  Edit, 
  Trash2, 
  CreditCard,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Student, FeeStatus } from '../types';
import { AddStudentModal } from '../components/modals/AddStudentModal';
import { ExportModal } from '../components/modals/ExportModal';
import { RecordPaymentModal } from '../components/modals/RecordPaymentModal';

export const Students: React.FC = () => {
  const { students, deleteStudent, showToast, globalSearch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active' | 'Alumni'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'roll' | 'attendance'>('name');
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [paymentStudent, setPaymentStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Tab Counts
  const totalCount = 1248; // Preserving Figma metric 1,248
  const activeCount = 1201; // Preserving Figma metric 1,201
  const alumniCount = 47;   // Preserving Figma metric 47

  // Filtered & Sorted Students
  const filteredStudents = useMemo(() => {
    const q = (searchQuery || globalSearch).toLowerCase().trim();

    return students.filter((s) => {
      const matchesSearch = 
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        s.rollNo.includes(q) ||
        s.parentContact.includes(q);

      const matchesClass = selectedClass === 'All' || s.class.includes(selectedClass);
      const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;

      return matchesSearch && matchesClass && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'roll') return parseInt(a.rollNo) - parseInt(b.rollNo);
      if (sortBy === 'attendance') return b.attendancePercent - a.attendancePercent;
      return 0;
    });
  }, [students, searchQuery, globalSearch, selectedClass, selectedStatus, sortBy]);

  const getAttendanceBarColor = (pct: number) => {
    if (pct >= 90) return 'bg-[#10B981]'; // Vibrant Emerald
    if (pct >= 80) return 'bg-[#6366F1]'; // Indigo
    return 'bg-[#F59E0B]'; // Amber
  };

  const getFeeBadge = (status: FeeStatus) => {
    if (status === 'Paid') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
          Paid
        </span>
      );
    }
    if (status === 'Pending') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700">
        Overdue
      </span>
    );
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Students</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-1">
            1,248 enrolled <span className="mx-1.5">·</span> Academic Year 2026–27
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>
          <button
            onClick={() => {
              setEditingStudent(null);
              setIsAddOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5E48E8] hover:bg-[#4F39DF] text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="w-full md:w-96 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, roll no or parent contact"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200/80 focus:border-indigo-500 focus:outline-none transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Class Filter */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="All">Class: All classes</option>
              <option value="FY BSc IT">FY BSc IT — A</option>
              <option value="SY BSc IT">SY BSc IT — B</option>
              <option value="TY AI & DS">TY AI & DS — A</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="All">Status: All</option>
              <option value="Active">Status: Active</option>
              <option value="Alumni">Status: Alumni</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="name">Sort: Name A–Z</option>
              <option value="roll">Sort: Roll No</option>
              <option value="attendance">Sort: Attendance</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills & Tab Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">All Students</h2>
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setSelectedStatus('All')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedStatus === 'All'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All · {totalCount}
          </button>
          <button
            onClick={() => setSelectedStatus('Active')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedStatus === 'Active'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active · {activeCount}
          </button>
          <button
            onClick={() => setSelectedStatus('Alumni')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedStatus === 'Alumni'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Alumni · {alumniCount}
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">STUDENT</th>
                <th className="py-3.5 px-4">CLASS</th>
                <th className="py-3.5 px-4">ROLL NO</th>
                <th className="py-3.5 px-4">PARENT CONTACT</th>
                <th className="py-3.5 px-4">ATTENDANCE</th>
                <th className="py-3.5 px-4">FEES</th>
                <th className="py-3.5 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-xs">
              {filteredStudents.map((student) => {
                const initials = student.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2);

                return (
                  <tr key={student.id} className="hover:bg-slate-50/60 transition-colors group">
                    {/* Student Info */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${student.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {student.name}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium">{student.studentId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Class */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {student.class}
                    </td>

                    {/* Roll No */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {student.rollNo}
                    </td>

                    {/* Parent Contact */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {student.parentContact}
                    </td>

                    {/* Attendance */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${getAttendanceBarColor(
                              student.attendancePercent
                            )}`}
                            style={{ width: `${student.attendancePercent}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800">{student.attendancePercent}%</span>
                      </div>
                    </td>

                    {/* Fees */}
                    <td className="py-3.5 px-4">
                      {getFeeBadge(student.feeStatus)}
                    </td>

                    {/* Row Menu Actions */}
                    <td className="py-3.5 px-6 text-right relative">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === student.id ? null : student.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuId === student.id && (
                        <div className="absolute right-6 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-40 text-left">
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              showToast(`Viewing details for ${student.name}`);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span>View Profile</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              setEditingStudent(student);
                              setIsAddOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5 text-slate-400" />
                            <span>Edit Details</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              setPaymentStudent(student);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer font-medium"
                          >
                            <CreditCard className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Record Fee</span>
                          </button>
                          <div className="border-t border-slate-100 my-1"></div>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              deleteStudent(student.id);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            <span>Delete Student</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Image 3 */}
        <div className="p-4 px-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing 1–8 of 1,248 students</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg bg-[#5E48E8] text-white font-bold flex items-center justify-center cursor-pointer shadow-xs">
              1
            </button>
            <button className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 font-medium flex items-center justify-center cursor-pointer">
              2
            </button>
            <button className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 font-medium flex items-center justify-center cursor-pointer">
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-7 h-7 rounded-lg text-slate-600 hover:bg-slate-100 font-medium flex items-center justify-center cursor-pointer">
              156
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddStudentModal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setEditingStudent(null);
        }}
        editingStudent={editingStudent}
      />
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      {paymentStudent && (
        <RecordPaymentModal
          student={paymentStudent}
          onClose={() => setPaymentStudent(null)}
        />
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingStudent?: Student | null;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  editingStudent
}) => {
  const { addStudent, updateStudent } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    rollNo: '',
    email: '',
    class: 'FY BSc IT — A',
    parentContact: '',
    attendancePercent: 95,
    feeStatus: 'Paid' as 'Paid' | 'Pending' | 'Overdue',
    status: 'Active' as 'Active' | 'Alumni',
    admissionDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        studentId: editingStudent.studentId,
        rollNo: editingStudent.rollNo,
        email: editingStudent.email,
        class: editingStudent.class,
        parentContact: editingStudent.rawContact || editingStudent.parentContact,
        attendancePercent: editingStudent.attendancePercent,
        feeStatus: editingStudent.feeStatus,
        status: editingStudent.status,
        admissionDate: editingStudent.admissionDate,
      });
    } else {
      const randomRoll = Math.floor(Math.random() * 50) + 15;
      setFormData({
        name: '',
        studentId: `SIT26-0${randomRoll}`,
        rollNo: `${randomRoll < 10 ? '0' + randomRoll : randomRoll}`,
        email: '',
        class: 'FY BSc IT — A',
        parentContact: '+91 98',
        attendancePercent: 92,
        feeStatus: 'Paid',
        status: 'Active',
        admissionDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [editingStudent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        ...formData,
        rawContact: formData.parentContact,
        parentContact: formData.parentContact.replace(/(\+91\s\d{2})\d{4}(\s\d+)/, '$1••••$2')
      });
    } else {
      addStudent({
        ...formData,
        rawContact: formData.parentContact,
        parentContact: formData.parentContact.includes('••••') 
          ? formData.parentContact 
          : formData.parentContact.replace(/(\+91\s\d{2})\d{4}(\s\d+)/, '$1••••$2')
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {editingStudent ? 'Edit Student Details' : 'Add New Student'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Diya Patel"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student ID</label>
              <input
                type="text"
                required
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="SIT26-002"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Roll No</label>
              <input
                type="text"
                required
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                placeholder="02"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-center font-bold"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Class / Section</label>
              <select
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white"
              >
                <option value="FY BSc IT — A">FY BSc IT — A</option>
                <option value="SY BSc IT — B">SY BSc IT — B</option>
                <option value="TY AI & DS — A">TY AI & DS — A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Contact</label>
              <input
                type="text"
                required
                value={formData.parentContact}
                onChange={(e) => setFormData({ ...formData, parentContact: e.target.value })}
                placeholder="+91 97890 88312"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@smartinstitute.edu"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fee Status</label>
              <select
                value={formData.feeStatus}
                onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Enrollment Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white"
              >
                <option value="Active">Active</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-[#5E48E8] hover:bg-[#4F39DF] text-white rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{editingStudent ? 'Save Changes' : 'Admit Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

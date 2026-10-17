import React, { useState } from 'react';
import { X, CreditCard, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';

interface RecordPaymentModalProps {
  student: Student;
  onClose: () => void;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({ student, onClose }) => {
  const { recordPayment } = useApp();
  const [amount, setAmount] = useState(25000);
  const [mode, setMode] = useState<'UPI' | 'Net Banking' | 'Cash' | 'Cheque'>('UPI');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordPayment({
      studentId: student.studentId,
      studentName: student.name,
      class: student.class,
      amount: Number(amount),
      date,
      mode,
      status: 'Completed'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Record Fee Payment</h3>
              <p className="text-xs text-slate-400 font-medium">{student.name} · {student.studentId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Fee Amount (₹)</label>
            <input
              type="number"
              required
              min="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-bold text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-white"
              >
                <option value="UPI">UPI / QR Code</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Cash">Cash Counter</option>
                <option value="Cheque">Bank Cheque</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Receipt Number:</span>
              <span className="font-mono font-bold text-slate-800">Auto-generated</span>
            </div>
            <div className="flex justify-between">
              <span>Class:</span>
              <span className="font-semibold text-slate-800">{student.class}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm & Generate Receipt</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

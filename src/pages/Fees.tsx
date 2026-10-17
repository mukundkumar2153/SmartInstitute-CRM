import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  CreditCard, 
  Download, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecordPaymentModal } from '../components/modals/RecordPaymentModal';
import { Student } from '../types';

export const Fees: React.FC = () => {
  const { students, transactions, showToast } = useApp();
  const [selectedStudentForPayment, setSelectedStudentForPayment] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const pendingStudents = students.filter(s => s.feeStatus === 'Pending' || s.feeStatus === 'Overdue');

  const handleDownloadReceipt = (receiptNo: string, studentName: string) => {
    showToast(`Generating and downloading fee receipt ${receiptNo} for ${studentName}`);
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Fees & Collections</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-1">
            Track student dues, record fee receipts and manage transactions · Academic Year 2026–27
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast('Exporting fee reconciliation sheet...')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Ledger</span>
          </button>
          <button
            onClick={() => setSelectedStudentForPayment(pendingStudents[0] || students[0])}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5E48E8] hover:bg-[#4F39DF] text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">86% Target</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Total Collected</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5">₹18,62,500</h3>
            <p className="text-[11px] text-slate-400 mt-1">From 1,074 enrolled students</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">128 Students</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Pending Dues</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5">₹3,40,000</h3>
            <p className="text-[11px] text-slate-400 mt-1">Due by 30th October 2026</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">46 Overdue</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Overdue Amount</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5">₹1,15,000</h3>
            <p className="text-[11px] text-slate-400 mt-1">Requires follow-up call</p>
          </div>
        </div>
      </div>

      {/* Two columns: Outstanding List & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Outstanding Dues (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Pending Follow-ups</h2>
              <span className="text-xs font-semibold text-slate-400">{pendingStudents.length} Students</span>
            </div>

            <div className="space-y-3">
              {pendingStudents.map((st) => (
                <div key={st.id} className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{st.name}</p>
                    <p className="text-[11px] text-slate-500">{st.class} · {st.studentId}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Contact: {st.parentContact}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      st.feeStatus === 'Overdue' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {st.feeStatus}
                    </span>
                    <button
                      onClick={() => setSelectedStudentForPayment(st)}
                      className="mt-2 block text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                    >
                      Collect Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900">Recent Payment Receipts</h2>
            <div className="w-56 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search receipt..."
                className="w-full pl-8 pr-3 py-1 text-xs bg-slate-50 hover:bg-slate-100 focus:bg-white rounded-xl border border-slate-200/80 focus:border-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase">
                  <th className="pb-3">RECEIPT NO</th>
                  <th className="pb-3">STUDENT</th>
                  <th className="pb-3">AMOUNT</th>
                  <th className="pb-3">MODE</th>
                  <th className="pb-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 font-mono font-bold text-slate-800">{tx.receiptNo}</td>
                    <td className="py-3">
                      <p className="font-bold text-slate-900">{tx.studentName}</p>
                      <p className="text-[10px] text-slate-400">{tx.class}</p>
                    </td>
                    <td className="py-3 font-bold text-emerald-600">₹{tx.amount.toLocaleString()}</td>
                    <td className="py-3 font-medium text-slate-600">{tx.mode}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDownloadReceipt(tx.receiptNo, tx.studentName)}
                        title="Download Receipt PDF"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      {selectedStudentForPayment && (
        <RecordPaymentModal
          student={selectedStudentForPayment}
          onClose={() => setSelectedStudentForPayment(null)}
        />
      )}
    </div>
  );
};

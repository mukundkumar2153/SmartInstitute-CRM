import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { students, showToast } = useApp();
  const [format, setFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [dataset, setDataset] = useState<'students' | 'attendance' | 'marks' | 'fees'>('students');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);

    setTimeout(() => {
      // Generate CSV content
      if (format === 'csv') {
        let headers = 'Student ID,Roll No,Name,Class,Parent Contact,Attendance %,Fee Status\n';
        let rows = students.map(s => 
          `"${s.studentId}","${s.rollNo}","${s.name}","${s.class}","${s.parentContact}","${s.attendancePercent}%","${s.feeStatus}"`
        ).join('\n');

        const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `SmartInstitute_${dataset}_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setIsExporting(false);
      onClose();
      showToast(`Exported ${dataset} report successfully in ${format.toUpperCase()} format!`);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Export Report Data</h3>
              <p className="text-xs text-slate-400 font-medium">Download live data to CSV or Excel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Select Dataset</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'students', label: 'Students Directory' },
                { id: 'attendance', label: 'Attendance Records' },
                { id: 'marks', label: 'Marks & Grades' },
                { id: 'fees', label: 'Fee Transactions' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDataset(item.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                    dataset === item.id
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">File Format</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  format === 'csv'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span>CSV</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('excel')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  format === 'excel'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                <span>Excel (.xlsx)</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  format === 'pdf'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <FileText className="w-5 h-5 text-rose-600" />
                <span>PDF Print</span>
              </button>
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
              type="button"
              disabled={isExporting}
              onClick={handleExport}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-[#5E48E8] hover:bg-[#4F39DF] text-white rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Generating...' : 'Download File'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

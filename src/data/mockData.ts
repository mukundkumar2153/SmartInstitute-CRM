import { Student, ClassOverviewItem, UpcomingExam, RecentActivityItem, FeeTransaction } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 's-1',
    studentId: 'SIT26-001',
    rollNo: '01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@smartinstitute.edu',
    class: 'FY BSc IT — A',
    parentContact: '+91 98•••• 21045',
    rawContact: '+91 98234 21045',
    attendancePercent: 94,
    feeStatus: 'Paid',
    status: 'Active',
    admissionDate: '2026-06-15',
    avatarColor: 'bg-indigo-600',
    marks: 44,
    remarks: '—'
  },
  {
    id: 's-2',
    studentId: 'SIT26-002',
    rollNo: '02',
    name: 'Diya Patel',
    email: 'diya.patel@smartinstitute.edu',
    class: 'FY BSc IT — A',
    parentContact: '+91 97•••• 88312',
    rawContact: '+91 97890 88312',
    attendancePercent: 98,
    feeStatus: 'Paid',
    status: 'Active',
    admissionDate: '2026-06-16',
    avatarColor: 'bg-pink-600',
    marks: 47,
    remarks: '—'
  },
  {
    id: 's-3',
    studentId: 'SIT26-003',
    rollNo: '03',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@smartinstitute.edu',
    class: 'FY BSc IT — A',
    parentContact: '+91 90•••• 17740',
    rawContact: '+91 90123 17740',
    attendancePercent: 81,
    feeStatus: 'Pending',
    status: 'Active',
    admissionDate: '2026-06-18',
    avatarColor: 'bg-blue-600',
    marks: 31,
    remarks: 'Sick leave'
  },
  {
    id: 's-4',
    studentId: 'SIT26-004',
    rollNo: '04',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@smartinstitute.edu',
    class: 'FY BSc IT — A',
    parentContact: '+91 99•••• 40256',
    rawContact: '+91 99345 40256',
    attendancePercent: 92,
    feeStatus: 'Paid',
    status: 'Active',
    admissionDate: '2026-06-18',
    avatarColor: 'bg-emerald-600',
    marks: 42,
    remarks: '—'
  },
  {
    id: 's-5',
    studentId: 'SIT26-005',
    rollNo: '05',
    name: 'Kabir Singh',
    email: 'kabir.singh@smartinstitute.edu',
    class: 'FY BSc IT — A',
    parentContact: '+91 98•••• 66019',
    rawContact: '+91 98765 66019',
    attendancePercent: 76,
    feeStatus: 'Overdue',
    status: 'Active',
    admissionDate: '2026-06-20',
    avatarColor: 'bg-amber-600',
    marks: 38,
    remarks: 'Arrived 10:20 AM'
  },
  {
    id: 's-6',
    studentId: 'SIT26-006',
    rollNo: '06',
    name: 'Saanvi Reddy',
    email: 'saanvi.reddy@smartinstitute.edu',
    class: 'FY BSc IT — A',
    parentContact: '+91 96•••• 30871',
    rawContact: '+91 96456 30871',
    attendancePercent: 97,
    feeStatus: 'Paid',
    status: 'Active',
    admissionDate: '2026-06-21',
    avatarColor: 'bg-purple-600',
    marks: 49,
    remarks: '—'
  },
  {
    id: 's-7',
    studentId: 'SIT26-007',
    rollNo: '07',
    name: 'Vihaan Desai',
    email: 'vihaan.desai@smartinstitute.edu',
    class: 'FY BSc IT — A',
    parentContact: '+91 95•••• 52208',
    rawContact: '+91 95678 52208',
    attendancePercent: 89,
    feeStatus: 'Paid',
    status: 'Active',
    admissionDate: '2026-06-22',
    avatarColor: 'bg-teal-600',
    marks: 27,
    remarks: '—'
  },
  {
    id: 's-8',
    studentId: 'SIT26-008',
    rollNo: '08',
    name: 'Isha Nair',
    email: 'isha.nair@smartinstitute.edu',
    class: 'FY BSc IT — A',
    parentContact: '+91 94•••• 71163',
    rawContact: '+91 94567 71163',
    attendancePercent: 72,
    feeStatus: 'Pending',
    status: 'Active',
    admissionDate: '2026-06-25',
    avatarColor: 'bg-red-600',
    marks: 18,
    remarks: 'Informed in advance'
  },
  {
    id: 's-9',
    studentId: 'SIT26-009',
    rollNo: '09',
    name: 'Aditya Verma',
    email: 'aditya.verma@smartinstitute.edu',
    class: 'FY BSc IT — A',
    parentContact: '+91 91•••• 84321',
    rawContact: '+91 91234 84321',
    attendancePercent: 95,
    feeStatus: 'Paid',
    status: 'Active',
    admissionDate: '2026-06-26',
    avatarColor: 'bg-cyan-600',
    marks: 45,
    remarks: '—'
  },
  {
    id: 's-10',
    studentId: 'SIT26-010',
    rollNo: '10',
    name: 'Tanvi Joshi',
    email: 'tanvi.joshi@smartinstitute.edu',
    class: 'FY BSc IT — A',
    parentContact: '+91 93•••• 11209',
    rawContact: '+91 93456 11209',
    attendancePercent: 88,
    feeStatus: 'Paid',
    status: 'Active',
    admissionDate: '2026-06-27',
    avatarColor: 'bg-rose-600',
    marks: 41,
    remarks: '—'
  },
  {
    id: 's-11',
    studentId: 'SIT25-089',
    rollNo: '11',
    name: 'Pranav Kadam',
    email: 'pranav.kadam@smartinstitute.edu',
    class: 'SY BSc IT — B',
    parentContact: '+91 98•••• 90123',
    rawContact: '+91 98901 90123',
    attendancePercent: 91,
    feeStatus: 'Paid',
    status: 'Active',
    admissionDate: '2025-07-10',
    avatarColor: 'bg-violet-600',
    marks: 37,
    remarks: '—'
  },
  {
    id: 's-12',
    studentId: 'SIT24-045',
    rollNo: '12',
    name: 'Sneha Chawla',
    email: 'sneha.chawla@smartinstitute.edu',
    class: 'TY AI & DS — A',
    parentContact: '+91 97•••• 65432',
    rawContact: '+91 97654 65432',
    attendancePercent: 96,
    feeStatus: 'Paid',
    status: 'Active',
    admissionDate: '2024-07-05',
    avatarColor: 'bg-emerald-700',
    marks: 48,
    remarks: '—'
  },
  {
    id: 's-13',
    studentId: 'SIT23-012',
    rollNo: '44',
    name: 'Nikhil Rane',
    email: 'nikhil.rane@alumni.edu',
    class: 'TY BSc IT — A',
    parentContact: '+91 90•••• 44321',
    rawContact: '+91 90443 44321',
    attendancePercent: 93,
    feeStatus: 'Paid',
    status: 'Alumni',
    admissionDate: '2023-06-10',
    avatarColor: 'bg-slate-600',
    marks: 46,
    remarks: 'Graduated'
  }
];

export const INITIAL_CLASSES: ClassOverviewItem[] = [
  {
    id: 'c-1',
    name: 'FY BSc IT — A',
    classTeacher: 'Prof. Kulkarni',
    studentsCount: 60,
    attendancePercent: 94,
    avgMarks: 78
  },
  {
    id: 'c-2',
    name: 'SY BSc IT — B',
    classTeacher: 'Prof. Deshmukh',
    studentsCount: 58,
    attendancePercent: 91,
    avgMarks: 74
  },
  {
    id: 'c-3',
    name: 'TY AI & DS — A',
    classTeacher: 'Prof. Iyer',
    studentsCount: 52,
    attendancePercent: 96,
    avgMarks: 82
  }
];

export const UPCOMING_EXAMS: UpcomingExam[] = [
  {
    id: 'ex-1',
    dateDay: '18',
    dateMonth: 'OCT',
    title: 'Unit Test 2 · Computer Networks',
    classAndTiming: 'SE AI & DS · 10:00 AM'
  },
  {
    id: 'ex-2',
    dateDay: '22',
    dateMonth: 'OCT',
    title: 'Practical · DBMS Lab',
    classAndTiming: 'TY BSc IT · 2:00 PM'
  },
  {
    id: 'ex-3',
    dateDay: '28',
    dateMonth: 'OCT',
    title: 'Mid-Term · Engineering Maths',
    classAndTiming: 'FY BSc IT · 9:30 AM'
  }
];

export const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: 'act-1',
    title: 'Attendance marked · FY BSc IT A',
    timeAgo: '10 mins ago',
    type: 'attendance'
  },
  {
    id: 'act-2',
    title: 'Unit Test 2 marks uploaded',
    timeAgo: '1 hour ago',
    type: 'marks'
  },
  {
    id: 'act-3',
    title: 'Fee received · ₹12,500',
    timeAgo: '2 hours ago',
    type: 'fees'
  },
  {
    id: 'act-4',
    title: 'New admission · Diya Patel',
    timeAgo: 'Yesterday',
    type: 'admission'
  }
];

export const INITIAL_TRANSACTIONS: FeeTransaction[] = [
  {
    id: 'tx-1',
    studentId: 'SIT26-001',
    studentName: 'Aarav Sharma',
    class: 'FY BSc IT — A',
    amount: 25000,
    date: '2026-10-15',
    mode: 'UPI',
    status: 'Completed',
    receiptNo: 'REC-2026-1042'
  },
  {
    id: 'tx-2',
    studentId: 'SIT26-002',
    studentName: 'Diya Patel',
    class: 'FY BSc IT — A',
    amount: 12500,
    date: '2026-10-15',
    mode: 'Net Banking',
    status: 'Completed',
    receiptNo: 'REC-2026-1043'
  },
  {
    id: 'tx-3',
    studentId: 'SIT26-004',
    studentName: 'Ananya Iyer',
    class: 'FY BSc IT — A',
    amount: 25000,
    date: '2026-10-14',
    mode: 'UPI',
    status: 'Completed',
    receiptNo: 'REC-2026-1040'
  },
  {
    id: 'tx-4',
    studentId: 'SIT26-006',
    studentName: 'Saanvi Reddy',
    class: 'FY BSc IT — A',
    amount: 25000,
    date: '2026-10-12',
    mode: 'Cheque',
    status: 'Completed',
    receiptNo: 'REC-2026-1035'
  }
];

export const WEEKLY_ATTENDANCE_DATA = [
  { day: 'Fri', attendance: 90, isCurrent: false },
  { day: 'Sat', attendance: 86, isCurrent: false },
  { day: 'Mon', attendance: 92, isCurrent: false },
  { day: 'Tue', attendance: 95, isCurrent: false },
  { day: 'Wed', attendance: 89, isCurrent: false },
  { day: 'Thu', attendance: 94, isCurrent: true }
];

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  avatarInitials: string;
}

export type FeeStatus = 'Paid' | 'Pending' | 'Overdue';
export type AttendanceStatus = 'Present' | 'Absent' | 'Late';

export interface Student {
  id: string;
  studentId: string; // e.g. SIT26-001
  rollNo: string;    // e.g. 01
  name: string;
  email: string;
  class: string;     // e.g. FY BSc IT — A
  parentContact: string; // e.g. +91 98•••• 21045
  rawContact?: string;
  attendancePercent: number; // e.g. 94
  feeStatus: FeeStatus;
  status: 'Active' | 'Alumni';
  admissionDate: string;
  avatarColor: string;
  marks?: number;
  remarks?: string;
}

export interface Teacher {
  id: string;
  name: string;
  department: string;
  subject: string;
  classes: string[];
  studentsCount: number;
  experienceYears: number;
  email: string;
  phone: string;
}

export interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
  timeIn?: string;
  remarks?: string;
}

export interface ClassOverviewItem {
  id: string;
  name: string;
  classTeacher: string;
  studentsCount: number;
  attendancePercent: number;
  avgMarks: number;
}

export interface UpcomingExam {
  id: string;
  dateDay: string; // '18'
  dateMonth: string; // 'OCT'
  title: string; // 'Unit Test 2 · Computer Networks'
  classAndTiming: string; // 'SE AI & DS · 10:00 AM'
}

export interface RecentActivityItem {
  id: string;
  title: string;
  timeAgo: string;
  type: 'attendance' | 'marks' | 'fees' | 'admission';
}

export interface ExamMarkRecord {
  studentId: string;
  marks: number;
  remarks?: string;
}

export interface FeeTransaction {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  amount: number;
  date: string;
  mode: 'UPI' | 'Net Banking' | 'Cash' | 'Cheque';
  status: 'Completed' | 'Pending';
  receiptNo: string;
}

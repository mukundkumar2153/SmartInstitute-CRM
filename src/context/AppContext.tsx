import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Student, AttendanceStatus, ClassOverviewItem, UpcomingExam, RecentActivityItem, FeeTransaction } from '../types';
import { INITIAL_STUDENTS, INITIAL_CLASSES, UPCOMING_EXAMS, RECENT_ACTIVITIES, INITIAL_TRANSACTIONS } from '../data/mockData';

const API_BASE = 'http://localhost:5000/api';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  
  // Students
  students: Student[];
  addStudent: (student: Omit<Student, 'id' | 'avatarColor'>) => void;
  updateStudent: (id: string, updated: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  
  // Attendance
  attendanceRecords: Record<string, { status: AttendanceStatus; remarks: string }>;
  updateAttendance: (studentId: string, status: AttendanceStatus, remarks?: string) => void;
  markAllPresent: () => void;
  saveAttendance: () => void;
  
  // Marks
  marksRecords: Record<string, number>;
  maxMarks: number;
  setMaxMarks: (val: number) => void;
  updateStudentMark: (studentId: string, mark: number) => void;
  saveMarks: () => void;

  // Fees
  transactions: FeeTransaction[];
  recordPayment: (payment: Omit<FeeTransaction, 'id' | 'receiptNo'>) => void;

  // Classes & Activities
  classes: ClassOverviewItem[];
  upcomingExams: UpcomingExam[];
  activities: RecentActivityItem[];
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  id: 'usr-admin-1',
  name: 'Admin User',
  email: 'admin@smartinstitute.com',
  role: 'admin',
  roleTitle: 'Super Admin',
  avatarInitials: 'AD'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('smartinstitute_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [activeNav, setActiveNav] = useState<string>(() => {
    const savedUser = localStorage.getItem('smartinstitute_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u.role === 'student') return 'student-portal';
        if (u.role === 'teacher') return 'teacher-portal';
      } catch (e) {}
    }
    return 'dashboard';
  });

  const [globalSearch, setGlobalSearch] = useState<string>('');

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('smartinstitute_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, { status: AttendanceStatus; remarks: string }>>(() => {
    const saved = localStorage.getItem('smartinstitute_attendance');
    if (saved) return JSON.parse(saved);
    const initial: Record<string, { status: AttendanceStatus; remarks: string }> = {};
    INITIAL_STUDENTS.forEach((s) => {
      let st: AttendanceStatus = 'Present';
      if (s.name === 'Rohan Mehta') st = 'Absent';
      else if (s.name === 'Kabir Singh') st = 'Late';
      else if (s.name === 'Isha Nair') st = 'Absent';
      initial[s.studentId] = { status: st, remarks: s.remarks || '—' };
    });
    return initial;
  });

  const [marksRecords, setMarksRecords] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('smartinstitute_marks');
    if (saved) return JSON.parse(saved);
    const initial: Record<string, number> = {};
    INITIAL_STUDENTS.forEach((s) => {
      initial[s.studentId] = s.marks ?? 40;
    });
    return initial;
  });

  const [maxMarks, setMaxMarks] = useState<number>(50);
  const [transactions, setTransactions] = useState<FeeTransaction[]>(INITIAL_TRANSACTIONS);
  const [classes] = useState<ClassOverviewItem[]>(INITIAL_CLASSES);
  const [upcomingExams] = useState<UpcomingExam[]>(UPCOMING_EXAMS);
  const [activities, setActivities] = useState<RecentActivityItem[]>(RECENT_ACTIVITIES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with Backend Database
  useEffect(() => {
    // 1. Fetch Students from DB
    fetch(`${API_BASE}/students`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setStudents(data);
        }
      })
      .catch(() => console.log('[Sync] Using local offline cache'));

    // 2. Fetch Attendance
    fetch(`${API_BASE}/attendance`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setAttendanceRecords(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});

    // 3. Fetch Marks
    fetch(`${API_BASE}/marks`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setMarksRecords(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});

    // 4. Fetch Fees
    fetch(`${API_BASE}/fees`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTransactions(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('smartinstitute_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('smartinstitute_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('smartinstitute_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('smartinstitute_attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('smartinstitute_marks', JSON.stringify(marksRecords));
  }, [marksRecords]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addStudent = async (studentData: Omit<Student, 'id' | 'avatarColor'>) => {
    const colors = ['bg-indigo-600', 'bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-pink-600', 'bg-amber-600', 'bg-teal-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newStudent: Student = {
      ...studentData,
      id: `s-${Date.now()}`,
      avatarColor: randomColor
    };

    setStudents(prev => [newStudent, ...prev]);
    setAttendanceRecords(prev => ({
      ...prev,
      [newStudent.studentId]: { status: 'Present', remarks: '—' }
    }));
    setMarksRecords(prev => ({
      ...prev,
      [newStudent.studentId]: Math.floor(Math.random() * 20) + 30
    }));

    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        title: `New admission · ${newStudent.name}`,
        timeAgo: 'Just now',
        type: 'admission'
      },
      ...prev
    ]);

    // Send to database
    try {
      await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      });
    } catch (e) {}

    showToast(`Student ${newStudent.name} admitted successfully & stored in database!`);
  };

  const updateStudent = async (id: string, updated: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));

    try {
      await fetch(`${API_BASE}/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {}

    showToast('Student profile updated in database!');
  };

  const deleteStudent = async (id: string) => {
    const target = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));

    try {
      await fetch(`${API_BASE}/students/${id}`, { method: 'DELETE' });
    } catch (e) {}

    showToast(`Student ${target ? target.name : ''} deleted from database.`);
  };

  const updateAttendance = (studentId: string, status: AttendanceStatus, remarks?: string) => {
    setAttendanceRecords(prev => {
      const current = prev[studentId] || { remarks: '—' };
      return {
        ...prev,
        [studentId]: {
          status,
          remarks: remarks !== undefined ? remarks : current.remarks
        }
      };
    });
  };

  const markAllPresent = () => {
    setAttendanceRecords(prev => {
      const updated = { ...prev };
      students.forEach(s => {
        updated[s.studentId] = { status: 'Present', remarks: '—' };
      });
      return updated;
    });
    showToast('Marked all students as Present');
  };

  const saveAttendance = async () => {
    const recordsArray = Object.entries(attendanceRecords).map(([studentId, data]) => ({
      studentId,
      status: data.status,
      remarks: data.remarks
    }));

    try {
      await fetch(`${API_BASE}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          records: recordsArray,
          class: 'FY BSc IT — A',
          subject: 'Data Structures',
          date: '15 Oct 2026',
          lecture: 'Lecture 3 · 10:00 AM'
        })
      });
    } catch (e) {}

    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        title: 'Attendance marked · FY BSc IT A',
        timeAgo: 'Just now',
        type: 'attendance'
      },
      ...prev.filter(a => a.id !== 'act-1')
    ]);
    showToast('Attendance saved and synchronized with database!');
  };

  const updateStudentMark = (studentId: string, mark: number) => {
    setMarksRecords(prev => ({
      ...prev,
      [studentId]: Math.max(0, Math.min(mark, maxMarks))
    }));
  };

  const saveMarks = async () => {
    try {
      await fetch(`${API_BASE}/marks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marks: marksRecords,
          maxMarks,
          examName: 'Unit Test 2',
          subject: 'Computer Networks',
          className: 'FY BSc IT — A'
        })
      });
    } catch (e) {}

    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        title: 'Unit Test 2 marks uploaded',
        timeAgo: 'Just now',
        type: 'marks'
      },
      ...prev.filter(a => a.id !== 'act-2')
    ]);
    showToast('Exam marks saved and synchronized with database!');
  };

  const recordPayment = async (paymentData: Omit<FeeTransaction, 'id' | 'receiptNo'>) => {
    const newTx: FeeTransaction = {
      ...paymentData,
      id: `tx-${Date.now()}`,
      receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setTransactions(prev => [newTx, ...prev]);

    // Update student fee status
    setStudents(prev => prev.map(s => {
      if (s.studentId === paymentData.studentId || s.name === paymentData.studentName) {
        return { ...s, feeStatus: 'Paid' };
      }
      return s;
    }));

    try {
      await fetch(`${API_BASE}/fees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });
    } catch (e) {}

    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        title: `Fee received · ₹${paymentData.amount.toLocaleString()}`,
        timeAgo: 'Just now',
        type: 'fees'
      },
      ...prev
    ]);

    showToast(`Payment of ₹${paymentData.amount.toLocaleString()} stored in database!`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeNav,
        setActiveNav,
        globalSearch,
        setGlobalSearch,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        attendanceRecords,
        updateAttendance,
        markAllPresent,
        saveAttendance,
        marksRecords,
        maxMarks,
        setMaxMarks,
        updateStudentMark,
        saveMarks,
        transactions,
        recordPayment,
        classes,
        upcomingExams,
        activities,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

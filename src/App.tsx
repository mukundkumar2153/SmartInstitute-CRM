import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Attendance } from './pages/Attendance';
import { Marks } from './pages/Marks';
import { Fees } from './pages/Fees';
import { Timetable } from './pages/Timetable';
import { Settings } from './pages/Settings';
import { StudentPortal } from './pages/student/StudentPortal';
import { TeacherPortal } from './pages/teacher/TeacherPortal';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentUser, activeNav, setActiveNav, toastMessage } = useApp();

  // Route protection and role defaults
  useEffect(() => {
    if (currentUser?.role === 'student' && (activeNav === 'dashboard' || activeNav === 'settings')) {
      setActiveNav('student-portal');
    } else if (currentUser?.role === 'teacher' && (activeNav === 'dashboard' || activeNav === 'fees' || activeNav === 'settings')) {
      setActiveNav('teacher-portal');
    }
  }, [currentUser?.role, activeNav, setActiveNav]);

  if (!currentUser) {
    return <Login />;
  }

  const renderContent = () => {
    // If student
    if (currentUser.role === 'student') {
      switch (activeNav) {
        case 'student-portal':
        case 'dashboard':
          return <StudentPortal />;
        case 'attendance':
        case 'marks':
        case 'fees':
        case 'timetable':
          return <StudentPortal />;
        default:
          return <StudentPortal />;
      }
    }

    // If teacher
    if (currentUser.role === 'teacher') {
      switch (activeNav) {
        case 'teacher-portal':
        case 'dashboard':
          return <TeacherPortal />;
        case 'attendance':
          return <Attendance />;
        case 'marks':
          return <Marks />;
        case 'students':
          return <Students />;
        case 'timetable':
          return <Timetable />;
        default:
          return <TeacherPortal />;
      }
    }

    // If Admin
    switch (activeNav) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <Students />;
      case 'attendance':
        return <Attendance />;
      case 'marks':
        return <Marks />;
      case 'fees':
        return <Fees />;
      case 'timetable':
        return <Timetable />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* 264px Sidebar matching Figma */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Reactive Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/60 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/src/components/layout/MainLayout';
import HomePage from '@/src/pages/public/HomePage';
import AdminLogin from '@/src/pages/auth/AdminLogin';
import FacultyLogin from '@/src/pages/auth/FacultyLogin';
import StudentLogin from '@/src/pages/auth/StudentLogin';
import AdminDashboard from '@/src/pages/admin/AdminDashboard';
import UserManagement from '@/src/pages/admin/UserManagement';
import EmployeeManagement from '@/src/pages/admin/EmployeeManagement';
import AdminPayslips from '@/src/pages/admin/AdminPayslips';
import FacultyDashboard from '@/src/pages/faculty/FacultyDashboard';
import MyClasses from '@/src/pages/faculty/MyClasses';
import FacultyGrades from '@/src/pages/faculty/Grades';
import GradesHistory from '@/src/pages/faculty/GradesHistory';
import FacultyAttendance from '@/src/pages/faculty/Attendance';
import Analytics from '@/src/pages/faculty/Analytics';
import ClassDetails from '@/src/pages/faculty/ClassDetails';
import StudentDashboard from '@/src/pages/student/StudentDashboard';
import DigitalID from '@/src/pages/student/DigitalID';
import EmployeeLogin from '@/src/pages/auth/EmployeeLogin';
import EmployeeDashboard from '@/src/pages/employee/EmployeeDashboard';
import DailyTimeRecord from '@/src/pages/employee/DailyTimeRecord';
import Payslip from '@/src/pages/employee/Payslip';
import PersonalDataSheet from '@/src/pages/employee/PersonalDataSheet';
import EmployeeID from '@/src/pages/employee/EmployeeID';
import { Settings, Construction, Wrench } from 'lucide-react';

import AcademicManagement from '@/src/pages/admin/AcademicManagement';
import EnrollmentManagement from '@/src/pages/admin/EnrollmentManagement';
import SchoolManagement from '@/src/pages/admin/SchoolManagement';

import ViewAllGrades from '@/src/pages/student/ViewAllGrades';
import CurrentSubjects from '@/src/pages/student/CurrentSubjects';
import CurrentGrades from '@/src/pages/student/CurrentGrades';

// Enhanced placeholder for visually pleasing under-construction sections
const Placeholder = ({ title, role }: { title: string, role: 'admin' | 'faculty' | 'student' | 'employee' }) => {
  let themeClass = '';
  let borderClass = '';
  if (role === 'admin') { themeClass = 'text-admin-main'; borderClass = 'border-admin-main/20'; }
  if (role === 'faculty') { themeClass = 'text-faculty-main'; borderClass = 'border-faculty-main/20'; }
  if (role === 'student') { themeClass = 'text-student-dark'; borderClass = 'border-student-main/40'; }
  if (role === 'employee') { themeClass = 'text-employee-main'; borderClass = 'border-employee-main/40'; }

  return (
    <div className={`flex flex-col h-full min-h-[60vh] items-center justify-center text-center p-8 bg-white border-2 border-dashed ${borderClass} rounded-2xl w-full max-w-2xl mx-auto shadow-sm my-8`}>
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-slate-50 shadow-inner overflow-hidden relative`}>
        <div className={`absolute inset-0 bg-current opacity-10 ${themeClass}`}></div>
        <Construction className={`w-10 h-10 ${themeClass}`} />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-2">{title}</h1>
      <p className="text-slate-500 max-w-md">This module is currently under development. High-fidelity responsive UI will be deployed here in upcoming updates.</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Auth Routes */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/faculty" element={<FacultyLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/employee" element={<EmployeeLogin />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<MainLayout allowedRole="admin" />}>
           <Route index element={<AdminDashboard />} />
           <Route path="users" element={<UserManagement />} />
           <Route path="employees" element={<EmployeeManagement />} />
           <Route path="payroll" element={<AdminPayslips />} />
           <Route path="academic" element={<AcademicManagement />} />
            <Route path="enrollment" element={<EnrollmentManagement />} />
           <Route path="reports" element={<Placeholder title="Reports" role="admin" />} />
            <Route path="school" element={<SchoolManagement />} />
           <Route path="settings" element={<Placeholder title="System Settings" role="admin" />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/employee" element={<MainLayout allowedRole="employee" />}>
           <Route index element={<EmployeeDashboard />} />
           <Route path="tasks" element={<Placeholder title="Tasks & Schedule" role="employee" />} />
           <Route path="requests" element={<Placeholder title="Requests" role="employee" />} />
           <Route path="messages" element={<Placeholder title="Communications" role="employee" />} />
           <Route path="dtr" element={<DailyTimeRecord />} />
           <Route path="payslip" element={<Payslip />} />
           <Route path="pds" element={<PersonalDataSheet />} />
           <Route path="id" element={<EmployeeID />} />
        </Route>

        {/* Faculty Routes */}
        <Route path="/faculty" element={<MainLayout allowedRole="faculty" />}>
           <Route index element={<FacultyDashboard />} />
           <Route path="classes" element={<MyClasses />} />
           <Route path="classes/:id" element={<ClassDetails />} />
           <Route path="grades" element={<FacultyGrades />} />
           <Route path="grades/history" element={<GradesHistory />} />
           <Route path="attendance" element={<FacultyAttendance />} />
           <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<MainLayout allowedRole="student" />}>
           <Route index element={<StudentDashboard />} />
           <Route path="id" element={<DigitalID />} />
           <Route path="id/capture" element={<Placeholder title="ID Capturing" role="student" />} />
           <Route path="subjects" element={<CurrentSubjects />} />
           <Route path="subjects/remaining" element={<Placeholder title="Subjects to Complete" role="student" />} />
           <Route path="grades" element={<CurrentGrades />} />
           <Route path="grades/all" element={<ViewAllGrades />} />
           <Route path="grades/copy" element={<Placeholder title="Copy of Grades" role="student" />} />
           <Route path="curriculum" element={<Placeholder title="Curriculum" role="student" />} />
           <Route path="evaluations" element={<Placeholder title="Teacher Evaluations" role="student" />} />
           <Route path="cor" element={<Placeholder title="Certificate of Registration (COR)" role="student" />} />
           <Route path="fees" element={<Placeholder title="Assessment of Fees" role="student" />} />
           <Route path="liabilities" element={<Placeholder title="Liabilities" role="student" />} />
           <Route path="attendance" element={<Placeholder title="Attendance" role="student" />} />
           <Route path="announcements" element={<Placeholder title="Announcements" role="student" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

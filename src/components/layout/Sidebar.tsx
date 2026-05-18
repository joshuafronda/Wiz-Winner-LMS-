import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/src/store/authStore';
import { useUIStore } from '@/src/store/uiStore';
import { cn } from '@/src/lib/utils';
import { 
  Users, BookOpen, UserCheck, BarChart2, 
  Settings, CheckSquare, MessageSquare, 
  Target, GraduationCap, Calendar, 
  Bell, FileText, Fingerprint, QrCode, ClipboardList, BookMarked, X
} from 'lucide-react';

const ADMIN_LINKS = [
  { name: 'Dashboard', path: '/admin', icon: BarChart2, exact: true },
  { name: 'User Management', path: '/admin/users', icon: Users },
  { name: 'Academic Mgmt', path: '/admin/academic', icon: BookOpen },
  { name: 'Enrollment', path: '/admin/enrollment', icon: UserCheck },
  { name: 'Reports', path: '/admin/reports', icon: FileText },
  { name: 'School Mgmt', path: '/admin/school', icon: Calendar },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

const FACULTY_LINKS = [
  { name: 'Dashboard', path: '/faculty', icon: BarChart2, exact: true },
  { name: 'My Classes', path: '/faculty/classes', icon: BookOpen },
  { name: 'Biometric Scanner', path: '/faculty/scanner', icon: Fingerprint, badge: 'UI Only' },
  { name: 'Grades', path: '/faculty/grades', icon: CheckSquare },
  { name: 'Attendance', path: '/faculty/attendance', icon: ClipboardList },
  { name: 'Analytics', path: '/faculty/analytics', icon: Target },
];

const STUDENT_LINKS = [
  { name: 'Dashboard', path: '/student', icon: BarChart2, exact: true },
  { name: 'Digital ID', path: '/student/id', icon: QrCode },
  { name: 'Subjects', path: '/student/subjects', icon: BookMarked },
  { name: 'Attendance', path: '/student/attendance', icon: UserCheck },
  { name: 'Announcements', path: '/student/announcements', icon: Bell },
];

const EMPLOYEE_LINKS = [
  { name: 'Dashboard', path: '/employee', icon: BarChart2, exact: true },
  { name: 'Tasks & Schedule', path: '/employee/tasks', icon: ClipboardList },
  { name: 'Requests', path: '/employee/requests', icon: FileText },
  { name: 'Communications', path: '/employee/messages', icon: MessageSquare },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const { isSidebarOpen, closeSidebar } = useUIStore();
  const navigate = useNavigate();

  if (!user) return null;

  let links = [];
  let sidebarBg = '';
  let activeClass = '';
  let hoverClass = '';
  let textColor = '';

  if (user.role === 'admin') {
    links = ADMIN_LINKS;
    sidebarBg = 'bg-admin-dark text-white border-r border-admin-main';
    activeClass = 'bg-admin-main text-white font-medium';
    hoverClass = 'hover:bg-admin-main/50';
    textColor = 'text-admin-light';
  } else if (user.role === 'faculty') {
    links = FACULTY_LINKS;
    sidebarBg = 'bg-faculty-dark text-white border-r border-faculty-main';
    activeClass = 'bg-faculty-main text-white font-medium shadow-sm';
    hoverClass = 'hover:bg-faculty-main/50';
    textColor = 'text-faculty-light';
  } else if (user.role === 'employee') {
    links = EMPLOYEE_LINKS;
    sidebarBg = 'bg-employee-dark text-white border-r border-employee-main';
    activeClass = 'bg-employee-main text-white font-medium shadow-sm';
    hoverClass = 'hover:bg-employee-main/50';
    textColor = 'text-employee-light';
  } else {
    links = STUDENT_LINKS;
    sidebarBg = 'bg-white text-slate-800 border-r border-slate-200';
    activeClass = 'bg-student-main text-slate-900 font-semibold shadow-[0_4px_14px_0_rgba(134,239,172,0.39)]';
    hoverClass = 'hover:bg-student-bg';
    textColor = 'text-slate-500';
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-y-0 left-0 z-40 w-screen bg-slate-900/50 backdrop-blur-sm md:hidden transition-opacity" 
          onClick={closeSidebar}
        ></div>
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 flex flex-col flex-shrink-0 transition-transform duration-300 md:relative md:translate-x-0 h-screen", 
        sidebarBg,
        isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 font-bold text-xl tracking-tight border-b border-opacity-10 dark:border-opacity-20 border-black">
          <span>
            {user.role === 'admin' && 'Dean / Admin Portal'}
            {user.role === 'faculty' && 'Faculty Portal'}
            {user.role === 'employee' && 'Staff Portal'}
            {user.role === 'student' && 'Student Portal'}
          </span>
          <button onClick={closeSidebar} className="md:hidden">
            <X className="w-5 h-5 opacity-70 hover:opacity-100" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.exact}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                    isActive ? activeClass : cn(textColor, hoverClass)
                  )
                }
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-auto text-[10px] leading-none py-1 px-1.5 rounded-md bg-opacity-20 bg-white font-bold uppercase tracking-wider">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="p-4 border-t border-opacity-10 dark:border-opacity-20 border-black">
           <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg", user.role === 'student' ? 'bg-student-yellow text-slate-800' : 'bg-white bg-opacity-20 text-white')}>
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                 <p className="text-sm font-semibold truncate flex-1">{user.name}</p>
                 <p className={cn("text-xs truncate", textColor)}>{user.email}</p>
              </div>
           </div>
           <button 
             onClick={handleLogout}
             className={cn("w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-3", textColor, hoverClass)}
           >
              <Settings className="w-4 h-4" />
              Logout
           </button>
        </div>
      </div>
    </>
  );
}

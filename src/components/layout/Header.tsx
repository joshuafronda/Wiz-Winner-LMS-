import { useAuthStore } from '@/src/store/authStore';
import { useUIStore } from '@/src/store/uiStore';
import { Bell, Search, Menu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Header() {
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  let headerColor = "";
  if (user?.role === 'admin') headerColor = "text-admin-dark";
  if (user?.role === 'faculty') headerColor = "text-faculty-dark";
  if (user?.role === 'student') headerColor = "text-student-dark";

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center">
         <button 
           onClick={toggleSidebar}
           className="md:hidden mr-4 p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
         >
           <Menu className="w-5 h-5" />
         </button>
         <span className="text-sm font-medium text-slate-500 hidden sm:block">
           {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
         </span>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
         <div className="relative hidden sm:block">
           <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search anything..." 
             className="pl-9 pr-4 py-2 w-48 md:w-64 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-shadow"
           />
         </div>
         <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
         </button>
      </div>
    </header>
  );
}

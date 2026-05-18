import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore, User } from '@/src/store/authStore';
import { Button } from '@/src/components/ui/Button';
import { GraduationCap, ArrowLeft, User as UserIcon, Lock } from 'lucide-react';

const MOCK_STUDENT: User = { id: '3', name: 'Harry Potter', role: 'student', email: 'student@school.edu', srNumber: 'SR-2023-0001' };

export default function StudentLogin() {
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(MOCK_STUDENT);
    navigate(`/student`);
  };

  return (
    <div className="flex min-h-screen bg-[#FEF9C3]/30">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl overflow-hidden border border-yellow-100 relative">
          
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-yellow-400 to-student-main"></div>

          <div className="p-8 pb-6 border-b border-slate-50 relative">
             <Link to="/" className="absolute top-6 left-6 p-2 bg-slate-50 text-slate-500 hover:text-student-dark hover:bg-yellow-50 rounded-full transition-colors">
               <ArrowLeft className="w-4 h-4" />
             </Link>
             <div className="mt-8 w-20 h-20 bg-yellow-50 text-student-main rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-100">
                <GraduationCap className="w-10 h-10 -rotate-6" />
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-center text-slate-900">Student Portal</h1>
             <p className="text-slate-500 text-sm mt-2 text-center">Learning & assignments</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 pt-6 space-y-6">
             <p className="text-sm font-medium text-slate-500 text-center mb-6">Demo Mode: Any credentials will work.</p>
             
             <div className="space-y-5">
                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1.5 pl-1">Student ID / SR Number</label>
                   <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" placeholder="SR-2023-0001" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-student-main focus:bg-white outline-none transition-all font-medium placeholder:font-normal" defaultValue="SR-2023-0001" />
                   </div>
                </div>
                <div>
                   <div className="flex items-center justify-between mb-1.5 pl-1">
                      <label className="block text-sm font-semibold text-slate-700">Password</label>
                      <a href="#" className="text-xs text-student-dark hover:underline font-medium">Need help?</a>
                   </div>
                   <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-student-main focus:bg-white outline-none transition-all" defaultValue="password123" />
                   </div>
                </div>
             </div>

             <Button type="submit" className="w-full text-slate-900 bg-student-main hover:bg-yellow-400 focus-visible:ring-student-main shadow-md shadow-yellow-200 h-14 text-base font-bold rounded-xl transition-all mt-4">
                Enter Portal
             </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

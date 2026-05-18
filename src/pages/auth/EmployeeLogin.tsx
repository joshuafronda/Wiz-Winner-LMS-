import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore, User } from '@/src/store/authStore';
import { Button } from '@/src/components/ui/Button';
import { Briefcase, ArrowLeft, Mail, Lock } from 'lucide-react';

const MOCK_EMPLOYEE: User = { id: '4', name: 'Argus Filch', role: 'employee', email: 'employee@school.edu' };

export default function EmployeeLogin() {
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(MOCK_EMPLOYEE);
    navigate(`/employee`);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8 pb-6 border-b border-slate-100 relative">
             <Link to="/" className="absolute top-4 left-4 p-2 text-slate-400 hover:text-employee-main transition-colors">
               <ArrowLeft className="w-5 h-5" />
             </Link>
             <div className="mt-4 w-16 h-16 bg-employee-main/10 text-employee-main rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8" />
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-center text-slate-900">Employee Portal</h1>
             <p className="text-slate-500 text-sm mt-2 text-center">Workforce & facilities management</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
             <p className="text-sm font-medium text-slate-500 text-center mb-6">Demo Mode: Any credentials will work.</p>
             
             <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Employee Email</label>
                   <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="email" placeholder="employee@greenleaf.edu" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-employee-main focus:border-employee-main focus:bg-white outline-none transition-all" defaultValue="employee@greenleaf.edu" />
                   </div>
                </div>
                <div>
                   <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-slate-700">Password</label>
                      <a href="#" className="text-xs text-employee-main hover:underline">Forgot password?</a>
                   </div>
                   <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-employee-main focus:border-employee-main focus:bg-white outline-none transition-all" defaultValue="password123" />
                   </div>
                </div>
             </div>

             <Button type="submit" className="w-full text-white bg-employee-main hover:bg-employee-dark focus-visible:ring-employee-main shadow-md h-12 text-base font-semibold transition-all">
                Sign in to Employee Portal
             </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

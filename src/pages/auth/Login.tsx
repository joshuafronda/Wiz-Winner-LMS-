import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, User, Role } from '@/src/store/authStore';
import { Button } from '@/src/components/ui/Button';
import { GraduationCap, ShieldCheck, UserCheck } from 'lucide-react';

const MOCK_USERS: User[] = [
  { id: '1', name: 'Albus Dumbledore', role: 'admin', email: 'admin@school.edu' },
  { id: '2', name: 'Minerva McGonagall', role: 'faculty', email: 'faculty@school.edu' },
  { id: '3', name: 'Harry Potter', role: 'student', email: 'student@school.edu', srNumber: 'SR-2023-0001' },
];

export default function Login() {
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.role === selectedRole);
    if (user) {
      login(user);
      navigate(`/${user.role}`);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 items-center justify-center p-4">
       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8 pb-6 text-center border-b border-slate-100">
             <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
                <GraduationCap className="w-8 h-8 -rotate-3" />
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-slate-900">GreenLeaf Academy</h1>
             <p className="text-slate-500 text-sm mt-2">Sign in to the Learning Management System</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
             <div className="space-y-3">
                <p className="text-sm font-medium text-slate-900 mb-2">Select your role to continue</p>
                
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${selectedRole === 'admin' ? 'border-admin-main bg-admin-main/5 ring-1 ring-admin-main' : 'border-slate-200 hover:border-slate-300'}`}>
                   <input type="radio" name="role" value="admin" checked={selectedRole === 'admin'} onChange={() => setSelectedRole('admin')} className="sr-only" />
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedRole === 'admin' ? 'bg-admin-main text-white' : 'bg-slate-100 text-slate-500'}`}>
                     <ShieldCheck className="w-5 h-5" />
                   </div>
                   <div className="flex-1">
                      <p className={`font-semibold ${selectedRole === 'admin' ? 'text-admin-dark' : 'text-slate-700'}`}>Administrator</p>
                      <p className="text-xs text-slate-500">System control & oversight</p>
                   </div>
                </label>

                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${selectedRole === 'faculty' ? 'border-faculty-main bg-faculty-main/5 ring-1 ring-faculty-main' : 'border-slate-200 hover:border-slate-300'}`}>
                   <input type="radio" name="role" value="faculty" checked={selectedRole === 'faculty'} onChange={() => setSelectedRole('faculty')} className="sr-only" />
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedRole === 'faculty' ? 'bg-faculty-main text-white' : 'bg-slate-100 text-slate-500'}`}>
                     <UserCheck className="w-5 h-5" />
                   </div>
                   <div className="flex-1">
                      <p className={`font-semibold ${selectedRole === 'faculty' ? 'text-faculty-dark' : 'text-slate-700'}`}>Faculty</p>
                      <p className="text-xs text-slate-500">Class & grade management</p>
                   </div>
                </label>

                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${selectedRole === 'student' ? 'border-student-main bg-student-main/10 ring-1 ring-student-main' : 'border-slate-200 hover:border-slate-300'}`}>
                   <input type="radio" name="role" value="student" checked={selectedRole === 'student'} onChange={() => setSelectedRole('student')} className="sr-only" />
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedRole === 'student' ? 'bg-student-main text-slate-800' : 'bg-slate-100 text-slate-500'}`}>
                     <GraduationCap className="w-5 h-5" />
                   </div>
                   <div className="flex-1">
                      <p className={`font-semibold ${selectedRole === 'student' ? 'text-student-dark' : 'text-slate-700'}`}>Student</p>
                      <p className="text-xs text-slate-500">Learning & assignments</p>
                   </div>
                </label>
             </div>

             <Button type="submit" className="w-full text-white bg-slate-900 hover:bg-slate-800 focus-visible:ring-slate-900 mt-4" size="lg">
                Sign in to account
             </Button>
          </form>
       </div>
    </div>
  );
}

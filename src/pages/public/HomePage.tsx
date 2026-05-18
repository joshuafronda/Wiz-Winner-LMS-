import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, UserCheck, BookOpen, Globe, Award, Target, Book, LayoutDashboard, Briefcase } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center -rotate-3">
              <GraduationCap className="w-6 h-6 rotate-3" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">GreenLeaf Academy</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#features" className="hover:text-emerald-600 transition-colors">Platform Features</a>
            <a href="#contact" className="hover:text-emerald-600 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login/student" className="hidden sm:flex items-center justify-center px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
              Student Portal
            </Link>
            <Link to="/login/admin" className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors">
              Portals Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-900/5 pt-16 md:pt-24 pb-32">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 border border-emerald-200 text-sm font-semibold mb-6">
            <Globe className="w-4 h-4" /> Welcome to Academic Year 2026-2027
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Empowering education through a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">modern learning ecosystem</span>.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            GreenLeaf Academy's unified Learning Management System bringing students, faculty, and administration together in one powerful, scalable platform.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
             <a href="#portals" className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2">
                <LayoutDashboard className="w-5 h-5" /> Access Portals
             </a>
             <a href="#learn-more" className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2">
                Discover Features
             </a>
          </div>
        </div>
      </section>

      {/* Portal Access Links */}
      <section id="portals" className="py-24 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Secure Access Portals</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Select your designated portal below to sign in to the GreenLeaf Academy Learning Management System.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
             
             {/* Admin Portal Card */}
             <Link to="/login/admin" className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-emerald-700 transition-colors shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                   <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800">Administrator</h3>
                <p className="mt-3 text-sm text-slate-500">System control, data analytics, and institutional management reporting.</p>
                <div className="mt-auto pt-6 text-sm font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                   Login as Admin <span className="text-lg leading-none">&rarr;</span>
                </div>
             </Link>

             {/* Faculty Portal Card */}
             <Link to="/login/faculty" className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-green-500 transition-colors shadow-sm hover:shadow-xl hover:shadow-green-500/5 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                   <UserCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-green-700">Faculty</h3>
                <p className="mt-3 text-sm text-slate-500">Class rosters, grading systems, attendance tracking, and communications.</p>
                <div className="mt-auto pt-6 text-sm font-semibold text-green-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                   Login as Faculty <span className="text-lg leading-none">&rarr;</span>
                </div>
             </Link>

             {/* Staff/Employee Portal Card */}
             <Link to="/login/employee" className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-500 transition-colors shadow-sm hover:shadow-xl hover:shadow-blue-500/5 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                   <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700">Staff & Employee</h3>
                <p className="mt-3 text-sm text-slate-500">Workforce portal for administration staff, maintenance, and facility services.</p>
                <div className="mt-auto pt-6 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                   Login as Employee <span className="text-lg leading-none">&rarr;</span>
                </div>
             </Link>

             {/* Student Portal Card */}
             <Link to="/login/student" className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-yellow-400 transition-colors shadow-sm hover:shadow-xl hover:shadow-yellow-400/10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FEF9C3] text-yellow-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                   <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-yellow-800">Student</h3>
                <p className="mt-3 text-sm text-slate-500">Learning materials, assignments, academic records, and personalized dashboard.</p>
                <div className="mt-auto pt-6 text-sm font-semibold text-yellow-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                   Login as Student <span className="text-lg leading-none">&rarr;</span>
                </div>
             </Link>
             
          </div>
        </div>
      </section>

      {/* Institutional Statistics */}
      <section className="py-20 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
               <div>
                  <h4 className="text-4xl font-extrabold text-emerald-400">5k+</h4>
                  <p className="mt-2 text-sm text-slate-400 font-medium uppercase tracking-wider">Enrolled Students</p>
               </div>
               <div>
                  <h4 className="text-4xl font-extrabold text-emerald-400">142</h4>
                  <p className="mt-2 text-sm text-slate-400 font-medium uppercase tracking-wider">Expert Faculty</p>
               </div>
               <div>
                  <h4 className="text-4xl font-extrabold text-emerald-400">86</h4>
                  <p className="mt-2 text-sm text-slate-400 font-medium uppercase tracking-wider">Active Programs</p>
               </div>
               <div>
                  <h4 className="text-4xl font-extrabold text-emerald-400">92%</h4>
                  <p className="mt-2 text-sm text-slate-400 font-medium uppercase tracking-wider">Graduate Rate</p>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-slate-900">GreenLeaf Academy</span>
          </div>
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} GreenLeaf Academy LMS. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">IT Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { BookMarked, CalendarDays, Award, Clock, FileText, QrCode, BookOpen, Calculator, AlertTriangle, ListChecks, CheckSquare, Camera, GraduationCap } from 'lucide-react';
import { useAuthStore } from '@/src/store/authStore';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-student-dark tracking-tight">Welcome, {user?.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 mt-1">Here is your student self-service portal.</p>
        </div>
      </div>

      {/* Academic Actions */}
      <section>
         <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Academic Records & Subjects</h2>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/student/subjects" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-student-main transition-all shadow-sm hover:shadow-md hover:bg-student-bg">
               <div className="w-12 h-12 bg-student-main/10 text-student-main rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookMarked className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Current Subjects</h3>
               <p className="text-xs text-slate-500 mt-1">Enrolled classes</p>
            </Link>

            <Link to="/student/grades" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-blue-500 transition-all shadow-sm hover:shadow-md hover:bg-blue-50">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Current Grades</h3>
               <p className="text-xs text-slate-500 mt-1">View semester grades</p>
            </Link>

            <Link to="/student/grades/all" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-all shadow-sm hover:shadow-md hover:bg-indigo-50">
               <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">View All Grades</h3>
               <p className="text-xs text-slate-500 mt-1">Complete view</p>
            </Link>

            <Link to="/student/grades/copy" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-violet-500 transition-all shadow-sm hover:shadow-md hover:bg-violet-50">
               <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">View Copy of Grades</h3>
               <p className="text-xs text-slate-500 mt-1">Downloadable copy</p>
            </Link>

            <Link to="/student/curriculum" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-teal-500 transition-all shadow-sm hover:shadow-md hover:bg-teal-50">
               <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Curriculum</h3>
               <p className="text-xs text-slate-500 mt-1">Program roadmap</p>
            </Link>

            <Link to="/student/subjects/remaining" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-emerald-500 transition-all shadow-sm hover:shadow-md hover:bg-emerald-50">
               <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ListChecks className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Subjects to Complete</h3>
               <p className="text-xs text-slate-500 mt-1">Remaining curriculum</p>
            </Link>
            
            <Link to="/student/evaluations" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-fuchsia-500 transition-all shadow-sm hover:shadow-md hover:bg-fuchsia-50">
               <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckSquare className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Teacher Evaluations</h3>
               <p className="text-xs text-slate-500 mt-1">Evaluate instructors</p>
            </Link>
         </div>
      </section>

      {/* Admin & Finance Actions */}
      <section>
         <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Administrative & Financial</h2>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Link to="/student/cor" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-orange-500 transition-all shadow-sm hover:shadow-md hover:bg-orange-50">
               <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">COR</h3>
               <p className="text-xs text-slate-500 mt-1">Certificate of Registration</p>
            </Link>

            <Link to="/student/fees" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-amber-500 transition-all shadow-sm hover:shadow-md hover:bg-amber-50">
               <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Assessment of Fees</h3>
               <p className="text-xs text-slate-500 mt-1">Tuition breakdown</p>
            </Link>

            <Link to="/student/liabilities" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-red-500 transition-all shadow-sm hover:shadow-md hover:bg-red-50 relative">
               <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">2</div>
               <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Liabilities</h3>
               <p className="text-xs text-slate-500 mt-1">Clearances & fines</p>
            </Link>

         </div>
      </section>

      {/* ID Services */}
      <section>
         <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Identity Services</h2>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/student/id" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-student-main transition-all shadow-sm hover:shadow-md hover:bg-student-bg">
               <div className="w-12 h-12 bg-student-main/10 text-student-main rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <QrCode className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">View Student ID</h3>
               <p className="text-xs text-slate-500 mt-1">Digital ID Card</p>
            </Link>

            <Link to="/student/id/capture" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-pink-500 transition-all shadow-sm hover:shadow-md hover:bg-pink-50">
               <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">ID Capturing</h3>
               <p className="text-xs text-slate-500 mt-1">Update ID photo</p>
            </Link>
         </div>
      </section>

    </div>
  );
}

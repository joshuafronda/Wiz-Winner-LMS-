import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { useAuthStore } from '@/src/store/authStore';
import { Briefcase, Calendar, MessageSquare, Clock, FileText, CheckCircle2, QrCode, Banknote, CalendarDays, Contact2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function EmployeeDashboard() {
  const user = useAuthStore(state => state.user);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-slate-500 mt-1">Here is your schedule and task overview for today.</p>
      </div>

      {/* Self-Service Action Buttons instead of tabs */}
      <section>
         <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Employee Self-Service</h2>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Link to="/employee/id" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-employee-main transition-all shadow-sm hover:shadow-md hover:bg-employee-bg">
               <div className="w-12 h-12 bg-employee-main/10 text-employee-main rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <QrCode className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Employee ID</h3>
               <p className="text-xs text-slate-500 mt-1">Digital QR Code</p>
            </Link>

            <Link to="/employee/dtr" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-green-500 transition-all shadow-sm hover:shadow-md hover:bg-green-50">
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Time Record</h3>
               <p className="text-xs text-slate-500 mt-1">DTR & Time logs</p>
            </Link>

            <Link to="/employee/payslip" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-yellow-500 transition-all shadow-sm hover:shadow-md hover:bg-yellow-50">
               <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Banknote className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Payslips</h3>
               <p className="text-xs text-slate-500 mt-1">View pay receipts</p>
            </Link>

            <Link to="/employee/pds" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-purple-500 transition-all shadow-sm hover:shadow-md hover:bg-purple-50">
               <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Contact2 className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Information Sheet</h3>
               <p className="text-xs text-slate-500 mt-1">Personal Data (PDS)</p>
            </Link>

         </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-employee-main text-white border-none shadow-md">
            <CardContent className="p-6">
               <div className="flex justify-between items-start">
                  <div>
                     <p className="text-employee-light font-medium mb-1">Upcoming Shift</p>
                     <h3 className="text-3xl font-bold">08:00 AM</h3>
                     <p className="text-sm text-employee-light mt-1">Main Building - North Wing</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl">
                     <Clock className="w-6 h-6 text-white" />
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-sm ring-1 ring-slate-100">
            <CardContent className="p-6">
               <div className="flex justify-between items-start">
                  <div>
                     <p className="text-slate-500 font-medium mb-1">Open Tasks</p>
                     <h3 className="text-3xl font-bold text-slate-900">4</h3>
                     <p className="text-sm text-slate-500 mt-1">2 high priority</p>
                  </div>
                  <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                     <CheckCircle2 className="w-6 h-6" />
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-sm ring-1 ring-slate-100">
            <CardContent className="p-6">
               <div className="flex justify-between items-start">
                  <div>
                     <p className="text-slate-500 font-medium mb-1">New Messages</p>
                     <h3 className="text-3xl font-bold text-slate-900">2</h3>
                     <p className="text-sm text-yellow-500 mt-1 font-medium">From Administration</p>
                  </div>
                  <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                     <MessageSquare className="w-6 h-6" />
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card className="border-none shadow-sm ring-1 ring-slate-100">
            <CardHeader className="border-b border-slate-100 py-4">
               <CardTitle className="text-lg">Today's Tasks</CardTitle>
               <CardDescription>Your assigned duties for the current shift</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                  {[
                     { title: 'Facility Inspection', time: '08:30 AM', loc: 'Main Hall', status: 'pending' },
                     { title: 'Equipment Delivery', time: '10:00 AM', loc: 'Science Lab 3', status: 'pending' },
                     { title: 'Meeting with Supervisor', time: '01:00 PM', loc: 'Admin Office', status: 'pending' },
                  ].map((task, i) => (
                     <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-employee-bg text-employee-main flex items-center justify-center">
                              <FileText className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="font-semibold text-slate-900 leading-tight">{task.title}</p>
                              <p className="text-sm text-slate-500 mt-0.5">{task.time} • {task.loc}</p>
                           </div>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-600 hover:bg-employee-main hover:text-white hover:border-employee-main transition-colors">
                           Start
                        </button>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-sm ring-1 ring-slate-100">
            <CardHeader className="border-b border-slate-100 py-4">
               <CardTitle className="text-lg">Recent Announcements</CardTitle>
               <CardDescription>Important updates for all staff members</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
               <div className="space-y-6">
                  {[
                     { title: 'Fire Drill Schedule Update', date: 'Oct 15', excerpt: 'The mandatory building evacuation drill has been rescheduled to Thursday at 10 AM. All staff must participate.' },
                     { title: 'New Access Control System', date: 'Oct 12', excerpt: 'We are rolling out new keycards next week. Please visit the security office to update your credentials.' }
                  ].map((ann, i) => (
                     <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                           <h4 className="font-semibold text-slate-900">{ann.title}</h4>
                           <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{ann.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{ann.excerpt}</p>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>

    </div>
  );
}

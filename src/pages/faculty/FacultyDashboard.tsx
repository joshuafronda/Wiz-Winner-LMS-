import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Users, CheckSquare, Clock, BookOpen, ChevronRight, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CLASS_PERFORMANCE = [
  { subject: 'CS101', avgScore: 88, attendance: 95 },
  { subject: 'MATH202', avgScore: 76, attendance: 82 },
  { subject: 'PHYS105', avgScore: 84, attendance: 88 },
  { subject: 'ENG101', avgScore: 92, attendance: 98 },
];

const RECENT_TASKS = [
  { id: 1, title: 'Grade Midterm Papers', class: 'CS101 - Section A', due: 'Today, 11:59 PM', priority: 'High' },
  { id: 2, title: 'Submit Attendance Report', class: 'MATH202 - Section C', due: 'Tomorrow, 5:00 PM', priority: 'Medium' },
  { id: 3, title: 'Review Final Projects', class: 'PHYS105 - Section B', due: 'In 3 days', priority: 'Low' },
];

const SCHEDULE = [
  { time: '09:00 AM', subject: 'CS101', room: 'Lab 301', status: 'Ongoing' },
  { time: '11:00 AM', subject: 'MATH202', room: 'Room 405', status: 'Upcoming' },
  { time: '01:30 PM', subject: 'PHYS105', room: 'Lab 302', status: 'Upcoming' },
];

export default function FacultyDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-faculty-dark tracking-tight">Faculty Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your classes, grading, and students efficiently.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-l-4 border-l-faculty-main">
            <CardContent className="p-6 flex items-center justify-between">
               <div>
                  <p className="text-sm font-medium text-slate-500">Total Students</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-1">156</h3>
               </div>
               <div className="w-12 h-12 bg-faculty-light rounded-full flex items-center justify-center text-faculty-dark">
                  <Users className="w-6 h-6" />
               </div>
            </CardContent>
         </Card>
         <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6 flex items-center justify-between">
               <div>
                  <p className="text-sm font-medium text-slate-500">Pending Grades</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-1">24</h3>
               </div>
               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <CheckSquare className="w-6 h-6" />
               </div>
            </CardContent>
         </Card>
         <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6 flex items-center justify-between">
               <div>
                  <p className="text-sm font-medium text-slate-500">Upcoming Classes</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-1">3</h3>
               </div>
               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Clock className="w-6 h-6" />
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-6">
            {/* Performance Chart */}
            <Card>
               <CardHeader>
                  <CardTitle className="text-faculty-dark">Class Performance Overview</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="h-[280px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={CLASS_PERFORMANCE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                           <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                           <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                           <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                           <Bar dataKey="avgScore" name="Avg. Score (%)" fill="#22C55E" radius={[4, 4, 0, 0]} barSize={40} />
                           <Bar dataKey="attendance" name="Attendance (%)" fill="#94A3B8" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card>
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-faculty-dark">Pending Tasks</CardTitle>
                  <button className="text-sm text-faculty-main hover:underline font-medium">View All</button>
               </CardHeader>
               <CardContent>
                  <div className="divide-y divide-slate-100">
                     {RECENT_TASKS.map(task => (
                        <div key={task.id} className="py-4 flex items-center justify-between group">
                           <div className="flex gap-4">
                              <div className="mt-1">
                                 {task.priority === 'High' ? (
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                 ) : task.priority === 'Medium' ? (
                                    <Clock className="w-5 h-5 text-orange-500" />
                                 ) : (
                                    <CheckSquare className="w-5 h-5 text-slate-400" />
                                 )}
                              </div>
                              <div>
                                 <h4 className="font-semibold text-slate-800">{task.title}</h4>
                                 <p className="text-sm text-slate-500 mt-0.5">{task.class} • Due: {task.due}</p>
                              </div>
                           </div>
                           <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 rounded-full">
                              <ChevronRight className="w-5 h-5 text-slate-400" />
                           </button>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Right Sidebar */}
         <div className="space-y-6">
            <Card>
               <CardHeader>
                  <CardTitle className="text-faculty-dark">Today's Schedule</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pb-2">
                     {SCHEDULE.map((slot, i) => (
                        <div key={i} className="relative pl-6">
                           <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${slot.status === 'Ongoing' ? 'bg-faculty-main' : 'bg-slate-300'}`}></div>
                           <p className="text-xs font-bold text-faculty-main mb-1">{slot.time}</p>
                           <div className={`p-3 rounded-lg border ${slot.status === 'Ongoing' ? 'border-faculty-main bg-faculty-light/20' : 'border-slate-100 bg-slate-50'}`}>
                              <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                                 <BookOpen className="w-4 h-4 text-slate-400" />
                                 {slot.subject}
                              </h4>
                              <p className="text-sm text-slate-500 mt-1">Room: {slot.room}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            <Card className="bg-faculty-dark text-white border-none relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-8 -translate-x-8"></div>
               <CardContent className="p-6 relative z-10">
                  <h3 className="text-lg font-bold">Biometric Attendance</h3>
                  <p className="text-faculty-light text-sm mt-2 mb-4 leading-relaxed">
                     Quickly scan student IDs and fingerprints to record attendance for your upcoming class.
                  </p>
                  <button className="w-full bg-white text-faculty-dark font-semibold py-2.5 rounded-lg hover:bg-slate-100 transition-colors">
                     Open Scanner UI
                  </button>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}

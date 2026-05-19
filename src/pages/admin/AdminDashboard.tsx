import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Users, BookOpen, GraduationCap, TrendingUp, Activity, ToggleRight } from 'lucide-react';
import { useState } from 'react';

const ENROLLMENT_DATA = [
  { name: 'Jan', students: 4000, new: 240 },
  { name: 'Feb', students: 4200, new: 139 },
  { name: 'Mar', students: 4500, new: 980 },
  { name: 'Apr', students: 4600, new: 390 },
  { name: 'May', students: 4900, new: 480 },
  { name: 'Jun', students: 5120, new: 380 },
  { name: 'Jul', students: 5300, new: 430 },
];

const METRICS = [
  { title: 'Total Students', value: '5,300', icon: GraduationCap, trend: '+12%', color: 'from-emerald-500 to-teal-500' },
  { title: 'Total Faculty', value: '142', icon: Users, trend: '+2%', color: 'from-emerald-600 to-teal-600' },
  { title: 'Active Courses', value: '86', icon: BookOpen, trend: '0%', color: 'from-emerald-700 to-teal-700' },
  { title: 'Pass Rate', value: '92.4%', icon: TrendingUp, trend: '+4.1%', color: 'from-teal-600 to-cyan-600' },
];

const ACTIVITY_LOGS = [
  { time: '10 mins ago', user: 'Admin', action: 'Approved 12 new enrollments' },
  { time: '1 hour ago', user: 'System', action: 'Daily database backup completed' },
  { time: '2 hours ago', user: 'Prof. Snape', action: 'Updated grades for Potions 101' },
  { time: '5 hours ago', user: 'Admin', action: 'Created new academic year 2026-2027' },
];

export default function AdminDashboard() {
  const [evaluationsEnabled, setEvaluationsEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-admin-dark tracking-tight">Dean / Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back. Here's your institutional overview today.</p>
        </div>
      </div>

      {/* Evaluation Control Section */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ToggleRight className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-purple-900">Teacher Evaluation Control</CardTitle>
            </div>
            <button
              onClick={() => setEvaluationsEnabled(!evaluationsEnabled)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                evaluationsEnabled ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  evaluationsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-purple-900 font-medium">
              Status: <span className={evaluationsEnabled ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                {evaluationsEnabled ? '✓ Enabled for Students' : '✗ Disabled'}
              </span>
            </p>
            <p className="text-xs text-purple-800">
              {evaluationsEnabled 
                ? 'Students can now submit teacher evaluations. This feature is active.' 
                : 'Students cannot access evaluations. Toggle ON to enable the feature.'}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title} className="border-none shadow-md overflow-hidden relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <CardContent className="p-6 relative z-10 text-white">
                  <div className="flex justify-between items-start">
                     <div>
                       <p className="text-white/80 text-sm font-medium mb-1">{metric.title}</p>
                       <h3 className="text-3xl font-bold">{metric.value}</h3>
                     </div>
                     <div className="p-2 bg-white/20 rounded-lg">
                        <Icon className="w-5 h-5 text-white" />
                     </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                     <span className="bg-white/20 px-2 py-0.5 rounded text-white font-medium mr-2">
                       {metric.trend}
                     </span>
                     <span className="text-white/70">from last month</span>
                  </div>
                </CardContent>
              </Card>
            )
         })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border-admin-main/10">
          <CardHeader>
             <CardTitle className="text-admin-dark">Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full mt-4">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={ENROLLMENT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#047857" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#047857" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                   <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     labelStyle={{ color: '#0f172a', fontWeight: 600 }}
                   />
                   <Area type="monotone" dataKey="students" stroke="#047857" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-admin-main/10 block">
           <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-admin-main" />
                <CardTitle className="text-admin-dark">System Activity</CardTitle>
              </div>
           </CardHeader>
           <CardContent>
             <div className="space-y-6 mt-2">
               {ACTIVITY_LOGS.map((log, i) => (
                 <div key={i} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                       <div className="w-2.5 h-2.5 rounded-full bg-admin-main z-10"></div>
                       {i !== ACTIVITY_LOGS.length - 1 && <div className="w-[1px] h-full bg-slate-200 absolute top-2.5"></div>}
                    </div>
                    <div className="pb-2">
                       <p className="text-sm font-medium text-slate-800">{log.action}</p>
                       <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-admin-main">{log.user}</span>
                          <span className="text-xs text-slate-500">• {log.time}</span>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
             <button className="w-full mt-6 py-2 text-sm font-medium text-admin-main bg-admin-main/5 hover:bg-admin-main/10 rounded-lg transition-colors">
               View All Logs
             </button>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

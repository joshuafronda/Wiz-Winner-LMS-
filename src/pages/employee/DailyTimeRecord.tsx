import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Calendar, Filter, Clock, Download, ChevronRight } from 'lucide-react';

const MOCK_DTR = Array.from({ length: 15 }, (_, i) => {
  const dateStr = `2026-10-${(i + 1).toString().padStart(2, '0')}`;
  const isWeekend = new Date(dateStr).getDay() === 0 || new Date(dateStr).getDay() === 6;
  return {
    id: i,
    date: dateStr,
    timeIn: isWeekend ? null : '07:55 AM',
    timeOut: isWeekend ? null : (i % 5 === 0 ? '06:15 PM' : '05:05 PM'),
    status: isWeekend ? 'Weekend' : 'Present',
    remarks: isWeekend ? '' : (i % 5 === 0 ? 'Overtime' : 'Regular Shift')
  };
});

export default function DailyTimeRecord() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('10');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Daily Time Record</h1>
          <p className="text-slate-500 mt-1">View your time-in and time-out history.</p>
        </div>
        <Button className="flex items-center gap-2" variant="outline">
           <Download className="w-4 h-4" /> Export DTR
        </Button>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-100">
         <CardHeader className="border-b border-slate-100 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
               <div className="flex-1 sm:w-32">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Year</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-employee-main focus:border-employee-main p-2 outline-none font-medium"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                     <option value="2026">2026</option>
                     <option value="2025">2025</option>
                  </select>
               </div>
               <div className="flex-1 sm:w-40">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Month</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-employee-main focus:border-employee-main p-2 outline-none font-medium"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                     <option value="10">October</option>
                     <option value="09">September</option>
                     <option value="08">August</option>
                  </select>
               </div>
               <div className="self-end hidden sm:block">
                  <Button className="h-[38px] px-4 font-semibold">Filter</Button>
               </div>
            </div>
         </CardHeader>
         <CardContent className="p-0">
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-employee-bg border-b border-slate-200 text-employee-dark">
                      <tr>
                         <th className="px-6 py-4 font-semibold">Date</th>
                         <th className="px-6 py-4 font-semibold">Status</th>
                         <th className="px-6 py-4 font-semibold text-center">Time In</th>
                         <th className="px-6 py-4 font-semibold text-center">Time Out</th>
                         <th className="px-6 py-4 font-semibold">Remarks</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {MOCK_DTR.map((record) => (
                         <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">
                               <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-slate-400" />
                                  {record.date}
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               {record.status === 'Present' ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                                     Present
                                  </span>
                               ) : (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                     {record.status}
                                  </span>
                               )}
                            </td>
                            <td className="px-6 py-4 text-center">
                               {record.timeIn ? (
                                  <span className="font-mono bg-slate-50 px-3 py-1.5 rounded-md text-slate-700 border border-slate-100 inline-block w-24">
                                    {record.timeIn}
                                  </span>
                               ) : (
                                  <span className="text-slate-400">-</span>
                               )}
                            </td>
                            <td className="px-6 py-4 text-center">
                               {record.timeOut ? (
                                  <span className="font-mono bg-slate-50 px-3 py-1.5 rounded-md text-slate-700 border border-slate-100 inline-block w-24">
                                    {record.timeOut}
                                  </span>
                               ) : (
                                  <span className="text-slate-400">-</span>
                               )}
                            </td>
                            <td className="px-6 py-4 text-slate-600 text-xs">
                               {record.remarks}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
         </CardContent>
      </Card>
    </div>
  );
}

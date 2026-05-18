import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { GraduationCap, Download, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/src/store/authStore';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';

const MOCK_GRADES = [
  { courseCode: 'BAT 403', description: 'Fundamentals of Enterprise Data Management', grades: '1.25', units: 3, credit: 3, remarks: 'PASSED' },
  { courseCode: 'GEd 109', description: 'Science, Technology and Society', grades: '1.50', units: 3, credit: 3, remarks: 'PASSED' },
  { courseCode: 'IT 313', description: 'Web Systems and Technologies', grades: '1.00', units: 3, credit: 3, remarks: 'PASSED' },
  { courseCode: 'IT 325', description: 'IT Project Management', grades: '1.75', units: 3, credit: 3, remarks: 'PASSED' },
  { courseCode: 'IT 326', description: 'Information Assurance and Security', grades: '2.00', units: 3, credit: 3, remarks: 'PASSED' },
];

export default function ViewAllGrades() {
  const { user } = useAuthStore();
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [selectedQuarter, setSelectedQuarter] = useState('1');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
         <Link to="/student">
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
               <ArrowLeft className="w-5 h-5" />
            </Button>
         </Link>
         <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
             <h1 className="text-2xl md:text-3xl font-bold text-student-dark tracking-tight leading-tight">View All Grades</h1>
             <p className="text-slate-500 mt-1 text-sm md:text-base font-medium">Your complete academic records.</p>
           </div>
           <div className="flex flex-col sm:flex-row items-center gap-2">
              <select 
                className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-student-main focus:border-student-main p-2 outline-none font-medium shadow-sm w-full sm:w-auto"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                 <option value="2025-2026">AY 2025-2026</option>
                 <option value="2024-2025">AY 2024-2025</option>
              </select>
              <select 
                className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-student-main focus:border-student-main p-2 outline-none font-medium shadow-sm w-full sm:w-auto"
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
              >
                 <option value="1">1st Quarter</option>
                 <option value="2">2nd Quarter</option>
                 <option value="3">3rd Quarter</option>
                 <option value="4">4th Quarter</option>
              </select>
              <Button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-student-main hover:bg-student-dark text-white">
                 <Download className="w-4 h-4" /> Download PDF
              </Button>
           </div>
         </div>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-100">
         <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
            <CardTitle className="text-[15px] font-bold text-slate-700 flex items-center gap-2">
               <GraduationCap className="w-5 h-5 text-student-main" /> Academic Term: {selectedQuarter} Quarter, AY {selectedYear}
            </CardTitle>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase tracking-wider text-xs">
                     <tr>
                        <th className="px-6 py-4 font-semibold">Course Code</th>
                        <th className="px-6 py-4 font-semibold">Description</th>
                        <th className="px-6 py-4 font-semibold text-center">Grades</th>
                        <th className="px-6 py-4 font-semibold text-center">Units</th>
                        <th className="px-6 py-4 font-semibold text-center">Credit</th>
                        <th className="px-6 py-4 font-semibold text-center">Remarks</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {MOCK_GRADES.map((grade, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                           <td className="px-6 py-4 font-mono font-bold text-student-main text-sm">{grade.courseCode}</td>
                           <td className="px-6 py-4 font-semibold text-slate-800">{grade.description}</td>
                           <td className="px-6 py-4 text-center font-bold text-emerald-600">{grade.grades}</td>
                           <td className="px-6 py-4 text-center text-slate-600">{grade.units}</td>
                           <td className="px-6 py-4 text-center text-slate-600">{grade.credit}</td>
                           <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-800">
                                 {grade.remarks}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
               <div className="text-right">
                  <p className="text-sm font-semibold text-slate-500">GWA (General Weighted Average)</p>
                  <p className="text-2xl font-black text-student-dark mt-1">1.50</p>
               </div>
            </div>
         </CardContent>
      </Card>
      
    </div>
  );
}

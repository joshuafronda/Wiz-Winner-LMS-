import { useState } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Search, LayoutGrid, List as ListIcon, User, Users, MapPin } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

const CLASSES = [
  { id: '1', code: 'BAT 403', subject: 'Fundamentals of Enterprise Data Management', section: 'IT-BA-3201', campus: 'CICS - ALANGILAN', students: 47, submitted: 0, schoolYear: '2025-2026', semester: 'Second', course: 'BSIT', passed: 0, failed: 0 },
  { id: '2', code: 'BAT 403', subject: 'Fundamentals of Enterprise Data Management', section: 'IT-BA-3203', campus: 'CICS - ALANGILAN', students: 46, submitted: 0, schoolYear: '2025-2026', semester: 'Second', course: 'BSIT', passed: 0, failed: 0 },
  { id: '3', code: 'GEd 109', subject: 'Science, Technology and Society', section: 'IT-1201', campus: 'CICS - ALANGILAN', students: 42, submitted: 0, schoolYear: '2025-2026', semester: 'Second', course: 'BSIT', passed: 0, failed: 0 },
  { id: '4', code: 'GEd 109', subject: 'Science, Technology and Society', section: 'IT-1202', campus: 'CICS - ALANGILAN', students: 40, submitted: 1, schoolYear: '2025-2026', semester: 'Second', course: 'BSIT', passed: 0, failed: 0 },
  { id: '5', code: 'GEd 109', subject: 'Science, Technology and Society', section: 'IT-1213', campus: 'CICS - ALANGILAN', students: 37, submitted: 0, schoolYear: '2025-2026', semester: 'Second', course: 'BSIT', passed: 0, failed: 0 },
  { id: '6', code: 'GEd 109', subject: 'Science, Technology and Society', section: 'IT-1214', campus: 'CICS - ALANGILAN', students: 43, submitted: 0, schoolYear: '2025-2026', semester: 'Second', course: 'BSIT', passed: 0, failed: 0 },
  { id: '7', code: 'GEd 109', subject: 'Science, Technology and Society', section: 'IT-1215', campus: 'CICS - ALANGILAN', students: 39, submitted: 0, schoolYear: '2025-2026', semester: 'Second', course: 'BSIT', passed: 0, failed: 0 },
  { id: '8', code: 'IT 325', subject: 'IT Project Management', section: 'IT-BA-3201', campus: 'CICS - ALANGILAN', students: 47, submitted: 0, schoolYear: '2025-2026', semester: 'Second', course: 'BSIT', passed: 0, failed: 0 },
];

export default function MyClasses() {
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-faculty-dark tracking-tight">My Classes</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Total of {CLASSES.length} class for SECOND AY 2025-2026</p>
        </div>
        <div className="flex gap-2">
           <div className="relative w-full sm:w-auto">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input type="text" placeholder="Search class..." className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50" />
           </div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-4">
         <Button 
           variant="outline" 
           className={cn("gap-2", viewMode === 'list' && "bg-slate-100 border-slate-300")}
           onClick={() => setViewMode('list')}
         >
            <LayoutGrid className="w-4 h-4" /> List View
         </Button>
         <Button 
           variant="outline" 
           className={cn("gap-2", viewMode === 'table' && "bg-slate-100 border-slate-300")}
           onClick={() => setViewMode('table')}
         >
            <ListIcon className="w-4 h-4" /> Table View
         </Button>
      </div>

      {viewMode === 'list' ? (
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CLASSES.map((cls) => (
               <Card key={cls.id} className="border-none shadow-sm ring-1 ring-slate-100 hover:shadow-md transition-shadow">
                  <div className="p-1 items-center bg-faculty-main rounded-t-xl h-2 flex"></div>
                  <CardContent className="p-6">
                     <div className="space-y-4">
                        <div>
                           <h3 className="text-lg font-bold text-slate-900 leading-tight">
                              {cls.code} - {cls.subject}
                           </h3>
                           <p className="text-faculty-main font-semibold mt-1">{cls.section}</p>
                        </div>
                        
                        <div className="text-sm text-slate-500 font-medium">
                           <p className="flex items-center gap-2 mb-1.5"><MapPin className="w-4 h-4" /> {cls.campus}</p>
                           <p className="flex items-center gap-2"><Users className="w-4 h-4" /> {cls.students} students</p>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                           <div className="flex justify-between items-center text-sm font-semibold">
                              <span className="text-slate-500">Submitted</span>
                              <span className="text-slate-800">{cls.submitted} of {cls.students}</span>
                           </div>
                           <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                              <div 
                                className="bg-faculty-main h-full" 
                                style={{ width: `${(cls.submitted / cls.students) * 100}%` }}
                              />
                           </div>
                        </div>

                        <div className="pt-2">
                           <Button className="w-full text-white bg-faculty-main hover:bg-faculty-dark" variant="default" asChild>
                              <Link to={`/faculty/classes/${cls.id}`}>View Details</Link>
                           </Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      ) : (
         <Card className="border-none shadow-sm ring-1 ring-slate-100">
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                     <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                        <tr>
                           <th className="px-4 py-3 font-semibold">#</th>
                           <th className="px-4 py-3 font-semibold">Schoolyear</th>
                           <th className="px-4 py-3 font-semibold">Semester</th>
                           <th className="px-4 py-3 font-semibold">Course</th>
                           <th className="px-4 py-3 font-semibold">College / Campus</th>
                           <th className="px-4 py-3 font-semibold">Class Section</th>
                           <th className="px-4 py-3 font-semibold">Students</th>
                           <th className="px-4 py-3 font-semibold">Submitted</th>
                           <th className="px-4 py-3 font-semibold text-center">Total Submitted</th>
                           <th className="px-4 py-3 font-semibold">Passed</th>
                           <th className="px-4 py-3 font-semibold">Failed</th>
                           <th className="px-4 py-3 font-semibold text-center">Options</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {CLASSES.map((cls, idx) => (
                           <tr key={cls.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3">{idx + 1}</td>
                              <td className="px-4 py-3">{cls.schoolYear}</td>
                              <td className="px-4 py-3">{cls.semester}</td>
                              <td className="px-4 py-3 font-medium">{cls.code}</td>
                              <td className="px-4 py-3 text-slate-500">{cls.campus}</td>
                              <td className="px-4 py-3 font-semibold text-faculty-main">{cls.section}</td>
                              <td className="px-4 py-3 text-center">{cls.students}</td>
                              <td className="px-4 py-3 text-center">{cls.submitted}</td>
                              <td className="px-4 py-3 text-center font-semibold">{cls.submitted} / {cls.students}</td>
                              <td className="px-4 py-3 text-center text-green-600">{cls.passed}</td>
                              <td className="px-4 py-3 text-center text-red-600">{cls.failed}</td>
                              <td className="px-4 py-3 text-center">
                                 <Button variant="outline" size="sm" asChild>
                                    <Link to={`/faculty/classes/${cls.id}`}>Open</Link>
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </CardContent>
         </Card>
      )}
    </div>
  );
}

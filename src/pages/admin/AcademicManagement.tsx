import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Search, MapPin, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const FACULTY_LIST = [
  { id: '1', name: 'Minerva McGonagall' },
  { id: '2', name: 'Severus Snape' },
  { id: '3', name: 'Filius Flitwick' },
  { id: '4', name: 'Pomona Sprout' },
  { id: '5', name: 'Alastor Moody' },
];

const INITIAL_SUBJECTS = [
  { id: '101', code: 'BAT 403', subject: 'Fundamentals of Enterprise Data Management', section: 'IT-BA-3201', campus: 'CICS - ALANGILAN', students: 47, assignedTo: '' },
  { id: '102', code: 'BAT 403', subject: 'Fundamentals of Enterprise Data Management', section: 'IT-BA-3203', campus: 'CICS - ALANGILAN', students: 46, assignedTo: '' },
  { id: '103', code: 'GEd 109', subject: 'Science, Technology and Society', section: 'IT-1201', campus: 'CICS - ALANGILAN', students: 42, assignedTo: '1' },
  { id: '104', code: 'GEd 109', subject: 'Science, Technology and Society', section: 'IT-1202', campus: 'CICS - ALANGILAN', students: 40, assignedTo: '1' },
  { id: '105', code: 'IT 325', subject: 'IT Project Management', section: 'CS-3201', campus: 'CICS - ALANGILAN', students: 45, assignedTo: '' },
];

export default function AcademicManagement() {
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleAssign = (subjectId: string, facultyId: string) => {
    setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, assignedTo: facultyId } : s));
  };

  const handleSave = () => {
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <div className={cn(
        "fixed top-20 right-8 bg-admin-main text-white px-4 py-3 rounded-xl shadow-lg border border-admin-dark flex items-center gap-3 transition-all transform duration-300 z-50",
        isToastVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
      )}>
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-medium text-sm">Faculty assignments saved successfully!</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-admin-dark tracking-tight">Academic Management</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Dean/Principal Portal: Authorize and assign instructors to subjects.</p>
        </div>
        <div className="flex gap-2">
           <Button className="flex-1 sm:flex-none text-white bg-admin-main hover:bg-admin-dark" onClick={handleSave}>
             Save Configurations
           </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-100">
         <CardHeader className="border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <select className="w-full sm:w-64 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-admin-main focus:border-admin-main block p-2.5 outline-none font-medium">
                <option value="2025-2">SECOND AY 2025-2026</option>
                <option value="2025-1">FIRST AY 2025-2026</option>
              </select>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search course or section..." 
                className="pl-9 pr-4 py-2.5 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-light/50 transition-shadow bg-slate-50"
              />
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                     <tr>
                        <th className="px-6 py-4 font-semibold">Course Details</th>
                        <th className="px-6 py-4 font-semibold">Section</th>
                        <th className="px-6 py-4 font-semibold text-center">Class Size</th>
                        <th className="px-6 py-4 font-semibold">Instructor Assignment</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {subjects.map((subject) => (
                          <tr key={subject.id} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-xl bg-admin-light/20 flex items-center justify-center text-admin-main shadow-sm border border-admin-light/30">
                                      <BookOpen className="w-5 h-5" />
                                   </div>
                                   <div className="flex flex-col">
                                      <span className="font-bold text-slate-800">{subject.code}</span>
                                      <span className="text-xs text-slate-500 truncate max-w-[250px]" title={subject.subject}>{subject.subject}</span>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex flex-col">
                                   <span className="font-semibold text-admin-main">{subject.section}</span>
                                   <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3"/> {subject.campus}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-center">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium text-xs">
                                   <Users className="w-3.5 h-3.5" /> {subject.students}
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <select 
                                  className={cn(
                                    "w-full sm:w-64 border rounded-lg text-sm focus:ring-2 focus:ring-admin-main/50 focus:border-admin-main p-2.5 outline-none font-medium transition-colors",
                                    subject.assignedTo ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-white border-slate-200 text-slate-800"
                                  )}
                                  value={subject.assignedTo}
                                  onChange={(e) => handleAssign(subject.id, e.target.value)}
                                >
                                  <option value="">-- Unassigned --</option>
                                  {FACULTY_LIST.map(faculty => (
                                    <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                                  ))}
                                </select>
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

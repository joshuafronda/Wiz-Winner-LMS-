import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Search, Download, Save, UserCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const CLASSES = [
  { id: 'CS101', name: 'Computer Science 101 - Section A' },
  { id: 'MATH202', name: 'Advanced Mathematics - Section C' },
  { id: 'PHYS105', name: 'Physics Laboratory - Section B' },
];

const MOCK_STUDENTS = [
  { id: 'SR-2023-0001', name: 'Harry Potter', midterms: 88, finals: 92, project: 90 },
  { id: 'SR-2023-0002', name: 'Hermione Granger', midterms: 98, finals: 100, project: 97 },
  { id: 'SR-2023-0003', name: 'Ron Weasley', midterms: 75, finals: 80, project: 78 },
  { id: 'SR-2023-0004', name: 'Neville Longbottom', midterms: 82, finals: 85, project: 88 },
  { id: 'SR-2023-0005', name: 'Draco Malfoy', midterms: 90, finals: 85, project: 89 },
];

export default function FacultyGrades() {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0].id);
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const calculateFinalGrade = (mid: number, fin: number, proj: number) => {
    return Math.round((mid * 0.3) + (fin * 0.4) + (proj * 0.3));
  };

  const handleGradeChange = (id: string, field: 'midterms'|'finals'|'project', value: string) => {
    const numValue = value === '' ? 0 : Math.min(100, Math.max(0, parseInt(value, 10)));
    setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: numValue } : s));
  };

  const handleSave = () => {
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <div className={cn(
        "fixed top-20 right-8 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg border border-green-600 flex items-center gap-3 transition-all transform duration-300 z-50",
        isToastVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
      )}>
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-medium text-sm">Grades saved successfully!</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-faculty-dark tracking-tight">Grade Management</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Encode and update student grades for your classes.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="flex-1 sm:flex-none border-faculty-light text-faculty-dark hover:bg-faculty-bg">
             <Download className="w-4 h-4 mr-2" /> Export
           </Button>
           <Button className="flex-1 sm:flex-none" onClick={handleSave}>
             <Save className="w-4 h-4 mr-2" /> Save Grades
           </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-100">
         <CardHeader className="border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <select 
                className="w-full sm:w-64 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-faculty-main focus:border-faculty-main block p-2.5 outline-none font-medium"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search student..." 
                className="pl-9 pr-4 py-2.5 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50 transition-shadow bg-slate-50"
              />
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-faculty-bg border-b border-slate-200 text-faculty-dark">
                     <tr>
                        <th className="px-6 py-4 font-semibold">Student</th>
                        <th className="px-6 py-4 font-semibold text-center w-32">Midterms (30%)</th>
                        <th className="px-6 py-4 font-semibold text-center w-32">Finals (40%)</th>
                        <th className="px-6 py-4 font-semibold text-center w-32">Project (30%)</th>
                        <th className="px-6 py-4 font-semibold text-center w-32">Final Grade</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {students.map((student) => {
                        const finalGrade = calculateFinalGrade(student.midterms, student.finals, student.project);
                        const isPassing = finalGrade >= 75;

                        return (
                          <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                      {student.name.charAt(0)}
                                   </div>
                                   <div className="flex flex-col">
                                      <span className="font-bold text-slate-800">{student.name}</span>
                                      <span className="text-xs text-slate-500">{student.id}</span>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-center">
                                <input 
                                  type="number" 
                                  value={student.midterms || ''} 
                                  onChange={(e) => handleGradeChange(student.id, 'midterms', e.target.value)}
                                  className="w-20 text-center border border-slate-200 rounded-md py-1.5 focus:ring-2 focus:ring-faculty-main/50 focus:border-faculty-main outline-none text-slate-800 font-medium"
                                  min="0" max="100"
                                />
                             </td>
                             <td className="px-6 py-4 text-center">
                                <input 
                                  type="number" 
                                  value={student.finals || ''} 
                                  onChange={(e) => handleGradeChange(student.id, 'finals', e.target.value)}
                                  className="w-20 text-center border border-slate-200 rounded-md py-1.5 focus:ring-2 focus:ring-faculty-main/50 focus:border-faculty-main outline-none text-slate-800 font-medium"
                                  min="0" max="100"
                                />
                             </td>
                             <td className="px-6 py-4 text-center">
                               <input 
                                  type="number" 
                                  value={student.project || ''} 
                                  onChange={(e) => handleGradeChange(student.id, 'project', e.target.value)}
                                  className="w-20 text-center border border-slate-200 rounded-md py-1.5 focus:ring-2 focus:ring-faculty-main/50 focus:border-faculty-main outline-none text-slate-800 font-medium"
                                  min="0" max="100"
                                />
                             </td>
                             <td className="px-6 py-4 text-center">
                                <div className={cn(
                                   "inline-flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg",
                                   isPassing ? "bg-faculty-main/10 text-faculty-main" : "bg-red-50 text-red-600"
                                )}>
                                   {finalGrade}
                                </div>
                             </td>
                          </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

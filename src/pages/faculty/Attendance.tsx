import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Search, Calendar as CalendarIcon, Save, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const CLASSES = [
  { id: 'CS101', name: 'Computer Science 101 - Section A' },
  { id: 'MATH202', name: 'Advanced Mathematics - Section C' },
  { id: 'PHYS105', name: 'Physics Laboratory - Section B' },
];

const MOCK_STUDENTS = [
  { id: 'SR-2023-0001', name: 'Harry Potter', status: 'present' },
  { id: 'SR-2023-0002', name: 'Hermione Granger', status: 'present' },
  { id: 'SR-2023-0003', name: 'Ron Weasley', status: 'late' },
  { id: 'SR-2023-0004', name: 'Neville Longbottom', status: 'absent' },
  { id: 'SR-2023-0005', name: 'Draco Malfoy', status: 'unmarked' },
];

export default function FacultyAttendance() {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0].id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleStatusChange = (id: string, newStatus: 'present' | 'absent' | 'late') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const markAllAs = (status: 'present' | 'absent') => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  const handleSave = () => {
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <div className={cn(
        "fixed top-20 right-8 bg-faculty-main text-white px-4 py-3 rounded-xl shadow-lg border border-faculty-dark flex items-center gap-3 transition-all transform duration-300 z-50",
        isToastVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
      )}>
        <Save className="w-5 h-5" />
        <span className="font-medium text-sm">Attendance saved successfully!</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-faculty-dark tracking-tight">Attendance Record</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Mark attendance manually or verify biometric scans.</p>
        </div>
        <div className="flex gap-2">
           <Button className="flex-1 sm:flex-none" onClick={handleSave}>
             <Save className="w-4 h-4 mr-2" /> Save Records
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

              <div className="relative w-full sm:w-auto">
                 <input 
                   type="date"
                   value={date}
                   onChange={(e) => setDate(e.target.value)}
                   className="bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-faculty-main focus:border-faculty-main block w-full p-2.5 outline-none font-medium"
                 />
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
               <Button variant="outline" size="sm" onClick={() => markAllAs('present')} className="flex-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                  Mark All Present
               </Button>
               <Button variant="outline" size="sm" onClick={() => markAllAs('absent')} className="flex-1 bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
                  Mark All Absent
               </Button>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-faculty-bg border-b border-slate-200 text-faculty-dark">
                     <tr>
                        <th className="px-6 py-4 font-semibold">Student</th>
                        <th className="px-6 py-4 font-semibold text-center w-64">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {students.map((student) => (
                          <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                      {student.name.charAt(0)}
                                   </div>
                                   <div className="flex flex-col">
                                      <span className="font-bold text-slate-800">{student.name}</span>
                                      <span className="text-xs text-slate-500">{student.id}</span>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                   <button 
                                     onClick={() => handleStatusChange(student.id, 'present')}
                                     className={cn(
                                        "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-medium text-xs border transition-all",
                                        student.status === 'present' 
                                          ? "bg-green-100 border-green-300 text-green-800 shadow-sm" 
                                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                                     )}
                                   >
                                      <CheckCircle2 className="w-4 h-4" /> Present
                                   </button>
                                   <button 
                                     onClick={() => handleStatusChange(student.id, 'late')}
                                     className={cn(
                                        "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-medium text-xs border transition-all",
                                        student.status === 'late' 
                                          ? "bg-orange-100 border-orange-300 text-orange-800 shadow-sm" 
                                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                                     )}
                                   >
                                      <AlertCircle className="w-4 h-4" /> Late
                                   </button>
                                   <button 
                                     onClick={() => handleStatusChange(student.id, 'absent')}
                                     className={cn(
                                        "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-medium text-xs border transition-all",
                                        student.status === 'absent' 
                                          ? "bg-red-100 border-red-300 text-red-800 shadow-sm" 
                                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                                     )}
                                   >
                                      <XCircle className="w-4 h-4" /> Absent
                                   </button>
                                </div>
                             </td>
                          </tr>
                        )
                     )}
                  </tbody>
               </table>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

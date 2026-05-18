import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { ArrowLeft, Search, Download, Upload, GraduationCap, X, Settings, Table as TableIcon, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const MOCK_CLASS = {
  id: '1', code: 'BAT 403', subject: 'Fundamentals of Enterprise Data Management', section: 'IT-BA-3201', campus: 'CICS - ALANGILAN'
};

const STUDENTS = [
  { id: 'SR-2023-0001', name: 'Harry Potter', finalGrade: '1.25', reExam: '-', status: 'Passed' },
  { id: 'SR-2023-0002', name: 'Hermione Granger', finalGrade: '1.00', reExam: '-', status: 'Passed' },
  { id: 'SR-2023-0003', name: 'Ron Weasley', finalGrade: '2.50', reExam: '-', status: 'Passed' },
  { id: 'SR-2023-0004', name: 'Neville Longbottom', finalGrade: '3.00', reExam: '2.75', status: 'Passed' },
  { id: 'SR-2023-0005', name: 'Draco Malfoy', finalGrade: '5.00', reExam: '-', status: 'Failed' },
];

export default function ClassDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'students' | 'grading'>('students');
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
         <Link to="/faculty/classes">
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
               <ArrowLeft className="w-5 h-5" />
            </Button>
         </Link>
         <div>
            <h1 className="text-2xl md:text-3xl font-bold text-faculty-dark tracking-tight leading-tight">
               {MOCK_CLASS.code} - {MOCK_CLASS.section}
            </h1>
            <p className="text-slate-500 mt-1 text-sm md:text-base font-medium">{MOCK_CLASS.subject}</p>
         </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-0">
         <button 
           className={cn("px-4 py-3 font-semibold text-sm transition-colors border-b-2", activeTab === 'students' ? "border-faculty-main text-faculty-dark" : "border-transparent text-slate-500 hover:text-slate-700")}
           onClick={() => setActiveTab('students')}
         >
            <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4"/> Students List</div>
         </button>
         <button 
           className={cn("px-4 py-3 font-semibold text-sm transition-colors border-b-2", activeTab === 'grading' ? "border-faculty-main text-faculty-dark" : "border-transparent text-slate-500 hover:text-slate-700")}
           onClick={() => setActiveTab('grading')}
         >
            <div className="flex items-center gap-2"><TableIcon className="w-4 h-4"/> Grading System</div>
         </button>
      </div>

      {activeTab === 'students' ? (
        <>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-slate-200 pb-4 mt-4">
             <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search student..." className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50" />
             </div>
             <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none">
                   <Upload className="w-4 h-4 mr-2" /> Import Grades
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-none">
                   <Download className="w-4 h-4 mr-2" /> Export
                </Button>
             </div>
          </div>

          <Card className="border-none shadow-sm ring-1 ring-slate-100">
             <CardContent className="p-0">
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                         <tr>
                            <th className="px-6 py-4 font-semibold">#</th>
                            <th className="px-6 py-4 font-semibold">SRCODE</th>
                            <th className="px-6 py-4 font-semibold">FULLNAME</th>
                            <th className="px-6 py-4 font-semibold text-center">FINAL GRADE</th>
                            <th className="px-6 py-4 font-semibold text-center">RE-EXAM</th>
                            <th className="px-6 py-4 font-semibold text-center">OPTION</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {STUDENTS.map((student, index) => (
                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                               <td className="px-6 py-4">{index + 1}</td>
                               <td className="px-6 py-4 font-mono text-sm text-faculty-main font-semibold">{student.id}</td>
                               <td className="px-6 py-4 font-bold text-slate-800">{student.name}</td>
                               <td className="px-6 py-4 text-center font-bold">
                                  <span className={cn(
                                    "px-3 py-1 rounded-md", 
                                    student.status === 'Failed' ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                                  )}>
                                    {student.finalGrade}
                                  </span>
                               </td>
                               <td className="px-6 py-4 text-center font-medium text-slate-600">{student.reExam}</td>
                               <td className="px-6 py-4 text-center">
                                  <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                                     View Details
                                  </Button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </CardContent>
          </Card>
        </>
      ) : (
        <Card className="border-none shadow-sm ring-1 ring-slate-100 mt-4">
           <CardHeader className="bg-slate-50 border-b border-slate-100 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-700 flex items-center gap-2">
                 <Settings className="w-5 h-5 text-faculty-main" /> Grading System Setup
              </CardTitle>
           </CardHeader>
           <CardContent className="p-8 text-center text-slate-500">
              <div className="max-w-md mx-auto space-y-4">
                 <TableIcon className="w-12 h-12 text-slate-300 mx-auto" />
                 <h3 className="text-lg font-bold text-slate-700">Configure Grading Components</h3>
                 <p className="text-sm">Set up your grading criteria, weights, and components (e.g., Quizzes, Exams, Projects) for this class.</p>
                 <Button className="mt-4 bg-faculty-main hover:bg-faculty-dark text-white">Setup Grading Components</Button>
              </div>
           </CardContent>
        </Card>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden ring-1 ring-slate-200" onClick={(e) => e.stopPropagation()}>
            <div className="bg-faculty-main px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Student Details</h3>
              <button 
                onClick={() => setSelectedStudent(null)} 
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
               <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                 <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl border border-slate-200">
                   {selectedStudent.name.charAt(0)}
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-slate-900">{selectedStudent.name}</h2>
                   <p className="font-mono text-sm text-slate-500 mt-1">{selectedStudent.id}</p>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                   <p className="text-xs font-semibold text-slate-500 uppercase">Final Grade</p>
                   <p className={cn("text-3xl font-black mt-2", selectedStudent.status === 'Failed' ? 'text-red-600' : 'text-emerald-600')}>
                     {selectedStudent.finalGrade}
                   </p>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                   <p className="text-xs font-semibold text-slate-500 uppercase">Status</p>
                   <div className="flex justify-center mt-3">
                     <span className={cn(
                       "inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-bold",
                       selectedStudent.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                     )}>
                       {selectedStudent.status === 'Passed' && <CheckCircle2 className="w-4 h-4"/>}
                       {selectedStudent.status}
                     </span>
                   </div>
                 </div>
               </div>

               <div className="pt-2 flex justify-end gap-2">
                 <Button variant="outline" onClick={() => setSelectedStudent(null)}>Close</Button>
                 <Button className="bg-faculty-main hover:bg-faculty-dark text-white">Edit Grade</Button>
               </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

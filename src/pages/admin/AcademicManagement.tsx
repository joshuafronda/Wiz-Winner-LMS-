import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Search, MapPin, Users, CheckCircle2, Plus, X, BookOpen } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const FACULTY_LIST = [
  { id: '1', name: 'Minerva McGonagall' },
  { id: '2', name: 'Severus Snape' },
  { id: '3', name: 'Filius Flitwick' },
  { id: '4', name: 'Pomona Sprout' },
  { id: '5', name: 'Alastor Moody' },
];

const GRADE_LEVELS = [
  'Nursery',
  'Pre-Kindergarten',
  'Kindergarten',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6'
];

const LEVEL_GROUPS = {
  'Preschool': ['Nursery', 'Pre-Kindergarten', 'Kindergarten'],
  'Primary': ['Grade 1', 'Grade 2', 'Grade 3'],
  'Intermediate': ['Grade 4', 'Grade 5', 'Grade 6']
};

const SUBJECTS_BY_GRADE = {
  'Nursery': [
    'Play-based Learning',
    'Social Skills',
    'Fine Motor Skills',
    'Basic Language Development',
    'Music and Movement',
    'Arts and Play',
    'Values Formation'
  ],
  'Pre-Kindergarten': [
    'Language Development',
    'Early Reading Readiness',
    'Numbers & Counting',
    'Shapes & Colors',
    'Writing Readiness',
    'Music & Arts',
    'Physical Activities',
    'Values / Social Skills'
  ],
  'Kindergarten': [
    'Language, Literacy & Communication',
    'Cognitive Development',
    'Physical Health & Motor Development',
    'Socio-Emotional Development',
    'Values Development',
    'Creative / Aesthetic Development'
  ],
  'Grade 1': [
    'Language',
    'Reading and Literacy',
    'Mathematics',
    'GMRC (Good Manners and Right Conduct)',
    'Makabansa'
  ],
  'Grade 2': [
    'English',
    'Filipino',
    'Mathematics',
    'GMRC',
    'Makabansa'
  ],
  'Grade 3': [
    'English',
    'Filipino',
    'Mathematics',
    'GMRC',
    'Makabansa',
    'Science'
  ],
  'Grade 4': [
    'English',
    'Filipino',
    'Mathematics',
    'Science',
    'Araling Panlipunan',
    'GMRC',
    'Music and Arts',
    'Physical Education and Health',
    'EPP (Edukasyong Pantahanan at Pangkabuhayan)'
  ],
  'Grade 5': [
    'English',
    'Filipino',
    'Mathematics',
    'Science',
    'Araling Panlipunan',
    'GMRC',
    'Music and Arts',
    'Physical Education and Health',
    'EPP (Edukasyong Pantahanan at Pangkabuhayan)'
  ],
  'Grade 6': [
    'English',
    'Filipino',
    'Mathematics',
    'Science',
    'Araling Panlipunan',
    'GMRC',
    'Music and Arts',
    'Physical Education and Health',
    'EPP (Edukasyong Pantahanan at Pangkabuhayan)'
  ]
};

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

// Generate initial subjects from the curriculum
const generateInitialSubjects = () => {
  const subjects: any[] = [];
  let id = 1;
  
  Object.entries(SUBJECTS_BY_GRADE).forEach(([grade, subjectList]) => {
    const studentCounts: { [key: string]: number } = {
      'Nursery': 25, 'Pre-Kindergarten': 28, 'Kindergarten': 30,
      'Grade 1': 32, 'Grade 2': 32, 'Grade 3': 32,
      'Grade 4': 35, 'Grade 5': 35, 'Grade 6': 35
    };
    
    (subjectList as string[]).forEach(subject => {
      QUARTERS.forEach(quarter => {
        subjects.push({
          id: String(id++),
          subject,
          gradeLevel: grade,
          quarter,
          campus: 'Elementary Campus',
          students: studentCounts[grade] || 30,
          assignedTo: ''
        });
      });
    });
  });
  
  return subjects;
};

const INITIAL_SUBJECTS = generateInitialSubjects();

export default function AcademicManagement() {
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('Nursery');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubjectForm, setNewSubjectForm] = useState({
    subject: '',
    gradeLevel: 'Nursery',
    quarter: 'Q1',
  });

  const handleAssign = (subjectId: string, facultyId: string) => {
    setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, assignedTo: facultyId } : s));
  };

  const handleAddSubject = () => {
    if (newSubjectForm.subject.trim()) {
      const newSubject = {
        id: String(Math.max(...subjects.map(s => parseInt(s.id)), 0) + 1),
        subject: newSubjectForm.subject,
        gradeLevel: newSubjectForm.gradeLevel,
        quarter: newSubjectForm.quarter,
        campus: 'Elementary Campus',
        students: 30,
        assignedTo: '',
      };
      setSubjects([...subjects, newSubject]);
      setNewSubjectForm({ subject: '', gradeLevel: 'Grade 1', quarter: 'Q1' });
      setShowAddModal(false);
      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 3000);
    }
  };

  const getEducationLevel = (grade: string) => {
    for (const [level, grades] of Object.entries(LEVEL_GROUPS)) {
      if ((grades as string[]).includes(grade)) return level;
    }
    return 'Preschool';
  };

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      'Preschool': 'bg-pink-100 text-pink-700 border-pink-300',
      'Primary': 'bg-blue-100 text-blue-700 border-blue-300',
      'Intermediate': 'bg-purple-100 text-purple-700 border-purple-300'
    };
    return colors[level] || colors['Preschool'];
  };

  const filteredSubjects = subjects.filter(
    s => s.gradeLevel === selectedGrade && s.quarter === selectedQuarter
  );

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <div className={cn(
        "fixed top-20 right-8 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-700 flex items-center gap-3 transition-all transform duration-300 z-50",
        isToastVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
      )}>
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-medium text-sm">Subject added successfully!</span>
      </div>

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 px-6 py-6 border-b border-slate-200 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <Plus className="w-6 h-6 text-emerald-600" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Add New Subject</h2>
                  <p className="text-xs text-slate-600 mt-1">Select grade level and choose from available subjects</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-2xl font-bold text-slate-600 hover:text-slate-900"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Grade Level *</label>
                <select
                  value={newSubjectForm.gradeLevel}
                  onChange={(e) => setNewSubjectForm({ ...newSubjectForm, gradeLevel: e.target.value, subject: '' })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {Object.entries(LEVEL_GROUPS).map(([level, grades]) => (
                    <optgroup key={level} label={`${level} Level`}>
                      {(grades as string[]).map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                <select
                  value={newSubjectForm.subject}
                  onChange={(e) => setNewSubjectForm({ ...newSubjectForm, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">-- Select a subject --</option>
                  {(SUBJECTS_BY_GRADE[newSubjectForm.gradeLevel as keyof typeof SUBJECTS_BY_GRADE] || []).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Quarter *</label>
                <select
                  value={newSubjectForm.quarter}
                  onChange={(e) => setNewSubjectForm({ ...newSubjectForm, quarter: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {QUARTERS.map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubject}
                  disabled={!newSubjectForm.subject.trim()}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Subject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-admin-dark tracking-tight">Academic Management</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Assign instructors to DepEd MATATAG curriculum subjects across Preschool, Primary, and Intermediate levels.</p>
        </div>
        <div className="flex gap-2">
           <button
             onClick={() => setShowAddModal(true)}
             className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
           >
             <Plus className="w-4 h-4" />
             Add Subject
           </button>
        </div>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-100">
         <CardHeader className="border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div>
                <label className="text-xs uppercase font-bold text-slate-500 mb-2 block">Grade Level</label>
                <select 
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full sm:w-72 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-admin-main focus:border-admin-main block p-2.5 outline-none font-medium"
                >
                  {Object.entries(LEVEL_GROUPS).map(([level, grades]) => (
                    <optgroup key={level} label={`${level} Level`}>
                      {(grades as string[]).map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-slate-500 mb-2 block">Quarter</label>
                <select 
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                  className="w-full sm:w-48 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-admin-main focus:border-admin-main block p-2.5 outline-none font-medium"
                >
                  {QUARTERS.map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {selectedGrade && (
              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-bold ${getLevelColor(getEducationLevel(selectedGrade))}`}>
                <span>{getEducationLevel(selectedGrade)}</span>
              </div>
            )}
         </CardHeader>
         <CardContent className="p-0">
            {filteredSubjects.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="text-slate-300 mb-3">
                     <BookOpen className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-1">No Subjects Found</h3>
                  <p className="text-slate-500 text-center text-sm">{selectedGrade} ({getEducationLevel(selectedGrade)} Level) - {selectedQuarter} has no assigned subjects yet</p>
               </div>
            ) : (
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                     <thead className="sticky top-0 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200 text-slate-700 z-10">
                        <tr>
                           <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider">Subject</th>
                           <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider hidden md:table-cell">Grade Level</th>
                           <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider hidden lg:table-cell">Category</th>
                           <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Students</th>
                           <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider">Status</th>
                           <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider">Instructor</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {filteredSubjects.map((subject, index) => {
                           const level = getEducationLevel(subject.gradeLevel);
                           const isAssigned = !!subject.assignedTo;
                           const assignedFaculty = FACULTY_LIST.find(f => f.id === subject.assignedTo);
                           
                           return (
                             <tr key={subject.id} className="hover:bg-blue-50/40 transition-colors duration-150 border-l-4 border-l-transparent hover:border-l-admin-main">
                                <td className="px-4 sm:px-6 py-4">
                                   <div className="flex flex-col gap-1">
                                      <span className="font-bold text-slate-900">{subject.subject}</span>
                                      <span className="text-xs text-slate-500 md:hidden">{subject.gradeLevel} • {level}</span>
                                   </div>
                                </td>
                                <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                                   <span className="font-semibold text-admin-main bg-blue-50 px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap inline-block">{subject.gradeLevel}</span>
                                </td>
                                <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                                   <span className={`inline-flex px-2.5 py-1.5 rounded-lg text-xs font-bold ${getLevelColor(level)}`}>
                                      {level}
                                   </span>
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-center">
                                   <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 text-slate-700 rounded-full font-bold text-xs">
                                      <Users className="w-3.5 h-3.5" /> {subject.students}
                                   </div>
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                   <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-bold ${isAssigned ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                      {isAssigned ? '✓ Assigned' : 'Unassigned'}
                                   </span>
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                   <select 
                                     className={cn(
                                       "w-full border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-admin-main/50 focus:border-admin-main p-2 outline-none font-medium transition-all duration-150",
                                       subject.assignedTo 
                                         ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm" 
                                         : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                     )}
                                     value={subject.assignedTo}
                                     onChange={(e) => handleAssign(subject.id, e.target.value)}
                                   >
                                     <option value="">Assign...</option>
                                     {FACULTY_LIST.map(faculty => (
                                       <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                                     ))}
                                   </select>
                                </td>
                             </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
            )}
            {filteredSubjects.length > 0 && (
               <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Total: <span className="font-bold text-slate-900">{filteredSubjects.length}</span> subjects</span>
                  <span>Assigned: <span className="font-bold text-emerald-600">{filteredSubjects.filter(s => s.assignedTo).length}</span></span>
               </div>
            )}
         </CardContent>
      </Card>
    </div>
  );
}

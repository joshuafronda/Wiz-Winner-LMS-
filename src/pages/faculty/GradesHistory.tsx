import { useState } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Search, Filter, Download, Calendar, BookOpen, X, Eye } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const AVATAR_COLORS = [
  'bg-red-100 text-red-700',
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-yellow-100 text-yellow-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
  'bg-orange-100 text-orange-700'
];

const GRADE_LEVELS = [
  'Nursery', 'Pre-Kindergarten', 'Kindergarten',
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'
];

const ACADEMIC_YEARS = ['2023-2024', '2024-2025', '2025-2026'];

const LEVEL_GROUPS = {
  'Preschool': ['Nursery', 'Pre-Kindergarten', 'Kindergarten'],
  'Primary': ['Grade 1', 'Grade 2', 'Grade 3'],
  'Intermediate': ['Grade 4', 'Grade 5', 'Grade 6']
};

const SUBJECTS_BY_GRADE = {
  'Nursery': ['Play-based Learning', 'Social Skills', 'Fine Motor Skills', 'Basic Language Development', 'Music and Movement', 'Arts and Play', 'Values Formation'],
  'Pre-Kindergarten': ['Language Development', 'Early Reading Readiness', 'Numbers & Counting', 'Shapes & Colors', 'Writing Readiness', 'Music & Arts', 'Physical Activities', 'Values / Social Skills'],
  'Kindergarten': ['Language, Literacy & Communication', 'Cognitive Development', 'Physical Health & Motor Development', 'Socio-Emotional Development', 'Values Development', 'Creative / Aesthetic Development'],
  'Grade 1': ['Language', 'Reading and Literacy', 'Mathematics', 'GMRC (Good Manners and Right Conduct)', 'Makabansa'],
  'Grade 2': ['English', 'Filipino', 'Mathematics', 'GMRC', 'Makabansa'],
  'Grade 3': ['English', 'Filipino', 'Mathematics', 'GMRC', 'Makabansa', 'Science'],
  'Grade 4': ['English', 'Filipino', 'Mathematics', 'Science', 'Araling Panlipunan', 'GMRC', 'Music and Arts', 'Physical Education and Health', 'EPP'],
  'Grade 5': ['English', 'Filipino', 'Mathematics', 'Science', 'Araling Panlipunan', 'GMRC', 'Music and Arts', 'Physical Education and Health', 'EPP'],
  'Grade 6': ['English', 'Filipino', 'Mathematics', 'Science', 'Araling Panlipunan', 'GMRC', 'Music and Arts', 'Physical Education and Health', 'EPP']
};

// Sample historical grades data
const HISTORICAL_GRADES = [
  {
    id: '1',
    studentName: 'Maria Santos',
    studentId: 'STU-001',
    gradeLevel: 'Grade 1',
    subject: 'English',
    academicYear: '2023-2024',
    Q1: 88,
    Q2: 90,
    Q3: 92,
    Q4: 89,
    finalGrade: 90,
    class: '1-A'
  },
  {
    id: '2',
    studentName: 'Juan Dela Cruz',
    studentId: 'STU-002',
    gradeLevel: 'Grade 1',
    subject: 'Mathematics',
    academicYear: '2023-2024',
    Q1: 85,
    Q2: 87,
    Q3: 86,
    Q4: 88,
    finalGrade: 87,
    class: '1-B'
  },
  {
    id: '3',
    studentName: 'Maria Santos',
    studentId: 'STU-001',
    gradeLevel: 'Grade 2',
    subject: 'English',
    academicYear: '2024-2025',
    Q1: 91,
    Q2: 93,
    Q3: 94,
    Q4: 92,
    finalGrade: 93,
    class: '2-A'
  },
  {
    id: '4',
    studentName: 'Anna Reyes',
    studentId: 'STU-003',
    gradeLevel: 'Grade 2',
    subject: 'Science',
    academicYear: '2024-2025',
    Q1: 89,
    Q2: 88,
    Q3: 90,
    Q4: 91,
    finalGrade: 90,
    class: '2-A'
  },
  {
    id: '5',
    studentName: 'Juan Dela Cruz',
    studentId: 'STU-002',
    gradeLevel: 'Grade 2',
    subject: 'Mathematics',
    academicYear: '2024-2025',
    Q1: 88,
    Q2: 89,
    Q3: 91,
    Q4: 90,
    finalGrade: 90,
    class: '2-B'
  },
  {
    id: '6',
    studentName: 'Maria Santos',
    studentId: 'STU-001',
    gradeLevel: 'Grade 3',
    subject: 'Science',
    academicYear: '2025-2026',
    Q1: 92,
    Q2: 94,
    Q3: 93,
    Q4: null,
    finalGrade: null,
    class: '3-A'
  }
];

const getLevelCategory = (grade: string) => {
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

const getGradeColor = (grade: number | null): string => {
  if (grade === null || grade === undefined) return 'text-slate-500';
  if (grade >= 90) return 'text-emerald-600 font-bold';
  if (grade >= 85) return 'text-blue-600 font-bold';
  if (grade >= 80) return 'text-indigo-600 font-bold';
  if (grade >= 75) return 'text-amber-600 font-bold';
  return 'text-red-600 font-bold';
};

const getGradeDescriptor = (grade: number | null): string => {
  if (grade === null || grade === undefined) return '-';
  if (grade >= 90) return 'Outstanding (O)';
  if (grade >= 85) return 'Very Satisfactory (VS)';
  if (grade >= 80) return 'Satisfactory (S)';
  if (grade >= 75) return 'Fairly Satisfactory (FS)';
  return 'Did Not Meet Expectations (DNM)';
};

const getStudentInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const getAvatarColor = (studentId: string): string => {
  const hash = studentId.charCodeAt(studentId.length - 1);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

export default function GradesHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGradeLevel, setFilterGradeLevel] = useState<string>('');
  const [filterYear, setFilterYear] = useState<string>('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [selectedStudentPreview, setSelectedStudentPreview] = useState<typeof HISTORICAL_GRADES[0] | null>(null);

  const filteredGrades = HISTORICAL_GRADES.filter(grade => {
    const matchesSearch = 
      grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGradeLevel = !filterGradeLevel || grade.gradeLevel === filterGradeLevel;
    const matchesYear = !filterYear || grade.academicYear === filterYear;
    const matchesSubject = !filterSubject || grade.subject === filterSubject;

    return matchesSearch && matchesGradeLevel && matchesYear && matchesSubject;
  });

  const availableSubjects = Array.from(new Set(
    HISTORICAL_GRADES.filter(g => !filterGradeLevel || g.gradeLevel === filterGradeLevel)
      .map(g => g.subject)
  ));

  const handleExportCSV = () => {
    const headers = ['Student Name', 'Student ID', 'Grade Level', 'Subject', 'Academic Year', 'Class', 'Q1', 'Q2', 'Q3', 'Q4', 'Final Grade', 'Descriptor'];
    const rows = filteredGrades.map(g => [
      g.studentName,
      g.studentId,
      g.gradeLevel,
      g.subject,
      g.academicYear,
      g.class,
      g.Q1,
      g.Q2,
      g.Q3,
      g.Q4,
      g.finalGrade || '-',
      g.finalGrade ? getGradeDescriptor(g.finalGrade) : '-'
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grades-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-faculty-dark tracking-tight">Grades History</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">View and manage historical grades records</p>
        </div>
        <Button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
          variant="default"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-faculty-main" />
            <h3 className="font-semibold text-slate-900">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50 bg-white"
              />
            </div>

            {/* Grade Level */}
            <div>
              <select
                value={filterGradeLevel}
                onChange={(e) => {
                  setFilterGradeLevel(e.target.value);
                  setFilterSubject('');
                }}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50 bg-white font-medium"
              >
                <option value="">All Grade Levels</option>
                {GRADE_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Academic Year */}
            <div>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50 bg-white font-medium"
              >
                <option value="">All Years</option>
                {ACADEMIC_YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50 bg-white font-medium"
              >
                <option value="">All Subjects</option>
                {availableSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          {(searchQuery || filterGradeLevel || filterYear || filterSubject) && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterGradeLevel('');
                  setFilterYear('');
                  setFilterSubject('');
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
              <span className="text-xs text-slate-600 py-1.5 px-2">
                Showing {filteredGrades.length} of {HISTORICAL_GRADES.length} records
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card className="border-none shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-0">
          {filteredGrades.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <BookOpen className="w-12 h-12 text-slate-300 mb-3" />
              <h3 className="text-lg font-semibold text-slate-700">No Records Found</h3>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200 text-slate-700 z-10">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider">Student</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider hidden md:table-cell">Grade Level</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider">Subject</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider hidden lg:table-cell">Year</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Q1</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Q2</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Q3</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Q4</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Final</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider hidden lg:table-cell">Descriptor</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGrades.map((grade, idx) => {
                    const level = getLevelCategory(grade.gradeLevel);

                    return (
                      <tr key={grade.id} className="hover:bg-blue-50/40 transition-colors border-l-4 border-l-transparent hover:border-l-faculty-main">
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0", getAvatarColor(grade.studentId))}>
                              {getStudentInitials(grade.studentName)}
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-slate-900">{grade.studentName}</span>
                              <span className="text-xs text-slate-500">{grade.studentId}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-faculty-main bg-blue-50 px-2.5 py-1.5 rounded-lg text-xs inline-block">
                              {grade.gradeLevel}
                            </span>
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full border ${getLevelColor(level)}`}>
                              {level}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="font-semibold text-slate-900">{grade.subject}</span>
                          <span className="text-xs text-slate-500 md:hidden block mt-1">{grade.gradeLevel} • {level}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                            <Calendar className="w-3 h-3" />
                            {grade.academicYear}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          <span className={cn("text-sm font-bold", getGradeColor(grade.Q1))}>
                            {grade.Q1 || '-'}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          <span className={cn("text-sm font-bold", getGradeColor(grade.Q2))}>
                            {grade.Q2 || '-'}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          <span className={cn("text-sm font-bold", getGradeColor(grade.Q3))}>
                            {grade.Q3 || '-'}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          <span className={cn("text-sm font-bold", getGradeColor(grade.Q4))}>
                            {grade.Q4 || '-'}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          <span className={cn("text-sm font-bold px-2 py-1 rounded", grade.finalGrade ? 'bg-slate-100' : '')}>
                            {grade.finalGrade ? (
                              <span className={getGradeColor(grade.finalGrade)}>
                                {grade.finalGrade}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                          <span className="text-xs text-slate-600 font-semibold">
                            {grade.finalGrade ? getGradeDescriptor(grade.finalGrade) : '-'}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          <button
                            onClick={() => setSelectedStudentPreview(grade)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-faculty-main/10 hover:bg-faculty-main/20 text-faculty-main font-semibold rounded-lg transition-colors text-xs"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">Preview</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Preview Modal */}
      {selectedStudentPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-faculty-main/20 to-faculty-main/10 px-6 py-4 border-b border-slate-200 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-slate-900">Student Profile</h2>
              <button
                onClick={() => setSelectedStudentPreview(null)}
                className="text-2xl font-bold text-slate-600 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4 mb-8">
                <div className={cn(
                  "w-24 h-24 rounded-full flex items-center justify-center font-bold text-4xl shadow-lg",
                  getAvatarColor(selectedStudentPreview.studentId)
                )}>
                  {getStudentInitials(selectedStudentPreview.studentName)}
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900">{selectedStudentPreview.studentName}</h3>
                  <p className="text-sm text-slate-600 mt-1">{selectedStudentPreview.studentId}</p>
                </div>
              </div>

              {/* Student Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 font-semibold uppercase">Grade Level</p>
                  <p className="text-lg font-bold text-slate-900 mt-1">{selectedStudentPreview.gradeLevel}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 font-semibold uppercase">Class</p>
                  <p className="text-lg font-bold text-faculty-main mt-1">{selectedStudentPreview.class}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 font-semibold uppercase">Subject</p>
                  <p className="text-lg font-bold text-slate-900 mt-1">{selectedStudentPreview.subject}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 font-semibold uppercase">Academic Year</p>
                  <p className="text-lg font-bold text-slate-900 mt-1">{selectedStudentPreview.academicYear}</p>
                </div>
              </div>

              {/* Grades Section */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-900 uppercase mb-3">Quarterly Grades</h4>
                <div className="grid grid-cols-4 gap-3">
                  {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
                    <div key={q} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-slate-200 text-center">
                      <p className="text-xs text-slate-600 font-semibold uppercase">{q}</p>
                      <p className={cn("text-2xl font-bold mt-2", getGradeColor(selectedStudentPreview[q]))}>
                        {selectedStudentPreview[q] || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Grade */}
              {selectedStudentPreview.finalGrade && (
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border-2 border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-emerald-700 font-bold uppercase">Final Grade</p>
                      <p className={cn("text-3xl font-bold mt-1", getGradeColor(selectedStudentPreview.finalGrade))}>
                        {selectedStudentPreview.finalGrade}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Descriptor</p>
                      <p className="text-sm font-bold text-slate-900">{getGradeDescriptor(selectedStudentPreview.finalGrade)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 rounded-b-2xl">
              <button
                onClick={() => setSelectedStudentPreview(null)}
                className="w-full px-4 py-2.5 bg-faculty-main text-white font-semibold rounded-lg hover:bg-faculty-dark transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

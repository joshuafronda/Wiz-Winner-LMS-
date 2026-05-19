import { useState } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { TrendingUp, AlertCircle, Award, Users, BarChart3, Filter, Download } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Sample data for analytics
const ANALYTICS_DATA = {
  classOverview: {
    totalStudents: 45,
    averageGrade: 87.5,
    passRate: 95.6,
    failRate: 4.4,
    classGradeLevel: 'Grade 3',
    classSection: '3-A'
  },
  gradeDistribution: {
    O: 18,      // Outstanding (90-100)
    VS: 15,     // Very Satisfactory (85-89)
    S: 8,       // Satisfactory (80-84)
    FS: 3,      // Fairly Satisfactory (75-79)
    DNM: 1      // Did Not Meet (below 75)
  },
  quarterlyPerformance: {
    Q1: 85.2,
    Q2: 86.8,
    Q3: 88.1,
    Q4: null
  },
  topPerformers: [
    { name: 'Maria Santos', grade: 94, studentId: 'STU-001' },
    { name: 'Luis Gonzales', grade: 92, studentId: 'STU-015' },
    { name: 'Anna Reyes', grade: 91, studentId: 'STU-008' },
    { name: 'Carlos Mendoza', grade: 90, studentId: 'STU-022' },
    { name: 'Rosa Garcia', grade: 89, studentId: 'STU-035' }
  ],
  atRiskStudents: [
    { name: 'Juan dela Cruz', currentGrade: 74, trend: 'down', studentId: 'STU-002' },
    { name: 'Miguel Santos', currentGrade: 73, trend: 'down', studentId: 'STU-041' },
    { name: 'Pedro Martinez', currentGrade: 72, trend: 'stable', studentId: 'STU-039' }
  ],
  subjectPerformance: [
    { subject: 'English', average: 88.5, passRate: 97.8 },
    { subject: 'Mathematics', average: 86.2, passRate: 93.3 },
    { subject: 'Science', average: 87.9, passRate: 95.6 },
    { subject: 'Filipino', average: 85.4, passRate: 91.1 },
    { subject: 'GMRC', average: 89.2, passRate: 100 }
  ],
  improvementStudents: [
    { name: 'Emma Wilson', q1: 75, q3: 82, improvement: '+7', studentId: 'STU-012' },
    { name: 'David Lee', q1: 78, q3: 85, improvement: '+7', studentId: 'STU-028' },
    { name: 'Sophie Brown', q1: 80, q3: 87, improvement: '+7', studentId: 'STU-045' }
  ]
};

const DEPED_GRADING_SCALE = [
  { range: '90-100', descriptor: 'Outstanding (O)', color: 'bg-emerald-100 text-emerald-700', count: 18 },
  { range: '85-89', descriptor: 'Very Satisfactory (VS)', color: 'bg-blue-100 text-blue-700', count: 15 },
  { range: '80-84', descriptor: 'Satisfactory (S)', color: 'bg-indigo-100 text-indigo-700', count: 8 },
  { range: '75-79', descriptor: 'Fairly Satisfactory (FS)', color: 'bg-amber-100 text-amber-700', count: 3 },
  { range: '<75', descriptor: 'Did Not Meet (DNM)', color: 'bg-red-100 text-red-700', count: 1 }
];

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
  return 'Did Not Meet (DNM)';
};

const getPercentageWidth = (count: number, total: number): number => {
  return (count / total) * 100;
};

export default function Analytics() {
  const [selectedQuarter, setSelectedQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4' | 'all'>('all');
  const [selectedPerformanceLevel, setSelectedPerformanceLevel] = useState<'all' | 'O' | 'VS' | 'S' | 'FS' | 'DNM'>('all');
  const [selectedStudentStatus, setSelectedStudentStatus] = useState<'all' | 'top' | 'atRisk' | 'improving'>('all');
  
  const totalStudents = ANALYTICS_DATA.classOverview.totalStudents;
  const totalGradeDistribution = Object.values(ANALYTICS_DATA.gradeDistribution).reduce((a, b) => a + b, 0);

  // Filter grade distribution based on selected performance level
  const getFilteredGradeDistribution = () => {
    if (selectedPerformanceLevel === 'all') {
      return DEPED_GRADING_SCALE;
    }
    return DEPED_GRADING_SCALE.filter(item => {
      if (selectedPerformanceLevel === 'O') return item.range === '90-100';
      if (selectedPerformanceLevel === 'VS') return item.range === '85-89';
      if (selectedPerformanceLevel === 'S') return item.range === '80-84';
      if (selectedPerformanceLevel === 'FS') return item.range === '75-79';
      if (selectedPerformanceLevel === 'DNM') return item.range === '<75';
      return true;
    });
  };

  // Filter top performers based on selected performance level
  const getFilteredTopPerformers = () => {
    let filtered = ANALYTICS_DATA.topPerformers;
    if (selectedPerformanceLevel !== 'all') {
      filtered = filtered.filter(s => {
        if (selectedPerformanceLevel === 'O') return s.grade >= 90;
        if (selectedPerformanceLevel === 'VS') return s.grade >= 85 && s.grade < 90;
        if (selectedPerformanceLevel === 'S') return s.grade >= 80 && s.grade < 85;
        if (selectedPerformanceLevel === 'FS') return s.grade >= 75 && s.grade < 80;
        if (selectedPerformanceLevel === 'DNM') return s.grade < 75;
        return true;
      });
    }
    return filtered;
  };

  // Filter students based on selected status
  const getFilteredStudentList = () => {
    if (selectedStudentStatus === 'top') return getFilteredTopPerformers();
    if (selectedStudentStatus === 'atRisk') return ANALYTICS_DATA.atRiskStudents;
    if (selectedStudentStatus === 'improving') return ANALYTICS_DATA.improvementStudents;
    return [];
  };

  const handleExportReport = () => {
    const report = `
FACULTY ANALYTICS REPORT
Generated: ${new Date().toLocaleString()}

CLASS OVERVIEW
==============
Class Level: ${ANALYTICS_DATA.classOverview.classGradeLevel}
Section: ${ANALYTICS_DATA.classOverview.classSection}
Total Students: ${ANALYTICS_DATA.classOverview.totalStudents}
Average Grade: ${ANALYTICS_DATA.classOverview.averageGrade}
Pass Rate: ${ANALYTICS_DATA.classOverview.passRate}%
Fail Rate: ${ANALYTICS_DATA.classOverview.failRate}%

GRADE DISTRIBUTION
==================
Outstanding (O): ${ANALYTICS_DATA.gradeDistribution.O} students
Very Satisfactory (VS): ${ANALYTICS_DATA.gradeDistribution.VS} students
Satisfactory (S): ${ANALYTICS_DATA.gradeDistribution.S} students
Fairly Satisfactory (FS): ${ANALYTICS_DATA.gradeDistribution.FS} students
Did Not Meet (DNM): ${ANALYTICS_DATA.gradeDistribution.DNM} students

QUARTERLY PERFORMANCE
====================
Q1: ${ANALYTICS_DATA.quarterlyPerformance.Q1}
Q2: ${ANALYTICS_DATA.quarterlyPerformance.Q2}
Q3: ${ANALYTICS_DATA.quarterlyPerformance.Q3}
Q4: Not yet available

TOP PERFORMERS
==============
${ANALYTICS_DATA.topPerformers.map(s => `${s.name} (${s.studentId}): ${s.grade}`).join('\n')}

AT-RISK STUDENTS
================
${ANALYTICS_DATA.atRiskStudents.map(s => `${s.name} (${s.studentId}): ${s.currentGrade}`).join('\n')}
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters Beside Title */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-faculty-dark tracking-tight">Analytics Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Class performance insights and student progress tracking</p>
        </div>

        {/* Filters and Export Section */}
        <div className="flex flex-col sm:flex-row gap-3 lg:min-w-max">
          {/* Quarter Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-700 mb-1.5">Quarter</label>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value as any)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50 bg-white"
            >
              <option value="all">All Quarters</option>
              <option value="Q1">Q1 Only</option>
              <option value="Q2">Q2 Only</option>
              <option value="Q3">Q3 Only</option>
              <option value="Q4">Q4 Only</option>
            </select>
          </div>

          {/* Performance Level Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-700 mb-1.5">Performance</label>
            <select
              value={selectedPerformanceLevel}
              onChange={(e) => setSelectedPerformanceLevel(e.target.value as any)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50 bg-white"
            >
              <option value="all">All Levels</option>
              <option value="O">Outstanding (90-100)</option>
              <option value="VS">Very Satisfactory (85-89)</option>
              <option value="S">Satisfactory (80-84)</option>
              <option value="FS">Fairly Satisfactory (75-79)</option>
              <option value="DNM">Did Not Meet (&lt;75)</option>
            </select>
          </div>

          {/* Student Status Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-700 mb-1.5">Category</label>
            <select
              value={selectedStudentStatus}
              onChange={(e) => setSelectedStudentStatus(e.target.value as any)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50 bg-white"
            >
              <option value="all">All Students</option>
              <option value="top">Top Performers</option>
              <option value="atRisk">At-Risk Students</option>
              <option value="improving">Showing Improvement</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {(selectedQuarter !== 'all' || selectedPerformanceLevel !== 'all' || selectedStudentStatus !== 'all') && (
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-700 mb-1.5 invisible">Action</label>
              <button
                onClick={() => {
                  setSelectedQuarter('all');
                  setSelectedPerformanceLevel('all');
                  setSelectedStudentStatus('all');
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase">Average Grade</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{ANALYTICS_DATA.classOverview.averageGrade}</p>
              </div>
              <Award className="w-10 h-10 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase">Total Students</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{ANALYTICS_DATA.classOverview.totalStudents}</p>
              </div>
              <Users className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase">Pass Rate</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{ANALYTICS_DATA.classOverview.passRate}%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase">At Risk</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{ANALYTICS_DATA.atRiskStudents.length}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <Card className="border-none shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-faculty-main" />
              <h3 className="text-lg font-bold text-slate-900">Grade Distribution</h3>
            </div>

            <div className="space-y-4">
              {getFilteredGradeDistribution().map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full", item.color)}>
                        {item.range}
                      </span>
                      <span className="text-sm text-slate-600">{item.descriptor}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{item.count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        idx === 0 && 'bg-emerald-500',
                        idx === 1 && 'bg-blue-500',
                        idx === 2 && 'bg-indigo-500',
                        idx === 3 && 'bg-amber-500',
                        idx === 4 && 'bg-red-500'
                      )}
                      style={{
                        width: `${getPercentageWidth(item.count, totalGradeDistribution)}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quarterly Performance */}
        <Card className="border-none shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-faculty-main" />
              <h3 className="text-lg font-bold text-slate-900">Quarterly Trends</h3>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => {
                const grade = ANALYTICS_DATA.quarterlyPerformance[q];
                return (
                  <div key={q} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-slate-200 text-center">
                    <p className="text-xs text-slate-600 font-semibold uppercase">{q}</p>
                    <p className={cn("text-2xl font-bold mt-3", grade ? getGradeColor(grade) : 'text-slate-400')}>
                      {grade ? grade.toFixed(1) : '-'}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Trend Analysis</p>
              <p className="text-sm text-slate-900">
                <span className="font-bold text-emerald-600">↑ Improving</span> - Class average increased by 2.9 points from Q1 to Q3
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="border-none shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-faculty-main" />
              <h3 className="text-lg font-bold text-slate-900">Top Performers</h3>
            </div>

            {getFilteredTopPerformers().length > 0 ? (
              <div className="space-y-3">
                {getFilteredTopPerformers().map((student, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-600">{student.studentId}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-2xl font-bold", getGradeColor(student.grade))}>
                        {student.grade}
                      </p>
                      <p className="text-xs text-emerald-600 font-bold">{getGradeDescriptor(student.grade)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500">
                <p className="text-sm">No students match the selected filters</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* At-Risk Students */}
        <Card className="border-none shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-faculty-main" />
              <h3 className="text-lg font-bold text-slate-900">At-Risk Students</h3>
            </div>

            <div className="space-y-3">
              {ANALYTICS_DATA.atRiskStudents.length > 0 ? (
                ANALYTICS_DATA.atRiskStudents.map((student, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-600">{student.studentId}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-2xl font-bold", getGradeColor(student.currentGrade))}>
                        {student.currentGrade}
                      </p>
                      <p className={cn("text-xs font-bold mt-1", student.trend === 'down' ? 'text-red-600' : 'text-amber-600')}>
                        {student.trend === 'down' ? '↓ Declining' : '→ Stable'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-500">
                  <p className="text-sm">No at-risk students detected</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      <Card className="border-none shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-faculty-main" />
            <h3 className="text-lg font-bold text-slate-900">Subject Performance</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b-2 border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-900">Subject</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-900">Average Grade</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-900">Pass Rate</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-900">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ANALYTICS_DATA.subjectPerformance.map((subject, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-4 py-4 font-semibold text-slate-900">{subject.subject}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={cn("font-bold", getGradeColor(subject.average))}>
                        {subject.average}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="font-bold text-emerald-600">{subject.passRate}%</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
                        {subject.average >= 90 ? 'Excellent' : subject.average >= 85 ? 'Good' : 'Satisfactory'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Students */}
      <Card className="border-none shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-faculty-main" />
            <h3 className="text-lg font-bold text-slate-900">
              {selectedStudentStatus === 'top' ? 'Top Performers' : selectedStudentStatus === 'atRisk' ? 'At-Risk Students' : 'Students Showing Improvement'}
            </h3>
          </div>

          {getFilteredStudentList().length > 0 ? (
            <div className="space-y-3">
              {getFilteredStudentList().map((student: any, idx: number) => (
                <div 
                  key={idx} 
                  className={cn(
                    "p-4 rounded-lg border flex items-center justify-between hover:shadow-md transition-shadow",
                    selectedStudentStatus === 'atRisk' 
                      ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                  )}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {student.improvement ? `Q1: ${student.q1} → Q3: ${student.q3}` : `ID: ${student.studentId}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">{student.studentId}</p>
                    {student.improvement && (
                      <p className="text-2xl font-bold text-emerald-600 mt-1">{student.improvement}</p>
                    )}
                    {student.currentGrade && (
                      <p className={cn("text-2xl font-bold mt-1", getGradeColor(student.currentGrade))}>
                        {student.currentGrade}
                      </p>
                    )}
                    {student.trend && (
                      <p className={cn("text-xs font-bold mt-1", student.trend === 'down' ? 'text-red-600' : 'text-amber-600')}>
                        {student.trend === 'down' ? '↓ Declining' : '→ Stable'}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500">
              <p className="text-sm">
                {selectedStudentStatus === 'all' 
                  ? 'Select a student category to view' 
                  : 'No students in this category'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

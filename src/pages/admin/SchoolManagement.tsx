import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Building2, CalendarRange, Layers3, ShieldCheck, BookOpen, Plus, Save, Trash2 } from 'lucide-react';
import { ELEMENTARY_CURRICULUM, ELEMENTARY_GRADES, type CurriculumSubject, type ElementaryGrade } from '@/src/lib/elementaryCurriculum';

const CAMPUS_ROWS = [
  { campus: 'Alangilan Campus', colleges: 4, students: 5300, status: 'Operational' },
  { campus: 'Pablo Borbon Campus', colleges: 3, students: 4200, status: 'Operational' },
  { campus: 'Lobo Campus', colleges: 2, students: 1600, status: 'Maintenance Window' },
];

export default function SchoolManagement() {
  const [selectedGrade, setSelectedGrade] = useState<ElementaryGrade>('Grade 3');
  const [curriculumState, setCurriculumState] = useState<Record<ElementaryGrade, CurriculumSubject[]>>(ELEMENTARY_CURRICULUM);

  const handleSubjectChange = (index: number, field: 'code' | 'title', value: string) => {
    setCurriculumState((prev) => {
      const next = { ...prev };
      const updated = [...next[selectedGrade]];
      updated[index] = { ...updated[index], [field]: value };
      next[selectedGrade] = updated;
      return next;
    });
  };

  const handleAddSubject = () => {
    setCurriculumState((prev) => ({
      ...prev,
      [selectedGrade]: [
        ...prev[selectedGrade],
        {
          code: `${selectedGrade.replace(' ', '').toUpperCase()}-NEW`,
          title: 'New Subject',
        },
      ],
    }));
  };

  const handleDeleteSubject = (index: number) => {
    setCurriculumState((prev) => {
      const next = { ...prev };
      next[selectedGrade] = next[selectedGrade].filter((_, i) => i !== index);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-admin-dark tracking-tight">School Management</h1>
          <p className="text-slate-500 mt-1">UI sample for institution setup, campuses, terms, and policy controls.</p>
        </div>
        <div className="flex gap-2">
          <Button className="text-white bg-admin-main hover:bg-admin-dark">Create Academic Term</Button>
          <Button className="text-white bg-admin-main hover:bg-admin-dark">Add Campus</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Campuses</p>
              <p className="text-2xl font-bold text-slate-900">3</p>
            </div>
            <Building2 className="w-8 h-8 text-admin-main" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Terms</p>
              <p className="text-2xl font-bold text-slate-900">2</p>
            </div>
            <CalendarRange className="w-8 h-8 text-admin-main" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Curricula</p>
              <p className="text-2xl font-bold text-slate-900">11</p>
            </div>
            <Layers3 className="w-8 h-8 text-admin-main" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Compliance</p>
              <p className="text-2xl font-bold text-emerald-700">98%</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-admin-dark">Campus Directory</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Campus</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Colleges</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Students</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CAMPUS_ROWS.map((row) => (
                    <tr key={row.campus} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-medium text-slate-800">{row.campus}</td>
                      <td className="px-4 py-3 text-slate-700">{row.colleges}</td>
                      <td className="px-4 py-3 text-slate-700">{row.students.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${
                          row.status === 'Operational'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-admin-dark">Term Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <p className="font-semibold text-slate-800">Current Term</p>
              <p className="text-slate-600 mt-1">AY 2025-2026, 1st Semester</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <p className="font-semibold text-slate-800">Enrollment Window</p>
              <p className="text-slate-600 mt-1">May 15, 2026 - June 15, 2026</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <p className="font-semibold text-slate-800">Grade Lock Date</p>
              <p className="text-slate-600 mt-1">October 30, 2026</p>
            </div>
            <Button className="w-full text-white bg-admin-main hover:bg-admin-dark mt-2">Update Settings</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-admin-main/20">
        <CardHeader className="border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-admin-dark flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-admin-main" />
                Syllabus & Curriculum Updates (Kinder 1 to Grade 6)
              </CardTitle>
              <p className="text-sm text-slate-500 mt-1">Dean/Admin can configure subjects per grade level; student dashboards read subjects based on assigned grade level.</p>
            </div>
            <div className="flex gap-2">
              <Button className="text-white bg-admin-main hover:bg-admin-dark" onClick={handleAddSubject}>
                <Plus className="w-4 h-4 mr-1" /> Add Subject
              </Button>
              <Button className="text-white bg-admin-main hover:bg-admin-dark">
                <Save className="w-4 h-4 mr-1" /> Save Updates
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="flex gap-2 flex-wrap">
            {ELEMENTARY_GRADES.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedGrade === grade
                    ? 'bg-admin-main text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 w-48">Subject Code</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Subject Title</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 w-28">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {curriculumState[selectedGrade].map((subject, index) => (
                  <tr key={`${selectedGrade}-${index}`} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <input
                        value={subject.code}
                        onChange={(e) => handleSubjectChange(index, 'code', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-admin-main/40"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={subject.title}
                        onChange={(e) => handleSubjectChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-main/40"
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteSubject(index)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-red-600 hover:bg-red-50"
                        title="Delete subject"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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

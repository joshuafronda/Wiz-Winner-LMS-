import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Grades Data
const GRADES_DATA = [
  {
    id: '1',
    code: 'MITC 111',
    description: 'Advanced Database Systems',
    units: 3,
    grade: '1.00',
    status: 'Passed',
    instructor: 'AMORADO, RYNDEL V.'
  },
  {
    id: '2',
    code: 'MITC 112',
    description: 'Advanced Operating Systems and Networking',
    units: 3,
    grade: '1.50',
    status: 'Passed',
    instructor: 'ESGUERRA, JOHN RICHARD M'
  },
  {
    id: '3',
    code: 'MITC 113',
    description: 'Advanced Systems Design and Implementation',
    units: 3,
    grade: '1.50',
    status: 'Passed',
    instructor: 'RED, EVELYN Z.'
  },
];

export default function CurrentGrades() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/student')}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-student-dark tracking-tight">Current Grades</h1>
          <p className="text-slate-500 mt-1">Your grades for this semester</p>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-student-yellow/20 to-student-main/10 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-900 uppercase tracking-wider">Units</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-900 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">Instructor</th>
              </tr>
            </thead>
            <tbody>
              {GRADES_DATA.map((grade, index) => (
                <tr 
                  key={grade.id} 
                  className={`border-b border-slate-100 hover:bg-student-yellow/5 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-student-main text-sm">{grade.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700 font-medium">{grade.description}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-student-yellow/20 text-student-dark rounded-lg font-bold text-xs">
                      {grade.units}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-lg text-slate-900">{grade.grade}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {grade.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">{grade.instructor}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-600">
              Total Subjects: <span className="text-slate-900 font-bold">{GRADES_DATA.length}</span>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600">
              Total Units: <span className="text-student-dark font-bold">{GRADES_DATA.reduce((sum, g) => sum + g.units, 0)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Note:</span> Grades are displayed on a scale of 1.0 (Excellent) to 5.0 (Failing). 
          A grade of 1.0 to 3.0 is considered passing.
        </p>
      </div>
    </div>
  );
}

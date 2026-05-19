import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Award, FileText, QrCode, BookOpen, Calculator, AlertTriangle, ListChecks, CheckSquare, Camera, GraduationCap, X, Download } from 'lucide-react';
import { useAuthStore } from '@/src/store/authStore';
import { Link } from 'react-router-dom';
import { buildStudentSubjectsForGrade } from '@/src/lib/elementaryCurriculum';

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

// Mock All Grades Data
const ALL_GRADES_DATA = [
  { courseCode: 'BAT 403', description: 'Fundamentals of Enterprise Data Management', grades: '1.25', units: 3, credit: 3, remarks: 'PASSED' },
  { courseCode: 'GEd 109', description: 'Science, Technology and Society', grades: '1.50', units: 3, credit: 3, remarks: 'PASSED' },
  { courseCode: 'IT 313', description: 'Web Systems and Technologies', grades: '1.00', units: 3, credit: 3, remarks: 'PASSED' },
  { courseCode: 'IT 325', description: 'IT Project Management', grades: '1.75', units: 3, credit: 3, remarks: 'PASSED' },
  { courseCode: 'IT 326', description: 'Information Assurance and Security', grades: '2.00', units: 3, credit: 3, remarks: 'PASSED' },
  { courseCode: 'MITC 111', description: 'Advanced Database Systems', grades: '1.00', units: 3, credit: 3, remarks: 'PASSED' },
  { courseCode: 'MITC 112', description: 'Advanced Operating Systems and Networking', grades: '1.50', units: 3, credit: 3, remarks: 'PASSED' },
];

const buildQuarterSubjects = (gradeLabel: string, gradeCode: string, quarter: number) => ([
  {
    id: `${gradeCode}-Q${quarter}-ENG`,
    code: `${gradeCode}-ENG-Q${quarter}`,
    description: `English - ${gradeLabel} Quarter ${quarter}`,
    units: 1,
    prerequisite: 'None',
    credits: 1,
  },
  {
    id: `${gradeCode}-Q${quarter}-MATH`,
    code: `${gradeCode}-MATH-Q${quarter}`,
    description: `Mathematics - ${gradeLabel} Quarter ${quarter}`,
    units: 1,
    prerequisite: 'None',
    credits: 1,
  },
  {
    id: `${gradeCode}-Q${quarter}-SCI`,
    code: `${gradeCode}-SCI-Q${quarter}`,
    description: `Science - ${gradeLabel} Quarter ${quarter}`,
    units: 1,
    prerequisite: 'None',
    credits: 1,
  },
]);

// Curriculum Program Roadmap Data: Kinder 1 to Grade 6, 4 quarters each
const CURRICULUM_DATA = {
  'Kinder 1': {
    '1st Quarter': buildQuarterSubjects('Kinder 1', 'K1', 1),
    '2nd Quarter': buildQuarterSubjects('Kinder 1', 'K1', 2),
    '3rd Quarter': buildQuarterSubjects('Kinder 1', 'K1', 3),
    '4th Quarter': buildQuarterSubjects('Kinder 1', 'K1', 4),
  },
  'Kinder 2': {
    '1st Quarter': buildQuarterSubjects('Kinder 2', 'K2', 1),
    '2nd Quarter': buildQuarterSubjects('Kinder 2', 'K2', 2),
    '3rd Quarter': buildQuarterSubjects('Kinder 2', 'K2', 3),
    '4th Quarter': buildQuarterSubjects('Kinder 2', 'K2', 4),
  },
  'Grade 1': {
    '1st Quarter': buildQuarterSubjects('Grade 1', 'G1', 1),
    '2nd Quarter': buildQuarterSubjects('Grade 1', 'G1', 2),
    '3rd Quarter': buildQuarterSubjects('Grade 1', 'G1', 3),
    '4th Quarter': buildQuarterSubjects('Grade 1', 'G1', 4),
  },
  'Grade 2': {
    '1st Quarter': buildQuarterSubjects('Grade 2', 'G2', 1),
    '2nd Quarter': buildQuarterSubjects('Grade 2', 'G2', 2),
    '3rd Quarter': buildQuarterSubjects('Grade 2', 'G2', 3),
    '4th Quarter': buildQuarterSubjects('Grade 2', 'G2', 4),
  },
  'Grade 3': {
    '1st Quarter': buildQuarterSubjects('Grade 3', 'G3', 1),
    '2nd Quarter': buildQuarterSubjects('Grade 3', 'G3', 2),
    '3rd Quarter': buildQuarterSubjects('Grade 3', 'G3', 3),
    '4th Quarter': buildQuarterSubjects('Grade 3', 'G3', 4),
  },
  'Grade 4': {
    '1st Quarter': buildQuarterSubjects('Grade 4', 'G4', 1),
    '2nd Quarter': buildQuarterSubjects('Grade 4', 'G4', 2),
    '3rd Quarter': buildQuarterSubjects('Grade 4', 'G4', 3),
    '4th Quarter': buildQuarterSubjects('Grade 4', 'G4', 4),
  },
  'Grade 5': {
    '1st Quarter': buildQuarterSubjects('Grade 5', 'G5', 1),
    '2nd Quarter': buildQuarterSubjects('Grade 5', 'G5', 2),
    '3rd Quarter': buildQuarterSubjects('Grade 5', 'G5', 3),
    '4th Quarter': buildQuarterSubjects('Grade 5', 'G5', 4),
  },
  'Grade 6': {
    '1st Quarter': buildQuarterSubjects('Grade 6', 'G6', 1),
    '2nd Quarter': buildQuarterSubjects('Grade 6', 'G6', 2),
    '3rd Quarter': buildQuarterSubjects('Grade 6', 'G6', 3),
    '4th Quarter': buildQuarterSubjects('Grade 6', 'G6', 4),
  },
};

// Mock COR Data
const COR_DATA = {
  referenceNo: 'BatStateU-FO-REG-1',
  effectivity: 'May 18, 2022',
  revision: '02',
  studentName: 'FRONDA, JOSHUA B.',
  srCode: '25-06333',
  sex: 'MALE',
  program: 'Master in Information Technology / FIRST',
  academicTerm: 'FIRST, 2025-2026',
  courses: [
    {
      code: 'MITC 111',
      title: 'Advanced Database Systems',
      units: 3,
      section: 'MIT-1101'
    },
    {
      code: 'MITC 112',
      title: 'Advanced Operating Systems and Networking',
      units: 3,
      section: 'MIT-1101'
    },
    {
      code: 'MITC 113',
      title: 'Advanced Systems Design and Implementation',
      units: 3,
      section: 'MIT-1101'
    }
  ],
  assessment: {
    tuitionFee: 4500.00,
    libraryFee: 751.00,
    registrationFee: 380.00,
    medicalDentalFee: 347.20,
    idFee: 235.00,
    gdf: 774.00,
    journalFee: 751.00,
    subtotal: 7938.20,
    discount: -900.00,
    total: 7038.20
  },
  scholarship: 'Alumni Scholarship - Graduate School-20% Tuition Fee Discount',
  approvedBy: 'ANIQA M. VILLENA',
  approvedPosition: 'HEAD, REGISTRATION SERVICES',
  approvalDate: '09/02/2025',
  status: 'ENROLLED'
};

// Mock Assessment of Fees Data
const ASSESSMENT_OF_FEES_DATA = {
  barcode: '25-06333',
  qrCode: 'https://example.com/qr',
  studentName: 'FRONDA, JOSHUA B.',
  course: 'Master in Information Technology',
  college: 'Graduate School',
  srCode: '25-06333',
  yearLevel: 'FIRST',
  campus: 'ALANGILAN',
  academicYear: 'AY 2025-2026, FIRST',
  courses: [
    {
      code: 'MITC 111',
      description: 'Advanced Database Systems',
      units: 3,
      section: 'MIT-1101',
      instructor: 'AMORADO, RYNDEL V.',
      schedule: 'SU - 10:00 AM-01:00 PM'
    },
    {
      code: 'MITC 112',
      description: 'Advanced Operating Systems and Networking',
      units: 3,
      section: 'MIT-1101',
      instructor: 'ESGUERRA, JOHN RICHARD M',
      schedule: 'SU - 02:00 PM-05:00 PM'
    },
    {
      code: 'MITC 113',
      description: 'Advanced Systems Design and Implementation',
      units: 3,
      section: 'MIT-1101',
      instructor: 'RED, EVELYN Z.',
      schedule: 'SU - 07:00 AM-10:00 AM'
    }
  ],
  fees: {
    tuitionFee: 3600.00,
    libraryFee: 751.00,
    registrationFee: 380.00,
    medicalDentalFee: 547.20,
    idFee: 235.00,
    gdf: 774.00,
    journalFee: 751.00,
    subtotal: 7038.20
  },
  discounts: {
    tuitionFeePct: 900.00,
    miscFee: 0.00,
    total: 900.00
  },
  installment: {
    downpayment: 2111.46,
    monthly: 1231.69
  },
  timestamp: '2026-05-19 03:22:11 AM'
};

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const studentGradeLevel = user?.gradeLevel ?? 'Grade 3';
  const currentSubjects = buildStudentSubjectsForGrade(studentGradeLevel);
  const [showGradesModal, setShowGradesModal] = useState(false);
  const [showAllGradesModal, setShowAllGradesModal] = useState(false);
  const [showCopyGradesModal, setShowCopyGradesModal] = useState(false);
  const [showSubjectsModal, setShowSubjectsModal] = useState(false);
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showCORModal, setShowCORModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [gradesView, setGradesView] = useState('list');
  const [curriculumView, setCurriculumView] = useState('list');
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [selectedQuarter, setSelectedQuarter] = useState('1');
  const [selectedCurriculumYear, setSelectedCurriculumYear] = useState('Kinder 1');
  const [selectedCurriculumSemester, setSelectedCurriculumSemester] = useState('1st Quarter');
  const [evaluations, setEvaluations] = useState({});

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-student-dark tracking-tight">Welcome, {user?.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 mt-1">Here is your student self-service portal.</p>
        </div>
      </div>

      {/* Academic Actions */}
      <section>
         <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Academic Records & Subjects</h2>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <button
               onClick={() => setShowSubjectsModal(true)}
               className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-student-main transition-all shadow-sm hover:shadow-md hover:bg-student-bg cursor-pointer w-full"
            >
               <div className="w-12 h-12 bg-student-main/10 text-student-main rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Current Subjects</h3>
               <p className="text-xs text-slate-500 mt-1">Enrolled classes</p>
            </button>

            <button
               onClick={() => setShowGradesModal(true)}
               className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-all shadow-sm hover:shadow-md hover:bg-indigo-50 cursor-pointer w-full"
            >
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Current Grades</h3>
               <p className="text-xs text-slate-500 mt-1">View semester grades</p>
            </button>

            <button
               onClick={() => setShowAllGradesModal(true)}
              className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-all shadow-sm hover:shadow-md hover:bg-indigo-50 cursor-pointer w-full"
            >
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
               </div>
              <h3 className="font-semibold text-slate-900">View All Grades</h3>
              <p className="text-xs text-slate-500 mt-1">Complete view</p>
            </button>

            <button
               onClick={() => setShowCopyGradesModal(true)}
               className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-violet-500 transition-all shadow-sm hover:shadow-md hover:bg-violet-50 cursor-pointer w-full"
            >
               <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">View Copy of Grades</h3>
               <p className="text-xs text-slate-500 mt-1">Downloadable copy</p>
            </button>

            <button
               onClick={() => setShowCurriculumModal(true)}
               className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-orange-500 transition-all shadow-sm hover:shadow-md hover:bg-orange-50 cursor-pointer w-full"
            >
               <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Curriculum Roadmap</h3>
               <p className="text-xs text-slate-500 mt-1">Program outline</p>
            </button>


            <button
               onClick={() => setShowEvaluationModal(true)}
               className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-fuchsia-500 transition-all shadow-sm hover:shadow-md hover:bg-fuchsia-50 cursor-pointer w-full"
            >
               <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckSquare className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Teacher Evaluations</h3>
               <p className="text-xs text-slate-500 mt-1">Evaluate instructors</p>
            </button>
         </div>
      </section>

      {/* Admin & Finance Actions */}
      <section>
         <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Administrative & Financial</h2>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <button
               onClick={() => setShowCORModal(true)}
               className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-orange-500 transition-all shadow-sm hover:shadow-md hover:bg-orange-50 cursor-pointer w-full"
            >
               <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">COR</h3>
               <p className="text-xs text-slate-500 mt-1">Certificate of Registration</p>
            </button>

            <button
               onClick={() => setShowAssessmentModal(true)}
               className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-amber-500 transition-all shadow-sm hover:shadow-md hover:bg-amber-50 cursor-pointer w-full"
            >
               <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Assessment of Fees</h3>
               <p className="text-xs text-slate-500 mt-1">Tuition breakdown</p>
            </button>

            <Link to="/student/liabilities" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-red-500 transition-all shadow-sm hover:shadow-md hover:bg-red-50 relative">
               <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">2</div>
               <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">Liabilities</h3>
               <p className="text-xs text-slate-500 mt-1">Clearances & fines</p>
            </Link>

         </div>
      </section>

      {/* ID Services */}
      <section>
         <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Identity Services</h2>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/student/id" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-student-main transition-all shadow-sm hover:shadow-md hover:bg-student-bg">
               <div className="w-12 h-12 bg-student-main/10 text-student-main rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <QrCode className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">View Student ID</h3>
               <p className="text-xs text-slate-500 mt-1">Digital ID Card</p>
            </Link>

            <Link to="/student/id/capture" className="group p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-pink-500 transition-all shadow-sm hover:shadow-md hover:bg-pink-50">
               <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900">ID Capturing</h3>
               <p className="text-xs text-slate-500 mt-1">Update ID photo</p>
            </Link>
         </div>
      </section>

      {/* Grades Modal */}
      {showGradesModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-100 to-blue-50 px-6 py-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Current Grades</h2>
              <p className="text-slate-500 mt-1 text-sm">View semester grades</p>
            </div>
            <button
              onClick={() => setShowGradesModal(false)}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          {/* View Toggle */}
          <div className="bg-white border-b border-slate-200 px-6 py-3 flex gap-2">
            <button
              onClick={() => setGradesView('list')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                gradesView === 'list'
                  ? 'bg-student-main text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setGradesView('table')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                gradesView === 'table'
                  ? 'bg-student-main text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Table View
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-4">
            {gradesView === 'list' ? (
              // LIST VIEW - Cards
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {GRADES_DATA.map((grade) => (
                  <Card 
                    key={grade.id} 
                    className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow bg-white"
                  >
                    <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-slate-100">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                            {grade.code}
                          </p>
                          <CardTitle className="text-base text-slate-900">
                            {grade.description}
                          </CardTitle>
                        </div>
                        <div className="inline-flex items-center justify-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-semibold text-sm flex-shrink-0">
                          {grade.units}U
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Grade:</span>
                        <span className="font-bold text-blue-600">{grade.grade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <span className="font-semibold text-green-600">{grade.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Instructor:</span>
                        <span className="font-semibold text-slate-800 text-right text-xs">{grade.instructor}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // TABLE VIEW
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Course Code</th>
                      <th className="px-4 py-3 font-semibold">Description</th>
                      <th className="px-4 py-3 font-semibold text-center">Units</th>
                      <th className="px-4 py-3 font-semibold">Grade</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Instructor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {GRADES_DATA.map((grade) => (
                      <tr key={grade.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-blue-600">{grade.code}</td>
                        <td className="px-4 py-3 text-slate-800">{grade.description}</td>
                        <td className="px-4 py-3 text-center font-semibold">{grade.units}</td>
                        <td className="px-4 py-3 font-bold text-blue-600">{grade.grade}</td>
                        <td className="px-4 py-3 text-green-600 font-semibold">{grade.status}</td>
                        <td className="px-4 py-3 text-slate-700">{grade.instructor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* View All Grades Modal */}
      {showAllGradesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-100 to-indigo-50 px-6 py-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900">View All Grades</h2>
                <p className="text-slate-500 mt-1 text-sm">Your complete academic records</p>
                <div className="flex gap-6 mt-3 text-sm">
                  <span className="font-semibold text-slate-700">AY 2025-2026</span>
                  <span className="font-semibold text-slate-700">1st Quarter</span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setShowAllGradesModal(false)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 bg-white">
              {/* Academic Term Info */}
              <div className="mb-6 pb-4 border-b border-slate-200">
                <p className="text-sm font-semibold text-slate-700">Academic Term: <span className="text-slate-900">1st Quarter, AY 2025-2026</span></p>
              </div>

              {/* Grades Table */}
              <div className="overflow-x-auto border border-slate-300 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 border-b border-slate-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Course Code</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Description</th>
                      <th className="px-4 py-3 text-center font-bold text-slate-900">Grades</th>
                      <th className="px-4 py-3 text-center font-bold text-slate-900">Units</th>
                      <th className="px-4 py-3 text-center font-bold text-slate-900">Credit</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {ALL_GRADES_DATA.map((grade, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono font-semibold text-indigo-600">{grade.courseCode}</td>
                        <td className="px-4 py-3 text-slate-800">{grade.description}</td>
                        <td className="px-4 py-3 text-center font-bold text-slate-900">{grade.grades}</td>
                        <td className="px-4 py-3 text-center font-semibold text-slate-800">{grade.units}</td>
                        <td className="px-4 py-3 text-center font-semibold text-slate-800">{grade.credit}</td>
                        <td className="px-4 py-3 text-green-600 font-semibold">{grade.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Copy of Grades Modal */}
      {showCopyGradesModal && (
        <div className="fixed inset-0 bg-black/50 z-[70] overflow-y-auto p-3 sm:p-4">
          <div className="min-h-full flex items-start sm:items-center justify-center py-2 sm:py-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-student-yellow/20 to-student-main/10 px-4 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between rounded-t-2xl">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-student-dark">Student's Copy of Grades</h2>
              </div>
              <button
                onClick={() => setShowCopyGradesModal(false)}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors ml-4 flex-shrink-0"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Modal Body - Official Document */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 bg-white">
              {/* Info Banner */}
              <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">ℹ</div>
                <p className="text-sm text-blue-900">Printed copy is available upon request in the Registration Services Office</p>
              </div>

              {/* Document Container */}
              <div className="border-2 border-slate-400 bg-white p-4 sm:p-6 md:p-8 relative">
                {/* Watermark */}
                <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-slate-400">BATANGAS</div>
                    <div className="text-6xl font-bold text-slate-400">STATE</div>
                    <div className="text-6xl font-bold text-slate-400">UNIVERSITY</div>
                  </div>
                </div>

                {/* Document Content */}
                <div className="relative z-10 space-y-6">
                  {/* University Header */}
                  <div className="text-center border-b border-slate-400 pb-4">
                    <h1 className="text-xl font-bold text-slate-900">BATANGAS STATE UNIVERSITY</h1>
                    <p className="text-sm text-slate-700 font-semibold mt-1">Alangilan Campus</p>
                    <h2 className="text-base font-bold text-slate-900 mt-4">Student's Copy of Grades</h2>
                  </div>

                  {/* Student Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-sm">
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-slate-700">Fullname :</span>
                        <span className="text-slate-900 ml-2">{user?.name}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">College :</span>
                        <span className="text-slate-900 ml-2">Graduate School</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Program :</span>
                        <span className="text-slate-900 ml-2">Master in Information Technology</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Year Level :</span>
                        <span className="text-slate-900 ml-2">FIRST</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-right">
                      <div>
                        <span className="font-semibold text-slate-700">SR CODE :</span>
                        <span className="text-slate-900 ml-2">25-06333</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Academic Year :</span>
                        <span className="text-slate-900 ml-2">{selectedYear}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Semester :</span>
                        <span className="text-slate-900 ml-2">{selectedQuarter === '1' ? 'FIRST' : selectedQuarter === '2' ? 'SECOND' : selectedQuarter === '3' ? 'THIRD' : 'FOURTH'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Grades Table */}
                  <div className="overflow-x-auto border border-slate-400">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-400 bg-white">
                          <th className="border-r border-slate-400 px-3 py-2 text-center font-bold">#</th>
                          <th className="border-r border-slate-400 px-3 py-2 text-left font-bold">Course Code</th>
                          <th className="border-r border-slate-400 px-3 py-2 text-left font-bold">Course Title</th>
                          <th className="border-r border-slate-400 px-3 py-2 text-center font-bold">Units</th>
                          <th className="border-r border-slate-400 px-3 py-2 text-center font-bold">Grade</th>
                          <th className="border-r border-slate-400 px-3 py-2 text-center font-bold">Section</th>
                          <th className="px-3 py-2 text-left font-bold">Instructor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ALL_GRADES_DATA.slice(0, 3).map((grade, idx) => (
                          <tr key={idx} className="border-b border-slate-400">
                            <td className="border-r border-slate-400 px-3 py-2 text-center">{idx + 1}</td>
                            <td className="border-r border-slate-400 px-3 py-2 font-mono font-bold">{grade.courseCode}</td>
                            <td className="border-r border-slate-400 px-3 py-2">{grade.description}</td>
                            <td className="border-r border-slate-400 px-3 py-2 text-center">{grade.units}</td>
                            <td className="border-r border-slate-400 px-3 py-2 text-center font-bold">{grade.grades}</td>
                            <td className="border-r border-slate-400 px-3 py-2 text-center">MIT-1101</td>
                            <td className="px-3 py-2">AMORADO, RYNDEL V.</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Rows */}
                  <div className="space-y-2 text-sm border-l-4 border-slate-400 pl-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">** NOTHING FOLLOWS **</span>
                    </div>
                    <div className="flex justify-end gap-20">
                      <span className="font-semibold">Total no of Course</span>
                      <span className="font-bold w-12 text-right">3</span>
                    </div>
                    <div className="flex justify-end gap-20">
                      <span className="font-semibold">Total no of Units</span>
                      <span className="font-bold w-12 text-right">9</span>
                    </div>
                    <div className="flex justify-end gap-20 border-t border-slate-400 pt-2">
                      <span className="font-semibold">General Weighted Average (GWA)</span>
                      <span className="font-bold w-12 text-right">1.3333</span>
                    </div>
                  </div>

                  {/* Footer with Codes */}
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-12 pt-8 border-t-2 border-slate-400">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-slate-100 border border-slate-300 flex items-center justify-center mx-auto mb-2">
                        <div className="text-xs text-slate-500">QR Code</div>
                      </div>
                      <p className="text-xs text-slate-600">2025-05-19 02:55:39 AM</p>
                    </div>
                    <div className="text-center flex-1">
                      <div className="w-40 h-12 bg-slate-100 border border-slate-300 flex items-center justify-center mx-auto mb-2">
                        <div className="text-xs text-slate-500">Barcode</div>
                      </div>
                      <p className="text-xs text-slate-600">25-06333</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Current Subjects Modal */}
      {showSubjectsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-student-yellow/20 to-student-main/10 px-6 py-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-student-dark">Current Subjects</h2>
                <p className="text-slate-500 mt-1 text-sm">Your enrolled courses for this semester</p>
              </div>
              <button
                onClick={() => setShowSubjectsModal(false)}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Subject Count Badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-4 py-2 bg-student-yellow/30 text-student-dark rounded-full font-semibold text-sm">
                  {currentSubjects.length} Subjects Enrolled
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-full font-semibold text-sm">
                  {studentGradeLevel}
                </span>
                <span className="text-slate-500 text-sm">
                  {currentSubjects.reduce((sum, s) => sum + s.units, 0)} total units
                </span>
              </div>

              {/* Subject Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentSubjects.map((subject) => (
                  <Card 
                    key={subject.id} 
                    className="border-l-4 border-l-student-main hover:shadow-md transition-shadow bg-white"
                  >
                    <CardHeader className="pb-3 bg-gradient-to-r from-student-yellow/5 to-student-main/5 border-b border-slate-100">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-student-main uppercase tracking-wider mb-1">
                            {subject.code}
                          </p>
                          <CardTitle className="text-base text-slate-900">
                            {subject.description}
                          </CardTitle>
                        </div>
                        <div className="inline-flex items-center justify-center px-3 py-1 bg-student-yellow/30 text-student-dark rounded-lg font-semibold text-sm flex-shrink-0">
                          {subject.units}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Section:</span>
                        <span className="font-semibold text-slate-800">{subject.section}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Instructor:</span>
                        <span className="font-semibold text-slate-800">{subject.instructor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Schedule:</span>
                        <span className="font-semibold text-slate-800">{subject.schedules}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Room:</span>
                        <span className="font-semibold text-slate-800">{subject.room}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Empty State */}
              {currentSubjects.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No Subjects Found</h3>
                  <p className="text-slate-500">You don't have any subjects for this period.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Program Roadmap Modal */}
      {showCurriculumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Curriculum Program Roadmap</h2>
                <p className="text-sm text-slate-600 mt-1">Kinder 1 to Grade 6 by Quarter</p>
              </div>
              <button
                onClick={() => setShowCurriculumModal(false)}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-2xl font-bold text-slate-600"
              >
                ×
              </button>
            </div>

            {/* Year and Semester Selection */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 space-y-4 flex-shrink-0">
              {/* Grade Level Selection Dropdown */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Select Grade Level:</label>
                <select
                  value={selectedCurriculumYear}
                  onChange={(e) => {
                    setSelectedCurriculumYear(e.target.value);
                    setSelectedCurriculumSemester(Object.keys(CURRICULUM_DATA[e.target.value])[0]);
                  }}
                  className="w-60 px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  {Object.keys(CURRICULUM_DATA).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quarter Selection Dropdown */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Select Quarter:</label>
                <select
                  value={selectedCurriculumSemester}
                  onChange={(e) => setSelectedCurriculumSemester(e.target.value)}
                  className="w-60 px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  {selectedCurriculumYear && Object.keys(CURRICULUM_DATA[selectedCurriculumYear]).map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">View:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurriculumView('list')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      curriculumView === 'list'
                        ? 'bg-orange-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    List View (as card)
                  </button>
                  <button
                    onClick={() => setCurriculumView('table')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      curriculumView === 'table'
                        ? 'bg-orange-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Table View
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-slate-900 mb-2">
                  {selectedCurriculumYear} - {selectedCurriculumSemester}
                </h3>
                <p className="text-sm text-slate-600">
                  Total subjects: {selectedCurriculumYear && CURRICULUM_DATA[selectedCurriculumYear][selectedCurriculumSemester]?.length || 0} | 
                  Total units: {selectedCurriculumYear && CURRICULUM_DATA[selectedCurriculumYear][selectedCurriculumSemester]?.reduce((sum, s) => sum + s.units, 0) || 0}
                </p>
              </div>

              {curriculumView === 'list' ? (
                // LIST VIEW - Cards
                <div className="space-y-4">
                  {selectedCurriculumYear && CURRICULUM_DATA[selectedCurriculumYear][selectedCurriculumSemester]?.map((subject) => (
                    <div key={subject.id} className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-orange-600 hover:shadow-lg transition-all">
                      {/* Subject Header */}
                      <div className="pb-4 border-b border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900">{subject.code} - {subject.description}</h3>
                        <p className="text-xs text-orange-600 font-semibold mt-1">({subject.units} units)</p>
                      </div>

                      {/* Subject Details Grid */}
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Credits */}
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Credits</p>
                          <p className="text-sm font-bold text-slate-800">{subject.credits}</p>
                        </div>

                        {/* Units */}
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Units</p>
                          <p className="text-sm font-bold text-slate-800">{subject.units}</p>
                        </div>

                        {/* Prerequisite */}
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Prerequisite</p>
                          <p className="text-sm font-bold text-slate-800">{subject.prerequisite}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // TABLE VIEW
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-xs">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Course Code</th>
                        <th className="px-4 py-3 font-semibold">Description</th>
                        <th className="px-4 py-3 font-semibold text-center">Units</th>
                        <th className="px-4 py-3 font-semibold text-center">Credits</th>
                        <th className="px-4 py-3 font-semibold">Prerequisite</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedCurriculumYear && CURRICULUM_DATA[selectedCurriculumYear][selectedCurriculumSemester]?.map((subject, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3 font-mono font-bold text-orange-600">{subject.code}</td>
                          <td className="px-4 py-3 text-slate-800">{subject.description}</td>
                          <td className="px-4 py-3 text-center font-semibold">{subject.units}</td>
                          <td className="px-4 py-3 text-center font-semibold">{subject.credits}</td>
                          <td className="px-4 py-3 text-slate-700">{subject.prerequisite}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Teacher Evaluations Modal */}
      {showEvaluationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-fuchsia-100 to-fuchsia-50 px-6 py-6 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Teacher Evaluations</h2>
                <p className="text-sm text-slate-600 mt-1">Evaluate your instructors for {studentGradeLevel}</p>
              </div>
              <button
                onClick={() => setShowEvaluationModal(false)}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-2xl font-bold text-slate-600"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Info Alert */}
              <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-lg p-4">
                <p className="text-sm text-fuchsia-900">
                  <span className="font-semibold">Instructions:</span> Please rate your instructors based on your experience. Your honest feedback helps improve teaching quality.
                </p>
              </div>

              {/* Evaluation Forms for Each Subject */}
              <div className="space-y-6">
                {currentSubjects.map((subject) => (
                  <div key={subject.id} className="border-2 border-slate-200 rounded-xl p-5 bg-white hover:border-fuchsia-400 transition-all">
                    {/* Subject Header */}
                    <div className="pb-4 border-b border-slate-200 mb-4">
                      <h3 className="text-lg font-bold text-slate-900">{subject.code} - {subject.description}</h3>
                      <p className="text-sm text-slate-600 mt-2">
                        <span className="font-semibold">Instructor:</span> {subject.instructor}
                      </p>
                    </div>

                    {/* Evaluation Questions */}
                    <div className="space-y-5">
                      {/* Knowledge of Subject */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Knowledge of Subject Matter
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={`${subject.id}-knowledge-${rating}`}
                              onClick={() => setEvaluations(prev => ({
                                ...prev,
                                [`${subject.id}-knowledge`]: rating
                              }))}
                              className={`w-10 h-10 rounded-lg font-bold transition-all ${
                                evaluations[`${subject.id}-knowledge`] === rating
                                  ? 'bg-fuchsia-600 text-white shadow-lg'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Teaching Effectiveness */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Teaching Effectiveness
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={`${subject.id}-teaching-${rating}`}
                              onClick={() => setEvaluations(prev => ({
                                ...prev,
                                [`${subject.id}-teaching`]: rating
                              }))}
                              className={`w-10 h-10 rounded-lg font-bold transition-all ${
                                evaluations[`${subject.id}-teaching`] === rating
                                  ? 'bg-fuchsia-600 text-white shadow-lg'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Classroom Management */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Classroom Management
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={`${subject.id}-management-${rating}`}
                              onClick={() => setEvaluations(prev => ({
                                ...prev,
                                [`${subject.id}-management`]: rating
                              }))}
                              className={`w-10 h-10 rounded-lg font-bold transition-all ${
                                evaluations[`${subject.id}-management`] === rating
                                  ? 'bg-fuchsia-600 text-white shadow-lg'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Feedback Comments */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Additional Comments (Optional)
                        </label>
                        <textarea
                          value={evaluations[`${subject.id}-comments`] || ''}
                          onChange={(e) => setEvaluations(prev => ({
                            ...prev,
                            [`${subject.id}-comments`]: e.target.value
                          }))}
                          placeholder="Share your thoughts about the instructor's strengths and areas for improvement..."
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent resize-none text-sm"
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {currentSubjects.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No Subjects to Evaluate</h3>
                  <p className="text-slate-500">You don't have any enrolled subjects this period.</p>
                </div>
              )}

              {/* Submit Button */}
              {currentSubjects.length > 0 && (
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => {
                      alert('Evaluations submitted successfully!');
                      setShowEvaluationModal(false);
                      setEvaluations({});
                    }}
                    className="flex-1 px-6 py-3 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-fuchsia-700 transition-colors"
                  >
                    Submit Evaluations
                  </button>
                  <button
                    onClick={() => {
                      setShowEvaluationModal(false);
                      setEvaluations({});
                    }}
                    className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Certificate of Registration (COR) Modal */}
      {showCORModal && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto p-3 sm:p-4">
          <div className="min-h-full flex items-start sm:items-center justify-center py-2 sm:py-6">
          <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full">
            {/* Close Button */}
            <div className="sticky top-0 bg-white flex justify-end px-4 sm:px-6 py-4 border-b border-slate-200">
              <button
                onClick={() => setShowCORModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-2xl font-bold text-slate-600"
              >
                ×
              </button>
            </div>

            {/* COR Document - Print Style */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 bg-white">
              {/* Reference Info Header */}
              <div className="grid grid-cols-3 gap-4 text-xs mb-4 pb-4 border-b border-slate-400">
                <div>
                  <span className="font-semibold">Reference No. {COR_DATA.referenceNo}</span>
                </div>
                <div className="text-center">
                  <span className="font-semibold">Effectivity: {COR_DATA.effectivity}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold">Revision No. {COR_DATA.revision}</span>
                </div>
              </div>

              {/* University Header */}
              <div className="flex gap-6 items-start mb-4 pb-4 border-b-4 border-slate-900">
                {/* Logo Placeholder */}
                <div className="w-20 h-20 bg-red-50 border-2 border-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="text-center">
                    <div className="text-xs font-bold text-red-600">BSU</div>
                  </div>
                </div>

                {/* University Info */}
                <div className="flex-1 text-center">
                  <p className="text-xs font-semibold text-slate-700">Republic of the Philippines</p>
                  <h1 className="text-xl font-bold text-slate-900">BATANGAS STATE UNIVERSITY</h1>
                  <p className="text-sm font-semibold text-orange-600">The National Engineering University</p>
                  <p className="text-xs text-slate-700">Alangilan Campus</p>
                  <p className="text-xs text-slate-600">Neptune St., Golden Country Homes Subdivision, Alangilan, Batangas City</p>
                </div>
              </div>

              {/* Form Title */}
              <div className="text-center space-y-1 mb-6">
                <p className="text-sm font-bold text-slate-700">Graduate School</p>
                <p className="text-sm font-bold text-slate-900">{COR_DATA.academicTerm}</p>
                <h2 className="text-lg font-bold text-slate-900">REGISTRATION FORM</h2>
              </div>

              {/* Student Info & Courses Section */}
              <div className="space-y-4 mb-6">
                {/* Student Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-semibold">SR Code:</span>
                    <p className="font-bold">{COR_DATA.srCode}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Sex:</span>
                    <p className="font-bold">{COR_DATA.sex}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold">Name:</span>
                    <p className="font-bold">{COR_DATA.studentName}</p>
                  </div>
                  <div className="col-span-4">
                    <span className="font-semibold">Program:</span>
                    <p className="font-bold">{COR_DATA.program}</p>
                  </div>
                </div>

                {/* Courses & Assessment Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Courses Table */}
                  <div className="lg:col-span-2">
                    <div className="overflow-x-auto border border-slate-300">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-slate-300 bg-slate-50">
                            <th className="px-3 py-2 text-left font-bold">COURSE CODE</th>
                            <th className="px-3 py-2 text-left font-bold">COURSE TITLE</th>
                            <th className="px-3 py-2 text-left font-bold">UNIT(S)</th>
                            <th className="px-3 py-2 text-left font-bold">SECTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {COR_DATA.courses.map((course, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-3 py-2 font-semibold">{course.code}</td>
                              <td className="px-3 py-2">{course.title}</td>
                              <td className="px-3 py-2 text-center">{course.units}</td>
                              <td className="px-3 py-2">{course.section}</td>
                            </tr>
                          ))}
                          <tr className="font-bold bg-slate-100 border-t-2 border-slate-300">
                            <td colSpan="2" className="px-3 py-2 text-right pr-6"></td>
                            <td className="px-3 py-2 text-center">{COR_DATA.courses.reduce((sum, c) => sum + c.units, 0)}</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Assessment */}
                  <div className="text-xs space-y-2">
                    <h3 className="font-bold text-slate-900 mb-2">ASSESSMENT</h3>
                    <div className="space-y-1 border-b border-slate-300 pb-2 mb-2">
                      <div className="flex justify-between">
                        <span>Tuition Fee (500.00/unit)</span>
                        <span className="font-semibold">₱{COR_DATA.assessment.tuitionFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Library Fee</span>
                        <span className="font-semibold">{COR_DATA.assessment.libraryFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Registration Fee</span>
                        <span className="font-semibold">{COR_DATA.assessment.registrationFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medical / Dental Fee</span>
                        <span className="font-semibold">{COR_DATA.assessment.medicalDentalFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ID Fee</span>
                        <span className="font-semibold">{COR_DATA.assessment.idFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GDF (86.00/unit)</span>
                        <span className="font-semibold">{COR_DATA.assessment.gdf.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Journal Fee</span>
                        <span className="font-semibold">{COR_DATA.assessment.journalFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Subtotal</span>
                        <span>₱{COR_DATA.assessment.subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>DISCOUNT</span>
                        <span className="font-semibold">({Math.abs(COR_DATA.assessment.discount).toLocaleString('en-US', {minimumFractionDigits: 2})})</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>TOTAL(PHP)</span>
                        <span>₱{COR_DATA.assessment.total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 italic mt-2">* under appeal</p>
                  </div>
                </div>
              </div>

              {/* Scholarship Section */}
              <div className="border-t border-slate-300 pt-4 mb-6">
                <h3 className="text-sm font-bold text-slate-900 mb-2">Scholarship/s:</h3>
                <p className="text-xs text-slate-800 mb-2">{COR_DATA.scholarship}</p>
                <p className="text-xs text-slate-600">(*) Discount has been deducted.</p>
                <p className="text-xs text-slate-600">Tuition Fee Discount={Math.abs(COR_DATA.assessment.discount).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                <p className="text-xs text-slate-600">Assessment Discount=0.00</p>
              </div>

              {/* Approval & Status */}
              <div className="grid grid-cols-2 gap-8 items-start pt-4 border-t border-slate-300">
                {/* Status Badge */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 transform -rotate-12">
                    {COR_DATA.status}
                  </p>
                </div>

                {/* Signature */}
                <div className="text-center space-y-2">
                  <p className="text-xs">Approved by:</p>
                  <div className="w-40 h-8 border-b border-slate-400 mx-auto"></div>
                  <p className="text-xs font-bold text-slate-900">{COR_DATA.approvedBy}</p>
                  <p className="text-xs font-semibold text-slate-800">{COR_DATA.approvedPosition}</p>
                  <p className="text-xs text-slate-600">Date - {COR_DATA.approvalDate}</p>
                </div>
              </div>

              {/* Print Button */}
              <div className="flex justify-center pt-6 mt-6 border-t border-slate-200">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors text-sm font-semibold">
                  🖨️ Print COR
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Assessment of Fees Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto p-3 sm:p-4">
          <div className="min-h-full flex items-start sm:items-center justify-center py-2 sm:py-6">
          <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full">
            {/* Close Button */}
            <div className="sticky top-0 bg-white flex justify-end px-4 sm:px-6 py-4 border-b border-slate-200">
              <button
                onClick={() => setShowAssessmentModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-2xl font-bold text-slate-600"
              >
                ×
              </button>
            </div>

            {/* Assessment Document */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 bg-white relative">
              {/* Watermark Background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-6xl font-bold text-slate-400 pointer-events-none">
                BSU
              </div>

              {/* Print and Header */}
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-400">
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold text-slate-700">
                  🖨️ Print
                </button>
                <div className="text-center flex-1">
                  <p className="text-xs text-slate-600 font-semibold">Republic of the Philippines</p>
                  <h1 className="text-2xl font-bold text-slate-900">BATANGAS STATE UNIVERSITY</h1>
                  <p className="text-xs text-slate-600">{ASSESSMENT_OF_FEES_DATA.campus}</p>
                </div>
              </div>

              {/* Main Title */}
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-slate-900">Assessment of Fees</h2>
                <p className="text-xs text-slate-600">{ASSESSMENT_OF_FEES_DATA.academicYear}</p>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-4">
                {/* Left Section - Student Info & Courses */}
                <div className="xl:col-span-2 space-y-4">
                  {/* Student Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-500 font-semibold">Name</p>
                      <p className="font-bold text-slate-900">{ASSESSMENT_OF_FEES_DATA.studentName}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-semibold">SR Code</p>
                      <p className="font-bold text-slate-900">{ASSESSMENT_OF_FEES_DATA.srCode}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-semibold">Course</p>
                      <p className="font-bold text-slate-900">{ASSESSMENT_OF_FEES_DATA.course}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-semibold">Year Level</p>
                      <p className="font-bold text-slate-900">{ASSESSMENT_OF_FEES_DATA.yearLevel}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-500 font-semibold">College</p>
                      <p className="font-bold text-slate-900">{ASSESSMENT_OF_FEES_DATA.college}</p>
                    </div>
                  </div>

                  {/* Courses Table */}
                  <div className="border border-slate-300 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-300 bg-slate-50">
                          <th className="px-3 py-2 text-left font-bold">Code</th>
                          <th className="px-3 py-2 text-left font-bold">Description</th>
                          <th className="px-3 py-2 text-center font-bold">Unit/s</th>
                          <th className="px-3 py-2 text-left font-bold">Section</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {ASSESSMENT_OF_FEES_DATA.courses.map((course, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-3 py-2 font-semibold text-slate-900">{course.code}</td>
                            <td className="px-3 py-2">{course.description}</td>
                            <td className="px-3 py-2 text-center font-bold">{course.units}</td>
                            <td className="px-3 py-2">{course.section}</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-slate-100 border-t-2 border-slate-300">
                          <td colSpan="2" className="px-3 py-2 text-right">Total Units</td>
                          <td className="px-3 py-2 text-center">{ASSESSMENT_OF_FEES_DATA.courses.reduce((sum, c) => sum + c.units, 0)}</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Instructor Schedule Table */}
                  <div className="border border-slate-300 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-300 bg-slate-50">
                          <th className="px-3 py-2 text-left font-bold">Code</th>
                          <th className="px-3 py-2 text-left font-bold">Section</th>
                          <th className="px-3 py-2 text-left font-bold">Instructor</th>
                          <th className="px-3 py-2 text-left font-bold">Schedule</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {ASSESSMENT_OF_FEES_DATA.courses.map((course, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-3 py-2 font-semibold">{course.code}</td>
                            <td className="px-3 py-2">{course.section}</td>
                            <td className="px-3 py-2 text-slate-800">{course.instructor}</td>
                            <td className="px-3 py-2 text-slate-800">{course.schedule}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Section - Fees Box */}
                <div className="border-2 border-slate-400 p-4 space-y-3 h-fit bg-slate-50">
                  <h3 className="text-sm font-bold text-slate-900">Schedule of Fees :</h3>
                  
                  {/* Fees List */}
                  <div className="space-y-1 text-xs border-b border-slate-300 pb-3">
                    <div className="flex justify-between">
                      <span>Tuition Fee (500.00/unit)</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.fees.tuitionFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Library Fee</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.fees.libraryFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Registration Fee</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.fees.registrationFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medical / Dental Fee</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.fees.medicalDentalFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ID Fee</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.fees.idFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GDF (85.00/unit)</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.fees.gdf.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Journal Fee</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.fees.journalFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Total</span>
                      <span>{ASSESSMENT_OF_FEES_DATA.fees.subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                  </div>

                  {/* Discounts */}
                  <div className="space-y-1 text-xs border-b border-slate-300 pb-3">
                    <h4 className="font-bold text-slate-900">Discounts :</h4>
                    <div className="flex justify-between">
                      <span>Tuition Fee (20%)</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.discounts.tuitionFeePct.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Misc Fee (0%)</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.discounts.miscFee.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Total</span>
                      <span>{ASSESSMENT_OF_FEES_DATA.discounts.total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                  </div>   

                  {/* Installment */}
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-slate-900">Installment Scheme :</h4>
                    <div className="flex justify-between">
                      <span>Downpayment (30%)</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.installment.downpayment.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly (x4)</span>
                      <span className="font-semibold">{ASSESSMENT_OF_FEES_DATA.installment.monthly.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-xs text-slate-600">
                {ASSESSMENT_OF_FEES_DATA.timestamp}
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}


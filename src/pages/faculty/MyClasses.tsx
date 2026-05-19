import { useState } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Search, LayoutGrid, List as ListIcon, User, Users, MapPin, BookOpen, X, Calendar, Printer } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

const GRADE_LEVELS = [
  'Nursery', 'Pre-Kindergarten', 'Kindergarten',
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'
];

const LEVEL_GROUPS = {
  'Preschool': ['Nursery', 'Pre-Kindergarten', 'Kindergarten'],
  'Primary': ['Grade 1', 'Grade 2', 'Grade 3'],
  'Intermediate': ['Grade 4', 'Grade 5', 'Grade 6']
};

// DepEd Grading Scale for Elementary (Grades 1-6)
const DEPED_GRADING_SCALE = {
  '90-100': { descriptor: 'Outstanding', abbreviation: 'O', color: 'bg-green-100 text-green-700' },
  '85-89': { descriptor: 'Very Satisfactory', abbreviation: 'VS', color: 'bg-blue-100 text-blue-700' },
  '80-84': { descriptor: 'Satisfactory', abbreviation: 'S', color: 'bg-indigo-100 text-indigo-700' },
  '75-79': { descriptor: 'Fairly Satisfactory', abbreviation: 'FS', color: 'bg-amber-100 text-amber-700' },
  'below-75': { descriptor: 'Did Not Meet Expectations', abbreviation: 'DNM', color: 'bg-red-100 text-red-700' }
};

// Preschool Rating Scale
const PRESCHOOL_RATING_SCALE = {
  '4': { meaning: 'Advanced', color: 'bg-emerald-100 text-emerald-700' },
  '3': { meaning: 'Developing Well', color: 'bg-blue-100 text-blue-700' },
  '2': { meaning: 'Developing', color: 'bg-amber-100 text-amber-700' },
  '1': { meaning: 'Needs Support', color: 'bg-red-100 text-red-700' }
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

const CLASSES = [
  { id: '1', subject: 'English', gradeLevel: 'Grade 1', quarter: 'Q1', campus: 'Elementary Campus', students: 32, submitted: 8, gradeYear: '2025-2026', assignedClass: '1-A', schedule: [{ day: 'Monday', time: '9:00 AM - 10:00 AM', room: 'Room 101' }, { day: 'Wednesday', time: '9:00 AM - 10:00 AM', room: 'Room 101' }] },
  { id: '2', subject: 'Mathematics', gradeLevel: 'Grade 1', quarter: 'Q1', campus: 'Elementary Campus', students: 32, submitted: 6, gradeYear: '2025-2026', assignedClass: '1-B', schedule: [{ day: 'Tuesday', time: '10:00 AM - 11:00 AM', room: 'Room 102' }, { day: 'Thursday', time: '10:00 AM - 11:00 AM', room: 'Room 102' }, { day: 'Friday', time: '10:00 AM - 11:00 AM', room: 'Room 102' }] },
  { id: '3', subject: 'Science', gradeLevel: 'Grade 2', quarter: 'Q1', campus: 'Elementary Campus', students: 30, submitted: 10, gradeYear: '2025-2026', assignedClass: '2-A', schedule: [{ day: 'Monday', time: '1:00 PM - 2:00 PM', room: 'Lab A' }, { day: 'Wednesday', time: '1:00 PM - 2:00 PM', room: 'Lab A' }, { day: 'Friday', time: '1:00 PM - 2:00 PM', room: 'Lab A' }] },
  { id: '4', subject: 'English', gradeLevel: 'Grade 2', quarter: 'Q1', campus: 'Elementary Campus', students: 30, submitted: 12, gradeYear: '2025-2026', assignedClass: '2-B', schedule: [{ day: 'Tuesday', time: '11:00 AM - 12:00 PM', room: 'Room 201' }, { day: 'Thursday', time: '11:00 AM - 12:00 PM', room: 'Room 201' }] },
  { id: '5', subject: 'Mathematics', gradeLevel: 'Grade 3', quarter: 'Q1', campus: 'Elementary Campus', students: 35, submitted: 18, gradeYear: '2025-2026', assignedClass: '3-A', schedule: [{ day: 'Monday', time: '2:00 PM - 3:00 PM', room: 'Room 301' }, { day: 'Wednesday', time: '2:00 PM - 3:00 PM', room: 'Room 301' }, { day: 'Friday', time: '2:00 PM - 3:00 PM', room: 'Room 301' }] },
  { id: '6', subject: 'GMRC', gradeLevel: 'Grade 3', quarter: 'Q1', campus: 'Elementary Campus', students: 35, submitted: 20, gradeYear: '2025-2026', assignedClass: '3-B', schedule: [{ day: 'Tuesday', time: '1:00 PM - 2:00 PM', room: 'Room 302' }, { day: 'Thursday', time: '1:00 PM - 2:00 PM', room: 'Room 302' }] },
  { id: '7', subject: 'English', gradeLevel: 'Grade 4', quarter: 'Q1', campus: 'Elementary Campus', students: 35, submitted: 15, gradeYear: '2025-2026', assignedClass: '4-A', schedule: [{ day: 'Monday', time: '10:30 AM - 11:30 AM', room: 'Room 401' }, { day: 'Wednesday', time: '10:30 AM - 11:30 AM', room: 'Room 401' }, { day: 'Friday', time: '10:30 AM - 11:30 AM', room: 'Room 401' }] },
  { id: '8', subject: 'Science', gradeLevel: 'Grade 5', quarter: 'Q1', campus: 'Elementary Campus', students: 32, submitted: 14, gradeYear: '2025-2026', assignedClass: '5-A', schedule: [{ day: 'Tuesday', time: '2:00 PM - 3:00 PM', room: 'Lab B' }, { day: 'Thursday', time: '2:00 PM - 3:00 PM', room: 'Lab B' }] },
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

const isPreschool = (gradeLevel: string): boolean => {
  return LEVEL_GROUPS['Preschool'].includes(gradeLevel);
};

const getGradeDescriptor = (grade: number | null): string | null => {
  if (grade === null || grade === undefined) return null;
  if (grade >= 90) return 'Outstanding (O)';
  if (grade >= 85) return 'Very Satisfactory (VS)';
  if (grade >= 80) return 'Satisfactory (S)';
  if (grade >= 75) return 'Fairly Satisfactory (FS)';
  return 'Did Not Meet Expectations (DNM)';
};

const getGradeColor = (grade: number | null, isPreschoolLevel: boolean): string => {
  if (grade === null || grade === undefined) return 'text-slate-500';
  if (isPreschoolLevel) {
    if (grade === 4) return 'text-emerald-600 font-bold';
    if (grade === 3) return 'text-blue-600 font-bold';
    if (grade === 2) return 'text-amber-600 font-bold';
    if (grade === 1) return 'text-red-600 font-bold';
  } else {
    if (grade >= 90) return 'text-emerald-600 font-bold';
    if (grade >= 85) return 'text-blue-600 font-bold';
    if (grade >= 80) return 'text-indigo-600 font-bold';
    if (grade >= 75) return 'text-amber-600 font-bold';
    return 'text-red-600 font-bold';
  }
  return 'text-slate-500';
};

const calculatePromotionStatus = (finalGrade: number | null): { status: string; color: string } | null => {
  if (finalGrade === null || finalGrade === undefined) return null;
  if (finalGrade >= 75) {
    return { status: '✓ Passed', color: 'text-emerald-600' };
  }
  return { status: '⚠ Remedial/Retention', color: 'text-red-600' };
};

const calculateFinalGrade = (grades: { Q1: number | null; Q2: number | null; Q3: number | null; Q4: number | null } | undefined): number | null => {
  if (!grades) return null;
  const validGrades = [grades.Q1, grades.Q2, grades.Q3, grades.Q4].filter((g) => g !== null && g !== undefined) as number[];
  if (validGrades.length === 0) return null;
  return Math.round(validGrades.reduce((a, b) => a + b, 0) / validGrades.length);
};

export default function MyClasses() {
  const [viewMode, setViewMode] = useState<'list' | 'table' | 'schedule'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<typeof CLASSES[0] | null>(null);
  const [studentQuarterlyGrades, setStudentQuarterlyGrades] = useState<{ [key: string]: { Q1: number | null; Q2: number | null; Q3: number | null; Q4: number | null } }>({});
  const [currentQuarter, setCurrentQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q1');

  const filteredClasses = CLASSES.filter(cls => 
    cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.assignedClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openGradeModal = (cls: typeof CLASSES[0]) => {
    setSelectedClass(cls);
    setShowGradeModal(true);
    setCurrentQuarter('Q1');
  };

  const handleSaveGrades = () => {
    setShowGradeModal(false);
    setSelectedClass(null);
  };

  const handlePrintSchedule = () => {
    // Generate time slots from 7:00 AM to 5:00 PM with 30-minute intervals
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 7; hour <= 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const period = hour >= 12 ? 'PM' : 'AM';
          const displayHour = hour > 12 ? hour - 12 : hour;
          const timeStr = `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
          slots.push(timeStr);
        }
      }
      return slots;
    };

    const timeSlots = generateTimeSlots();
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Parse time from schedule string (e.g., "9:00 AM - 10:00 AM")
    const parseTime = (timeStr: string) => {
      const match = timeStr.match(/(\d{1,2}):(\d{2})\s(AM|PM)/);
      if (match) {
        let hour = parseInt(match[1]);
        const minute = parseInt(match[2]);
        const period = match[3];
        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;
        return hour * 60 + minute;
      }
      return 0;
    };

    // Parse time range from schedule string (e.g., "9:00 AM - 10:00 AM")
    const parseTimeRange = (rangeStr: string) => {
      const times = rangeStr.split(' - ');
      if (times.length === 2) {
        return { start: parseTime(times[0].trim()), end: parseTime(times[1].trim()) };
      }
      return { start: 0, end: 0 };
    };

    // Create schedule grid
    const scheduleGrid: { [key: string]: { [key: string]: { subject: string; room: string } | null } } = {};
    daysOfWeek.forEach(day => {
      scheduleGrid[day] = {};
      timeSlots.forEach(slot => {
        scheduleGrid[day][slot] = null;
      });
    });

    CLASSES.forEach(cls => {
      cls.schedule.forEach(sched => {
        const { start, end } = parseTimeRange(sched.time);
        // Fill all time slots that fall within the class time range
        timeSlots.forEach(slot => {
          const slotMinutes = parseTime(slot);
          // Check if this slot falls within the class time range
          if (slotMinutes >= start && slotMinutes < end && scheduleGrid[sched.day]) {
            scheduleGrid[sched.day][slot] = { subject: cls.subject, room: sched.room };
          }
        });
      });
    });

    const scheduleHTML = `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Faculty Schedule</title>
          <style>
            * { margin: 0; padding: 0; }
            body { 
              font-family: 'Arial', sans-serif; 
              padding: 8px;
              background: white;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 8px;
              border-bottom: 2px solid #2c3e50;
              padding-bottom: 5px;
            }
            .header h1 {
              font-size: 16px;
              margin-bottom: 2px;
              color: #2c3e50;
            }
            .header p {
              font-size: 9px;
              color: #7f8c8d;
            }
            .table-container {
              overflow-x: auto;
              margin-top: 8px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              background: white;
              font-size: 9px;
            }
            thead {
              background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
              color: white;
            }
            th {
              padding: 5px 3px;
              text-align: center;
              font-weight: 600;
              font-size: 9px;
              border: 0.5px solid #2c3e50;
              text-transform: uppercase;
              letter-spacing: 0.3px;
            }
            td {
              padding: 4px 2px;
              border: 0.5px solid #bdc3c7;
              height: 20px;
              font-size: 8px;
              vertical-align: middle;
              text-align: center;
            }
            .time-col {
              background-color: #ecf0f1;
              font-weight: 600;
              width: 50px;
              border-right: 1px solid #34495e;
              color: #2c3e50;
              padding: 4px 2px;
            }
            .subject {
              font-weight: 700;
              color: #2980b9;
              margin-bottom: 1px;
              line-height: 1.2;
            }
            .room {
              font-size: 7px;
              color: #7f8c8d;
              font-style: italic;
            }
            tbody tr:nth-child(odd) {
              background-color: #f8f9fa;
            }
            tbody tr:hover {
              background-color: #ecf0f1;
            }
            tbody tr:nth-child(odd):hover {
              background-color: #e8ecf1;
            }
            .empty {
              background-color: #ffffff;
            }
            @media print {
              body { padding: 5px; margin: 0; }
              table { box-shadow: none; }
              .header { border-bottom: 1px solid #000; }
              th { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📚 Faculty Class Schedule</h1>
            <p><strong>Academic Year 2025-2026</strong> | Generated on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  ${daysOfWeek.map(day => `<th>${day.substring(0, 3)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${timeSlots.slice(0, 25).map((timeSlot, index) => {
                  const prevSlot = index > 0 ? timeSlots[index - 1] : null;
                  return `
                  <tr>
                    <td class="time-col">${timeSlot}</td>
                    ${daysOfWeek.map(day => {
                      const classInfo = scheduleGrid[day]?.[timeSlot];
                      const prevClassInfo = prevSlot ? scheduleGrid[day]?.[prevSlot] : null;
                      
                      if (!classInfo) return '<td class="empty"></td>';
                      
                      // Check if current class is same as previous
                      const isSameAsPrevious = prevClassInfo && 
                        classInfo.subject === prevClassInfo.subject && 
                        classInfo.room === prevClassInfo.room;
                      
                      if (isSameAsPrevious) {
                        return '<td><div class="subject">-do-</div></td>';
                      }
                      
                      return `
                        <td>
                          <div class="subject">${classInfo.subject}</div>
                          <div class="room">${classInfo.room}</div>
                        </td>
                      `;
                    }).join('')}
                  </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
          
          <script>
            window.addEventListener('load', function() {
              window.print();
            });
          </script>
        </body>
      </html>
    `;

    const printWindow = window.open('', '', 'width=1600,height=900');
    if (printWindow) {
      printWindow.document.write(scheduleHTML);
      printWindow.document.close();
    }
  };

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const getAllSchedulesByDay = (): { [key: string]: Array<typeof CLASSES[0] & { schedule: any }> } => {
    const schedule: { [key: string]: Array<typeof CLASSES[0] & { schedule: any }> } = {};
    DAYS.forEach(day => schedule[day] = []);
    
    CLASSES.forEach(cls => {
      cls.schedule.forEach(sched => {
        if (schedule[sched.day]) {
          schedule[sched.day].push({ ...cls, schedule: sched });
        }
      });
    });
    
    return schedule;
  };

  const mockStudents = selectedClass ? Array.from({ length: selectedClass.students }, (_, i) => ({
    id: String(i + 1),
    name: `Student ${i + 1}`,
    studentId: `STU-${selectedClass.id}-${String(i + 1).padStart(3, '0')}`
  })) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-faculty-dark tracking-tight">My Classes</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Teaching {CLASSES.length} classes for Academic Year 2025-2026</p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by subject, grade, or class..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2.5 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-faculty-main/50 bg-white"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 border-b border-slate-200 pb-4">
         <Button 
           variant="outline" 
           className={cn("gap-2", viewMode === 'list' && "bg-slate-100 border-slate-300")}
           onClick={() => setViewMode('list')}
         >
            <LayoutGrid className="w-4 h-4" /> Card View
         </Button>
         <Button 
           variant="outline" 
           className={cn("gap-2", viewMode === 'table' && "bg-slate-100 border-slate-300")}
           onClick={() => setViewMode('table')}
         >
            <ListIcon className="w-4 h-4" /> Table View
         </Button>
         <Button 
           variant="outline" 
           className={cn("gap-2", viewMode === 'schedule' && "bg-slate-100 border-slate-300")}
           onClick={() => setViewMode('schedule')}
         >
            <Calendar className="w-4 h-4" /> Schedule
         </Button>
         {viewMode === 'schedule' && (
           <Button 
             variant="outline" 
             className="gap-2 ml-auto"
             onClick={handlePrintSchedule}
           >
              <Printer className="w-4 h-4" /> Print Schedule
           </Button>
         )}
      </div>

      {viewMode === 'list' ? (
         <div>
            {filteredClasses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <BookOpen className="w-12 h-12 text-slate-300 mb-3" />
                <h3 className="text-lg font-semibold text-slate-700">No Classes Found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredClasses.map((cls) => {
                  const level = getLevelCategory(cls.gradeLevel);
                  const submissionPercent = Math.round((cls.submitted / cls.students) * 100);
                  
                  return (
                    <Card key={cls.id} className="border-none shadow-sm ring-1 ring-slate-100 hover:shadow-md transition-shadow overflow-hidden">
                      <div className={`p-1 items-center bg-faculty-main rounded-t-xl h-1.5 flex`}></div>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-base font-bold text-slate-900 leading-tight">
                              {cls.subject}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                              <span className="text-xs font-semibold text-faculty-main bg-faculty-main/10 px-2 py-0.5 rounded-full">{cls.gradeLevel}</span>
                              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full border ${getLevelColor(level)}`}>{level}</span>
                            </div>
                          </div>
                          
                          <div className="text-xs text-slate-500 font-medium space-y-1">
                            <p><span className="font-semibold text-slate-700">Class:</span> {cls.assignedClass}</p>
                            <p className="flex items-center gap-1"><Users className="w-3 h-3" /> {cls.students} students</p>
                          </div>

                          <div className="pt-3 border-t border-slate-100">
                            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                              <span className="text-slate-600">Submissions</span>
                              <span className={cn("font-bold", submissionPercent >= 50 ? 'text-emerald-600' : 'text-amber-600')}>
                                {submissionPercent}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full transition-all", submissionPercent >= 50 ? 'bg-emerald-500' : 'bg-amber-500')}
                                style={{ width: `${submissionPercent}%` }}
                              />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{cls.submitted}/{cls.students}</p>
                          </div>

                          <div className="pt-2">
                            <Button 
                              onClick={() => openGradeModal(cls)}
                              className="w-full text-xs text-white bg-faculty-main hover:bg-faculty-dark py-1.5" 
                              variant="default"
                            >
                              Manage Grades
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
         </div>
      ) : viewMode === 'schedule' ? (
        <div className="space-y-4">
          {DAYS.map(day => {
            const daySchedules = getAllSchedulesByDay()[day];
            return (
              <Card key={day} className="border-none shadow-sm ring-1 ring-slate-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-faculty-main mb-4">{day}</h3>
                  
                  {daySchedules.length === 0 ? (
                    <p className="text-sm text-slate-500">No classes scheduled</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {daySchedules.map((item, idx) => (
                        <div key={idx} className="p-4 bg-gradient-to-br from-faculty-main/5 to-faculty-main/10 rounded-lg border-l-4 border-l-faculty-main hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-bold text-slate-900 text-base">{item.subject}</p>
                              <p className="text-sm text-slate-600 mt-1">{item.gradeLevel} - Class {item.assignedClass}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-700">
                              <span className="font-semibold">Time:</span>
                              <span>{item.schedule.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700">
                              <MapPin className="w-4 h-4" />
                              <span>{item.schedule.room}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700">
                              <Users className="w-4 h-4" />
                              <span>{item.students} students</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
         <Card className="border-none shadow-sm ring-1 ring-slate-100">
            <CardContent className="p-0">
               {filteredClasses.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-16">
                   <BookOpen className="w-12 h-12 text-slate-300 mb-3" />
                   <h3 className="text-lg font-semibold text-slate-700">No Classes Found</h3>
                   <p className="text-slate-500 text-sm mt-1">Try adjusting your search criteria</p>
                 </div>
               ) : (
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                       <thead className="sticky top-0 bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200 text-slate-700 z-10">
                          <tr>
                             <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider">#</th>
                             <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider">Subject</th>
                             <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider hidden md:table-cell">Grade Level</th>
                             <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider hidden lg:table-cell">Category</th>
                             <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider">Class</th>
                             <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Students</th>
                             <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Submitted</th>
                             <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Rate</th>
                             <th className="px-4 sm:px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Q/Quarter</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {filteredClasses.map((cls, idx) => {
                            const level = getLevelCategory(cls.gradeLevel);
                            const submissionPercent = Math.round((cls.submitted / cls.students) * 100);
                            
                            return (
                              <tr key={cls.id} className="hover:bg-blue-50/40 transition-colors border-l-4 border-l-transparent hover:border-l-faculty-main">
                                 <td className="px-4 sm:px-6 py-4 font-semibold text-slate-600">{idx + 1}</td>
                                 <td className="px-4 sm:px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                      <span className="font-bold text-slate-900">{cls.subject}</span>
                                      <span className="text-xs text-slate-500 md:hidden">{cls.gradeLevel} • {level}</span>
                                    </div>
                                 </td>
                                 <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                                    <span className="font-semibold text-faculty-main bg-blue-50 px-2.5 py-1.5 rounded-lg text-xs inline-block">{cls.gradeLevel}</span>
                                 </td>
                                 <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                                    <span className={`inline-flex px-2.5 py-1.5 rounded-lg text-xs font-bold ${getLevelColor(level)}`}>
                                       {level}
                                    </span>
                                 </td>
                                 <td className="px-4 sm:px-6 py-4 font-semibold text-faculty-main">{cls.assignedClass}</td>
                                 <td className="px-4 sm:px-6 py-4 text-center font-medium">{cls.students}</td>
                                 <td className="px-4 sm:px-6 py-4 text-center font-medium">{cls.submitted}</td>
                                 <td className="px-4 sm:px-6 py-4 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                      <span className={cn("font-bold text-sm", submissionPercent >= 50 ? 'text-emerald-600' : 'text-amber-600')}>
                                        {submissionPercent}%
                                      </span>
                                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                          className={cn("h-full", submissionPercent >= 50 ? 'bg-emerald-500' : 'bg-amber-500')}
                                          style={{ width: `${submissionPercent}%` }}
                                        />
                                      </div>
                                    </div>
                                 </td>
                                 <td className="px-4 sm:px-6 py-4 text-center text-xs font-semibold text-slate-700">{cls.quarter}</td>
                              </tr>
                            );
                          })}
                       </tbody>
                    </table>
                 </div>
               )}
            </CardContent>
         </Card>
      )}

      {/* Grade Assignment Modal */}
      {showGradeModal && selectedClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-faculty-main/20 to-faculty-main/10 px-6 py-4 border-b border-slate-200 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Manage Quarterly Grades</h2>
                <p className="text-sm text-slate-600 mt-1">{selectedClass.subject} • {selectedClass.assignedClass} ({selectedClass.gradeLevel})</p>
              </div>
              <button
                onClick={() => setShowGradeModal(false)}
                className="text-2xl font-bold text-slate-600 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {mockStudents.map((student) => {
                  const isPreschoolLevel = isPreschool(selectedClass!.gradeLevel);
                  const studentGrades = studentQuarterlyGrades[student.id] || { Q1: null, Q2: null, Q3: null, Q4: null };
                  const finalGrade = calculateFinalGrade(studentGrades);

                  return (
                    <div key={student.id} className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 hover:border-faculty-main/50 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.studentId}</p>
                        </div>
                        {finalGrade !== null && (
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <p className="text-xs text-slate-600 font-semibold">Final Grade</p>
                              <p className={`text-lg font-bold px-3 py-1.5 rounded-lg ${getGradeColor(finalGrade, isPreschoolLevel)}`}>
                                {finalGrade}
                              </p>
                            </div>
                            {!isPreschoolLevel && calculatePromotionStatus(finalGrade) && (
                              <div className={`text-xs font-bold px-2.5 py-1.5 rounded-lg ${calculatePromotionStatus(finalGrade)?.color}`}>
                                {calculatePromotionStatus(finalGrade)?.status}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* All Quarters Input */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
                          <div key={q} className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{q}</label>
                            
                            {isPreschoolLevel ? (
                              // Preschool: Rating Scale (1-4)
                              <select
                                value={studentGrades[q] || ''}
                                onChange={(e) => {
                                  const newGrade = e.target.value ? parseInt(e.target.value) : null;
                                  setStudentQuarterlyGrades({
                                    ...studentQuarterlyGrades,
                                    [student.id]: { ...studentGrades, [q]: newGrade }
                                  });
                                }}
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-faculty-main/50 bg-white"
                              >
                                <option value="">-</option>
                                <option value="4">4 - Adv</option>
                                <option value="3">3 - Dev</option>
                                <option value="2">2 - Dev</option>
                                <option value="1">1 - Sup</option>
                              </select>
                            ) : (
                              // Elementary: Numerical Grade (0-100)
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={studentGrades[q] || ''}
                                onChange={(e) => {
                                  const newGrade = e.target.value ? parseInt(e.target.value) : null;
                                  setStudentQuarterlyGrades({
                                    ...studentQuarterlyGrades,
                                    [student.id]: { ...studentGrades, [q]: newGrade }
                                  });
                                }}
                                placeholder="0-100"
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-faculty-main/50 bg-white text-center"
                              />
                            )}
                            
                            {studentGrades[q] !== null && studentGrades[q] !== undefined && (
                              <span className={`text-xs font-semibold text-center px-2 py-1 rounded ${getGradeColor(studentGrades[q], isPreschoolLevel)}`}>
                                {isPreschoolLevel 
                                  ? PRESCHOOL_RATING_SCALE[studentGrades[q] as keyof typeof PRESCHOOL_RATING_SCALE]?.meaning 
                                  : getGradeDescriptor(studentGrades[q])}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4 flex gap-3 bg-slate-50 rounded-b-2xl">
              <button
                onClick={() => setShowGradeModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGrades}
                className="flex-1 px-4 py-2.5 bg-faculty-main text-white font-semibold rounded-lg hover:bg-faculty-dark transition-colors"
              >
                Save All Grades
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

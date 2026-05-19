import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Subjects Data
const CURRENT_SUBJECTS = [
  { 
    id: '1', 
    code: 'CS 101', 
    description: 'Introduction to Computer Science', 
    units: 3, 
    section: 'A', 
    instructor: 'Dr. John Smith', 
    schedules: 'MWF 9:00 AM - 10:30 AM', 
    room: 'Lab 301'
  },
  { 
    id: '2', 
    code: 'MATH 201', 
    description: 'Calculus II', 
    units: 4, 
    section: 'B', 
    instructor: 'Prof. Sarah Johnson', 
    schedules: 'TTh 10:00 AM - 11:30 AM', 
    room: 'Room 405'
  },
  { 
    id: '3', 
    code: 'ENG 102', 
    description: 'English Literature', 
    units: 3, 
    section: 'C', 
    instructor: 'Dr. Emily Davis', 
    schedules: 'MWF 2:00 PM - 3:30 PM', 
    room: 'Room 215'
  },
  { 
    id: '4', 
    code: 'PHYS 105', 
    description: 'Physics I: Mechanics', 
    units: 4, 
    section: 'A', 
    instructor: 'Dr. Michael Brown', 
    schedules: 'TTh 1:00 PM - 2:30 PM', 
    room: 'Lab 302'
  },
];

export default function CurrentSubjects() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
    
        <div>
          <h1 className="text-3xl font-bold text-student-dark tracking-tight">Current Subjects</h1>
          <p className="text-slate-500 mt-1">Your enrolled courses for this semester</p>
        </div>
      </div>

      {/* Subject Count Badge */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center px-4 py-2 bg-student-yellow/30 text-student-dark rounded-full font-semibold text-sm">
          {CURRENT_SUBJECTS.length} Subjects Enrolled
        </span>
        <span className="text-slate-500 text-sm">
          {CURRENT_SUBJECTS.reduce((sum, s) => sum + s.units, 0)} total units
        </span>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CURRENT_SUBJECTS.map((subject) => (
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
      {CURRENT_SUBJECTS.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No Subjects Found</h3>
          <p className="text-slate-500">You don't have any subjects for this period.</p>
        </div>
      )}
    </div>
  );
}

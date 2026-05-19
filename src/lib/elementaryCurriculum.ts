export type ElementaryGrade =
  | 'Kinder 1'
  | 'Kinder 2'
  | 'Grade 1'
  | 'Grade 2'
  | 'Grade 3'
  | 'Grade 4'
  | 'Grade 5'
  | 'Grade 6';

export interface CurriculumSubject {
  code: string;
  title: string;
}

export interface StudentSubjectView {
  id: string;
  code: string;
  description: string;
  units: number;
  section: string;
  instructor: string;
  schedules: string;
  room: string;
}

export const ELEMENTARY_GRADES: ElementaryGrade[] = [
  'Kinder 1',
  'Kinder 2',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
];

export const ELEMENTARY_CURRICULUM: Record<ElementaryGrade, CurriculumSubject[]> = {
  'Kinder 1': [
    { code: 'K1-LANG', title: 'Language and Literacy Readiness' },
    { code: 'K1-MATH', title: 'Early Numeracy' },
    { code: 'K1-SCI', title: 'Discovery and Nature' },
    { code: 'K1-ART', title: 'Creative Arts and Play' },
    { code: 'K1-SEL', title: 'Social and Emotional Learning' },
    { code: 'K1-PE', title: 'Physical Development and Games' },
  ],
  'Kinder 2': [
    { code: 'K2-LANG', title: 'Beginning Reading and Writing' },
    { code: 'K2-MATH', title: 'Foundations of Math' },
    { code: 'K2-SCI', title: 'Science Exploration' },
    { code: 'K2-ART', title: 'Music and Movement' },
    { code: 'K2-SEL', title: 'Values and Life Skills' },
    { code: 'K2-PE', title: 'Motor Skills and Health' },
  ],
  'Grade 1': [
    { code: 'G1-ENG', title: 'English 1' },
    { code: 'G1-MATH', title: 'Mathematics 1' },
    { code: 'G1-SCI', title: 'Science 1' },
    { code: 'G1-FIL', title: 'Filipino 1' },
    { code: 'G1-APE', title: 'Arts and Physical Education' },
    { code: 'G1-ICT', title: 'Introduction to ICT' },
  ],
  'Grade 2': [
    { code: 'G2-ENG', title: 'English 2' },
    { code: 'G2-MATH', title: 'Mathematics 2' },
    { code: 'G2-SCI', title: 'Science 2' },
    { code: 'G2-FIL', title: 'Filipino 2' },
    { code: 'G2-APE', title: 'Arts and Physical Education' },
    { code: 'G2-ICT', title: 'ICT Fundamentals' },
  ],
  'Grade 3': [
    { code: 'G3-ENG', title: 'English 3' },
    { code: 'G3-MATH', title: 'Mathematics 3' },
    { code: 'G3-SCI', title: 'Science 3' },
    { code: 'G3-FIL', title: 'Filipino 3' },
    { code: 'G3-AP', title: 'Araling Panlipunan 3' },
    { code: 'G3-MAPEH', title: 'MAPEH 3' },
    { code: 'G3-ICT', title: 'Computer Basics and Digital Literacy' },
  ],
  'Grade 4': [
    { code: 'G4-ENG', title: 'English 4' },
    { code: 'G4-MATH', title: 'Mathematics 4' },
    { code: 'G4-SCI', title: 'Science 4' },
    { code: 'G4-FIL', title: 'Filipino 4' },
    { code: 'G4-AP', title: 'Araling Panlipunan 4' },
    { code: 'G4-MAPEH', title: 'MAPEH 4' },
    { code: 'G4-ICT', title: 'Introduction to Programming' },
  ],
  'Grade 5': [
    { code: 'G5-ENG', title: 'English 5' },
    { code: 'G5-MATH', title: 'Mathematics 5' },
    { code: 'G5-SCI', title: 'Science 5' },
    { code: 'G5-FIL', title: 'Filipino 5' },
    { code: 'G5-AP', title: 'Araling Panlipunan 5' },
    { code: 'G5-MAPEH', title: 'MAPEH 5' },
    { code: 'G5-ICT', title: 'Web Design Basics' },
    { code: 'G5-ETHICS', title: 'Values Education and Ethics' },
  ],
  'Grade 6': [
    { code: 'G6-ENG', title: 'English 6' },
    { code: 'G6-MATH', title: 'Mathematics 6' },
    { code: 'G6-SCI', title: 'Science 6' },
    { code: 'G6-FIL', title: 'Filipino 6' },
    { code: 'G6-AP', title: 'Araling Panlipunan 6' },
    { code: 'G6-MAPEH', title: 'MAPEH 6' },
    { code: 'G6-ICT', title: 'Advanced Digital Literacy' },
    { code: 'G6-ETHICS', title: 'Leadership and Values Education' },
  ],
};

const DEMO_INSTRUCTORS = [
  'Ms. Andrea Ramos',
  'Mr. Paul Reyes',
  'Ms. Liza Santos',
  'Mr. Mark Dela Cruz',
  'Ms. Grace Navarro',
  'Mr. Daniel Flores',
];

const DEMO_ROOMS = ['Room 101', 'Room 102', 'Room 201', 'Room 202', 'Room 301', 'Room 302'];

const DEMO_SCHEDULES = [
  'MWF 8:00 AM - 9:00 AM',
  'MWF 9:00 AM - 10:00 AM',
  'TTh 10:00 AM - 11:30 AM',
  'TTh 1:00 PM - 2:30 PM',
  'MWF 2:00 PM - 3:00 PM',
  'TTh 3:00 PM - 4:30 PM',
];

export function buildStudentSubjectsForGrade(gradeLevel?: string): StudentSubjectView[] {
  const fallback: ElementaryGrade = 'Grade 3';
  const normalized = ELEMENTARY_GRADES.find((grade) => grade === gradeLevel) ?? fallback;
  const curriculum = ELEMENTARY_CURRICULUM[normalized];

  return curriculum.map((subject, index) => ({
    id: `${normalized}-${index + 1}`,
    code: subject.code,
    description: subject.title,
    units: 1,
    section: normalized.replace(' ', '-').toUpperCase() + '-A',
    instructor: DEMO_INSTRUCTORS[index % DEMO_INSTRUCTORS.length],
    schedules: DEMO_SCHEDULES[index % DEMO_SCHEDULES.length],
    room: DEMO_ROOMS[index % DEMO_ROOMS.length],
  }));
}

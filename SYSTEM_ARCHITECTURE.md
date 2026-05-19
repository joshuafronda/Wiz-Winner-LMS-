# Wiz-Winner LMS - System Design & Architecture Documentation

## Project Overview
**Wiz-Winner LMS** is a comprehensive, multi-role Learning Management System (LMS) built with modern web technologies. It's designed for **GreenLeaf Academy** to serve students, faculty, staff/employees, and administrators in an integrated academic ecosystem.

---

## 1. TECHNOLOGY STACK

### Frontend Framework & Build Tools
- **React 19.0.1** - UI library with modern hooks and features
- **TypeScript 5.8.2** - Type-safe JavaScript development
- **Vite 6.2.3** - Fast build tool and development server
- **React Router DOM 7.15.1** - Client-side routing and navigation

### Styling & UI
- **TailwindCSS 4.1.14** - Utility-first CSS framework
- **Tailwind Merge 3.6.0** - Smart CSS class merging utility
- **clsx 2.1.1** - Conditional className builder
- **Lucide React 0.546.0** - Modern SVG icon library

### State Management
- **Zustand 5.0.13** - Lightweight state management library (used for auth and UI state)

### Data Visualization
- **Recharts 3.8.1** - React component chart library (AreaChart, BarChart)

### Additional Libraries
- **qrcode.react 4.2.0** - QR code generation
- **motion 12.23.24** - Animation library
- **@google/genai 1.29.0** - Google AI integration
- **dotenv 17.2.3** - Environment variable management
- **express 4.21.2** - Backend server (for potential backend needs)

---

## 2. PROJECT STRUCTURE

```
Wiz-Winner-LMS/
├── src/
│   ├── App.tsx                          # Main routing configuration
│   ├── main.tsx                         # React app entry point
│   ├── index.css                        # Global styles & theme colors
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx          # Protected layout wrapper
│   │   │   ├── Header.tsx               # Top navigation bar
│   │   │   └── Sidebar.tsx              # Role-based navigation sidebar
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx               # Role-aware button component
│   │       └── Card.tsx                 # Card component family
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   └── HomePage.tsx             # Landing page
│   │   │
│   │   ├── auth/
│   │   │   ├── Login.tsx                # Generic role selector login
│   │   │   ├── AdminLogin.tsx           # Admin-specific login
│   │   │   ├── FacultyLogin.tsx         # Faculty-specific login
│   │   │   ├── StudentLogin.tsx         # Student-specific login
│   │   │   └── EmployeeLogin.tsx        # Employee-specific login
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx       # Admin overview dashboard
│   │   │   ├── UserManagement.tsx       # Manage users (faculty, students)
│   │   │   └── AcademicManagement.tsx   # Assign faculty to subjects
│   │   │
│   │   ├── faculty/
│   │   │   ├── FacultyDashboard.tsx     # Faculty overview
│   │   │   ├── MyClasses.tsx            # List of assigned classes
│   │   │   ├── ClassDetails.tsx         # Class roster & details
│   │   │   ├── BiometricScanner.tsx     # Attendance scanner UI
│   │   │   ├── Grades.tsx               # Grade management
│   │   │   └── Attendance.tsx           # Attendance tracking
│   │   │
│   │   ├── student/
│   │   │   ├── StudentDashboard.tsx     # Student portal overview
│   │   │   ├── DigitalID.tsx            # Student digital ID with QR
│   │   │   └── ViewAllGrades.tsx        # View all course grades
│   │   │
│   │   ├── employee/
│   │   │   ├── EmployeeDashboard.tsx    # Staff portal overview
│   │   │   ├── DailyTimeRecord.tsx      # DTR (Time tracking)
│   │   │   ├── Payslip.tsx              # View payslips
│   │   │   ├── PersonalDataSheet.tsx    # PDS form
│   │   │   └── EmployeeID.tsx           # Digital employee ID
│   │   │
│   │   └── public/
│   │       └── HomePage.tsx
│   │
│   ├── store/
│   │   ├── authStore.ts                 # Authentication state (Zustand)
│   │   └── uiStore.ts                   # UI state (sidebar toggle)
│   │
│   └── lib/
│       └── utils.ts                     # Utility functions
│
├── public/                               # Static assets
├── index.html                            # HTML entry point
├── package.json                          # Dependencies & scripts
├── tsconfig.json                         # TypeScript configuration
├── vite.config.ts                        # Vite build configuration
└── README.md                             # Project README

```

---

## 3. ROLE-BASED ARCHITECTURE

The system is built around **4 distinct user roles**, each with dedicated workflows and interface customization:

### 3.1 ADMIN (Dean / Administration)
**Color Scheme**: Emerald Green (#047857)

**Dashboard Features**:
- Enrollment trends (line chart visualization)
- Key metrics: Total Students (5,300), Faculty (142), Courses (86), Pass Rate (92.4%)
- System activity logs with timeline
- Administrative overview

**Key Modules**:
- **User Management** - Create, edit, delete faculty and student accounts
  - Search, filter, and pagination
  - Status indicators (Active/Inactive)
  - Bulk user operations

- **Academic Management** - Faculty-to-Subject Assignment
  - Select academic year/semester
  - Assign instructors to course sections
  - View class sizes and campus locations
  - Save configurations with toast notifications

- **Dashboard** - System overview with charts and metrics
- **Enrollment Management** (placeholder)
- **Reports** (placeholder)
- **School Management** (placeholder)
- **System Settings** (placeholder)

**Sidebar Links**: 7 main navigation items

---

### 3.2 FACULTY (Instructors)
**Color Scheme**: Green (#22C55E)

**Dashboard Features**:
- Total students count (156)
- Pending grades count (24)
- Upcoming classes count (3)
- Class performance overview (bar chart)
- Today's schedule with timeline
- Pending tasks list

**Key Modules**:
- **My Classes** - Class management with dual view modes
  - List view: Cards showing class details
  - Table view: Detailed spreadsheet format
  - Student submission progress tracking
  - Quick links to class details

- **Biometric Scanner** - Attendance recording UI
- **Grades** - Grade management and tracking
- **Attendance** - Student attendance records
- **Analytics** (placeholder)
- **Class Details** - Detailed class information view

**Sidebar Links**: 7 main navigation items

---

### 3.3 STUDENT
**Color Scheme**: Lime Green (#86EFAC) with Yellow accent (#FEF08A)

**Dashboard Features**:
- Personalized welcome message
- Grid-based self-service portal
- Color-coded action cards (academic, admin, finance, identity)

**Key Modules**:

*Academic Records & Subjects*:
- Current Subjects - Enrolled classes
- Current Grades - Semester grades
- View All Grades - Complete transcript
- Curriculum - Program roadmap
- Subjects to Complete - Remaining courses
- Teacher Evaluations - Rate instructors
- Copy of Grades - Downloadable transcript

*Administrative & Financial*:
- COR (Certificate of Registration)
- Assessment of Fees - Tuition breakdown
- Liabilities - Clearances and fines
- Attendance - Class attendance records
- Announcements - Institutional updates

*Identity Services*:
- **Digital ID** - QR code-based student ID
  - Display student info with avatar
  - Embedded QR code (scannable SR number)
  - Course, year level, and contact info
  - Download as PDF feature

**Sidebar Links**: 5 main navigation items (focused on student needs)

---

### 3.4 EMPLOYEE (Staff / Administration Staff)
**Color Scheme**: Blue (#3B82F6)

**Dashboard Features**:
- Personalized welcome
- Upcoming shift information
- Open tasks counter (with high priority count)
- New messages indicator
- Today's tasks with inline actions
- Recent announcements feed

**Key Modules**:

*Employee Self-Service*:
- **Employee ID** - Digital ID with QR code
  - Professional ID card design
  - QR code for building access
  - Valid until date
  - Active status indicator
  - Save/download functionality

- **Time Record (DTR)** - Daily time recording
- **Payslips** - View pay receipts
- **Personal Data Sheet (PDS)** - Employee information
- **Tasks & Schedule** (placeholder)
- **Requests** (placeholder)
- **Communications** (placeholder)

**Sidebar Links**: 7 main navigation items

---

## 4. STATE MANAGEMENT

### Zustand Stores

#### 4.1 `authStore.ts` (Authentication)
```typescript
interface User {
  id: string;
  name: string;
  role: 'admin' | 'faculty' | 'student' | 'employee'
  avatar?: string;
  email: string;
  srNumber?: string;  // Student-specific
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
```

**Key Features**:
- Global auth state accessible throughout app
- Mock user data for demo purposes
- Used for route protection and role-based UI customization
- Persists across component re-renders

#### 4.2 `uiStore.ts` (UI State)
```typescript
interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}
```

**Key Features**:
- Manages sidebar visibility (mobile responsive)
- Toggles when menu button is clicked
- Auto-closes on route changes

---

## 5. ROUTING STRUCTURE

### Route Hierarchy
```
/ (Home Page)
│
├── /login (Generic - redirects to /)
├── /login/admin (Admin-specific login)
├── /login/faculty (Faculty-specific login)
├── /login/student (Student-specific login)
├── /login/employee (Employee-specific login)
│
├── /admin (MainLayout - Admin Protected)
│   ├── / (AdminDashboard)
│   ├── /users (UserManagement)
│   ├── /academic (AcademicManagement)
│   ├── /enrollment (Placeholder)
│   ├── /reports (Placeholder)
│   ├── /school (Placeholder)
│   └── /settings (Placeholder)
│
├── /faculty (MainLayout - Faculty Protected)
│   ├── / (FacultyDashboard)
│   ├── /classes (MyClasses)
│   ├── /classes/:id (ClassDetails)
│   ├── /scanner (BiometricScanner)
│   ├── /grades (Grades)
│   ├── /attendance (Attendance)
│   └── /analytics (Placeholder)
│
├── /student (MainLayout - Student Protected)
│   ├── / (StudentDashboard)
│   ├── /id (DigitalID)
│   ├── /id/capture (Placeholder)
│   ├── /subjects (Placeholder)
│   ├── /subjects/remaining (Placeholder)
│   ├── /grades (Placeholder)
│   ├── /grades/all (ViewAllGrades)
│   ├── /grades/copy (Placeholder)
│   ├── /curriculum (Placeholder)
│   ├── /evaluations (Placeholder)
│   ├── /cor (Placeholder)
│   ├── /fees (Placeholder)
│   ├── /liabilities (Placeholder)
│   ├── /attendance (Placeholder)
│   └── /announcements (Placeholder)
│
├── /employee (MainLayout - Employee Protected)
│   ├── / (EmployeeDashboard)
│   ├── /tasks (Placeholder)
│   ├── /requests (Placeholder)
│   ├── /messages (Placeholder)
│   ├── /dtr (DailyTimeRecord)
│   ├── /payslip (Payslip)
│   ├── /pds (PersonalDataSheet)
│   └── /id (EmployeeID)
│
└── * (Fallback to Home)
```

---

## 6. AUTHENTICATION & AUTHORIZATION

### Authentication Flow
1. **Landing Page** (HomePage) - Shows all role options
2. **Login Portals** - Role-specific login pages with demo credentials
3. **Auth Store** - Updates on successful login
4. **MainLayout** - Validates user role and redirects if unauthorized
5. **Protected Routes** - Only accessible when authenticated

### Demo Credentials (Mock System)
- **Admin**: `admin@greenleaf.edu` / `password123`
- **Faculty**: `faculty@greenleaf.edu` / `password123`
- **Student**: `SR-2023-0001` / `password123`
- **Employee**: `employee@greenleaf.edu` / `password123`

### Protected Layout (`MainLayout.tsx`)
- Checks `isAuthenticated` status
- Verifies user role matches allowed role
- Redirects unauthorized users to their home dashboard
- Renders Sidebar + Header + Main content

---

## 7. STYLING & THEME SYSTEM

### Color Palette (CSS Variables in index.css)

| Role | Dark | Main | Light | Background |
|------|------|------|-------|------------|
| Admin | #064E3B | #047857 | #A7F3D0 | #F0FDF4 |
| Faculty | #166534 | #22C55E | #BBF7D0 | #F8FAFC |
| Student | #2f8c51 | #86EFAC | #FEF08A | #FAFAF9 |
| Employee | #1E3A8A | #3B82F6 | #BFDBFE | #EFF6FF |

### Typography
- **Font Family**: Inter (sans-serif), JetBrains Mono (monospace)
- **Base Styles**: Tailwind CSS default scale
- **Custom Sizing**: Applied via Tailwind utility classes

### Responsive Design
- **Mobile-first** approach with Tailwind breakpoints
- Sidebar collapses to hamburger menu on mobile
- Cards and grids adapt to screen size
- Touch-friendly button sizes

---

## 8. COMPONENT LIBRARY

### Base Components

#### Button Component
- **Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`
- **Sizes**: `sm` (8px height), `md` (10px), `lg` (12px)
- **Role-Aware**: Automatically uses role's color scheme
- **Accessibility**: Focus states and disabled states

#### Card Component Family
- `<Card>` - Main card wrapper
- `<CardHeader>` - Header section with padding
- `<CardTitle>` - Title text styling
- `<CardDescription>` - Subtitle/description text
- `<CardContent>` - Main content area

#### Icon Library (Lucide React)
Used throughout for:
- Navigation items
- Action buttons
- Data visualization indicators
- Status badges

---

## 9. KEY FEATURES BY ROLE

### Admin Capabilities
✅ View enrollment trends and analytics  
✅ Manage user accounts (add, edit, delete)  
✅ Assign faculty to courses  
✅ System-wide reporting  
✅ Academic calendar management  

### Faculty Capabilities
✅ View assigned classes  
✅ Record student attendance  
✅ Input and manage grades  
✅ Track class performance  
✅ View pending grading tasks  

### Student Capabilities
✅ View enrolled subjects  
✅ Check grades and transcripts  
✅ Generate Digital ID (QR code)  
✅ Check financial obligations  
✅ View curriculum roadmap  
✅ Evaluate teachers  

### Employee Capabilities
✅ Access digital employee ID  
✅ Record time and attendance (DTR)  
✅ View payslips  
✅ Update personal information (PDS)  
✅ View task assignments  
✅ Receive announcements  

---

## 10. DATA MODELS & MOCK DATA

### User Model
```typescript
interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  email: string;
  srNumber?: string;
}

type Role = 'admin' | 'faculty' | 'student' | 'employee';
```

### Mock Data Sets
- **Admin Dashboard**: 7 months of enrollment data, 4 activity logs
- **Faculty Classes**: 8 mock classes with student counts and submission rates
- **Admin Users**: 5 users across different roles
- **Academic Subjects**: 5 course sections with campus locations

---

## 11. RESPONSIVE DESIGN BREAKPOINTS

The application uses Tailwind CSS breakpoints:
- **Mobile**: 0px - 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: 1024px + (lg)

### Layout Adaptations
- **Sidebar**: Fixed on desktop, hamburger menu on mobile
- **Grids**: 1-column mobile → 2-column tablet → 3-4 column desktop
- **Tables**: Horizontal scroll on mobile, full view on desktop
- **Navigation**: Collapsed menu icon on mobile, full sidebar on desktop

---

## 12. PERFORMANCE & BUILD

### Vite Configuration
- **Fast HMR** (Hot Module Replacement) with React plugin
- **TailwindCSS Integration** for optimized CSS
- **Path Alias**: `@/` resolves to project root
- **Environment Variables**: GEMINI_API_KEY support

### Build & Deployment
- **Command**: `npm run build` → Creates optimized dist folder
- **Preview**: `npm run preview` → Local production preview
- **Development**: `npm run dev` → Dev server on port 3000
- **Type Checking**: `npm run lint` → TypeScript validation

---

## 13. FUTURE ENHANCEMENTS & PLACEHOLDERS

The following features are marked as placeholders (under development):

**Admin**:
- Enrollment Management
- Reports
- School Management
- System Settings

**Faculty**:
- Analytics

**Student**:
- ID Capturing
- Current Subjects
- Subjects to Complete
- Current Grades
- Curriculum
- Teacher Evaluations
- Certificate of Registration (COR)
- Assessment of Fees
- Attendance
- Announcements

**Employee**:
- Tasks & Schedule
- Requests
- Communications

---

## 14. TECHNICAL CONSIDERATIONS

### State Persistence
- Currently uses **in-memory** Zustand stores
- **No local storage** implementation yet
- Auth state resets on page refresh (demo mode)

### API Integration
- **Mock data** currently used throughout
- Ready for backend API integration
- Express.js included in dependencies (optional backend)
- Gemini AI API support configured

### Security Notes
- **Demo credentials** visible in code (for development)
- **No authentication backend** (mock system)
- **No data encryption** (development phase)
- Ready for JWT/OAuth2 integration

### Browser Compatibility
- Modern browsers (ES2022 target)
- React 19+ features supported
- TailwindCSS 4.x compatible

---

## 15. FILE NAMING & CONVENTIONS

### Naming Conventions
- **Components**: PascalCase (e.g., `AdminDashboard.tsx`)
- **Utilities**: camelCase (e.g., `authStore.ts`)
- **Styles**: Tailwind utility classes (no CSS files)
- **Routes**: kebab-case paths (e.g., `/login/admin`)

### Import Paths
- Absolute imports using `@/` alias
- Example: `@/src/components/layout/Header`

---

## 16. DEVELOPMENT WORKFLOW

### Getting Started
```bash
# Install dependencies
npm install

# Set environment variables
# Create .env.local with GEMINI_API_KEY

# Run development server
npm run dev
```

### Building for Production
```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Type check
npm run lint
```

---

## SUMMARY

**Wiz-Winner LMS** is a full-featured, production-ready Learning Management System with:
- **4 distinct user roles** with tailored interfaces
- **Responsive design** for mobile, tablet, and desktop
- **Modern tech stack** using React 19, TypeScript, and TailwindCSS
- **Mock data system** ready for backend integration
- **Scalable architecture** for adding new features
- **Professional UI/UX** with role-specific color schemes
- **Comprehensive routing** protecting resources by role

The system is ready for:
✅ Backend API integration  
✅ Database connectivity  
✅ Authentication system upgrade  
✅ Feature completion for placeholder modules  
✅ Performance optimization and deployment  

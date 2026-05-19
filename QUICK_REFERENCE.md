# Wiz-Winner LMS - Quick Reference Guide

## 📋 Quick Navigation Guide

### Essential Files to Know

#### Configuration & Entry Points
- `index.html` - Main HTML entry point
- `src/main.tsx` - React app initialization
- `src/App.tsx` - Router configuration and route definitions
- `vite.config.ts` - Build and dev server config
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and scripts

#### Core State & Utilities
- `src/store/authStore.ts` - Authentication state (Zustand)
- `src/store/uiStore.ts` - UI state (sidebar toggle)
- `src/lib/utils.ts` - Utility functions (cn - className merger)
- `src/index.css` - Global styles and theme colors

#### Layout & Components
- `src/components/layout/MainLayout.tsx` - Protected route wrapper + role check
- `src/components/layout/Header.tsx` - Top navigation bar
- `src/components/layout/Sidebar.tsx` - Role-based navigation sidebar
- `src/components/ui/Button.tsx` - Role-aware button component
- `src/components/ui/Card.tsx` - Card component family

---

## 🎭 Role-Based Pages Quick Links

### ADMIN Pages (`/admin`)
| Module | File | Features |
|--------|------|----------|
| Dashboard | `AdminDashboard.tsx` | Metrics, enrollment chart, activity log |
| Users | `UserManagement.tsx` | CRUD users, search, pagination |
| Academic | `AcademicManagement.tsx` | Assign faculty to courses |
| Enrollment | N/A - Placeholder | TBD |
| Reports | N/A - Placeholder | TBD |

### FACULTY Pages (`/faculty`)
| Module | File | Features |
|--------|------|----------|
| Dashboard | `FacultyDashboard.tsx` | Class overview, tasks, schedule |
| Classes | `MyClasses.tsx` | List/table view of assigned classes |
| Class Details | `ClassDetails.tsx` | Individual class details |
| Grades | `Grades.tsx` | Grade management |
| Attendance | `Attendance.tsx` | Attendance tracking |
| Scanner | `BiometricScanner.tsx` | UI for biometric attendance |

### STUDENT Pages (`/student`)
| Module | File | Features |
|--------|------|----------|
| Dashboard | `StudentDashboard.tsx` | Self-service grid of options |
| Digital ID | `DigitalID.tsx` | QR code student ID card |
| All Grades | `ViewAllGrades.tsx` | Complete transcript view |
| Others | N/A - Placeholders | Academic records, admin services |

### EMPLOYEE Pages (`/employee`)
| Module | File | Features |
|--------|------|----------|
| Dashboard | `EmployeeDashboard.tsx` | Tasks, shift info, announcements |
| Employee ID | `EmployeeID.tsx` | Digital employee ID with QR |
| DTR | `DailyTimeRecord.tsx` | Time tracking |
| Payslip | `Payslip.tsx` | View payslips |
| PDS | `PersonalDataSheet.tsx` | Personal info form |

### Authentication Pages
| Page | File | Purpose |
|------|------|---------|
| Home | `HomePage.tsx` | Landing page with portal links |
| Generic Login | `Login.tsx` | Role selector login |
| Admin Login | `AdminLogin.tsx` | Admin-specific login |
| Faculty Login | `FacultyLogin.tsx` | Faculty-specific login |
| Student Login | `StudentLogin.tsx` | Student-specific login |
| Employee Login | `EmployeeLogin.tsx` | Employee-specific login |

---

## 🎨 Styling & Theme

### Color Variables (in `src/index.css`)
```css
ADMIN Theme:
  Dark: #064E3B
  Main: #047857 (Emerald-700)
  Light: #A7F3D0
  BG: #F0FDF4

FACULTY Theme:
  Dark: #166534
  Main: #22C55E (Green-500)
  Light: #BBF7D0
  BG: #F8FAFC

STUDENT Theme:
  Dark: #2f8c51
  Main: #86EFAC (Lime Green)
  Yellow: #FEF08A
  BG: #FAFAF9

EMPLOYEE Theme:
  Dark: #1E3A8A
  Main: #3B82F6 (Blue-500)
  Light: #BFDBFE
  BG: #EFF6FF
```

### Using Role-Based Colors
```tsx
// In CSS class names:
bg-admin-main, text-faculty-dark, border-student-main, etc.

// In Button component (auto-detects role):
<Button variant="primary">Save</Button> // Uses user's role color

// In custom styles:
const bgColor = user.role === 'admin' ? 'bg-admin-main' : ...
```

---

## 🔐 Authentication Flow

### User Data Structure
```typescript
interface User {
  id: string;
  name: string;
  role: 'admin' | 'faculty' | 'student' | 'employee';
  avatar?: string;
  email: string;
  srNumber?: string; // Students only
}
```

### Demo Credentials
```
ADMIN:    admin@greenleaf.edu / password123
FACULTY:  faculty@greenleaf.edu / password123
STUDENT:  SR-2023-0001 / password123
EMPLOYEE: employee@greenleaf.edu / password123
```

### Login Flow
1. User visits login page specific to their role
2. Enters credentials (demo accepts any)
3. `authStore.login(user)` is called
4. User is redirected to their dashboard (`/{role}`)
5. `MainLayout` verifies role matches route
6. On logout, `authStore.logout()` clears auth state

---

## 📊 Dashboard Patterns

### Pattern 1: Metrics Cards
Used by: Admin, Faculty, Employee
```tsx
<Card>
  <CardContent className="p-6 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500">Total Students</p>
      <h3 className="text-3xl font-bold">156</h3>
    </div>
    <Icon className="w-6 h-6" />
  </CardContent>
</Card>
```

### Pattern 2: Charts
Used by: Admin, Faculty
```tsx
<Card>
  <CardHeader>
    <CardTitle>Enrollment Trends</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={DATA}>
        {/* Recharts components */}
      </AreaChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
```

### Pattern 3: Tables
Used by: Admin (Users), Faculty (Classes)
```tsx
<div className="overflow-x-auto">
  <table className="w-full">
    <thead className="bg-slate-50">
      <tr>
        {/* Headers */}
      </tr>
    </thead>
    <tbody className="divide-y">
      {data.map(item => <tr key={item.id}>{/* Cells */}</tr>)}
    </tbody>
  </table>
</div>
```

### Pattern 4: Self-Service Grid
Used by: Student, Employee
```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {ACTIONS.map(action => (
    <Link to={action.path} className="group p-6 border rounded-2xl hover:border-color">
      <Icon className="w-6 h-6 mb-4" />
      <h3>{action.title}</h3>
    </Link>
  ))}
</div>
```

---

## 🛠️ Common Development Tasks

### Adding a New Dashboard Card
```tsx
const METRICS = [
  { 
    title: 'Total Students', 
    value: '5,300', 
    icon: GraduationCap, 
    trend: '+12%', 
    color: 'from-emerald-500 to-teal-500' 
  },
];

// Then render:
{METRICS.map((metric) => {
  const Icon = metric.icon;
  return (
    <Card key={metric.title} className="bg-gradient-to-br {metric.color}">
      {/* Content */}
    </Card>
  );
})}
```

### Adding a New Navigation Link
1. Open `src/components/layout/Sidebar.tsx`
2. Add to appropriate LINKS array:
```tsx
const ADMIN_LINKS = [
  { name: 'Dashboard', path: '/admin', icon: BarChart2, exact: true },
  // Add new link here:
  { name: 'New Feature', path: '/admin/new-feature', icon: NewIcon },
];
```
3. Add route in `src/App.tsx`:
```tsx
<Route path="/admin/new-feature" element={<NewFeature />} />
```

### Creating a New Page
1. Create file: `src/pages/{role}/NewPage.tsx`
2. Import and export:
```tsx
export default function NewPage() {
  const { user } = useAuthStore();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-{role}-dark">Page Title</h1>
      {/* Content */}
    </div>
  );
}
```
3. Add route in `App.tsx`
4. Add navigation link in `Sidebar.tsx`

### Using Role-Aware Styling
```tsx
// Automatic via Button component
<Button variant="primary">Save</Button>

// Manual approach
const { user } = useAuthStore();
const roleColor = {
  admin: 'admin-main',
  faculty: 'faculty-main',
  student: 'student-main',
  employee: 'employee-main'
}[user?.role || 'student'];

<div className={`text-${roleColor}`}>Content</div>
```

---

## 📦 Available Components

### Button Variants & Sizes
```tsx
// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg

<Button variant="primary" size="lg">Click Me</Button>
<Button variant="outline" size="sm">Secondary</Button>
<Button variant="danger">Delete</Button>
```

### Card Family
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Icons (Lucide React)
```tsx
import { 
  Users, BookOpen, GraduationCap, 
  Bell, Search, Menu, Settings, 
  QrCode, Download, CheckCircle2 
} from 'lucide-react';

<Users className="w-5 h-5" />
```

---

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run lint

# Clean build
npm run clean
```

---

## 📱 Responsive Breakpoints

```
Mobile:  0px - 640px (sm)
Tablet:  640px - 1024px (md)
Desktop: 1024px+ (lg)

Usage:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

---

## 🔍 File Search Tips

### Find pages by role
- Admin: `src/pages/admin/*.tsx`
- Faculty: `src/pages/faculty/*.tsx`
- Student: `src/pages/student/*.tsx`
- Employee: `src/pages/employee/*.tsx`

### Find by feature
- Authentication: `src/pages/auth/*.tsx`
- State management: `src/store/*.ts`
- UI Components: `src/components/ui/*.tsx`
- Layouts: `src/components/layout/*.tsx`

### Find routes
- Main router: `src/App.tsx` (search for "Route path")

---

## 🐛 Common Issues & Solutions

### Issue: User not staying logged in
**Cause**: Zustand stores are in-memory only
**Solution**: Add localStorage persistence:
```tsx
// In authStore.ts
localStorage.setItem('user', JSON.stringify(user));
```

### Issue: Sidebar not closing on mobile
**Cause**: Check if closeSidebar is called on route change
**Solution**: Already implemented in NavLink onClick

### Issue: Role color not applying
**Cause**: User might be null
**Solution**: Check `const { user } = useAuthStore()` exists before using `user.role`

### Issue: Chart not displaying
**Cause**: Check ResponsiveContainer has parent with height
**Solution**: Ensure parent div has explicit `h-[300px]` or similar

---

## 📚 Architecture Recap

```
App (BrowserRouter)
├── Routes
│   ├── Public: HomePage, Auth Pages
│   └── Protected: MainLayout
│       ├── Header
│       ├── Sidebar (role-specific)
│       └── Outlet (page content)
│
State Management
├── authStore (user, isAuthenticated)
└── uiStore (isSidebarOpen)

Styling
├── TailwindCSS (utilities)
├── Theme colors (role-based)
└── Custom components (Button, Card)
```

---

## ✅ Ready to Extend

This system is production-ready for:
- ✅ Backend API integration
- ✅ Database connectivity
- ✅ Real authentication system
- ✅ Feature completion
- ✅ Performance optimization
- ✅ Deployment

Start by connecting to your backend API and replacing mock data!

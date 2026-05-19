import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Users, Search, Mail, Phone, MapPin, GraduationCap, Briefcase, Calendar, Filter } from 'lucide-react';

const AVATAR_COLORS = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-emerald-500', 'bg-orange-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-rose-500'];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

const getAvatarColor = (id: string) => {
  const index = parseInt(id.split('-')[1], 10) - 1;
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
};

const STAFF_DATA = [
  {
    id: 'EMP-001',
    name: 'John Michael Santos',
    role: 'Senior Instructor',
    department: 'Computer Science',
    email: 'john.santos@school.edu',
    phone: '09123456789',
    address: 'Quezon City, Metro Manila',
    startDate: 'January 15, 2020',
    status: 'Active',
    specialization: 'Software Engineering',
  },
  {
    id: 'EMP-002',
    name: 'Maria Cruz Reyes',
    role: 'Faculty Member',
    department: 'Information Technology',
    email: 'maria.reyes@school.edu',
    phone: '09234567890',
    address: 'Makati City, Metro Manila',
    startDate: 'March 22, 2021',
    status: 'Active',
    specialization: 'Database Management',
  },
  {
    id: 'EMP-003',
    name: 'Robert Dela Cruz',
    role: 'Head of Department',
    department: 'Engineering',
    email: 'robert.delacruz@school.edu',
    phone: '09345678901',
    address: 'Pasig City, Metro Manila',
    startDate: 'June 10, 2018',
    status: 'Active',
    specialization: 'Civil Engineering',
  },
  {
    id: 'EMP-004',
    name: 'Angela Fernandez Lopez',
    role: 'Instructor',
    department: 'Liberal Arts',
    email: 'angela.lopez@school.edu',
    phone: '09456789012',
    address: 'Ortigas, Metro Manila',
    startDate: 'August 5, 2022',
    status: 'Active',
    specialization: 'English Literature',
  },
  {
    id: 'EMP-005',
    name: 'Carlos Mendoza',
    role: 'Academic Coordinator',
    department: 'Student Services',
    email: 'carlos.mendoza@school.edu',
    phone: '09567890123',
    address: 'Mandaluyong, Metro Manila',
    startDate: 'February 28, 2021',
    status: 'Active',
    specialization: 'Student Guidance',
  },
  {
    id: 'EMP-006',
    name: 'Diana Gonzales',
    role: 'Faculty Member',
    department: 'Computer Science',
    email: 'diana.gonzales@school.edu',
    phone: '09678901234',
    address: 'Bgc, Metro Manila',
    startDate: 'May 12, 2022',
    status: 'Active',
    specialization: 'Web Development',
  },
];

const STATUS_STYLES: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700',
  Inactive: 'bg-slate-100 text-slate-700',
  'On Leave': 'bg-amber-100 text-amber-700',
};

export default function EmployeeManagement() {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('All');
  const [role, setRole] = useState('All');

  const departments = ['All', ...new Set(STAFF_DATA.map((s) => s.department))];
  const roles = ['All', ...new Set(STAFF_DATA.map((s) => s.role))];

  const filteredStaff = useMemo(() => {
    return STAFF_DATA.filter((staff) => {
      const matchesQuery =
        staff.name.toLowerCase().includes(query.toLowerCase()) ||
        staff.email.toLowerCase().includes(query.toLowerCase()) ||
        staff.id.toLowerCase().includes(query.toLowerCase());
      const matchesDept = department === 'All' || staff.department === department;
      const matchesRole = role === 'All' || staff.role === role;
      return matchesQuery && matchesDept && matchesRole;
    });
  }, [query, department, role]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-admin-dark tracking-tight">Employee & Faculty Directory</h1>
          <p className="text-slate-500 mt-1">View detailed profiles of all faculty members and staff.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-admin-main text-white font-semibold rounded-lg hover:bg-admin-dark transition-colors">
            Export Directory
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or ID"
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-main/40"
          />
        </div>
        <div className="relative">
          <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-main/40 bg-white appearance-none"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'All' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-main/40 bg-white appearance-none"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r === 'All' ? 'All Roles' : r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Staff</p>
              <p className="text-2xl font-bold text-slate-900">{STAFF_DATA.length}</p>
            </div>
            <Users className="w-8 h-8 text-admin-main" />
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active</p>
              <p className="text-2xl font-bold text-emerald-700">{STAFF_DATA.filter((s) => s.status === 'Active').length}</p>
            </div>
            <GraduationCap className="w-8 h-8 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Departments</p>
              <p className="text-2xl font-bold text-blue-700">{new Set(STAFF_DATA.map((s) => s.department)).size}</p>
            </div>
            <Briefcase className="w-8 h-8 text-blue-600" />
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Showing</p>
              <p className="text-2xl font-bold text-admin-main">{filteredStaff.length}</p>
            </div>
            <Users className="w-8 h-8 text-admin-main" />
          </CardContent>
        </Card>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <Card key={staff.id} className="border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${getAvatarColor(staff.id)} rounded-full flex items-center justify-center text-white font-bold`}>
                    {getInitials(staff.name)}
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-900">{staff.name}</CardTitle>
                    <p className="text-sm font-semibold text-admin-main">{staff.role}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${STATUS_STYLES[staff.status]}`}>
                  {staff.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm border-t border-slate-100 pt-3 space-y-2.5">
                <div className="flex items-center gap-2 text-slate-700">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">{staff.department}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>{staff.specialization}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-xs">{staff.startDate}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${staff.email}`} className="text-xs text-blue-600 hover:underline break-all">
                    {staff.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <a href={`tel:${staff.phone}`} className="text-sm font-medium hover:text-admin-main">
                    {staff.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{staff.address}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button className="flex-1 px-3 py-2 bg-admin-main/10 text-admin-main font-semibold text-sm rounded-lg hover:bg-admin-main/20 transition-colors">
                  View Profile
                </button>
                <button className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                  Contact
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No staff members found matching your filters</p>
        </div>
      )}
    </div>
  );
}

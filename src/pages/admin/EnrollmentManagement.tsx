import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Search, Filter, UserCheck, Users, Clock3, Plus, Edit2 } from 'lucide-react';

const ENROLLMENT_ROWS = [
  { id: 'ENR-1001', student: 'Joshua Fronda', program: 'BSIT', yearLevel: '1st Year', status: 'Pending', date: '2026-05-16' },
  { id: 'ENR-1002', student: 'Maria Santos', program: 'BSCS', yearLevel: '2nd Year', status: 'Approved', date: '2026-05-16' },
  { id: 'ENR-1003', student: 'Liam Reyes', program: 'BSIT', yearLevel: '3rd Year', status: 'For Review', date: '2026-05-17' },
  { id: 'ENR-1004', student: 'Anne Cruz', program: 'BSIS', yearLevel: '1st Year', status: 'Approved', date: '2026-05-18' },
  { id: 'ENR-1005', student: 'Noah Dela Rosa', program: 'BSIT', yearLevel: '4th Year', status: 'Pending', date: '2026-05-19' },
];

const STATUS_STYLES: Record<string, string> = {
  Approved: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  'For Review': 'bg-blue-100 text-blue-700',
};

export default function EnrollmentManagement() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<typeof ENROLLMENT_ROWS[0] | null>(null);
  const [formData, setFormData] = useState({ student: '', program: '', yearLevel: '' });

  const filteredRows = useMemo(() => {
    return ENROLLMENT_ROWS.filter((row) => {
      const matchesQuery =
        row.student.toLowerCase().includes(query.toLowerCase()) ||
        row.id.toLowerCase().includes(query.toLowerCase()) ||
        row.program.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'All' || row.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const approvedCount = ENROLLMENT_ROWS.filter((r) => r.status === 'Approved').length;
  const pendingCount = ENROLLMENT_ROWS.filter((r) => r.status === 'Pending').length;

  const handleEditClick = (enrollment: typeof ENROLLMENT_ROWS[0]) => {
    setSelectedEnrollment(enrollment);
    setFormData({ student: enrollment.student, program: enrollment.program, yearLevel: enrollment.yearLevel });
    setShowEditModal(true);
  };

  const handleAddSubmit = () => {
    alert(`New enrollment added: ${formData.student}`);
    setShowAddModal(false);
    setFormData({ student: '', program: '', yearLevel: '' });
  };

  const handleEditSubmit = () => {
    alert(`Enrollment updated: ${formData.student}`);
    setShowEditModal(false);
    setSelectedEnrollment(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-admin-dark tracking-tight">Enrollment Management</h1>
          <p className="text-slate-500 mt-1">Dean/Admin sample dashboard for reviewing student enrollment requests.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Enrollment
          </button>
          <Button className="text-white bg-admin-main hover:bg-admin-dark">Export List</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Applications</p>
              <p className="text-2xl font-bold text-slate-900">{ENROLLMENT_ROWS.length}</p>
            </div>
            <Users className="w-8 h-8 text-admin-main" />
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Approved</p>
              <p className="text-2xl font-bold text-emerald-700">{approvedCount}</p>
            </div>
            <UserCheck className="w-8 h-8 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending</p>
              <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
            </div>
            <Clock3 className="w-8 h-8 text-amber-600" />
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-admin-dark">Enrollment Queue</CardTitle>
          <div className="flex flex-col md:flex-row gap-3 mt-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, ID, or program"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-main/40"
              />
            </div>
            <div className="relative w-full md:w-48">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-main/40 bg-white"
              >
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="For Review">For Review</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Application ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Student</th>
                  <th className="px-4 py-3 text-left font-semibold">Program</th>
                  <th className="px-4 py-3 text-left font-semibold">Year Level</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-mono text-admin-dark">{row.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{row.student}</td>
                    <td className="px-4 py-3 text-slate-700">{row.program}</td>
                    <td className="px-4 py-3 text-slate-700">{row.yearLevel}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${STATUS_STYLES[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.date}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEditClick(row)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Enrollment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 px-6 py-6 border-b border-slate-200 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <Plus className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-slate-900">Add New Enrollment</h2>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-2xl font-bold text-slate-600 hover:text-slate-900"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Student Name</label>
                <input
                  type="text"
                  value={formData.student}
                  onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                  placeholder="Enter student name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Program</label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">Select Program</option>
                  <option value="BSIT">Bachelor of Science in Information Technology</option>
                  <option value="BSCS">Bachelor of Science in Computer Science</option>
                  <option value="BSIS">Bachelor of Science in Information Systems</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Year Level</label>
                <select
                  value={formData.yearLevel}
                  onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">Select Year Level</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubmit}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Enrollment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Enrollment Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-6 py-6 border-b border-slate-200 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <Edit2 className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Modify Enrollment</h2>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-2xl font-bold text-slate-600 hover:text-slate-900"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-600 font-semibold">ID: {selectedEnrollment?.id}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Student Name</label>
                <input
                  type="text"
                  value={formData.student}
                  onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Program</label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="BSIT">Bachelor of Science in Information Technology</option>
                  <option value="BSCS">Bachelor of Science in Computer Science</option>
                  <option value="BSIS">Bachelor of Science in Information Systems</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Year Level</label>
                <select
                  value={formData.yearLevel}
                  onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Banknote, Download, Printer, Eye, Filter, Search, TrendingUp, Plus, User } from 'lucide-react';

interface Payslip {
  id: string;
  employee: string;
  employeeId: string;
  period: string;
  basicPay: number;
  allowances: number;
  gross: number;
  deductions: number;
  netPay: number;
  status: 'Processed' | 'Pending' | 'Approved';
  date: string;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
}

const EMPLOYEES: Employee[] = [
  { id: 'EMP-001', name: 'John Michael Santos', role: 'Senior Instructor', department: 'Computer Science', email: 'john.santos@school.edu' },
  { id: 'EMP-002', name: 'Maria Cruz Reyes', role: 'Faculty Member', department: 'Information Technology', email: 'maria.reyes@school.edu' },
  { id: 'EMP-003', name: 'Robert Dela Cruz', role: 'Head of Department', department: 'Engineering', email: 'robert.delacruz@school.edu' },
  { id: 'EMP-004', name: 'Angela Fernandez Lopez', role: 'Instructor', department: 'Liberal Arts', email: 'angela.lopez@school.edu' },
  { id: 'EMP-005', name: 'Carlos Mendoza', role: 'Academic Coordinator', department: 'Student Services', email: 'carlos.mendoza@school.edu' },
  { id: 'EMP-006', name: 'Diana Gonzales', role: 'Faculty Member', department: 'Computer Science', email: 'diana.gonzales@school.edu' },
];

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

const PAYSLIPS: Payslip[] = [
  {
    id: 'PAY-2405-001',
    employee: 'John Michael Santos',
    employeeId: 'EMP-001',
    period: 'May 1-15, 2026',
    basicPay: 25000,
    allowances: 5000,
    gross: 30000,
    deductions: 4500,
    netPay: 25500,
    status: 'Processed',
    date: '2026-05-15',
  },
  {
    id: 'PAY-2405-002',
    employee: 'Maria Cruz Reyes',
    employeeId: 'EMP-002',
    period: 'May 1-15, 2026',
    basicPay: 22000,
    allowances: 3500,
    gross: 25500,
    deductions: 3800,
    netPay: 21700,
    status: 'Processed',
    date: '2026-05-15',
  },
  {
    id: 'PAY-2405-003',
    employee: 'Robert Dela Cruz',
    employeeId: 'EMP-003',
    period: 'May 1-15, 2026',
    basicPay: 32000,
    allowances: 8000,
    gross: 40000,
    deductions: 6200,
    netPay: 33800,
    status: 'Approved',
    date: '2026-05-15',
  },
  {
    id: 'PAY-2405-004',
    employee: 'Angela Fernandez Lopez',
    employeeId: 'EMP-004',
    period: 'May 1-15, 2026',
    basicPay: 20000,
    allowances: 3000,
    gross: 23000,
    deductions: 3450,
    netPay: 19550,
    status: 'Pending',
    date: '2026-05-15',
  },
  {
    id: 'PAY-2405-005',
    employee: 'Carlos Mendoza',
    employeeId: 'EMP-005',
    period: 'May 1-15, 2026',
    basicPay: 23000,
    allowances: 4500,
    gross: 27500,
    deductions: 4125,
    netPay: 23375,
    status: 'Processed',
    date: '2026-05-15',
  },
  {
    id: 'PAY-2404-001',
    employee: 'Diana Gonzales',
    employeeId: 'EMP-006',
    period: 'April 16-30, 2026',
    basicPay: 21000,
    allowances: 3000,
    gross: 24000,
    deductions: 3600,
    netPay: 20400,
    status: 'Processed',
    date: '2026-04-30',
  },
];

const STATUS_STYLES: Record<string, string> = {
  Processed: 'bg-emerald-100 text-emerald-700',
  Approved: 'bg-blue-100 text-blue-700',
  Pending: 'bg-amber-100 text-amber-700',
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(value);
};

export default function AdminPayslips() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [assignFormData, setAssignFormData] = useState({
    period: '',
    basicPay: '',
    allowances: '',
    deductions: '',
  });

  const filteredPayslips = useMemo(() => {
    return PAYSLIPS.filter((payslip) => {
      const matchesQuery =
        payslip.employee.toLowerCase().includes(query.toLowerCase()) ||
        payslip.employeeId.toLowerCase().includes(query.toLowerCase()) ||
        payslip.id.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'All' || payslip.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const totalProcessed = PAYSLIPS.filter((p) => p.status === 'Processed').length;
  const totalAmount = PAYSLIPS.reduce((sum, p) => sum + p.netPay, 0);
  const averageNetPay = Math.round(PAYSLIPS.reduce((sum, p) => sum + p.netPay, 0) / PAYSLIPS.length);

  const handleViewDetails = (payslip: Payslip) => {
    setSelectedPayslip(payslip);
    setShowDetailModal(true);
  };

  const handleAssignPayslip = () => {
    if (selectedEmployee && assignFormData.period && assignFormData.basicPay) {
      alert(`Payslip assigned to ${selectedEmployee.name} for period ${assignFormData.period}`);
      setShowAssignModal(false);
      setSelectedEmployee(null);
      setAssignFormData({ period: '', basicPay: '', allowances: '', deductions: '' });
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-admin-dark tracking-tight">Payroll Management</h1>
          <p className="text-slate-500 mt-1">Create and manage employee payroll disbursements.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Assign Payslip
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Payslips</p>
              <p className="text-2xl font-bold text-slate-900">{PAYSLIPS.length}</p>
            </div>
            <Banknote className="w-8 h-8 text-admin-main" />
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Processed</p>
              <p className="text-2xl font-bold text-emerald-700">{totalProcessed}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Disbursed</p>
              <p className="text-lg font-bold text-blue-700">{formatCurrency(totalAmount)}</p>
            </div>
            <Banknote className="w-8 h-8 text-blue-600" />
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Avg Net Pay</p>
              <p className="text-lg font-bold text-purple-700">{formatCurrency(averageNetPay)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by employee name, ID, or payslip ID"
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-main/40"
          />
        </div>
        <div className="relative">
          <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-main/40 bg-white"
          >
            <option value="All">All Status</option>
            <option value="Processed">Processed</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Payslips Table */}
      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-admin-dark">Payslip Records</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Payslip ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Employee</th>
                  <th className="px-4 py-3 text-left font-semibold">Period</th>
                  <th className="px-4 py-3 text-right font-semibold">Gross Pay</th>
                  <th className="px-4 py-3 text-right font-semibold">Deductions</th>
                  <th className="px-4 py-3 text-right font-semibold">Net Pay</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPayslips.map((payslip) => (
                  <tr key={payslip.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-mono text-admin-dark font-medium">{payslip.id}</td>
                    <td className="px-4 py-3 text-slate-800 font-medium">{payslip.employee}</td>
                    <td className="px-4 py-3 text-slate-600">{payslip.period}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-800">{formatCurrency(payslip.gross)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-800">{formatCurrency(payslip.deductions)}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700">{formatCurrency(payslip.netPay)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${STATUS_STYLES[payslip.status]}`}>
                        {payslip.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleViewDetails(payslip)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-800">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-800">
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Assign Payslip Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 px-6 py-6 border-b border-slate-200 flex items-center justify-between sticky top-0 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <Plus className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-slate-900">Assign Payslip to Employee</h2>
              </div>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedEmployee(null);
                  setAssignFormData({ period: '', basicPay: '', allowances: '', deductions: '' });
                }}
                className="text-2xl font-bold text-slate-600 hover:text-slate-900"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Employee Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Select Employee/Faculty</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {EMPLOYEES.map((emp) => (
                    <button
                      key={emp.id}
                      onClick={() => setSelectedEmployee(emp)}
                      className={`p-3 border-2 rounded-lg transition-all text-left ${
                        selectedEmployee?.id === emp.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${getAvatarColor(emp.id)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                          {getInitials(emp.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{emp.name}</p>
                          <p className="text-xs text-slate-500">{emp.role}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Employee Details */}
              {selectedEmployee && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 ${getAvatarColor(selectedEmployee.id)} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                      {getInitials(selectedEmployee.name)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600">SELECTED EMPLOYEE</p>
                      <h3 className="text-lg font-bold text-slate-900">{selectedEmployee.name}</h3>
                      <p className="text-sm text-slate-600">{selectedEmployee.role}</p>
                      <div className="flex gap-4 mt-2 text-xs text-slate-600">
                        <span>{selectedEmployee.department}</span>
                        <span>•</span>
                        <span>{selectedEmployee.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payslip Form */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">Payslip Details</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Period *</label>
                  <input
                    type="text"
                    value={assignFormData.period}
                    onChange={(e) => setAssignFormData({ ...assignFormData, period: e.target.value })}
                    placeholder="e.g., May 1-15, 2026"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Basic Pay *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-600 font-semibold">₱</span>
                      <input
                        type="number"
                        value={assignFormData.basicPay}
                        onChange={(e) => setAssignFormData({ ...assignFormData, basicPay: e.target.value })}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Allowances</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-600 font-semibold">₱</span>
                      <input
                        type="number"
                        value={assignFormData.allowances}
                        onChange={(e) => setAssignFormData({ ...assignFormData, allowances: e.target.value })}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Deductions</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-600 font-semibold">₱</span>
                      <input
                        type="number"
                        value={assignFormData.deductions}
                        onChange={(e) => setAssignFormData({ ...assignFormData, deductions: e.target.value })}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-xs text-slate-600 font-semibold">GROSS PAY</p>
                  <p className="text-2xl font-bold text-blue-700">
                    ₱ {(parseFloat(assignFormData.basicPay || '0') + parseFloat(assignFormData.allowances || '0')).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                  <p className="text-xs text-slate-600 font-semibold">NET PAY</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    ₱ {(parseFloat(assignFormData.basicPay || '0') + parseFloat(assignFormData.allowances || '0') - parseFloat(assignFormData.deductions || '0')).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedEmployee(null);
                    setAssignFormData({ period: '', basicPay: '', allowances: '', deductions: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignPayslip}
                  disabled={!selectedEmployee || !assignFormData.period || !assignFormData.basicPay}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Assign Payslip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payslip Detail Modal */}
      {showDetailModal && selectedPayslip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-6 py-6 border-b border-slate-200 flex items-center justify-between sticky top-0 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-slate-900">Payslip Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-2xl font-bold text-slate-600 hover:text-slate-900"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">PAYSLIP ID</p>
                  <p className="text-lg font-bold text-slate-900">{selectedPayslip.id}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">PERIOD</p>
                  <p className="text-lg font-bold text-slate-900">{selectedPayslip.period}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">EMPLOYEE</p>
                  <p className="text-lg font-bold text-slate-900">{selectedPayslip.employee}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">STATUS</p>
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${STATUS_STYLES[selectedPayslip.status]}`}>
                    {selectedPayslip.status}
                  </span>
                </div>
              </div>

              {/* Earnings */}
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <h3 className="font-bold text-emerald-900 mb-3">EARNINGS</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Basic Salary</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(selectedPayslip.basicPay)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Allowances</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(selectedPayslip.allowances)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-emerald-300 font-bold">
                    <span className="text-emerald-900">Gross Income</span>
                    <span className="text-emerald-700">{formatCurrency(selectedPayslip.gross)}</span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-bold text-red-900 mb-3">DEDUCTIONS</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-700">SSS Contribution</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(1000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">PhilHealth</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(500)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Pag-IBIG</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(600)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Withholding Tax</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(400)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-red-300 font-bold">
                    <span className="text-red-900">Total Deductions</span>
                    <span className="text-red-700">{formatCurrency(selectedPayslip.deductions)}</span>
                  </div>
                </div>
              </div>

              {/* Net Pay */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-300 text-center">
                <p className="text-xs text-slate-500 font-semibold">NET PAY</p>
                <p className="text-3xl font-bold text-blue-700">{formatCurrency(selectedPayslip.netPay)}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

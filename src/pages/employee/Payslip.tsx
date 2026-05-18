import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Receipt, Eye, Download, CalendarDays, DollarSign, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const MOCK_PAYSLIPS = [
  { id: 'PAY-1001', period: 'Oct 01 - Oct 15, 2026', issueDate: 'Oct 15, 2026', basicPay: 25000, netPay: 22450.50, status: 'Released' },
  { id: 'PAY-1002', period: 'Sep 16 - Sep 30, 2026', issueDate: 'Sep 30, 2026', basicPay: 25000, netPay: 21800.00, status: 'Released' },
  { id: 'PAY-1003', period: 'Sep 01 - Sep 15, 2026', issueDate: 'Sep 15, 2026', basicPay: 25000, netPay: 22450.50, status: 'Released' },
];

export default function Payslip() {
  const [selectedPayslip, setSelectedPayslip] = useState<typeof MOCK_PAYSLIPS[0] | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Payslips</h1>
          <p className="text-slate-500 mt-1">Review and manage your payroll records.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Payslip List */}
         <div className="lg:col-span-2">
            <Card className="border-none shadow-sm ring-1 ring-slate-100 h-full">
               <CardHeader className="border-b border-slate-100 py-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                     <Receipt className="w-5 h-5 text-employee-main" /> Payroll History
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                           <tr>
                              <th className="px-5 py-4 font-semibold">Pay Period</th>
                              <th className="px-5 py-4 font-semibold text-right">Net Pay</th>
                              <th className="px-5 py-4 font-semibold">Status</th>
                              <th className="px-5 py-4 font-semibold text-right">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {MOCK_PAYSLIPS.map((slip) => (
                              <tr 
                                key={slip.id} 
                                className={cn(
                                  "hover:bg-employee-bg/50 transition-colors cursor-pointer",
                                  selectedPayslip?.id === slip.id && "bg-employee-bg"
                                )}
                                onClick={() => setSelectedPayslip(slip)}
                              >
                                 <td className="px-5 py-4">
                                    <div className="font-semibold text-slate-900">{slip.period}</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                       <CalendarDays className="w-3 h-3" /> Issued {slip.issueDate}
                                    </div>
                                 </td>
                                 <td className="px-5 py-4 text-right font-mono font-bold text-emerald-600">
                                    {formatCurrency(slip.netPay)}
                                 </td>
                                 <td className="px-5 py-4">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                       {slip.status}
                                    </span>
                                 </td>
                                 <td className="px-5 py-4 text-right">
                                    <Button variant="outline" size="sm" className="h-8 shadow-sm">
                                       <Eye className="w-4 h-4 mr-1.5" /> View
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Payslip Details Panel */}
         <div className="lg:col-span-1">
            {selectedPayslip ? (
               <Card className="border-none shadow-md ring-1 ring-slate-100 bg-white relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-employee-main" />
                  <CardHeader className="pb-4">
                     <div className="flex justify-between items-start">
                        <div>
                           <h3 className="font-bold text-lg text-slate-900">Payslip details</h3>
                           <p className="text-xs text-slate-500">{selectedPayslip.id}</p>
                        </div>
                        <Button variant="outline" size="icon" onClick={() => setSelectedPayslip(null)} className="h-8 w-8 text-slate-400 hover:text-slate-600">
                           <X className="w-4 h-4" />
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent>
                     <div className="text-center p-6 bg-slate-50 rounded-xl mb-6">
                        <p className="text-sm font-medium text-slate-500 mb-1">Net Pay</p>
                        <h2 className="text-3xl font-bold tracking-tight text-emerald-600 font-mono">
                           {formatCurrency(selectedPayslip.netPay)}
                        </h2>
                        <p className="text-xs text-slate-500 mt-2">For {selectedPayslip.period}</p>
                     </div>

                     <div className="space-y-4">
                        <div>
                           <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-100 pb-1">Earnings</h4>
                           <div className="flex justify-between text-sm py-1">
                              <span className="text-slate-600">Basic Pay</span>
                              <span className="font-medium font-mono">{formatCurrency(selectedPayslip.basicPay)}</span>
                           </div>
                           <div className="flex justify-between text-sm py-1">
                              <span className="text-slate-600">Overtime</span>
                              <span className="font-medium font-mono">{formatCurrency(1200)}</span>
                           </div>
                        </div>

                        <div>
                           <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-100 pb-1">Deductions</h4>
                           <div className="flex justify-between text-sm py-1">
                              <span className="text-slate-600">Tax Withheld</span>
                              <span className="font-medium font-mono text-red-600">-{formatCurrency(2500)}</span>
                           </div>
                           <div className="flex justify-between text-sm py-1">
                              <span className="text-slate-600">Insurance/Benefits</span>
                              <span className="font-medium font-mono text-red-600">-{formatCurrency(1249.50)}</span>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8 pt-4 border-t border-dashed border-slate-200">
                        <Button className="w-full flex items-center justify-center gap-2">
                           <Download className="w-4 h-4" /> Download PDF Receipt
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            ) : (
               <Card className="border-none shadow-sm ring-1 ring-slate-100 h-full flex flex-col items-center justify-center py-16 px-6 text-center bg-slate-50/50">
                  <div className="w-16 h-16 bg-blue-50 text-blue-200 rounded-full flex items-center justify-center mb-4">
                     <Receipt className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-slate-700">Select a payslip</h3>
                  <p className="text-sm text-slate-500 mt-2 max-w-[200px]">Click on a pay period from the list to view its detailed breakdown.</p>
               </Card>
            )}
         </div>
      </div>
    </div>
  );
}

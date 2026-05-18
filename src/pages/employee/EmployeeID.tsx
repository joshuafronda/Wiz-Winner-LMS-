import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { QrCode, Download, ShieldCheck, MapPin } from 'lucide-react';
import { useAuthStore } from '@/src/store/authStore';

export default function EmployeeID() {
  const user = useAuthStore(state => state.user);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Digital Employee ID</h1>
        <p className="text-slate-500 mt-1">Scan at building entrances and facilities.</p>
      </div>

      <div className="relative group">
         {/* ID Card Wrapper */}
         <div className="bg-white rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200/50 transform transition-all duration-300 relative group-hover:shadow-employee-main/20">
            {/* ID Header Pattern */}
            <div className="h-24 bg-employee-dark relative overflow-hidden">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-employee-main rounded-full blur-2xl opacity-50"></div>
            </div>
            
            {/* Card Content */}
            <div className="px-8 pb-8 pt-0 relative">
               {/* Avatar */}
               <div className="flex justify-center -mt-12 mb-4 relative z-10">
                  <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg ring-1 ring-slate-100">
                     <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 overflow-hidden relative">
                        <UserPlaceholderIcon />
                     </div>
                  </div>
               </div>

               <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{user?.name}</h2>
                  <p className="text-employee-main font-bold tracking-widest text-sm uppercase mt-1">Staff • Administration</p>
                  <p className="text-slate-500 font-mono text-sm mt-2 font-medium bg-slate-50 inline-block px-3 py-1 rounded-lg border border-slate-100">EMP-2019-4820</p>
               </div>

               {/* QR Code Area */}
               <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-100">
                  <div className="w-48 h-48 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center p-4 mb-4">
                     {/* Simulated QR Code using a grid of blocks for visual effect */}
                     <div className="grid grid-cols-5 gap-1 w-full h-full p-2 opacity-80">
                        {Array.from({length: 25}).map((_, i) => (
                          <div key={i} className={`bg-slate-800 rounded-sm ${i%3===0 || i%7===0 || i%2===0 ? 'opacity-100' : 'opacity-0'}`}></div>
                        ))}
                     </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                     <QrCode className="w-4 h-4" /> Scan to verify identity
                  </div>
               </div>

               <div className="mt-8 flex justify-between items-end border-t border-slate-100 pt-6">
                  <div>
                     <p className="text-xs font-bold text-slate-400 uppercase">Valid Until</p>
                     <p className="font-semibold text-slate-800">Dec 2026</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-bold border border-emerald-200">
                     <ShieldCheck className="w-3.5 h-3.5" /> ACTIVE
                  </div>
               </div>
            </div>
         </div>
         
         {/* Lanyard Hole aesthetic */}
         <div className="absolute -top-4 w-12 h-3 bg-white/80 rounded-full left-1/2 -translate-x-1/2 shadow-inner border border-slate-200 z-20 backdrop-blur-sm"></div>
      </div>

      <div className="flex gap-4 pt-4">
         <Button className="flex-1 flex gap-2">
            <Download className="w-4 h-4" /> Save ID Card
         </Button>
      </div>

    </div>
  );
}

function UserPlaceholderIcon() {
  return (
    <svg className="w-16 h-16 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

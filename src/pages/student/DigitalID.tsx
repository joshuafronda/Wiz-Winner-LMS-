import { QRCodeSVG } from 'qrcode.react';
import { useAuthStore } from '@/src/store/authStore';
import { Download, Scan } from 'lucide-react';

export default function DigitalID() {
  const { user } = useAuthStore();

  if (!user || user.role !== 'student') return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-student-dark tracking-tight">Your Digital ID</h1>
        <p className="text-slate-500 mt-1">Use this QR code for campus access and biometric attendance.</p>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center gap-12 mt-12 w-full">
         
         {/* ID Card Display */}
         <div className="w-[320px] mx-auto md:mx-0 flex-shrink-0 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative">
            {/* ID Header Pattern */}
            <div className="h-24 bg-student-dark relative overflow-hidden">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
               <div className="absolute bottom-3 left-0 w-full text-center">
                  <h2 className="text-white font-bold tracking-widest uppercase text-sm">GreenLeaf Academy</h2>
               </div>
            </div>
            
            {/* Avatar Profile */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center shadow-md overflow-hidden">
               <span className="text-4xl text-slate-400 font-bold">{user.name.charAt(0)}</span>
            </div>

            {/* Profile Info */}
            <div className="pt-16 pb-6 px-6 text-center">
               <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
               <p className="text-student-main font-semibold text-sm mt-1 mb-4">{user.srNumber}</p>
               
               <div className="grid grid-cols-2 gap-2 text-xs mb-6 text-left border-y border-slate-100 py-3">
                  <div>
                    <span className="block text-slate-400">Course</span>
                    <span className="font-semibold text-slate-700">BS Computer Science</span>
                  </div>
                  <div>
                    <span className="block text-slate-400">Year Level</span>
                    <span className="font-semibold text-slate-700">3rd Year</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-slate-400">Email Address</span>
                    <span className="font-semibold text-slate-700">{user.email}</span>
                  </div>
               </div>

               {/* QR Code */}
               <div className="flex justify-center p-3 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 mb-4 inline-block">
                  <QRCodeSVG 
                    value={user.srNumber || 'UNKNOWN'} 
                    size={120} 
                    level="H" 
                    fgColor="#0f172a" 
                    bgColor="transparent" 
                  />
               </div>
               <p className="text-[10px] text-slate-400">Scan for verification</p>
            </div>
            
            {/* ID Footer */}
            <div className="h-2 w-full bg-student-main"></div>
         </div>

         {/* Instructions / Actions */}
         <div className="w-full max-w-md space-y-6">
            <div className="bg-student-yellow-light/50 p-6 rounded-2xl border border-student-yellow/50">
               <h4 className="font-bold text-yellow-900 flex items-center gap-2 mb-2">
                  <Scan className="w-5 h-5 text-yellow-600" />
                  How to use this ID
               </h4>
               <ul className="space-y-3 text-sm text-yellow-800 list-disc pl-5">
                  <li>Present this QR code at campus entry gates.</li>
                  <li>Scan at your assigned classroom's biometric device for attendance.</li>
                  <li>Use for library resource borrowing.</li>
                  <li>Valid for the entire Academic Year 2026-2027.</li>
               </ul>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-sm">
               <Download className="w-5 h-5" />
               Download as PDF
            </button>
         </div>

      </div>
    </div>
  );
}

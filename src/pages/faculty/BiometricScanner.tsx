import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Fingerprint, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function BiometricScanner() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [lastScanned, setLastScanned] = useState<{name: string, time: string, status: 'In' | 'Late'} | null>(null);

  const simulateScan = () => {
    setScanState('scanning');
    
    // Simulate API delay
    setTimeout(() => {
       const isSuccess = Math.random() > 0.2; // 80% success rate
       if (isSuccess) {
          setScanState('success');
          setLastScanned({
             name: 'Harry Potter',
             time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
             status: Math.random() > 0.5 ? 'In' : 'Late'
          });
       } else {
          setScanState('error');
       }

       // Reset to idle after 3s
       setTimeout(() => {
          setScanState('idle');
       }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center pt-8">
      <div>
        <h1 className="text-3xl font-bold text-faculty-dark tracking-tight">Biometric Terminal</h1>
        <p className="text-slate-500 mt-2">Class: CS101 - Section A</p>
      </div>

      <Card className="max-w-md mx-auto border-none shadow-2xl relative overflow-hidden bg-slate-900 border border-slate-800">
         <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px]">
            {/* Status indicator ring */}
            <div className={cn(
               "absolute inset-0 border-[8px] rounded-xl transition-colors duration-500 opacity-20 pointer-events-none",
               scanState === 'idle' ? 'border-transparent' : '',
               scanState === 'scanning' ? 'border-blue-500 animate-pulse' : '',
               scanState === 'success' ? 'border-green-500' : '',
               scanState === 'error' ? 'border-red-500' : ''
            )}></div>

            <button 
               onClick={simulateScan}
               disabled={scanState !== 'idle'}
               className="relative group focus:outline-none disabled:opacity-80"
            >
               <div className={cn(
                  "w-48 h-48 rounded-full flex items-center justify-center transition-all duration-300",
                  "bg-slate-800 border-4 border-slate-700 shadow-inner",
                  scanState === 'scanning' && "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]",
                  scanState === 'success' && "border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.5)]",
                  scanState === 'error' && "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]",
               )}>
                  <Fingerprint className={cn(
                     "w-24 h-24 transition-colors duration-300",
                     scanState === 'idle' ? 'text-slate-500 group-hover:text-blue-400' : '',
                     scanState === 'scanning' ? 'text-blue-500 animate-pulse' : '',
                     scanState === 'success' ? 'text-green-500' : '',
                     scanState === 'error' ? 'text-red-500' : '',
                  )} />
                  
                  {/* Scan line effect overlay */}
                  {scanState === 'scanning' && (
                     <div className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden pointer-events-none">
                        <div className="w-full h-1 bg-blue-400 shadow-[0_0_10px_#3b82f6] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                     </div>
                  )}
               </div>
            </button>

            <div className="h-20 mt-8 flex flex-col items-center justify-center">
               {scanState === 'idle' && (
                  <p className="text-slate-400 font-medium">Place finger on scanner or scan QR code</p>
               )}
               {scanState === 'scanning' && (
                  <p className="text-blue-400 font-medium animate-pulse">Verifying identity...</p>
               )}
               {scanState === 'success' && lastScanned && (
                  <div className="text-center animate-in fade-in slide-in-from-bottom-2">
                     <p className="text-green-400 font-bold text-lg flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Verified
                     </p>
                     <p className="text-white font-medium mt-1">{lastScanned.name}</p>
                  </div>
               )}
               {scanState === 'error' && (
                  <div className="text-center animate-in fade-in slide-in-from-bottom-2">
                     <p className="text-red-400 font-bold text-lg flex items-center justify-center gap-2">
                        <XCircle className="w-5 h-5" /> Verification Failed
                     </p>
                     <p className="text-slate-400 text-sm mt-1">Please try again</p>
                  </div>
               )}
            </div>
         </CardContent>
         <style>{`
            @keyframes scan {
               0% { transform: translateY(0); }
               50% { transform: translateY(192px); }
               100% { transform: translateY(0); }
            }
         `}</style>
      </Card>

      {/* Mini feed of last scanned */}
      {lastScanned && scanState === 'idle' && (
         <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                  {lastScanned.name.charAt(0)}
               </div>
               <div className="text-left">
                  <p className="font-semibold text-slate-800 text-sm">{lastScanned.name}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                     <Clock className="w-3 h-3" /> {lastScanned.time}
                  </p>
               </div>
            </div>
            <span className={cn(
               "px-2.5 py-1 rounded-md text-xs font-bold uppercase",
               lastScanned.status === 'In' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            )}>
               {lastScanned.status}
            </span>
         </div>
      )}
    </div>
  );
}

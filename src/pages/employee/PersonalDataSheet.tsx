import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Save, Edit3 } from 'lucide-react';
import { useAuthStore } from '@/src/store/authStore';

export default function PersonalDataSheet() {
  const user = useAuthStore(state => state.user);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Personal Data Sheet</h1>
          <p className="text-slate-500 mt-1">Review and update your employee information.</p>
        </div>
        <Button className="flex items-center gap-2">
           <Edit3 className="w-4 h-4" /> Edit Details
        </Button>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-100">
         <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 rounded-full bg-employee-main text-white flex items-center justify-center text-3xl font-bold shadow-md shadow-employee-main/20">
                  {user?.name?.charAt(0) || 'E'}
               </div>
               <div>
                  <CardTitle className="text-2xl">{user?.name}</CardTitle>
                  <CardDescription className="text-base mt-1 text-employee-main font-medium">Head Custodian • Facilities Dept</CardDescription>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-3 text-sm text-slate-500">
                     <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> EMP-2019-4820</span>
                     <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Hired: Jun 12, 2019</span>
                  </div>
               </div>
            </div>
         </CardHeader>
         <CardContent className="p-8 space-y-8">
            
            {/* Personal Information */}
            <section>
               <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <User className="w-4 h-4" /> Personal Information
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
                     <p className="font-medium text-slate-900">{user?.name}</p>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Date of Birth</label>
                     <p className="font-medium text-slate-900">October 15, 1985</p>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Civil Status</label>
                     <p className="font-medium text-slate-900">Married</p>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Gender</label>
                     <p className="font-medium text-slate-900">Male</p>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Nationality</label>
                     <p className="font-medium text-slate-900">Citizen</p>
                  </div>
               </div>
            </section>

            {/* Contact Information */}
            <section>
               <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Information
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address (Institutional)</label>
                     <div className="flex items-center gap-2 font-medium text-slate-900">
                        <Mail className="w-4 h-4 text-slate-400" /> {user?.email}
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile Number</label>
                     <div className="flex items-center gap-2 font-medium text-slate-900">
                        <Phone className="w-4 h-4 text-slate-400" /> +1 (555) 123-4567
                     </div>
                  </div>
                  <div className="md:col-span-2">
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Residential Address</label>
                     <div className="flex items-start gap-2 font-medium text-slate-900">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5" /> 
                        <span>42 Wallaby Way, Sydney<br/>New South Wales, 2000</span>
                     </div>
                  </div>
               </div>
            </section>

            {/* Emergency Contact */}
            <section>
               <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <User className="w-4 h-4" /> Emergency Contact
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Contact Name</label>
                     <p className="font-medium text-slate-900">Sarah Jenkins</p>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Relationship</label>
                     <p className="font-medium text-slate-900">Spouse</p>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Contact Number</label>
                     <p className="font-medium text-slate-900">+1 (555) 987-6543</p>
                  </div>
               </div>
            </section>

         </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Search, Filter, MoreVertical, Plus, UserCircle, Edit, Trash2 } from 'lucide-react';

const MOCK_USERS = [
  { id: 'US-001', name: 'Minerva McGonagall', role: 'Faculty', status: 'Active', department: 'Transfiguration', joined: '2023-08-15' },
  { id: 'US-002', name: 'Severus Snape', role: 'Faculty', status: 'Active', department: 'Potions', joined: '2023-08-15' },
  { id: 'US-003', name: 'Harry Potter', role: 'Student', status: 'Active', department: 'Gryffindor', joined: '2024-09-01' },
  { id: 'US-004', name: 'Hermione Granger', role: 'Student', status: 'Active', department: 'Gryffindor', joined: '2024-09-01' },
  { id: 'US-005', name: 'Draco Malfoy', role: 'Student', status: 'Inactive', department: 'Slytherin', joined: '2024-09-01' },
];

export default function UserManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-admin-dark tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Manage faculty and student accounts system-wide.</p>
        </div>
        <Button className="w-full sm:w-auto">
           <Plus className="w-4 h-4 mr-2" /> Add New User
        </Button>
      </div>

      <Card>
         <CardHeader className="border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between py-4 pb-4 gap-4">
            <CardTitle className="text-lg text-slate-800">All Users (1,245)</CardTitle>
            <div className="flex items-center gap-3">
               <div className="relative">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search ID, name..." 
                   className="pl-9 pr-4 py-2 w-full md:w-64 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-main/50 transition-shadow"
                 />
               </div>
               <Button variant="outline" className="hidden sm:flex">
                 <Filter className="w-4 h-4 mr-2" /> Filter
               </Button>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                     <tr>
                        <th className="px-6 py-4 font-medium">User Details</th>
                        <th className="px-6 py-4 font-medium">Role</th>
                        <th className="px-6 py-4 font-medium">Department/Section</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Joined</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {MOCK_USERS.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <UserCircle className="w-6 h-6" />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="font-bold text-slate-800">{user.name}</span>
                                    <span className="text-xs text-slate-500">{user.id}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                 user.role === 'Faculty' ? 'bg-faculty-light/40 text-faculty-dark border border-faculty-light' 
                                 : 'bg-student-yellow-light text-yellow-800 border border-student-yellow'
                              }`}>
                                 {user.role}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-slate-600">{user.department}</td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5">
                                 <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                 <span className={user.status === 'Active' ? 'text-slate-700' : 'text-slate-500 font-medium'}>{user.status}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-slate-500">{user.joined}</td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2 text-slate-400">
                                 <button className="p-1.5 hover:bg-slate-100 hover:text-admin-main rounded-md transition-colors">
                                    <Edit className="w-4 h-4" />
                                 </button>
                                 <button className="p-1.5 hover:bg-slate-100 hover:text-red-600 rounded-md transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                                 <button className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-md transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
               <span>Showing 1 to 5 of 1,245 entries</span>
               <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>Prev</Button>
                  <Button variant="outline" size="sm" className="bg-white">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">Next</Button>
               </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

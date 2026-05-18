import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuthStore } from '@/src/store/authStore';

export default function MainLayout({ allowedRole }: { allowedRole: string }) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== allowedRole) {
    // Redirect to their respective dashboard
    return <Navigate to={`/${user?.role}`} replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

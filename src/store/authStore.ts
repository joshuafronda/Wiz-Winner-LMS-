import { create } from 'zustand';

export type Role = 'admin' | 'faculty' | 'student' | 'employee';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  email: string;
  srNumber?: string; // For students
  gradeLevel?: string; // For basic education students
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Start with null for auth flow, uncomment below to auto-login for testing
  // user: { id: '1', name: 'Albus Dumbledore', role: 'admin', email: 'admin@school.edu' },
  isAuthenticated: false,
  // isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

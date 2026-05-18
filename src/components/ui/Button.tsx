import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';
import { useAuthStore } from '@/src/store/authStore';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    
    // Dynamic styling based on role can be cool
    const { user } = useAuthStore();
    const role = user?.role || 'student'; // fallback

    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const sizeStyles = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-8 text-base',
    };

    let variantStyles = '';

    if (variant === 'primary') {
       if (role === 'admin') {
         variantStyles = 'bg-admin-main text-white hover:bg-admin-dark focus-visible:ring-admin-main';
       } else if (role === 'faculty') {
         variantStyles = 'bg-faculty-main text-white hover:bg-faculty-dark focus-visible:ring-faculty-main';
       } else if (role === 'employee') {
         variantStyles = 'bg-employee-main text-white hover:bg-employee-dark focus-visible:ring-employee-main';
       } else {
         variantStyles = 'bg-student-main text-slate-800 hover:bg-[#68d791] focus-visible:ring-student-main';
       }
    } else if (variant === 'secondary') {
        if (role === 'admin') {
           variantStyles = 'bg-admin-light text-admin-dark hover:bg-[#8ee1bc] focus-visible:ring-admin-light';
        } else if (role === 'faculty') {
           variantStyles = 'bg-faculty-light text-faculty-dark hover:bg-[#a6e8be] focus-visible:ring-faculty-light';
        } else if (role === 'employee') {
           variantStyles = 'bg-employee-light text-employee-dark hover:bg-[#a4cffd] focus-visible:ring-employee-light';
        } else {
           variantStyles = 'bg-student-yellow text-slate-800 hover:bg-[#f6e676] focus-visible:ring-student-yellow';
        }
    } else if (variant === 'outline') {
      variantStyles = 'border-2 border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900';
    } else if (variant === 'ghost') {
      variantStyles = 'hover:bg-slate-100 hover:text-slate-900 text-slate-600';
    } else if (variant === 'danger') {
      variantStyles = 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500';
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles, className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };

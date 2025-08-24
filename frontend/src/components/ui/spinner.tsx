import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner = ({ size = 'md', className }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin text-muted-foreground',
        sizeClasses[size],
        className
      )} 
    />
  );
};

export const LoadingOverlay = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <div className={cn('flex items-center justify-center space-x-2', className)}>
    <Spinner />
    {children && <span className="text-muted-foreground">{children}</span>}
  </div>
);

import { type ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white border-2 border-primary hover:bg-primary-hover hover:border-primary-hover shadow-glow hover:shadow-glow-lg',
  secondary:
    'bg-secondary text-white border-2 border-secondary hover:opacity-90',
  tertiary:
    'bg-white/60 text-primary border-2 border-primary/30 backdrop-blur-sm hover:bg-white/80',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-button transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;

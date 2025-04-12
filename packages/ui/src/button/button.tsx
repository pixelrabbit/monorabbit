import { cva } from "class-variance-authority";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  intent?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className,
  intent,
  size
}: ButtonProps): JSX.Element {

  const buttonVariants = cva(['leading-none', 'rounded-sm', 'bg-linear-to-br', 'border-gray-300', 'hover:border-gray-600', 'border-1', 'transition'], {
    variants: {
      intent: {
        primary: [
          'from-white',
          'to-gray-100'
        ],
        secondary: [
          'from-white',
          'to-orange-100'
        ],
      },
      size: {
        sm: ['p-1.5', 'text-sm'],
        md: ['p-2'],
        lg: ['px-4', 'py-2', 'text-lg'],
      }
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    }
  });

  return (
    <button
      type="button"
      className={buttonVariants({ intent, size })}
    >
      {children}
    </button>
  );
}
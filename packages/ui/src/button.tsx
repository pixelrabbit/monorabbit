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

  const buttonVariants = cva(['leading-none'], {
    variants: {
      intent: {
        primary: ['bg-orange-400', 'text-white'],
        secondary: ['bg-gray-200', 'text-gray-800'],
      },
      size: {
        sm: ['p-1'],
        md: ['p-2'],
        lg: ['px-4', 'py-2'],
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
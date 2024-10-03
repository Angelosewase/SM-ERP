interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: unknown;
}

function Button({ children, className = "", onClick, ...props }: ButtonProps) {
  const buttonClasses = `py-1.5 px-4 rounded-md hover:cursor-pointer hover:scale-105 transition-all ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;

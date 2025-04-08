type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
  };
  
  export const Button = ({
    children,
    onClick,
    type = 'button',
    className = '',
    disabled = false,
  }: ButtonProps) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          bg-purple-700
          hover:bg-purple-800
          text-white
          font-semibold
          px-6
          py-2
          rounded
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
          ${className}
        `}
      >
        {children}
      </button>
    );
  };
  
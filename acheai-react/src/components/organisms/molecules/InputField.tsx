import { forwardRef } from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { InputProps } from '../atoms/Input/Input';

type InputFieldProps = {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement> & InputProps;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  id,
  label,
  message,
  placeholder,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col w-full">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        ref={ref}
        message={message}
        {...props}
      />
    </div>
  );
})


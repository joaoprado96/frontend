import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';

type InputFieldProps = {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const InputField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col w-full">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

export const Label = ({ htmlFor, children }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-gray-900 mb-1"
  >
    {children}
  </label>
);

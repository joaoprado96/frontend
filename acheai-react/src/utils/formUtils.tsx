import { FieldValues, UseFormReturn } from 'react-hook-form';

export const getFormProps = <T, U extends NonNullable<{ name?: string }>>(
  context: UseFormReturn<FieldValues, T, undefined>,
  props: U,
) => {
  if (!context || !props['name']) return props;

  return { ...context.register(props.name as string), ...props };
};

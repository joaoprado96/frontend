import { format } from 'date-fns';
import { ptBR as locale } from 'date-fns/locale';
import { ChangeEvent, forwardRef, useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Input, InputProps } from '../Input';

import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '../../Button';

import { MaskConfig } from '@/types';
import { useFormContext } from 'react-hook-form';
import './styles.css';

registerLocale('ptBR', locale);

const tryConvertDate = (
  date: string | Date | number | undefined | readonly string[],
) => {
  if (!date) {
    return null;
  }

  if (typeof date === 'string') {
    return new Date(date);
  }

  if (typeof date === 'number') {
    return new Date(date);
  }

  if (Array.isArray(date)) {
    return new Date(date[0]);
  }

  if (date instanceof Date) {
    return date;
  }

  return null;
};

export const DateInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const context = useFormContext();

    const _date = tryConvertDate(props.value || props.defaultValue);

    const [date, setDate] = useState<Date | null>(_date);
    const dateRef = useRef<Date | null>(_date);

    const onChange = (
      date: Date | null,
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      setDate(date);
      dateRef.current = date;

      if (context && props.name) {
        context.setValue(props.name, dateRef.current);
        context.clearErrors(props.name);
      }

      props.onChange?.(event);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();

      props.onKeyDown?.(event);
    };

    const maskConfig: MaskConfig = {
      mask: '00/00/0000',

      prepare: (value) => {
        const date = dateRef.current ?? tryConvertDate(value);

        if (!date || isNaN(date.getTime())) {
          return '';
        }

        return format(date, 'dd/MM/yyyy');
      },
    };

    return (
      <DatePicker
        selected={date}
        onChange={onChange}
        calendarClassName="react-datepicker__calendar--custom"
        customInput={
          <div className="min-h-max">
            <Input
              {...props}
              ref={ref}
              autoComplete="off"
              inputMode="none"
              maskConfig={maskConfig}
              onKeyDown={onKeyDown}
            >
              <Calendar />
            </Input>
          </div>
        }
        locale="ptBR"
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-lg text-gray-700 capitalize">
              {format(date, 'MMMM yyyy', { locale })}
            </span>

            <div className="flex gap-2">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className="inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className="inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}
        renderMonthContent={(_1, _2, month) => {
          return (
            <Button
              size="md"
              className="rounded shadow w-full py-1 px-2 text-center capitalize"
            >
              {month}
            </Button>
          );
        }}
      />
    );
  },
);

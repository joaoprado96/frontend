import { forwardRef, useEffect, useRef, useState } from 'react';
import IMask from 'imask';
import { Input, InputProps } from './Input';
import { MaskConfig } from '@/types';
import { IoTime } from 'react-icons/io5';
import { useFormContext } from 'react-hook-form';

const gerarHorarios = () => {
  const horarios: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      horarios.push(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
      );
    }
  }
  return horarios;
};

type TimeProps = Omit<InputProps, 'onChange'> & {
  value?: string;
  onChange?: (value: string) => void;
};

export const Time = forwardRef<HTMLInputElement, TimeProps>(
  ({ value, onChange, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    let setValueFromContext: ((name: string, value: unknown) => void) | null =
      null;

    try {
      const form = useFormContext();
      if (form && props.name) {
        setValueFromContext = form.setValue;
      }
    } catch {
      // sem form context, segue com onChange
    }

    const maskConfig: MaskConfig = {
      overwrite: true,
      autofix: true,
      mask: 'HH:MM',
      blocks: {
        HH: { mask: IMask.MaskedRange, from: 0, to: 23, maxLength: 2 },
        MM: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2 },
      },
    };

    const handleSelectTime = (valor: string) => {
      if (inputRef.current) {
        inputRef.current.value = valor;
        inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
      }

      if (props.name && setValueFromContext) {
        setValueFromContext(props.name, valor);
      } else if (onChange) {
        onChange(valor);
      }

      setOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div ref={wrapperRef} className="relative">
        <Input
          {...props}
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
          value={value}
          shouldForwardMaskedValue
          maskConfig={maskConfig}
          inputMode="numeric"
          className="min-h-[2.5625rem] max-w-20"
          sizing="sm"
          rounded="x2"
          onChange={(e) => {
            const val = e.target.value;
        
            // propaga para o RHF se estiver dentro do context
            if (props.name && setValueFromContext) {
              setValueFromContext(props.name, val);
            }
        
            // propaga para quem estiver controlando externamente
            if (onChange) {
              onChange(val);
            }
          }}
        
        >
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="absolute right-2/3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
          >
            <IoTime />
          </button>
        </Input>

        {open && (
          <div className="absolute z-50 mt-2 w-36 max-h-56 overflow-y-auto bg-white border border-gray-300 rounded shadow">
            {gerarHorarios().map((h) => (
              <div
                key={h}
                onClick={() => handleSelectTime(h)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {h}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Time.displayName = 'Time';

import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/organisms/atoms/Button';
import { SelectableButton } from '@/components/organisms/atoms/SelectableButton';
import { Time } from '@/components/organisms/atoms/Input/Time';

const diasSemana = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'];

export type Horario = {
    inicio: string;
    fim: string;
};

export type FormValues = {
    aberto24h: boolean;
    diasSelecionados: string[];
    horarios: Horario[];
};

type DiasHorario = Record<string, Horario[]>;

type SubmitData = {
    aberto24h: boolean;
    dias: DiasHorario;
};

type Props = {
    onSubmit?: (data: SubmitData) => void;
};

export function HorarioFuncionamentoForm({ onSubmit }: Props) {
    const { register, control, handleSubmit, watch, setValue } = useForm<FormValues>({
        defaultValues: {
            aberto24h: false,
            diasSelecionados: [],
            horarios: [{ inicio: '', fim: '' }],
        },
    });

    const aberto24h = watch('aberto24h');
    const diasSelecionados = watch('diasSelecionados');

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'horarios',
    });

    const handleAdicionarHorario = () => {
        append({ inicio: '', fim: '' });
    };

    const toggleDia = (dia: string) => {
        const atual = [...diasSelecionados];
        const atualizado = atual.includes(dia)
            ? atual.filter((d) => d !== dia)
            : [...atual, dia];
        setValue('diasSelecionados', atualizado);
    };

    const handleFinalSubmit = (data: FormValues) => {
        const { aberto24h, diasSelecionados, horarios } = data;
        const dias: DiasHorario = {};

        diasSelecionados.forEach((dia) => {
            dias[dia] = horarios;
        });

        onSubmit?.({ aberto24h, dias });
    };

    const handleRemoverHorario = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {diasSemana.map((dia) => (
                    <SelectableButton
                        key={dia}
                        label={dia}
                        selected={diasSelecionados.includes(dia)}
                        onClick={() => toggleDia(dia)}
                        rounded="full"
                        size="md"
                    />
                ))}
            </div>

            {!aberto24h && diasSelecionados.length > 0 && (
                <div className="">
                    <p className="font-semibold mb-2 text-sm text-purple-700">
                        Horários comuns para os dias selecionados
                    </p>

                    {fields.map((field, index) => {
                        const inicioName = `horarios.${index}.inicio` as const;
                        const fimName = `horarios.${index}.fim` as const;

                        return (
                            <div key={field.id} className="flex items-center gap-2 mb-2">
                                <Time
                                    name={inicioName}
                                    value={watch(inicioName) ?? ''}
                                    onChange={(valor: string) => setValue(inicioName, valor)}
                                />

                                <span>to</span>

                                <Time
                                    name={fimName}
                                    value={String(watch(`horarios.${index}.fim`) ?? '')}
                                    onChange={(valor: string) => setValue(fimName, valor)}
                                />

                                <button
                                    type="button"
                                    onClick={() => handleRemoverHorario(index)}
                                    className="text-lg text-gray-500 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        );
                    })}


                    <button
                        type="button"
                        onClick={handleAdicionarHorario}
                        className="text-sm text-purple-600 underline hover:text-purple-800"
                    >
                        Incluir horários
                    </button>
                </div>
            )}


            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 select-none">
                <input
                    type="checkbox"
                    {...register('aberto24h')}
                    className="w-4 h-4"
                />
                <span>Aberto 24 horas</span>
            </div>

            <div className="flex justify-end">
                <Button type="submit">Salvar horários</Button>
            </div>
        </>
    );
}
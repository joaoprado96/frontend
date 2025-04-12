import { useState } from 'react';
import { schema, StepEstabelecimento, StepEstabelecimentoFieldValues } from './steps/StepEstabelecimento';
import { StepContato } from './steps/StepContato';
import { ProgressBar } from '@/components/organisms/atoms';
import { StepInformacoesComplementares } from './steps/StepInformacoesComplementares';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

export function CadastroEstabelecimento() {

    type ValuesFields = StepEstabelecimentoFieldValues;

    const [step, setStep] = useState(1);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const form = useForm<ValuesFields>({
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log('Dados do formulário:', data);
    };

    const progressValues: Record<number, number> = {
        1: 0,
        2: 33,
        3: 66,
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl">
            {/* Barra de progresso no topo, fora do step wrapper */}
            <ProgressBar
                progress={progressValues[step] ?? 0}
                size="lg"
                customMessages={[
                    { min: 0, max: 33, message: 'Comece agora!' },
                    { min: 34, max: 65, message: 'Falta pouco para ser divulgado...' },
                    { min: 66, max: 99, message: 'Últimos detalhes!' },
                    { min: 100, max: 100, message: 'Tudo pronto!' },
                ]}
            />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Conteúdo que troca entre steps */}
                <div className="relative min-h-[500px] transition-all duration-300 ease-in-out mt-6">
                    {step === 1 && <StepEstabelecimento onNext={handleNext} form={form} />}
                    {step === 2 && <StepContato onNext={handleNext} onBack={handleBack} />}
                    {step === 3 && <StepInformacoesComplementares onNext={handleNext} onBack={handleBack} />}
                </div>
            </form>
        </div>
    );

}

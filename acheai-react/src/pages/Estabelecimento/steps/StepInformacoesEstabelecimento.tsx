import { Button } from "@/components/organisms/atoms";
import { SelectableButton } from "@/components/organisms/atoms/SelectableButton";
import { InputField } from "@/components/organisms/molecules";
import { MaskConfig } from "@/types";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from 'zod';

const tiposEstabelecimento = ['RESTAURANTE', 'CAFÉ', 'BAR E DRINKS', 'CASA NOTURNA'] as const;

export const schemaInformacoesEstabelecimento = z.object({
    nomeEstabelecimento: z.string().min(1, { message: 'Nome do estabelecimento é obrigatório' }),
    cnpj: z.string().refine(
        (val) => val.replace(/\D/g, '').length === 14,
        { message: 'CNPJ deve ter 14 dígitos' }
    ),
    tipoEstabelecimento: z.enum(tiposEstabelecimento, {
        errorMap: () => ({ message: 'Selecione um tipo de estabelecimento' })
    }),
});

export type StepEstabelecimentoFieldValues = z.infer<typeof schemaInformacoesEstabelecimento>;

type Props = {
    onNext: () => void;
    form: UseFormReturn<StepEstabelecimentoFieldValues, any, StepEstabelecimentoFieldValues>;
};

export function StepInformacoesEstabelecimento(props: Props) {
    const [tipo, setTipo] = useState('RESTAURANTE');
    const tiposComida = ['Indiana', 'Japonesa', 'Padaria'];
    const tipoSelecionado = props.form.watch("tipoEstabelecimento");

    const maskConfig: MaskConfig = {
        mask: '00.000.000/0000-00'
    };

    const onNext = () => {
        const schemaValidationResult = schemaInformacoesEstabelecimento.safeParse(props.form.getValues());
        if (schemaValidationResult.success !== true) {
            schemaValidationResult.error.issues.forEach((issue) => {
                props.form.setError(issue.path[0] as keyof StepEstabelecimentoFieldValues, {
                    message: issue.message
                });
            });
            console.log('Erro de validação:', schemaValidationResult);
            return;
        }
        props.onNext();
    };

    return (
        <>
            <div className="p-6 bg-white max-w-5xl mx-auto">

                <h2 className="text-xl font-bold text-center text-purple-700 mb-6">
                    Informações do Estabelecimento
                </h2>
                {/* Nome e CNPJ*/}
                <div className="flex flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <InputField
                            id="nomeEstabelecimento"
                            status={props.form.formState.errors['nomeEstabelecimento'] ? "error" : "none"}
                            {...props.form.register("nomeEstabelecimento")}
                            message={props.form.formState.errors['nomeEstabelecimento']?.message}
                            label="Nome do estabelecimento"
                        />

                    </div>
                    <div className="flex-1">
                        <InputField
                            id="cnpj"
                            label="CNPJ"
                            status={props.form.formState.errors['cnpj'] ? "error" : "none"}
                            variant={props.form.formState.errors['cnpj'] ? "error" : "default"}
                            {...props.form.register("cnpj")}
                            message={props.form.formState.errors['cnpj']?.message}
                            maskConfig={maskConfig} />
                    </div>
                </div>

                {/* Seleção do tipo geral */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">De uma maneira geral seu estabelecimento é um:</label>
                    <div className="flex gap-3 flex-wrap">
                        {tiposEstabelecimento.map((item) => (
                            <SelectableButton
                                key={item}
                                label={item}
                                selected={tipoSelecionado === item}
                                onClick={() =>
                                    props.form.setValue("tipoEstabelecimento", item, {
                                        shouldValidate: true,
                                    })
                                }
                                rounded="full"
                            />
                        ))}
                    </div>
                    <span className="text-xs pl-2 pt-1 text-red-600 text-left empty:hidden empty:opacity-0 opacity-100">
                        {props.form.formState.errors['tipoEstabelecimento']?.message}
                    </span>
                </div>

                {/* Tipo de local */}
                <div className="mb-4">
                    <InputField
                        id="tipo"
                        label="Qual é o tipo do local?"
                        placeholder="Ex: Indiana, Japonesa, Padaria, etc."
                    />
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {tiposComida.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm border border-gray-300 rounded-full bg-gray-100 text-gray-800">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Endereço do estabelecimento */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Endereço do estabelecimento:</label>
                    <InputField id="cep" label="Informe o CEP" />
                </div>

                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <InputField id="endereco" label="Inserir endereço manualmente" />
                    </div>
                    <div className="w-[120px]">
                        <InputField id="numero" label="Número" />
                    </div>
                </div>

                <div>
                    <InputField id="pais" label="País" />
                </div>

                <div className="flex justify-between mt-6">
                    <Button onClick={onNext}>Próximo</Button>
                </div>
            </div>
        </>
    );
}
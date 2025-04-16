import { Button } from "@/components/organisms/atoms";
import { SelectableButton } from "@/components/organisms/atoms/SelectableButton";
import { InputField } from "@/components/organisms/molecules";
import { ViacepAPI } from "@/services/viacep/viacep.service";
import { MaskConfig } from "@/types";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
    schemaInformacoesEstabelecimento,
    StepEstabelecimentoFieldValues,
    tiposEstabelecimento,
  } from "@/pages/Estabelecimento/steps/schemas/schemaInformacoesEstabelecimento";

type Props = {
    onNext: () => void;
    form: UseFormReturn<StepEstabelecimentoFieldValues, any, StepEstabelecimentoFieldValues>;
};

export function StepInformacoesEstabelecimento(props: Props) {
    const [tipo, setTipo] = useState('RESTAURANTE');
    const tiposComida = ['Indiana', 'Japonesa', 'Padaria'];
    const tipoSelecionado = props.form.watch("tipoEstabelecimento");

    const cnpjMaskConfig: MaskConfig = {
        mask: '00.000.000/0000-00'
    };

    const cepMaskConfig: MaskConfig = {
        mask: '00000-000'
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

    const getAddress = async (cep: string) => {
        const data = await ViacepAPI.getCep(cep.replace('-', ''));
        props.form.setValue('endereco', data.logradouro);
        props.form.setValue('bairro', data.bairro);
        props.form.setValue('cidade', data.localidade);
        props.form.setValue('estado', data.uf);
    }
    props.form.register('cep', {
        onChange: async (event: React.ChangeEvent<HTMLInputElement>) => {
            const cep = event.target.value;

            if (cep.length === 9) {
                const data = await ViacepAPI.getCep(cep.replace('-', ''));

                props.form.setValue('endereco', data.logradouro);
                props.form.setValue('bairro', data.bairro);
                props.form.setValue('cidade', data.localidade);
                props.form.setValue('estado', data.uf);
            }
        },
    });

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
                            variant={props.form.formState.errors['nomeEstabelecimento'] ? "error" : "default"}
                            {...props.form.register("nomeEstabelecimento")}
                            message={props.form.formState.errors['nomeEstabelecimento']?.message}
                            label="Nome do estabelecimento*"
                        />

                    </div>
                    <div className="flex-1">
                        <InputField
                            id="cnpj"
                            label="CNPJ*"
                            placeholder="00.000.000/0000-00"
                            status={props.form.formState.errors['cnpj'] ? "error" : "none"}
                            variant={props.form.formState.errors['cnpj'] ? "error" : "default"}
                            {...props.form.register("cnpj")}
                            message={props.form.formState.errors['cnpj']?.message}
                            maskConfig={cnpjMaskConfig} />
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
                <div className="flex flex-col gap-4">
                    {/* CEP + Endereço */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <InputField
                            id="cep"
                            label="Informe o CEP"
                            maskConfig={cepMaskConfig}
                            {...props.form.register("cep", {
                                onChange: async (e) => {
                                    props.form.setValue("cep", e.target.value); // OU chame o field.onChange se estiver desestruturando

                                    if (e.target.value.length === 9) {
                                        await getAddress(e.target.value);
                                    }
                                },
                            })} 
                            containerClassName="w-full md:w-80"
                        />
                        <InputField
                            id="endereco"
                            {...props.form.register("endereco")}
                            label="Endereço"
                            containerClassName="w-full"
                        />
                    </div>

                    {/* Bairro, Cidade, Estado, Número */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <InputField
                            id="bairro"
                            {...props.form.register("bairro")}
                            label="Bairro"
                            containerClassName="flex-1 "
                        />
                        <InputField
                            id="cidade"
                            {...props.form.register("cidade")}
                            label="Cidade"
                            containerClassName="flex-1 min-w-[120px]"
                        />
                        <InputField
                            id="estado"
                            {...props.form.register("estado")}
                            label="Estado"
                            containerClassName="w-full md:w-36"
                        />
                        <InputField
                            id="numero"
                            {...props.form.register("numero")}
                            label="Número"
                            message={props.form.formState.errors['numero']?.message}
                            containerClassName="w-full md:w-40"
                        />
                    </div>
                </div>


                <div className="flex justify-between mt-6">
                    <Button onClick={onNext}>Próximo</Button>
                </div>
            </div>
        </>
    );
}
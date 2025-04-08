import { Button } from "@/components/organisms/atoms";
import { SelectableButton } from "@/components/organisms/atoms/SelectableButton";
import { InputField } from "@/components/organisms/molecules";
import { useState } from "react";

type Props = {
    onNext: () => void;
};

export function StepEstabelecimento({ onNext }: Props) {
    const [tipo, setTipo] = useState('RESTAURANTE');
    const tiposEstabelecimento = ['RESTAURANTE', 'CAFÉ', 'BAR E DRINKS', 'CASA NOTURNA'];
    const tiposComida = ['Indiana', 'Japonesa', 'Padaria'];


    return (
        <>
            <div className="p-6 bg-white max-w-5xl mx-auto">

                <h2 className="text-xl font-bold text-center text-purple-700 mb-6">
                    Informações do Estabelecimento
                </h2>

                {/* Nome e CNPJ*/}
                <div className="flex flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <InputField id="nome" label="Nome do estabelecimento" />
                    </div>
                    <div className="flex-1">
                        <InputField id="cnpj" label="CNPJ" />
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
                                selected={tipo === item}
                                onClick={() => setTipo(item)}
                                rounded="full"
                            />
                        ))}
                    </div>
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
                                className="px-3 py-1 text-sm border border-gray-300 rounded-full bg-gray-100 text-gray-800"
                            >
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
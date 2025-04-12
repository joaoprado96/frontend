import { useState } from 'react';
import { InputField } from '@/components/organisms/molecules/InputField';
import { SelectableButton } from '@/components/organisms/atoms/SelectableButton';
import { Button } from '@/components/organisms/atoms/Button';
import { Input } from '@/components/organisms/atoms/Input';
import { Label } from '@/components/organisms/atoms';

type Props = {
    onNext: () => void;
    onBack: () => void;
};

export function StepInformacoesComplementares({ onNext, onBack }: Props) {
    const [cartoesSelecionados, setCartoesSelecionados] = useState<string[]>([]);
    const [estilosSelecionados, setEstilosSelecionados] = useState<string[]>([]);
    const [ofereceSelecionados, setOfereceSelecionados] = useState<string[]>([]);

    const toggleSelecionado = (item: string, lista: string[], setLista: (v: string[]) => void) => {
        setLista(lista.includes(item) ? lista.filter((i) => i !== item) : [...lista, item]);
    };

    const cartoes = [
        'Crédito', 'Débito', 'Cheque', 'Dinheiro',
        'Ticket Restaurante', 'Ticket Alimentação',
        'VR Refeição', 'Refesul', 'Ben Refeição',
        'Vale Alelo Refeição', 'Verocard Refeição',
        'Verocard Alimentação'
    ];

    const estilos = [
        'Samba/Pagode', 'Blues/Jazz', 'Dance/Eletrônica', 'Funk', 'Folk/Country', 'Pop',
        'Clássica/instrumental', 'Forró/Sertanejo', 'Gospel', 'Bossa Nova/MPB',
        'Hip-Hop/Rap/Trap', 'Metal/Rock', 'Reggae', 'Indie/Alternativo', 'Axé'
    ];

    const oferecimentos = [
        'Estacionamento', 'Espaço kids', 'Música ao vivo', 'Ar condicionado'
    ];

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold text-center text-purple-700 mb-6">Informações complementares</h3>

            {/* Cartões aceitos */}
            <div className="mb-4">
                <label className="block font-semibold mb-2">Quais cartões são aceitos?</label>
                <div className="flex flex-wrap gap-2">
                    {cartoes.map((item) => (
                        <SelectableButton
                            key={item}
                            label={item}
                            selected={cartoesSelecionados.includes(item)}
                            onClick={() => toggleSelecionado(item, cartoesSelecionados, setCartoesSelecionados)}
                            rounded='full'
                        />
                    ))}
                </div>
            </div>

            {/* Estilo musical */}
            <div className="mb-4">
                <label className="block font-semibold mb-2">
                    Qual estilo musical toca? <span className="text-sm font-normal text-gray-500">(opcional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                    {estilos.map((item) => (
                        <SelectableButton
                            key={item}
                            label={item}
                            selected={estilosSelecionados.includes(item)}
                            onClick={() => toggleSelecionado(item, estilosSelecionados, setEstilosSelecionados)}
                            rounded='full'
                        />
                    ))}
                </div>
            </div>

            {/* Estação de metrô / valor médio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Label htmlFor="metro">Qual estação de metrô é mais próxima?<span className="text-sm font-normal text-gray-500">(opcional)</span></Label>
                <Input id="metro"  />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Label htmlFor="metro">Qual valor médio do estabelecimento?<span className="text-sm font-normal text-gray-500">(opcional)</span></Label>
                <Input id="valor" />
            </div>

            {/* Oferece */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">
                    Seu estabelecimento oferece: <span className="text-sm font-normal text-gray-500">(opcional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                    {oferecimentos.map((item) => (
                        <SelectableButton
                            key={item}
                            label={item}
                            selected={ofereceSelecionados.includes(item)}
                            onClick={() => toggleSelecionado(item, ofereceSelecionados, setOfereceSelecionados)}
                        />
                    ))}
                </div>
            </div>

            {/* Botões */}
            <div className="flex justify-between">
                <Button onClick={onBack}>Voltar</Button>
                <Button onClick={onNext}>Finalizar</Button>
            </div>
        </div>
    );
}

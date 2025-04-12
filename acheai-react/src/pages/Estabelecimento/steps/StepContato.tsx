import { InputField } from '@/components/organisms/molecules/InputField';
import { Button } from '@/components/organisms/atoms/Button';
import { useRef, useState } from 'react';
import { SelectableButton } from '@/components/organisms/atoms/SelectableButton';
import { Input } from '@/components/organisms/atoms/Input';
import { HorarioFuncionamentoForm } from './HorarioFuncionamento';

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export function StepContato({ onNext, onBack }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [open24h, setOpen24h] = useState(false);
  const diasSemana = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'];

  const toggleDia = (dia: string) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia) // desmarca
        : [...prev, dia]               // marca
    );
  };


  return (
    <div className="p-6 bg-white max-w-5xl mx-auto">
      {/* Título da página */}
      <h2 className="text-2xl font-bold text-purple-700 mb-2">Incluir um local</h2>

      {/* Subtítulo da seção */}
      <h3 className="text-xl font-bold text-center text-purple-700 mt-6 mb-4">Dados de contato</h3>

      {/* Inputs em grid */}
      <InputField id="site" label="Site" placeholder="https://" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField id="telefone" label="Telefone 1:" placeholder="+55 |" />
        <InputField id="email" label="E-mail oficial" placeholder="fulano@gmail.com" />
      </div>
      <InputField id="cardapio" label="Possui cardápio online? Informe o link" />

      {/* Horário de funcionamento */}
      <div className="mt-6">
        <p className="font-semibold text-gray-800 mb-2">Horário de funcionamento</p>
        <HorarioFuncionamentoForm onSubmit={(data) => console.log(data)} />
      </div>

      {/* Upload de fotos */}
      <div className="mt-6">
        <p className="font-semibold text-gray-800 mb-2">
          Insira fotos do seu estabelecimento! Chame a atenção de novos clientes:
          <span className="text-gray-500 font-normal"> (opcional)</span>
        </p>
        <div className="flex gap-2 items-center">
          <label className="border px-4 py-2 rounded bg-gray-100 text-sm flex items-center gap-2 cursor-pointer">
            📷 Faça upload
            <Input
              ref={fileRef}
              type="file"
              multiple
              className="hidden"
            />
          </label>

          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src="/imgs/mock-foto.jpg"
                alt={`foto ${i}`}
                className="w-10 h-10 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={onBack}>Voltar</Button>
        <Button onClick={onNext}>Próximo</Button>
      </div>
    </div>
  );
}

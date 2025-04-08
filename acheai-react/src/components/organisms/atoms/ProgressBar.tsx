import { tv, VariantProps } from 'tailwind-variants';

const progressBarVariants = tv({
    base: 'relative w-full rounded-full overflow-hidden flex text-white text-sm font-semibold',
    variants: {
        color: {
            default: '',
            orangePurple: '', // deixar aqui caso queira customizar depois
        },
        size: {
            sm: 'h-4 text-xs',
            md: 'h-6 text-sm',
            lg: 'h-8 text-base',
        },
    },
    defaultVariants: {
        color: 'default',
        size: 'md',
    },
});


const progressMessages: { min: number; max: number; message: string }[] = [
    { min: 0, max: 10, message: 'Começando agora...' },
    { min: 11, max: 30, message: 'Avançando bem, continue!' },
    { min: 31, max: 60, message: 'Falta pouco para a metade!' },
    { min: 61, max: 90, message: 'Quase lá!' },
    { min: 91, max: 99, message: 'Só mais um passo...' },
    { min: 100, max: 100, message: 'Tudo pronto! 🚀' },
];

type ProgressBarProps = {
    progress: number;
    size?: 'sm' | 'md' | 'lg';
    color?: 'default' | 'orangePurple';
    customMessages?: typeof progressMessages;
};

export const ProgressBar = ({
    progress,
    size,
    color,
    customMessages,
}: ProgressBarProps) => {
    const roundedProgress = Math.max(0, Math.min(100, progress));

    const message =
        (customMessages || progressMessages).find(
            (range) => roundedProgress >= range.min && roundedProgress <= range.max
        )?.message || '';

    return (
        <div className={progressBarVariants({ color, size })}>
            {/* Parte laranja - só aparece se progress > 0 */}
            {roundedProgress > 0 && (
                <div
                    className="bg-orange-500 flex items-center justify-center px-2"
                    style={{ width: `${roundedProgress}%` }}
                >
                    {roundedProgress}%
                </div>
            )}

            {/* Parte roxa - aparece se progress < 100 */}
            {roundedProgress < 100 && (
                <div className="bg-purple-700 flex-1 flex items-center px-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {message}
                </div>
            )}
        </div>
    );

};

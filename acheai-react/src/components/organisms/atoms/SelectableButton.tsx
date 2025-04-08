import { tv, VariantProps } from 'tailwind-variants';

const selectableButton = tv({
    base: 'border font-semibold transition',
    variants: {
        size: {
            sm: 'text-xs px-2 py-1',
            md: 'text-sm px-4 py-2',
            lg: 'text-base px-6 py-3',
        },
        rounded: {
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            full: 'rounded-full',
        },
        selected: {
            true: 'bg-orange-500 text-white border-orange-500',
            false: 'bg-white text-gray-700 border-gray-300 hover:border-gray-500',
        },
    },
    defaultVariants: {
        size: 'md',
        rounded: 'md',
        selected: false,
    },
});

type SelectableButtonProps = {
    label: string;
    onClick?: () => void;
} & VariantProps<typeof selectableButton>;

export const SelectableButton = ({
    label,
    selected = false,
    size,
    rounded,
    onClick,
}: SelectableButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={selectableButton({ size, rounded, selected })}
        >
            {label}
        </button>
    );
};

'use client'

import { HashLoader } from "react-spinners";

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps {
    name: string;
    loadingName?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Stretches to the container width. Defaults to `true` (previous behaviour). */
    fullWidth?: boolean;
    /** Extra utility classes appended after the default recipe. */
    className?: string;
    loading?: boolean;
    type?: 'button' | 'submit';
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
    primary: 'bg-turquesa-deep hover:opacity-90 text-white',
    secondary: 'bg-azul-med hover:opacity-90 text-white',
    ghost: 'text-turquesa-deep hover:bg-turquesa-deep/10',
    danger: 'bg-coral-dark hover:opacity-90 text-white',
};

// `lg` deliberately carries no font-size utility: the original markup had none, and
// emitting `text-base` would change the computed line-height (and the button height).
const SIZE_CLASSES: Record<ButtonSize, string> = {
    md: 'py-3 text-sm',
    lg: 'py-4',
};

export function Button({
    name,
    loadingName,
    onClick,
    variant = 'primary',
    size = 'lg',
    fullWidth = true,
    className,
    loading = false,
    type = 'button',
}: ButtonProps) {
    const classes = [
        fullWidth ? 'w-full' : '',
        SIZE_CLASSES[size],
        'mt-5',
        'cursor-pointer squircle-border shadow-md font-bold transition-colors',
        VARIANT_CLASSES[variant],
        className ?? '',
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={loading}
            aria-busy={loading}
            aria-label={loading ? (loadingName || 'Carregando...') : name}
        >
            {loading ? <span className="w-full flex justify-center items-center gap-2 animate-pulse">{loadingName} <HashLoader size={20} color="white" /></span> : <span className="font-medium">{name}</span>}
        </button>
    );
}

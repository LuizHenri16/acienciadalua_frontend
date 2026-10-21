interface InputProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    type: string;
    label?: string;
    ariaLabel?: string;
    id?: string;
    name?: string;
    autoComplete?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    required?: boolean;
    disabled?: boolean;
    /** Field level error message. Rendered with role="alert" and linked to the input. */
    error?: string;
    /** Extra guidance rendered below the input and linked to it. */
    hint?: string;
    /** Ids of external elements (e.g. a form level error) that describe this input. */
    ariaDescribedBy?: string;
}

export function Input({
    placeholder,
    value,
    onChange,
    onKeyDown,
    type,
    label,
    ariaLabel,
    id,
    name,
    autoComplete,
    inputMode,
    required,
    disabled,
    error,
    hint,
    ariaDescribedBy,
}: InputProps) {
    const inputId = id ?? `input-${label?.toLowerCase().replace(/\s+/g, "-") || placeholder?.toLowerCase().replace(/\s+/g, "-")}`;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
        <div className="flex flex-col w-full">
            {label && <label htmlFor={inputId} className="text-sm text-texto-secundario">{label}</label>}
            <input
                id={inputId}
                name={name}
                aria-label={ariaLabel}
                aria-invalid={!!error}
                aria-describedby={describedBy}
                autoComplete={autoComplete}
                inputMode={inputMode}
                required={required}
                disabled={disabled}
                className={`w-full bg-white text-sm squircle-border border ${error ? "border-coral-dark" : "border-borda-forte"} p-4 disabled:opacity-60 disabled:cursor-not-allowed`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                type={type}
            />
            {hint && <p id={hintId} className="text-legenda text-texto-terciario mt-1">{hint}</p>}
            {error && (
                <p id={errorId} role="alert" className="w-full mt-2 px-3 py-2 rounded-xl bg-coral/10 border border-coral/30 text-coral-light text-sm text-center font-medium">
                    {error}
                </p>
            )}
        </div>
    );
}

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    type: string;
    label: string;
    id?: string;
}

export function Input({ placeholder, value, onChange, onKeyDown, type, label, id }: InputProps) {
    const inputId = id ?? `input-${label?.toLowerCase().replace(/\s+/g, "-") || placeholder?.toLowerCase().replace(/\s+/g, "-")}`;
    return (
        <div className="flex flex-col w-full">
            {label && <label htmlFor={inputId} className="text-sm text-texto-secundario">{label}</label>}
            <input id={inputId} className="w-full bg-white text-sm squircle-border border border-borda-med p-4" placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} type={type} />
        </div>
    );
}
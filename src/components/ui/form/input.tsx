interface InputProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    type: string;
    label: string;
}

export function Input({ placeholder, value, onChange, onKeyDown, type, label }: InputProps) {
    return (
        <div className="flex flex-col w-full">
            <label className="text-sm text-texto-secundario">{label}</label>
            <input className="w-full bg-white text-sm squircle-border border border-borda-med p-4" placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} type={type} />
        </div>
    );
}
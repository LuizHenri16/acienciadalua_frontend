interface InputProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    label: string;
}

export function Input({ placeholder, value, onChange, type, label }: InputProps) {
    return (
        <div className="flex flex-col w-full">
            <label className="text-sm text-texto-secundario">{label}</label>
            <input className="w-full bg-white text-sm squircle-border border border-borda-med p-4" placeholder={placeholder} value={value} onChange={onChange} type={type} />
        </div>
    );
}
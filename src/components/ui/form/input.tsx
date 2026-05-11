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
            <label className="text-sm text-[#5A5A58]">{label}</label>
            <input className="w-full bg-white rounded-xl border border-gray-300 p-4" placeholder={placeholder} value={value} onChange={onChange} type={type} />
        </div>
    );
}
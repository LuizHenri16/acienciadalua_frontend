import { ProductFormData, MaterialType } from '@/types/material';

interface ProductInfoProps {
  data: ProductFormData;
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
}

function formatBRL(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  const number = parseInt(digits, 10) / 100;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
}

function parseBRL(formatted: string): number {
  const cleaned = formatted.replace(/[R$\s.]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

export function ProductInfo({ data, onChange }: ProductInfoProps) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBRL(e.target.value);
    onChange('price', formatted);
    onChange('priceValue', parseBRL(formatted));
  };

  const inputClass = "w-full border border-gray-200 squircle-border px-3.5 py-2.5 text-sm text-texto-principal placeholder-gray-300 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-turquesa-dark/20 focus:border-turquesa-dark focus:bg-white transition-all";

  return (
    <div className="flex flex-col gap-4">

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-xs font-bold text-texto-secundario">Título</label>
        <input
          type="text"
          id="title"
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Digite o título do produto"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-xs font-bold text-texto-secundario">Descrição</label>
        <textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Descrição completa do material..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className="text-xs font-bold text-texto-secundario">Preço</label>
          <input
            type="text"
            id="price"
            inputMode="numeric"
            value={data.price}
            onChange={handlePriceChange}
            placeholder="R$ 0,00"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-xs font-bold text-texto-secundario">Categoria</label>
          <select
            id="category"
            value={data.category}
            onChange={(e) => onChange('category', e.target.value as MaterialType)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value={MaterialType.STUDENT}>Material de estudo</option>
            <option value={MaterialType.TEACHER}>Para professores</option>
          </select>
        </div>
      </div>

    </div>
  );
}

import { ProductFormData } from '@/types/forms';
import { MaterialType } from '@/types/material';
import { formatCurrencyInput, parseCurrencyInput } from '@/lib/format/currency';

interface ProductInfoProps {
  data: ProductFormData;
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
  /** The form level error lives in the publishing card: link it to these fields. */
  hasError?: boolean;
}

export function ProductInfo({ data, onChange, hasError = false }: ProductInfoProps) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    onChange('price', formatted);
    onChange('priceValue', parseCurrencyInput(formatted));
  };

  const inputClass = "w-full border border-borda-forte squircle-border px-3.5 py-2.5 text-sm text-texto-principal placeholder-gray-500 bg-gray-50/50 focus:border-turquesa-dark focus:bg-white transition-all";

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
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? "product-form-error" : undefined}
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
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? "product-form-error" : undefined}
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
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? "product-form-error" : undefined}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-xs font-bold text-texto-secundario">Categoria</label>
          <select
            id="category"
            value={data.category}
            onChange={(e) => onChange('category', e.target.value as MaterialType)}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? "product-form-error" : undefined}
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

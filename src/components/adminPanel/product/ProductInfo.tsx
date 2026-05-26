import { ProductFormData, MaterialType } from '@/types/material';

interface ProductInfoProps {
  data: ProductFormData;
  onChange: (field: keyof ProductFormData, value: any) => void;
}

function formatBRL(value: string): string {
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';

  // Trata os dígitos como centavos (ex: 4990 → 49,90)
  const number = parseInt(digits, 10) / 100;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
}

function parseBRL(formatted: string): number {
  // Remove R$, pontos e troca vírgula por ponto para virar número
  const cleaned = formatted.replace(/[R$\s.]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

export function ProductInfo({ data, onChange }: ProductInfoProps) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBRL(e.target.value);
    // Salva o display formatado no campo e o número real no estado
    onChange('price', formatted);
    onChange('priceValue', parseBRL(formatted));
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <h2 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Informações</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-xs font-bold text-texto-principal">Título</label>
        <input
          type="text"
          id="title"
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Digite o título do produto"
          className="w-full border border-gray-300 squircle-border p-3 text-sm text-texto-secundario placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-marinho focus:border-marinho"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-xs font-bold text-texto-principal">Descrição</label>
        <textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Descrição completa..."
          rows={3}
          className="w-full border border-gray-300 squircle-border p-3 text-sm text-texto-secundario placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-marinho focus:border-marinho resize-none"
        ></textarea>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="price" className="text-xs font-bold text-texto-principal">Preço</label>
        <input
          type="text"
          id="price"
          inputMode="numeric"
          value={data.price}
          onChange={handlePriceChange}
          placeholder="R$ 0,00"
          className="w-full border border-gray-300 squircle-border p-3 text-sm text-texto-secundario placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-marinho focus:border-marinho"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="text-xs font-bold text-texto-principal">Categoria</label>
        <select
          id="category"
          value={data.category}
          onChange={(e) => onChange('category', e.target.value as MaterialType)}
          className="w-full border border-gray-300 squircle-border p-3 text-sm text-texto-secundario bg-white focus:outline-none focus:ring-1 focus:ring-marinho focus:border-marinho cursor-pointer"
        >
          <option value={MaterialType.STUDENT}>Material de estudo</option>
          <option value={MaterialType.TEACHER}>Para professores</option>
        </select>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductInfo } from './ProductInfo';
import { ProductFiles } from './ProductFiles';
import { ProductFormData, MaterialType, Material, getMaterialTypeLabel } from '@/types/material';
import { adminCreateProduct, adminUpdateProduct, adminDeleteProduct } from '@/api/product';
import { Trash2, Send, FileText, Loader2, Eye, ImageIcon } from 'lucide-react';
import { API_URL } from '@/lib/constants/constants';
import Image from 'next/image';

interface ProductFormProps {
  product?: Material;
}

export function ProductForm({ product }: ProductFormProps) {
  const isEditing = !!product;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    product?.coverUrl ? `${API_URL}/uploads/${product.coverUrl}` : null
  );

  const [formData, setFormData] = useState<ProductFormData>({
    title: product?.title ?? '',
    description: product?.description ?? '',
    price: product
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)
      : '',
    priceValue: product?.price ?? 0,
    category: product?.category ?? MaterialType.STUDENT,
    pdf: null,
    cover: null,
    isActive: product?.isActive ?? true,
  });

  const handleChange = <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Atualiza preview da capa ao selecionar nova imagem
    if (field === 'cover' && value instanceof File) {
      const url = URL.createObjectURL(value);
      setCoverPreviewUrl(url);
    }
  };

  const handleSubmitWithActive = async (isActive: boolean) => {
    setError('');

    if (!formData.title.trim()) return setError('O título é obrigatório.');
    if (formData.priceValue <= 0) return setError('Informe um preço válido.');
    if (!isEditing && !formData.pdf) return setError('O arquivo PDF é obrigatório.');
    if (!isEditing && !formData.cover) return setError('A capa é obrigatória.');

    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', String(formData.priceValue));
      data.append('category', formData.category as string);
      data.append('isActive', String(isActive));

      if (formData.pdf) data.append('file', formData.pdf);
      if (formData.cover) data.append('cover', formData.cover);

      if (isEditing) {
        await adminUpdateProduct(product.id, data);
      } else {
        await adminCreateProduct(data);
      }

      router.push('/painel');
      router.refresh();
    } catch {
      setError('Ocorreu um erro ao salvar o produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    try {
      await adminDeleteProduct(product!.id);
      router.push('/painel');
      router.refresh();
    } catch {
      setError('Erro ao excluir o produto. Tente novamente.');
      setConfirmDelete(false);
    } finally {
      setDeleting(false);
    }
  };

  const publishLabel = formData.isActive
    ? (isEditing ? 'Salvar e manter na vitrine' : 'Publicar na vitrine')
    : (isEditing ? 'Salvar alterações' : 'Salvar rascunho');

  const isTeacher = formData.category === MaterialType.TEACHER;
  const categoryLabel = getMaterialTypeLabel(formData.category as MaterialType);

  const previewCard = (
    <div className="bg-white border border-borda squircle-border overflow-hidden shadow-sm">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-borda bg-linear-to-r from-white to-gray-50/60">
        <div className="w-7 h-7 rounded-lg bg-rosa-rose/20 flex items-center justify-center shrink-0">
          <Eye className="w-3.5 h-3.5 text-rosa-rose" />
        </div>
        <p className="text-xs font-bold text-texto-principal tracking-wide">Pré-visualização</p>
      </div>

      <div className="p-4">
        {/* Capa */}
        <div className="w-full aspect-[3/4] squircle-border overflow-hidden bg-linear-to-br from-turquesa-light to-menta flex items-center justify-center mb-4 border border-borda relative">
          {coverPreviewUrl ? (
            <Image src={coverPreviewUrl} alt="Capa" fill className="object-cover" unoptimized />
          ) : (
            <ImageIcon className="w-10 h-10 text-turquesa-dark/30" />
          )}
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 squircle-border text-[10px] font-bold mb-2 ${
          isTeacher
            ? 'bg-rosa-rose/15 text-rosa-rose'
            : 'bg-turquesa-light text-petroleo'
        }`}>
          {categoryLabel}
        </span>

        <p className="text-sm font-bold text-texto-principal leading-snug mb-1 line-clamp-2">
          {formData.title || <span className="text-gray-300 font-normal">Título do produto</span>}
        </p>
          <p className="text-xs text-texto-secundario leading-relaxed line-clamp-3 mb-3">
          {formData.description || <span className="text-gray-300">A descrição aparecerá aqui...</span>}
        </p>

        <div className="border-t border-borda pt-3 flex items-center justify-between">
          <span className="text-base font-bold text-turquesa-dark">
            {formData.price || 'R$ 0,00'}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            formData.isActive
              ? 'bg-turquesa-light text-petroleo'
              : 'bg-gray-100 text-gray-400'
          }`}>
            {formData.isActive ? 'Ativo' : 'Rascunho'}
          </span>
        </div>
      </div>
    </div>
  );

  const actionButtons = (
    <div className="flex flex-col gap-3">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 squircle-border px-3 py-2">
          <span className="text-red-500 text-xs">{error}</span>
        </div>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={() => handleSubmitWithActive(formData.isActive)}
        className="w-full flex items-center justify-center gap-2 py-3 squircle-border bg-turquesa-dark hover:opacity-90 active:scale-[0.98] text-white text-sm font-bold transition-all shadow-md disabled:opacity-60 cursor-pointer"
      >
        {loading
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</>
          : <><Send className="w-4 h-4" /> {publishLabel}</>
        }
      </button>

      <button
        type="button"
        onClick={() => handleSubmitWithActive(false)}
        disabled={loading}
        className="w-full py-2.5 squircle-border text-sm font-semibold border border-borda-med text-texto-secundario hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
      >
        Salvar como rascunho
      </button>

      <p className="text-[11px] text-gray-400 leading-relaxed text-center">
        {formData.isActive
          ? 'O produto ficará visível na vitrine para os alunos.'
          : 'O produto ficará oculto até ser ativado na vitrine.'}
      </p>
    </div>
  );

  const deleteButton = (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className={`flex items-center justify-center gap-2 w-full py-2.5 squircle-border text-sm font-bold transition-all active:scale-[0.98] cursor-pointer ${
          confirmDelete
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'border border-red-300 text-red-500 hover:bg-red-50'
        }`}
      >
        <Trash2 className="w-4 h-4" />
        {deleting ? 'Excluindo...' : confirmDelete ? 'Confirmar exclusão' : 'Excluir produto'}
      </button>
      {confirmDelete && !deleting && (
        <button
          type="button"
          onClick={() => setConfirmDelete(false)}
          className="text-xs text-gray-400 hover:text-gray-600 text-center cursor-pointer"
        >
          Cancelar
        </button>
      )}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-5 lg:items-start flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="bg-white border border-borda squircle-border overflow-hidden shadow-sm">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-borda bg-linear-to-r from-white to-gray-50/60">
            <div className="w-7 h-7 rounded-lg bg-turquesa-light flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5 text-turquesa-dark" />
            </div>
            <p className="text-xs font-bold text-texto-principal tracking-wide">Informações</p>
          </div>
          <div className="px-5 py-5">
            <ProductInfo data={formData} onChange={handleChange} />
          </div>
        </div>
        <div className="bg-white border border-borda squircle-border overflow-hidden shadow-sm">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-borda bg-linear-to-r from-white to-gray-50/60">
            <div className="w-7 h-7 rounded-lg bg-ouro-light flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-ouro" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <p className="text-xs font-bold text-texto-principal tracking-wide">Arquivos</p>
          </div>
          <div className="px-5 py-5">
            <ProductFiles
              data={formData}
              onChange={handleChange}
              existingCoverUrl={product?.coverUrl}
              existingFileUrl={product?.fileUrl}
            />
          </div>
        </div>
        <div className="bg-white border border-borda squircle-border overflow-hidden shadow-sm">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-borda bg-linear-to-r from-white to-gray-50/60">
            <div className="w-7 h-7 rounded-lg bg-marinho/10 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-marinho" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
            </div>
            <p className="text-xs font-bold text-texto-principal tracking-wide">Configurações</p>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-texto-principal">Ativo na vitrine</span>
              <span className="text-xs text-gray-400">Visível para os alunos</span>
            </div>
            <button
              type="button"
              onClick={() => handleChange('isActive', !formData.isActive)}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                formData.isActive ? 'bg-turquesa-dark shadow-md shadow-turquesa-dark/30' : 'bg-gray-200'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
                formData.isActive ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="lg:hidden bg-white border border-borda squircle-border overflow-hidden shadow-sm">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-borda bg-linear-to-r from-white to-gray-50/60">
            <div className="w-7 h-7 rounded-lg bg-turquesa-light flex items-center justify-center shrink-0">
              <Send className="w-3.5 h-3.5 text-turquesa-dark" />
            </div>
            <p className="text-xs font-bold text-texto-principal tracking-wide">Publicação</p>
          </div>
          <div className="px-5 py-5">{actionButtons}</div>
        </div>

        {isEditing && <div className="lg:hidden">{deleteButton}</div>}
      </div>
      <div className="hidden lg:flex flex-col gap-4">
        {previewCard}
        <div className="bg-white border border-borda squircle-border overflow-hidden shadow-sm">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-borda bg-linear-to-r from-white to-gray-50/60">
            <div className="w-7 h-7 rounded-lg bg-turquesa-light flex items-center justify-center shrink-0">
              <Send className="w-3.5 h-3.5 text-turquesa-dark" />
            </div>
            <p className="text-xs font-bold text-texto-principal tracking-wide">Publicação</p>
          </div>
          <div className="px-5 py-5">{actionButtons}</div>
        </div>

        {isEditing && deleteButton}
      </div>

    </div>
  );
}

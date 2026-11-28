'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductInfo } from '@/components/admin/product/product-info';
import { ProductFiles } from '@/components/admin/product/product-files';
import { ProductFormData } from '@/types/forms';
import { MaterialType, Material } from '@/types/material';
import { getMaterialTypeLabel } from '@/lib/format/material';
import { adminCreateProduct, adminUpdateProduct, adminDeleteProduct } from '@/lib/api/admin-products';
import { uploadUrl } from '@/lib/api/client';
import { getAdminToken } from '@/lib/auth/cookies';
import { Trash2, Send, FileText, Loader2, Eye, ImageIcon, FolderUp, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';

interface ProductFormProps {
  product?: Material;
  duplicateFrom?: Material;
}

export function ProductForm({ product, duplicateFrom }: ProductFormProps) {
  const isEditing = !!product;
  const seed = product ?? duplicateFrom;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    uploadUrl(product?.coverUrl)
  );

  const [formData, setFormData] = useState<ProductFormData>({
    title: product ? product.title : duplicateFrom ? `${duplicateFrom.title} (Cópia)` : '',
    description: seed?.description ?? '',
    price: seed
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(seed.price)
      : '',
    priceValue: seed?.price ?? 0,
    category: seed?.category ?? MaterialType.STUDENT,
    file: null,
    cover: null,
    isActive: product ? (product.isActive ?? true) : !duplicateFrom,
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
    if (!isEditing && !formData.file) return setError('O arquivo do produto é obrigatório.');
    if (!isEditing && !formData.cover) return setError('A capa é obrigatória.');

    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', String(formData.priceValue));
      data.append('category', formData.category as string);
      data.append('isActive', String(isActive));

      if (formData.file) data.append('file', formData.file);
      if (formData.cover) data.append('cover', formData.cover);

      if (isEditing) {
        await adminUpdateProduct(product.id, data, getAdminToken());
      } else {
        await adminCreateProduct(data, getAdminToken());
      }

      router.push('/painel/produtos');
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
      await adminDeleteProduct(product!.id, getAdminToken());
      router.push('/painel/produtos');
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
    <div className="rounded-3xl painel-card overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 bg-[#EAEBF2]/65">
        <div className="w-7 h-7 rounded-full bg-marinho flex items-center justify-center shrink-0">
          <Eye className="w-3.5 h-3.5 text-white" />
        </div>
        <p className="text-xs font-bold text-marinho tracking-wide">Pré-visualização</p>
      </div>

      <div className="p-4">
        {/* Capa */}
        <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-linear-to-br from-[#E7F6F4] to-[#FDF0F3] flex items-center justify-center mb-4 relative">
          {coverPreviewUrl ? (
            <Image src={coverPreviewUrl} alt={formData.title || "Preview da capa do produto"} fill className="object-cover" sizes="300px" />
          ) : (
            <ImageIcon className="w-10 h-10 text-turquesa-deep/30" />
          )}
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-legenda font-bold mb-2 ${
          isTeacher
            ? 'bg-[#FDF0F3] text-rosa-deep'
            : 'bg-[#E7F6F4] text-turquesa-deep'
        }`}>
          {categoryLabel}
        </span>

        <p className="text-sm font-bold text-texto-principal leading-snug mb-1 line-clamp-2">
          {formData.title || <span className="text-texto-terciario/60 font-normal">Título do produto</span>}
        </p>
        <p className="text-xs text-texto-secundario leading-relaxed line-clamp-3 mb-3">
          {formData.description || <span className="text-texto-terciario/60">A descrição aparecerá aqui...</span>}
        </p>

        <div className="border-t border-marinho/[0.07] pt-3 flex items-center justify-between">
          <span className="text-base font-bold text-turquesa-deep tabular-nums">
            {formData.price || 'R$ 0,00'}
          </span>
          <span className={`text-legenda font-semibold px-2.5 py-0.5 rounded-full ${
            formData.isActive
              ? 'bg-[#E7F6F4] text-turquesa-deep'
              : 'bg-[#F5F4F0] text-texto-terciario'
          }`}>
            {formData.isActive ? 'Ativo' : 'Rascunho'}
          </span>
        </div>
      </div>
    </div>
  );

  const renderActionButtons = (errorId?: string) => (
    <div className="flex flex-col gap-3">
      {error && (
        <div id={errorId} role="alert" className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
          <span className="text-red-700 text-xs font-medium">{error}</span>
        </div>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={() => handleSubmitWithActive(formData.isActive)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-full painel-btn-primary text-xs sm:text-sm font-bold disabled:opacity-60 cursor-pointer"
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
        className="w-full py-2.5 rounded-full painel-control text-xs sm:text-sm font-semibold text-texto-secundario hover:bg-[#F5F4F0] cursor-pointer disabled:opacity-50"
      >
        Salvar como rascunho
      </button>

      <p className="text-legenda text-texto-terciario leading-relaxed text-center">
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
        className={`flex items-center justify-center gap-2 w-full min-h-11 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-[0.98] cursor-pointer ${
          confirmDelete
            ? 'bg-coral-dark text-white hover:opacity-90'
            : 'border border-red-200 bg-white text-coral-dark hover:bg-red-50'
        }`}
      >
        <Trash2 className="w-4 h-4" />
        {deleting ? 'Excluindo...' : confirmDelete ? 'Confirmar exclusão' : 'Excluir produto'}
      </button>
      {confirmDelete && !deleting && (
        <button
          type="button"
          onClick={() => setConfirmDelete(false)}
          className="text-xs text-texto-terciario hover:text-texto-principal text-center cursor-pointer"
        >
          Cancelar
        </button>
      )}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[1fr_308px] lg:gap-5 lg:items-start flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl painel-card overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 bg-[#EAEBF2]/65">
            <div className="w-7 h-7 rounded-full bg-marinho flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-xs font-bold text-marinho tracking-wide">Informações</p>
          </div>
          <div className="px-5 py-5">
            <ProductInfo data={formData} onChange={handleChange} hasError={!!error} />
          </div>
        </div>
        <div className="rounded-3xl painel-card overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 bg-[#EAEBF2]/65">
            <div className="w-7 h-7 rounded-full bg-marinho flex items-center justify-center shrink-0">
              <FolderUp className="w-3.5 h-3.5 text-ouro-light" />
            </div>
            <p className="text-xs font-bold text-marinho tracking-wide">Arquivos</p>
          </div>
          <div className="px-5 py-5">
            <ProductFiles
              data={formData}
              onChange={handleChange}
              existingCoverUrl={product?.coverUrl}
              existingFileUrl={product?.fileUrl}
              hasError={!!error}
            />
          </div>
        </div>
        <div className="rounded-3xl painel-card overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 bg-[#EAEBF2]/65">
            <div className="w-7 h-7 rounded-full bg-marinho flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-turquesa-light" />
            </div>
            <p className="text-xs font-bold text-marinho tracking-wide">Configurações</p>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <span id="product-active-label" className="text-sm font-bold text-texto-principal">Ativo na vitrine</span>
              <span className="text-xs text-texto-terciario">Visível para os alunos</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.isActive}
              aria-labelledby="product-active-label"
              onClick={() => handleChange('isActive', !formData.isActive)}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer after:absolute after:inset-x-0 after:-inset-y-2.5 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquesa-dark ${
                formData.isActive ? 'bg-turquesa-deep shadow-sm' : 'bg-marinho/20'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
                formData.isActive ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="lg:hidden rounded-3xl painel-card overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 bg-[#EAEBF2]/65">
            <div className="w-7 h-7 rounded-full bg-marinho flex items-center justify-center shrink-0">
              <Send className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-xs font-bold text-marinho tracking-wide">Publicação</p>
          </div>
          <div className="px-5 py-5">{renderActionButtons()}</div>
        </div>

        {isEditing && <div className="lg:hidden">{deleteButton}</div>}
      </div>
      <div className="hidden lg:flex flex-col gap-4">
        {previewCard}
        <div className="rounded-3xl painel-card overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 bg-[#EAEBF2]/65">
            <div className="w-7 h-7 rounded-full bg-marinho flex items-center justify-center shrink-0">
              <Send className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-xs font-bold text-marinho tracking-wide">Publicação</p>
          </div>
          <div className="px-5 py-5">{renderActionButtons("product-form-error")}</div>
        </div>

        {isEditing && deleteButton}
      </div>

    </div>
  );
}

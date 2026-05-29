'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductInfo } from './ProductInfo';
import { ProductFiles } from './ProductFiles';
import { ProductFormData, MaterialType, Material } from '@/types/material';
import { Button } from '@/components/ui/button/button';
import { adminCreateProduct, adminUpdateProduct, adminDeleteProduct } from '@/api/product';
import { Trash2 } from 'lucide-react';

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

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
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
      data.append('isActive', String(formData.isActive));

      if (formData.pdf) data.append('file', formData.pdf);
      if (formData.cover) data.append('cover', formData.cover);

      if (isEditing) {
        await adminUpdateProduct(product.id, data);
      } else {
        await adminCreateProduct(data);
      }

      router.push('/panel');
      router.refresh();
    } catch {
      setError('Ocorreu um erro ao salvar o produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setDeleting(true);
    try {
      await adminDeleteProduct(product!.id);
      router.push('/panel');
      router.refresh();
    } catch {
      setError('Erro ao excluir o produto. Tente novamente.');
      setConfirmDelete(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProductInfo data={formData} onChange={handleChange} />
      <ProductFiles
        data={formData}
        onChange={handleChange}
        existingCoverUrl={product?.coverUrl}
        existingFileUrl={product?.fileUrl}
      />

      {error && <p className="text-red-500 text-xs text-center mt-4">{error}</p>}

      <div className="flex flex-col gap-3 mt-2">
        <Button
          name={isEditing ? 'Salvar alterações' : 'Cadastrar produto'}
          loadingName={isEditing ? 'Salvando...' : 'Cadastrando...'}
          variant='primary'
          loading={loading}
          onClick={handleSubmit}
        />

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${confirmDelete
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'border border-red-300 text-red-500 hover:bg-red-50'
              }`}
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? 'Excluindo...' : confirmDelete ? 'Confirmar exclusão' : 'Excluir produto'}
          </button>
        )}

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
    </form>
  );
}

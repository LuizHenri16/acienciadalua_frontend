'use client';

import { useRef, useEffect, useState } from 'react';
import { Upload, Image as ImageIcon } from "lucide-react";
import { ProductFormData } from '@/types/material';
import { API_URL } from '@/lib/constants/constants';

interface ProductFilesProps {
  data: ProductFormData;
  onChange: (field: keyof ProductFormData, value: File | null) => void;
  existingCoverUrl?: string;
  existingFileUrl?: string;
}

export function ProductFiles({ data, onChange, existingCoverUrl, existingFileUrl }: ProductFilesProps) {
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    existingCoverUrl ? `${API_URL}/uploads/${existingCoverUrl}` : null
  );

  useEffect(() => {
    if (!data.cover) return;
    const url = URL.createObjectURL(data.cover);
    setCoverPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [data.cover]);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onChange('pdf', e.target.files[0]);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onChange('cover', e.target.files[0]);
  };

  return (
    <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-gray-100">
      <h2 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Arquivos</h2>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-texto-principal">
          Upload do PDF {existingFileUrl && <span className="text-gray-400 font-normal">(deixe vazio para manter o atual)</span>}
        </label>
        <button
          type="button"
          onClick={() => pdfInputRef.current?.click()}
          className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-borda-med squircle-border py-6 hover:border-turquesa hover:bg-blue-50 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-turquesa-dark bg-white shadow-sm">
            <Upload className="w-4 h-4" />
          </div>
          <span className="text-sm text-gray-600">
            {data.pdf ? data.pdf.name : existingFileUrl ? 'Clique para substituir o PDF' : 'Clique para selecionar o PDF'}
          </span>
        </button>
        <input type="file" ref={pdfInputRef} onChange={handlePdfChange} accept="application/pdf" className="hidden" />
      </div>

      <div className="flex flex-col gap-1.5 mt-2">
        <label className="text-xs font-bold text-texto-principal">
          Upload da Capa {existingCoverUrl && <span className="text-gray-400 font-normal">(deixe vazio para manter a atual)</span>}
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 squircle-border py-6 hover:border-turquesa hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 squircle-border border border-gray-300 flex items-center justify-center text-turquesa-dark bg-white shadow-sm">
              <Upload className="w-4 h-4" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-700">
                {existingCoverUrl ? 'Substituir imagem' : 'Selecionar imagem'}
              </span>
              <span className="text-xs text-gray-400">
                {data.cover ? data.cover.name : '.jpg ou .png'}
              </span>
            </div>
          </button>
          <input type="file" ref={coverInputRef} onChange={handleCoverChange} accept="image/jpeg, image/png" className="hidden" />

          <div className="w-[100px] squircle-border bg-turquesa-light flex items-center justify-center overflow-hidden">
            {coverPreviewUrl ? (
              <img src={coverPreviewUrl} alt="Capa" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-turquesa-dark/40" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

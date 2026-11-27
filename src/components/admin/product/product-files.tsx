'use client';

import { useRef, useEffect, useState } from 'react';
import { Upload, Image as ImageIcon, FileCheck } from "lucide-react";
import { ProductFormData } from '@/types/forms';
import { uploadUrl } from '@/lib/api/client';
import Image from 'next/image';

interface ProductFilesProps {
  data: ProductFormData;
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
  existingCoverUrl?: string;
  existingFileUrl?: string;
  /** The form level error lives in the publishing card: link it to the fields. */
  hasError?: boolean;
}

export function ProductFiles({ data, onChange, existingCoverUrl, existingFileUrl, hasError = false }: ProductFilesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    uploadUrl(existingCoverUrl)
  );

  useEffect(() => {
    let active = true;
    let url: string | null = null;

    if (!data.cover) {
      Promise.resolve().then(() => {
        if (active) {
          setCoverPreviewUrl(uploadUrl(existingCoverUrl));
        }
      });
    } else {
      url = URL.createObjectURL(data.cover);
      const currentUrl = url;
      Promise.resolve().then(() => {
        if (active) {
          setCoverPreviewUrl(currentUrl);
        }
      });
    }

    return () => {
      active = false;
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [data.cover, existingCoverUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onChange('file', e.target.files[0]);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onChange('cover', e.target.files[0]);
  };

  const hasFile = !!data.file || !!existingFileUrl;

  return (
    <div className="flex flex-col gap-5">

      {/* Arquivo do produto */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-texto-secundario">
          Arquivo do produto
          {existingFileUrl && <span className="text-texto-terciario font-normal ml-1">(deixe vazio para manter o atual)</span>}
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-describedby={hasError ? "product-form-error" : undefined}
          className={`w-full flex items-center gap-3 border-2 border-dashed rounded-2xl px-4 py-4 transition-all cursor-pointer group ${hasFile
              ? 'border-turquesa-deep/45 bg-[#E7F6F4]/70 hover:bg-[#E7F6F4]'
              : 'border-marinho/[0.14] bg-[#F5F4F0]/60 hover:border-turquesa-deep/45 hover:bg-[#E7F6F4]/35'
            }`}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${hasFile ? 'bg-turquesa-deep' : 'bg-white border border-marinho/[0.1] shadow-sm group-hover:border-turquesa-deep/40'
            }`}>
            {hasFile
              ? <FileCheck className="w-4 h-4 text-white" />
              : <Upload className="w-4 h-4 text-turquesa-deep" />
            }
          </div>
          <div className="flex flex-col items-start text-left">
            <span className={`text-sm font-semibold ${hasFile ? 'text-turquesa-deep' : 'text-texto-secundario'}`}>
              {data.file ? data.file.name : existingFileUrl ? 'Arquivo carregado — clique para substituir' : 'Selecionar arquivo'}
            </span>
            {!hasFile && <span className="text-xs text-texto-terciario">Formato .pdf ou .zip</span>}
          </div>
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.zip,application/pdf,application/zip,application/x-zip-compressed" className="hidden" />
      </div>

      {/* Capa */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-texto-secundario">
          Imagem de capa
          {existingCoverUrl && <span className="text-texto-terciario font-normal ml-1">(deixe vazio para manter a atual)</span>}
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            aria-describedby={hasError ? "product-form-error" : undefined}
            className="flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-marinho/[0.14] bg-[#F5F4F0]/60 rounded-2xl py-6 hover:border-turquesa-deep/45 hover:bg-[#E7F6F4]/35 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl border border-marinho/[0.1] flex items-center justify-center bg-white shadow-sm group-hover:border-turquesa-deep/40 transition-colors">
              <Upload className="w-4 h-4 text-turquesa-deep" />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-semibold text-texto-secundario">
                {existingCoverUrl ? 'Substituir imagem' : 'Selecionar imagem'}
              </span>
              <span className="text-xs text-texto-terciario">
                {data.cover ? data.cover.name : '.jpg ou .png'}
              </span>
            </div>
          </button>
          <input type="file" ref={coverInputRef} onChange={handleCoverChange} accept="image/jpeg, image/png" className="hidden" />

          <div className="w-[90px] rounded-2xl overflow-hidden border border-marinho/[0.08] bg-linear-to-br from-[#E7F6F4] to-[#FDF0F3] flex items-center justify-center shrink-0 relative">
            {coverPreviewUrl ? (
              <Image src={coverPreviewUrl} alt="Preview da capa do produto" fill className="object-cover" sizes="90px" />
            ) : (
              <ImageIcon className="w-6 h-6 text-turquesa-deep/40" />
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

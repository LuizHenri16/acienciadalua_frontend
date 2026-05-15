'use client';

import { useState } from 'react';
import { ProductInfo } from './ProductInfo';
import { ProductFiles } from './ProductFiles';
import { ProductStatus } from './ProductStatus';
import { ProductFormData, MaterialType } from '@/types/material';

export function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: '',
    category: MaterialType.STUDENT,
    pdf: null,
    cover: null,
    isActive: false,
  });

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Aqui você fará a chamada para a API
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProductInfo 
        data={formData} 
        onChange={handleChange} 
      />
      <ProductFiles 
        data={formData} 
        onChange={handleChange} 
      />
      <ProductStatus 
        isActive={formData.isActive} 
        onToggle={() => handleChange('isActive', !formData.isActive)} 
      />
    </form>
  );
}

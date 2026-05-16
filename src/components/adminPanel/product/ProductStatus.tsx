'use client';

import { Button } from '@/components/ui/button/button';

interface ProductStatusProps {
  isActive: boolean;
  onToggle: () => void;
}

export function ProductStatus({ isActive, onToggle }: ProductStatusProps) {
  return (
    <div className="flex flex-col gap-6 mt-8 pt-8 border-t border-borda">
      <div className="flex items-center justify-between border border-borda squircle-border p-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-800">Ativo na vitrine</span>
          <span className="text-xs text-gray-500">Visível para os alunos</span>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className={`w-12 h-6 rounded-full p-1 transition-colors ${isActive ? 'bg-texto-terciario' : 'bg-gray-200'} border border-borda flex items-center cursor-pointer`}
        >
          <div
            className={`w-4 h-4 rounded-full transition-transform ${isActive ? 'translate-x-6 bg-marinho' : 'translate-x-0 bg-white shadow-sm'}`}
          />
        </button>
      </div>
    </div>
  );
}

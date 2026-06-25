import { BoxIcon, EyeIcon, EyeOffIcon } from "lucide-react";

interface DashboardStatsProps {
  total: number;
  ativos: number;
  inativos: number;
}

export function DashboardStats({ total, ativos, inativos }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mt-5">
      <p className="col-span-3 text-xs font-semibold text-texto-secundario uppercase tracking-wider">Visão geral</p>

      <div className="squircle-border border border-borda-med p-3 gap-2 flex flex-col">
        <div className="bg-turquesa-light rounded-lg p-1.5 w-fit">
          <BoxIcon size={16} className="text-turquesa-dark" />
        </div>
        <span className="text-xs text-texto-secundario mt-1">Produtos no total</span>
        <span className="text-2xl font-bold text-texto-principal">{total}</span>
      </div>

      <div className="squircle-border border border-turquesa-dark p-3 gap-2 flex flex-col">
        <div className="bg-turquesa-light rounded-lg p-1.5 w-fit">
          <EyeIcon size={16} className="text-turquesa-dark" />
        </div>
        <span className="text-xs text-texto-secundario mt-1">Ativos na vitrine</span>
        <span className="text-2xl font-bold text-turquesa-dark">{ativos}</span>
      </div>

      <div className="squircle-border border border-borda-med p-3 gap-2 flex flex-col">
        <div className="bg-gray-100 rounded-lg p-1.5 w-fit">
          <EyeOffIcon size={16} className="text-gray-400" />
        </div>
        <span className="text-xs text-texto-secundario mt-1">Inativos</span>
        <span className="text-2xl font-bold text-texto-terciario">{inativos}</span>
      </div>
    </div>
  );
}

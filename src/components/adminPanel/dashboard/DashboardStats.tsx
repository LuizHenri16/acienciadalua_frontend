interface DashboardStatsProps {
  total: number;
  ativos: number;
  inativos: number;
}

export function DashboardStats({ total, ativos, inativos }: DashboardStatsProps) {
  return (
    <div className="flex gap-4 mt-8">
      {/* Total Card */}
      <div className="flex-1 bg-[#eaeaea] rounded-xl p-4 flex flex-col justify-center">
        <span className="text-xs font-bold text-gray-800 mb-1">Total</span>
        <span className="text-2xl font-bold text-gray-900">{total}</span>
      </div>

      {/* Ativos Card */}
      <div className="flex-1 bg-[#d5f4e6] rounded-xl p-4 flex flex-col justify-center">
        <span className="text-xs font-bold text-gray-800 mb-1">Ativos</span>
        <span className="text-2xl font-bold text-[#3d8c6b]">{ativos}</span>
      </div>

      {/* Inativos Card */}
      <div className="flex-1 bg-[#f9f9f9] border border-gray-200 rounded-xl p-4 flex flex-col justify-center">
        <span className="text-xs font-bold text-gray-800 mb-1">Inativos</span>
        <span className="text-2xl font-bold text-gray-900">{inativos}</span>
      </div>
    </div>
  );
}

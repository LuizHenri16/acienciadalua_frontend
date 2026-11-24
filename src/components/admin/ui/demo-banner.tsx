import { Info } from "lucide-react";

export function DemoPreviewNotice({
  text = "Prévia com dados de exemplo",
}: {
  text?: string;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#F1EEFA] border border-[#E2DCF5] px-2.5 py-1 text-xs font-medium text-[#52468A] w-fit">
      <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}

import { MaterialType, type Material } from "@/types/material";

export function getMaterialTypeLabel(category: MaterialType | string): string {
  if (category === MaterialType.TEACHER) return "Plano de aula";
  if (category === MaterialType.STUDENT) return "Material de estudo";
  return category;
}

export function getMaterialFormat(material: Pick<Material, "category" | "fileUrl">): string {
  const fileUrl = material.fileUrl?.toLowerCase() ?? "";
  const extension = fileUrl.split("?")[0].split(".").pop();
  if (extension === "pdf") return "PDF";
  if (extension === "zip") return "ZIP";
  return getMaterialTypeLabel(material.category);
}

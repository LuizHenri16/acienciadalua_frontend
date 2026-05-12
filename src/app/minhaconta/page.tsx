import { DashboardHeader } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Banner } from "@/components/myaccount/banner";
import { MaterialSection } from "@/components/myaccount/materialSection";
import { Material, MaterialType } from "@/types/material";

const materials: Material[] = [
    {
        id: "1",
        name: "Material 1",
        price: 10,
        type: MaterialType.STUDY,
    },
    {
        id: "2",
        name: "Material 2",
        price: 20,
        type: MaterialType.STUDY,
    },
]

export default function Conta() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-[#fafafa] font-sora">
            <DashboardHeader />
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20 flex flex-col gap-8">
                <Banner totalMateriais={0} userName="Luana" />
                <MaterialSection materials={materials} />
            </main>
            <Footer />
        </div>
    );
}
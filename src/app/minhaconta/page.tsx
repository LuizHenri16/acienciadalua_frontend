import { DashboardHeader } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Banner } from "@/components/myaccount/banner";
import { MaterialSection } from "@/components/myaccount/materialSection";
import { MaterialDetails, MaterialType } from "@/types/material";

const materials: MaterialDetails[] = [
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
        <div className="w-full min-h-screen flex flex-col bg-[#fafafa]">
            <DashboardHeader />

            <main className="flex-1 flex flex-col gap-2 px-6 mt-8">
                <Banner totalMateriais={0} userName="Luana" />
                <MaterialSection materials={materials} />
            </main>

            <Footer />
        </div>
    );
}
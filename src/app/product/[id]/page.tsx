import { ProductDetailsFooter } from "@/components/productdetails/footer";
import { ProductDetailsHeader } from "@/components/productdetails/header";
import { ProductDetails } from "@/components/productdetails/productDetails";

import { ALL_MATERIALS } from "@/constants/materials";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 900));

    const product = ALL_MATERIALS.find(m => String(m.id) === id);
    return product;
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen flex justify-center items-start font-sora bg-[#fafafa] sm:py-10">
            <div className="flex flex-col w-full max-w-2xl bg-white sm:rounded-4xl sm:shadow-xl overflow-hidden border border-gray-100 min-h-screen sm:min-h-fit">
                <ProductDetailsHeader />
                <ProductDetails product={product} />
                <ProductDetailsFooter />
            </div>
        </main>
    );
}

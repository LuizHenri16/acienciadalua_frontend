import { ProductDetailsFooter } from "@/components/productdetails/footer";
import { ProductDetailsHeader } from "@/components/productdetails/header";
import { ProductDetails } from "@/components/productdetails/productDetails";
import { getProductById } from "@/api/product";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col font-sora bg-white">
            <ProductDetailsHeader />
            <div className="flex flex-col flex-1 pt-[65px] lg:h-screen lg:overflow-hidden">
                <ProductDetails product={product} />
                <ProductDetailsFooter />
            </div>
        </div>
    );
}

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
        <main className="min-h-screen flex justify-center items-start font-sora bg-[#fafafa] sm:py-10">
            <div className="flex flex-col w-full max-w-2xl bg-white sm:rounded-4xl sm:shadow-xl overflow-hidden border border-gray-100 min-h-screen sm:min-h-fit">
                <ProductDetailsHeader />
                <ProductDetails product={product} />
                <ProductDetailsFooter />
            </div>
        </main>
    );
}

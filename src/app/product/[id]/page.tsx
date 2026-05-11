import { ProductDetailsFooter } from "@/components/productdetails/footer";
import { ProductDetailsHeader } from "@/components/productdetails/header";
import { ProductDetails } from "@/components/productdetails/productDetails";

async function getProduct(id: string) {
    await new Promise(resolve => setTimeout(resolve, 900));

    return {
        id,
        name: `Material Especial #${id}`,
        type: id === "1" ? "Plano de aula" : "Material de estudo",
        price: 19.9,
        description: "Descrição completa do material. O que você vai aprender? Para quem é indicado? Formato e número de páginas.",
    };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    return (
        <main className="min-h-screen flex justify-center items-start font-sora bg">
            <div className="flex flex-col h-screen">
                <ProductDetailsHeader />
                <ProductDetails product={product} />
                <ProductDetailsFooter />
            </div>
        </main>
    );
}

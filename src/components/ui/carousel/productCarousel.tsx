"use client";

import { useState, useRef, useEffect } from "react";
import { Material } from "@/types/material";
import { ProductCard } from "../card/card";

interface ProductCarouselProps {
    materials: Material[];
}

export function ProductCarousel({ materials }: ProductCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const container = scrollRef.current;
        const children = container.children;
        const scrollLeft = container.scrollLeft;

        let index = 0;
        let minDiff = Infinity;

        for (let i = 0; i < children.length - 1; i++) {
            const child = children[i] as HTMLElement;
            const diff = Math.abs(child.offsetLeft - scrollLeft - 4);
            if (diff < minDiff) {
                minDiff = diff;
                index = i;
            }
        }

        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    const scrollToIndex = (index: number) => {
        if (!scrollRef.current) return;
        const children = scrollRef.current.children;
        if (children[index]) {
            (children[index] as HTMLElement).scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    };

    useEffect(() => {
        setActiveIndex(0);
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0 });
        }
    }, [materials]);

    return (
        <div className="relative w-full">
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth px-1"
            >
                {materials.map((material) => (
                    <div
                        key={material.id}
                        className="min-w-[240px] md:min-w-[280px] cursor-pointer snap-start transition-transform duration-300 hover:opacity-95"
                    >
                        <ProductCard material={material} />
                    </div>
                ))}
                <div className="min-w-px h-full" />
            </div>

            <div className="flex justify-center gap-2 mt-2">
                {materials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === index
                                ? "bg-[#68B999] w-6"
                                : "bg-[#E5E5E3] w-1.5 hover:bg-[#D1D1CF]"
                            }`}
                        aria-label={`Ver produto ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

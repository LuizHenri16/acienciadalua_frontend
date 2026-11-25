import type { ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function AnimatedSection({
    children,
    className,
    id,
}: AnimatedSectionProps) {
    return (
        <section
            id={id}
            className={`scroll-reveal ${className ?? ""}`}
        >
            {children}
        </section>
    );
}

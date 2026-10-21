"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    amount?: number;
    id?: string;
}

export function AnimatedSection({
    children,
    className,
    delay = 0,
    y = 30,
    amount = 0.2,
    id,
}: AnimatedSectionProps) {
    return (
        <motion.section
            id={id}
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
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
    const reduceMotion = useReducedMotion();
    const revealed = { opacity: 1, y: 0 };

    return (
        <motion.section
            id={id}
            // Without JS the reveal animation never runs, so the <noscript>
            // fallback in the root layout forces [data-motion-reveal] visible.
            data-motion-reveal
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y }}
            animate={reduceMotion ? revealed : undefined}
            whileInView={revealed}
            viewport={{ once: true, amount }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : delay, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
}

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
    y = 24,
    amount = 0.12,
    id,
}: AnimatedSectionProps) {
    const reduceMotion = useReducedMotion();
    const revealed = { opacity: 1, y: 0 };

    return (
        <motion.section
            id={id}
            // Mobile browsers get an opacity-only reveal via the CSS override
            // for [data-motion-reveal]; without JS the <noscript> rule in the
            // root layout forces these sections visible.
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

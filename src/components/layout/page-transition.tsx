"use client"

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            key={pathname}
            // Without JS this wrapper never animates, so the <noscript> fallback
            // in the root layout forces [data-motion-reveal] elements to be visible.
            data-motion-reveal
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.0, 0.0, 0.2, 1] }}
        >
            {children}
        </motion.div>
    )
}

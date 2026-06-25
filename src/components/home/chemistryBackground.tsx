'use client';

import { motion } from 'framer-motion';

export function ChemistryBackground() {
    const formulas = [
        // Bordas
        { content: "H₂O", top: "5%", left: "48%", size: "0.9rem", rotate: "10deg", opacity: 0.18, delay: 0.3, y: 6, dur: 4.2 },
        { content: "NaCl", top: "28%", left: "1%", size: "0.85rem", rotate: "-8deg", opacity: 0.16, delay: 1.1, y: 5, dur: 5.0 },
        { content: "CO₂", top: "52%", left: "3%", size: "0.85rem", rotate: "5deg", opacity: 0.16, delay: 0.7, y: 7, dur: 4.6 },
        { content: "pH = 7", top: "70%", left: "91%", size: "0.8rem", rotate: "-5deg", opacity: 0.16, delay: 1.5, y: 5, dur: 3.8 },
        { content: "H₂SO₄", top: "88%", left: "4%", size: "0.8rem", rotate: "6deg", opacity: 0.15, delay: 0.2, y: 6, dur: 4.8 },
        { content: "O₂", top: "15%", left: "5%", size: "0.85rem", rotate: "-12deg", opacity: 0.16, delay: 0.9, y: 8, dur: 5.2 },
        { content: "NH₃", top: "78%", left: "88%", size: "0.85rem", rotate: "8deg", opacity: 0.16, delay: 1.8, y: 5, dur: 4.4 },
        { content: "Fe²⁺", top: "42%", left: "94%", size: "0.8rem", rotate: "-6deg", opacity: 0.15, delay: 0.5, y: 7, dur: 3.9 },
        // Centro
        { content: "KCl", top: "12%", left: "38%", size: "0.85rem", rotate: "7deg", opacity: 0.13, delay: 1.3, y: 6, dur: 4.7 },
        { content: "CH₄", top: "47%", left: "62%", size: "0.85rem", rotate: "-9deg", opacity: 0.12, delay: 0.6, y: 5, dur: 5.1 },
        { content: "HCl", top: "78%", left: "45%", size: "0.8rem", rotate: "4deg", opacity: 0.12, delay: 1.9, y: 7, dur: 4.3 },
    ];

    const icons = [
        // Bordas
        { content: "⚗️", top: "3%", left: "2%", size: "1.5rem", rotate: "-15deg", opacity: 0.22, delay: 0.4, y: 8, dur: 10 },
        { content: "⚛️", top: "45%", left: "1%", size: "1.5rem", rotate: "20deg", opacity: 0.20, delay: 0.8, y: 9, dur: 4.1 },
        { content: "🔬", top: "65%", left: "93%", size: "1.4rem", rotate: "-10deg", opacity: 0.21, delay: 1.6, y: 6, dur: 4.9 },
        { content: "⚗️", top: "82%", left: "91%", size: "1.3rem", rotate: "12deg", opacity: 0.19, delay: 0.1, y: 7, dur: 5.5 },
        { content: "🧬", top: "92%", left: "2%", size: "1.4rem", rotate: "-8deg", opacity: 0.20, delay: 1.0, y: 8, dur: 4.0 },
        { content: "⚛️", top: "58%", left: "95%", size: "1.3rem", rotate: "-15deg", opacity: 0.18, delay: 1.7, y: 6, dur: 4.6 },
        { content: "🧪", top: "35%", left: "2%", size: "1.3rem", rotate: "10deg", opacity: 0.19, delay: 0.3, y: 7, dur: 5.0 },
        // Centro
        { content: "🔬", top: "25%", left: "55%", size: "1.3rem", rotate: "-12deg", opacity: 0.14, delay: 1.4, y: 6, dur: 4.8 },
        { content: "⚗️", top: "60%", left: "28%", size: "1.2rem", rotate: "8deg", opacity: 0.13, delay: 0.6, y: 8, dur: 5.2 },
        { content: "🧬", top: "38%", left: "42%", size: "1.2rem", rotate: "-5deg", opacity: 0.12, delay: 2.0, y: 5, dur: 4.3 },
    ];

    const bannerColor = "rgba(109,213,202,0.5)";
    const pageColor = "#2a5c8f";
    const getColor = (top: string) => parseFloat(top) < 35 ? bannerColor : pageColor;

    const bonds = [
        {
            top: "10%", left: "12%", opacity: 0.22, rotate: "20deg", delay: 0.5, y: 7, dur: 4.4, svg: (
                <svg width="70" height="40" viewBox="0 0 70 40">
                    <circle cx="10" cy="20" r="7" fill="none" stroke={getColor("10%")} strokeWidth="1.5" />
                    <line x1="17" y1="20" x2="35" y2="20" stroke={getColor("10%")} strokeWidth="1.5" />
                    <circle cx="42" cy="20" r="7" fill="none" stroke={getColor("10%")} strokeWidth="1.5" />
                    <line x1="49" y1="20" x2="60" y2="20" stroke={getColor("10%")} strokeWidth="1.5" />
                    <circle cx="63" cy="20" r="4" fill="none" stroke={getColor("10%")} strokeWidth="1.5" />
                    <text x="7" y="24" fontSize="7" fill={getColor("10%")} fontFamily="monospace">O</text>
                    <text x="39" y="24" fontSize="6" fill={getColor("10%")} fontFamily="monospace">H</text>
                    <text x="60" y="23" fontSize="6" fill={getColor("10%")} fontFamily="monospace">H</text>
                </svg>
            )
        },
        {
            top: "32%", left: "89%", opacity: 0.22, rotate: "-12deg", delay: 1.3, y: 6, dur: 5.1, svg: (
                <svg width="60" height="35" viewBox="0 0 60 35">
                    <circle cx="10" cy="18" r="7" fill="none" stroke={getColor("32%")} strokeWidth="1.5" />
                    <line x1="17" y1="15" x2="40" y2="15" stroke={getColor("32%")} strokeWidth="1.5" />
                    <line x1="17" y1="21" x2="40" y2="21" stroke={getColor("32%")} strokeWidth="1.5" />
                    <circle cx="47" cy="18" r="7" fill="none" stroke={getColor("32%")} strokeWidth="1.5" />
                    <text x="7" y="22" fontSize="7" fill={getColor("32%")} fontFamily="monospace">C</text>
                    <text x="44" y="22" fontSize="7" fill={getColor("32%")} fontFamily="monospace">O</text>
                </svg>
            )
        },
        {
            top: "55%", left: "5%", opacity: 0.15, rotate: "8deg", delay: 0.9, y: 8, dur: 4.7, svg: (
                <svg width="65" height="60" viewBox="0 0 65 60">
                    <circle cx="32" cy="8" r="6" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <circle cx="8" cy="50" r="6" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <circle cx="56" cy="50" r="6" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="32" y1="14" x2="11" y2="45" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="32" y1="14" x2="53" y2="45" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="14" y1="50" x2="50" y2="50" stroke="#2a5c8f" strokeWidth="1.5" />
                    <text x="29" y="12" fontSize="6" fill="#2a5c8f" fontFamily="monospace">N</text>
                    <text x="5" y="54" fontSize="6" fill="#2a5c8f" fontFamily="monospace">H</text>
                    <text x="53" y="54" fontSize="6" fill="#2a5c8f" fontFamily="monospace">H</text>
                </svg>
            )
        },
        {
            top: "75%", left: "2%", opacity: 0.15, rotate: "-10deg", delay: 1.7, y: 6, dur: 3.9, svg: (
                <svg width="65" height="30" viewBox="0 0 65 30">
                    <circle cx="10" cy="15" r="6" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="16" y1="11" x2="42" y2="11" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="16" y1="15" x2="42" y2="15" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="16" y1="19" x2="42" y2="19" stroke="#2a5c8f" strokeWidth="1.5" />
                    <circle cx="48" cy="15" r="6" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <text x="7" y="19" fontSize="7" fill="#2a5c8f" fontFamily="monospace">N</text>
                    <text x="45" y="19" fontSize="7" fill="#2a5c8f" fontFamily="monospace">N</text>
                </svg>
            )
        },
        {
            top: "20%", left: "90%", opacity: 0.16, rotate: "15deg", delay: 0.2, y: 7, dur: 5.4, svg: (
                <svg width="60" height="60" viewBox="0 0 60 60">
                    <polygon points="30,5 52,18 52,42 30,55 8,42 8,18" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <polygon points="30,14 44,22 44,38 30,46 16,38 16,22" fill="none" stroke="#2a5c8f" strokeWidth="1" />
                </svg>
            )
        },
        {
            top: "62%", left: "88%", opacity: 0.15, rotate: "-8deg", delay: 1.1, y: 5, dur: 4.2, svg: (
                <svg width="80" height="35" viewBox="0 0 80 35">
                    <circle cx="10" cy="18" r="6" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="16" y1="18" x2="32" y2="18" stroke="#2a5c8f" strokeWidth="1.5" />
                    <circle cx="38" cy="18" r="6" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="44" y1="18" x2="60" y2="18" stroke="#2a5c8f" strokeWidth="1.5" />
                    <circle cx="66" cy="18" r="6" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <text x="7" y="22" fontSize="7" fill="#2a5c8f" fontFamily="monospace">C</text>
                    <text x="35" y="22" fontSize="7" fill="#2a5c8f" fontFamily="monospace">C</text>
                    <text x="63" y="22" fontSize="7" fill="#2a5c8f" fontFamily="monospace">C</text>
                </svg>
            )
        },
        {
            top: "88%", left: "88%", opacity: 0.15, rotate: "5deg", delay: 0.7, y: 8, dur: 4.9, svg: (
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <polygon points="25,4 44,15 44,35 25,46 6,35 6,15" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <polygon points="25,12 37,19 37,31 25,38 13,31 13,19" fill="none" stroke="#2a5c8f" strokeWidth="1" />
                </svg>
            )
        },
        {
            top: "8%", left: "25%", opacity: 0.12, rotate: "-18deg", delay: 1.5, y: 6, dur: 5.0, svg: (
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <polygon points="25,4 44,15 44,35 25,46 6,35 6,15" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <polygon points="25,12 37,19 37,31 25,38 13,31 13,19" fill="none" stroke="#2a5c8f" strokeWidth="1" />
                </svg>
            )
        },
        {
            top: "33%", left: "68%", opacity: 0.11, rotate: "14deg", delay: 0.4, y: 7, dur: 4.6, svg: (
                <svg width="65" height="30" viewBox="0 0 65 30">
                    <circle cx="10" cy="15" r="6" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="16" y1="11" x2="42" y2="11" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="16" y1="15" x2="42" y2="15" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="16" y1="19" x2="42" y2="19" stroke="#2a5c8f" strokeWidth="1.5" />
                    <circle cx="48" cy="15" r="6" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <text x="7" y="19" fontSize="7" fill="#2a5c8f" fontFamily="monospace">N</text>
                    <text x="45" y="19" fontSize="7" fill="#2a5c8f" fontFamily="monospace">N</text>
                </svg>
            )
        },
        {
            top: "5%", left: "82%", opacity: 0.25, rotate: "-6deg", delay: 2, y: 7, dur: 4.5, svg: (
                <div style={{ width: "clamp(100px, 12vw, 220px)", height: "clamp(100px, 12vw, 220px)" }}>
                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="18" stroke={bannerColor} strokeWidth="1" />
                        <circle cx="50" cy="50" r="32" stroke={bannerColor} strokeWidth="0.8" />
                        <circle cx="50" cy="50" r="46" stroke={bannerColor} strokeWidth="0.6" />
                        <circle cx="50" cy="4" r="3" fill={bannerColor} />
                        <circle cx="96" cy="50" r="2.5" fill={bannerColor} />
                        <circle cx="50" cy="96" r="3.5" fill={bannerColor} />
                        <circle cx="4" cy="50" r="2" fill={bannerColor} />
                    </svg>
                </div>)
        },
        {
            top: "65%", left: "52%", opacity: 0.11, rotate: "-6deg", delay: 1.9, y: 5, dur: 4.1, svg: (
                <svg width="60" height="35" viewBox="0 0 60 35">
                    <circle cx="10" cy="18" r="7" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="17" y1="15" x2="40" y2="15" stroke="#2a5c8f" strokeWidth="1.5" />
                    <line x1="17" y1="21" x2="40" y2="21" stroke="#2a5c8f" strokeWidth="1.5" />
                    <circle cx="47" cy="18" r="7" fill="none" stroke="#2a5c8f" strokeWidth="1.5" />
                    <text x="7" y="22" fontSize="7" fill="#2a5c8f" fontFamily="monospace">C</text>
                    <text x="44" y="22" fontSize="7" fill="#2a5c8f" fontFamily="monospace">O</text>
                </svg>
            )
        },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            {formulas.map((el, i) => (
                <motion.span
                    key={`formula-${i}`}
                    className="absolute font-mono select-none"
                    style={{
                        top: el.top,
                        left: el.left,
                        fontSize: el.size,
                        rotate: el.rotate,
                        opacity: el.opacity,
                        color: getColor(el.top),
                    }}
                    animate={{ y: [0, -el.y, 0] }}
                    transition={{ duration: el.dur, delay: el.delay, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {el.content}
                </motion.span>
            ))}

            {icons.map((el, i) => (
                <motion.span
                    key={`icon-${i}`}
                    className="absolute select-none"
                    style={{
                        top: el.top,
                        left: el.left,
                        fontSize: el.size,
                        rotate: el.rotate,
                        opacity: el.opacity,
                    }}
                    animate={{ y: [0, -el.y, 0] }}
                    transition={{ duration: el.dur, delay: el.delay, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {el.content}
                </motion.span>
            ))}

            {bonds.map((el, i) => (
                <motion.div
                    key={`bond-${i}`}
                    className="absolute select-none"
                    style={{
                        top: el.top,
                        left: el.left,
                        rotate: el.rotate,
                        opacity: el.opacity,
                    }}
                    animate={{ y: [0, -el.y, 0] }}
                    transition={{ duration: el.dur, delay: el.delay, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {el.svg}
                </motion.div>
            ))}
        </div>
    );
}

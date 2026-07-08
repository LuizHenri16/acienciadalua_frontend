const formulas = [
  { content: "H₂O", top: "6%", left: "48%", size: "0.9rem", rotate: "10deg", opacity: 0.18, y: 8, dur: 4.2, delay: 0 },
  { content: "NaCl", top: "30%", left: "1%", size: "0.85rem", rotate: "-8deg", opacity: 0.16, y: 6, dur: 5.0, delay: 0.5 },
  { content: "CO₂", top: "52%", left: "3%", size: "0.85rem", rotate: "5deg", opacity: 0.16, y: 7, dur: 4.6, delay: 1.2 },
  { content: "O₂", top: "15%", left: "5%", size: "0.85rem", rotate: "-12deg", opacity: 0.16, y: 8, dur: 5.2, delay: 2 },
  { content: "NH₃", top: "80%", left: "88%", size: "0.85rem", rotate: "8deg", opacity: 0.16, y: 5, dur: 4.4, delay: 0.8 },
  { content: "C₂H₆O", top: "48%", left: "62%", size: "0.8rem", rotate: "-9deg", opacity: 0.12, y: 6, dur: 5.1, delay: 1.5 },
  { content: "C₆H₁₂O₆", top: "78%", left: "45%", size: "0.8rem", rotate: "4deg", opacity: 0.12, y: 7, dur: 4.3, delay: 0.3 },
  { content: "CaCO₃", top: "35%", left: "78%", size: "0.8rem", rotate: "12deg", opacity: 0.12, y: 5, dur: 4.5, delay: 1.8 },
];

const icons = [
  { content: "⚗️", top: "3%", left: "2%", size: "1.5rem", rotate: "0deg", opacity: 0.20, y: 8, dur: 10, delay: 0 },
  { content: "🔬", top: "65%", left: "93%", size: "1.4rem", rotate: "0deg", opacity: 0.20, y: 6, dur: 4.9, delay: 1.5 },
  { content: "🧪", top: "85%", left: "4%", size: "1.3rem", rotate: "0deg", opacity: 0.18, y: 7, dur: 5.0, delay: 0.5 },
  { content: "🧬", top: "25%", left: "55%", size: "1.2rem", rotate: "0deg", opacity: 0.14, y: 6, dur: 4.8, delay: 2 },
  { content: "⚛️", top: "60%", left: "28%", size: "1.2rem", rotate: "0deg", opacity: 0.13, y: 8, dur: 5.2, delay: 1 },
  { content: "📝", top: "40%", left: "2%", size: "1.2rem", rotate: "0deg", opacity: 0.18, y: 7, dur: 4.1, delay: 0.8 },
];

const turquesaAlpha = "rgba(109,213,202,";
const turquesaDarkAlpha = "rgba(44,158,149,";
const rosaAlpha = "rgba(212,114,138,";
function getColor(top: string) {
  const t = parseFloat(top);
  if (t < 35) return turquesaAlpha + "0.5)";
  if (t < 65) return turquesaDarkAlpha + "0.4)";
  return rosaAlpha + "0.4)";
}

function FloatSpan({ el, type }: { el: typeof formulas[number]; type: string }) {
  return (
    <span
      className={`absolute select-none ${type === 'formula' ? 'font-mono' : ''}`}
      style={{
        top: el.top,
        left: el.left,
        fontSize: el.size,
        rotate: el.rotate,
        opacity: el.opacity,
        color: type === 'formula' ? getColor(el.top) : undefined,
        '--float-y': `-${el.y}px`,
        animation: `float-y ${el.dur}s ease-in-out ${el.delay}s infinite`,
        willChange: 'transform',
      } as React.CSSProperties}
      aria-hidden="true"
    >
      {el.content}
    </span>
  );
}

export function ChemistryBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] select-none">
        <line x1="48%" y1="6%" x2="35%" y2="35%" stroke="#6DD5CA" strokeWidth="1" />
        <line x1="48%" y1="6%" x2="55%" y2="25%" stroke="#6DD5CA" strokeWidth="1" />
        <line x1="55%" y1="25%" x2="62%" y2="48%" stroke="#2C9E95" strokeWidth="1" />
        <line x1="78%" y1="35%" x2="45%" y2="78%" stroke="#D4728A" strokeWidth="1" />
        <line x1="3%" y1="52%" x2="45%" y2="78%" stroke="#D4728A" strokeWidth="0.8" />
        <line x1="1%" y1="30%" x2="5%" y2="15%" stroke="#6DD5CA" strokeWidth="0.8" />
      </svg>

      {formulas.map((el, i) => (
        <FloatSpan key={`f-${i}`} el={el} type="formula" />
      ))}

      {icons.map((el, i) => (
        <FloatSpan key={`i-${i}`} el={el} type="icon" />
      ))}

      <span
        className="absolute select-none"
        style={{
          top: "5%", left: "82%", opacity: 0.25,
          animation: "float-y 4.5s ease-in-out 2s infinite",
          '--float-y': '-7px',
          willChange: 'transform',
        } as React.CSSProperties}
      >
        <div style={{ width: "clamp(100px, 12vw, 220px)", height: "clamp(100px, 12vw, 220px)" }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="18" stroke={getColor("5%")} strokeWidth="1" />
            <circle cx="50" cy="50" r="32" stroke={getColor("5%")} strokeWidth="0.8" />
            <circle cx="50" cy="50" r="46" stroke={getColor("5%")} strokeWidth="0.6" />
            <circle cx="50" cy="4" r="3" fill={getColor("5%")} />
            <circle cx="96" cy="50" r="2.5" fill={getColor("5%")} />
            <circle cx="50" cy="96" r="3.5" fill={getColor("5%")} />
            <circle cx="4" cy="50" r="2" fill={getColor("5%")} />
          </svg>
        </div>
      </span>

      <span
        className="absolute w-1 h-1 rounded-full bg-turquesa select-none"
        style={{
          top: "40%", left: "70%", opacity: 0.25,
          animation: "orbit 4s ease-in-out 1s infinite",
          willChange: 'transform',
        } as React.CSSProperties}
      />
      <span
        className="absolute w-1 h-1 rounded-full bg-turquesa select-none"
        style={{
          top: "80%", left: "20%", opacity: 0.2,
          animation: "orbit 3.5s ease-in-out 2s infinite",
          willChange: 'transform',
        } as React.CSSProperties}
      />
      <span
        className="absolute w-1 h-1 rounded-full bg-turquesa select-none"
        style={{
          top: "20%", left: "75%", opacity: 0.2,
          animation: "orbit 5s ease-in-out 0.5s infinite",
          willChange: 'transform',
        } as React.CSSProperties}
      />
    </div>
  );
}

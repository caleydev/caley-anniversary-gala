interface Props {
  size?: number;
  line1?: string;
  line2?: string;
  className?: string;
}

export function AnniversarySeal({
  size = 140,
  line1 = "CALEY INSURANCE",
  line2 = "8TH ANNIVERSARY",
  className = "",
}: Props) {
  const r = size / 2;
  // Circular text path radius
  const textR = r - 14;
  const id = "seal-circle";

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Outer drop shadow / glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "0 18px 40px -10px rgba(0,0,0,0.7), 0 0 60px -10px rgba(245,199,107,0.45)",
        }}
      />
      {/* Metallic medallion */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, #fff4d2 0%, #f5c76b 22%, #d6a84f 55%, #8a6824 100%)",
          boxShadow:
            "inset 0 2px 3px rgba(255,255,255,0.7), inset 0 -6px 14px rgba(80,55,10,0.7), inset 0 0 0 1px rgba(255,235,180,0.4)",
        }}
      >
        {/* Brushed metal subtle lines */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            background:
              "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.08) 0deg 2deg, rgba(0,0,0,0.06) 2deg 4deg)",
          }}
        />
        {/* Glint */}
        <div
          className="absolute inset-0 animate-[sealGlint_5s_ease-in-out_infinite]"
          style={{
            background:
              "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
          }}
        />
      </div>

      {/* Inner beveled ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 10,
          background:
            "radial-gradient(circle at 35% 30%, #fff0c8 0%, #e7b96a 50%, #a47a2c 100%)",
          boxShadow:
            "inset 0 1px 2px rgba(255,255,255,0.6), inset 0 -3px 8px rgba(60,40,5,0.6), 0 0 0 1px rgba(120,85,25,0.7)",
        }}
      />

      {/* Circular text */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        style={{ filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.4))" }}
      >
        <defs>
          <path
            id={id}
            d={`M ${r},${r} m -${textR},0 a ${textR},${textR} 0 1,1 ${textR * 2},0 a ${textR},${textR} 0 1,1 -${textR * 2},0`}
          />
        </defs>
        <text
          fill="#3a2608"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: Math.max(7, size * 0.065),
            letterSpacing: size * 0.025,
            fontWeight: 700,
          }}
        >
          <textPath href={`#${id}`} startOffset="0%">
            {line1} • {line2} •
          </textPath>
        </text>
      </svg>

      {/* Center "8" */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontFamily: "'Cinzel', serif",
          fontWeight: 700,
          fontSize: size * 0.42,
          lineHeight: 1,
          color: "#2a1b04",
          textShadow:
            "0 2px 0 rgba(255,235,180,0.55), 0 -1px 0 rgba(60,40,5,0.5)",
        }}
      >
        8
      </div>

      <style>{`
        @keyframes sealGlint {
          0%, 100% { transform: translateX(-30%); opacity: 0.0; }
          50% { transform: translateX(30%); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

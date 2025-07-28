'use client';
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ProductionAudio from "../components/ProductionAudio";

// Dot positions for the production room
const dots = [
  { left: "36%", top: "62%", text: "Aloe Vera Inspection Area" },
  { left: "48%", top: "44%", text: "Banana Inspection Area" },
  { left: "60%", top: "32%", text: "Solar Power Source" },
  { left: "70%", top: "54%", text: "Bacteria Syntehsis machine" },
];

export default function Production() {
  const router = useRouter();
  return (
    <>
      <ProductionAudio />
      <div className="relative w-full h-full min-w-max">
        <video
          src="/production.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-auto h-full object-contain z-0"
        />
        {/* Dots overlay */}
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute group"
            style={{ left: dot.left, top: dot.top }}
          >
            <span className="w-12 h-12 bg-blue-200/40 border border-blue-300/40 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center animate-pulse transition-all duration-300 cursor-pointer relative">
              <span className="w-3 h-3 bg-blue-400/70 rounded-full blur-[2px]" />
              {/* Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-3 py-1 bg-blue-200/90 text-blue-800 text-xs rounded-full shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-30 border border-blue-300/40">
                {dot.text}
              </span>
            </span>
          </div>
        ))}
        {/* Arrow icon near the right edge, vertically centered next to the door */}
        <div
          className="absolute group"
          style={{ right: '6%', top: '38%' }}
        >
          <button
            onClick={() => router.push('/banana-farm')}
            className="w-12 h-12 bg-blue-200/40 border border-blue-300/40 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center animate-pulse transition-all duration-300 cursor-pointer relative"
            aria-label="Go to Banana Farm"
          >
            <ArrowRight className="w-7 h-7 text-blue-500 drop-shadow" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-3 py-1 bg-blue-200/90 text-blue-800 text-xs rounded-full shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-30 border border-blue-300/40">
              Go to Banana Farm
            </span>
          </button>
        </div>
      </div>
    </>
  );
} 
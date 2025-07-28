'use client';
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import FarmAudio from "../components/FarmAudio";

// Dot positions for the banana farm
const dots = [
  { left: "25%", top: "45%", text: "Banana Trees" },    
  { left: "45%", top: "35%", text: "Greenhouse" },
  { left: "65%", top: "55%", text: "Watering System" },
  { left: "80%", top: "40%", text: "Harvest Area" },
];

export default function BananaFarm() {
  const router = useRouter();
  return (
    <>
      <FarmAudio />
      <div className="relative w-full h-full min-w-max">
        <video
          src="/banana farm.mp4"
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
        {/* Arrow icon near the right edge, vertically centered */}
        <div
          className="absolute group"
          style={{ right: '6%', top: '48%' }}
        >
          <button
            onClick={() => router.push('/bath-room')}
            className="w-12 h-12 bg-blue-200/40 border border-blue-300/40 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center animate-pulse transition-all duration-300 cursor-pointer relative"
            aria-label="Go to Bath Room"
          >
            <ArrowRight className="w-7 h-7 text-blue-500 drop-shadow" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-3 py-1 bg-blue-200/90 text-blue-800 text-xs rounded-full shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-30 border border-blue-300/40">
              Go to Bath Room
            </span>
          </button>
        </div>
      </div>
    </>
  );
} 
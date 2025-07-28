'use client';
import { useEffect, useRef } from 'react';

export default function ProductionAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.volume = 0.3; // Start at 30% volume
    audio.loop = true;
    
    // Auto-play when component mounts
    const playAudio = async () => {
      try {
        await audio.play();
        console.log('Production audio started playing');
      } catch {
        console.log('Auto-play prevented by browser, user interaction required');
      }
    };

    playAudio();

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/sound/production.wav"
      preload="auto"
    />
  );
} 
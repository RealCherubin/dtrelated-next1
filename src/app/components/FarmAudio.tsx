'use client';
import { useEffect, useRef, useState } from 'react';

export default function FarmAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.volume = 0.3; // Start at 30% volume
    audio.loop = true;
    
    // Function to start audio
    const playAudio = async () => {
      try {
        await audio.play();
        console.log('Farm audio started playing');
      } catch {
        console.log('Auto-play prevented by browser, user interaction required');
      }
    };

    // Try to auto-play on mount (works on desktop)
    playAudio();

    // Handle user interaction for mobile
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        playAudio();
        // Remove listeners after first interaction
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      }
    };

    // Add listeners for user interaction
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [hasInteracted]);

  return (
    <audio
      ref={audioRef}
      src="https://d3t3v3en8zpiwh.cloudfront.net/files%20for%20dt%20related/files%20for%20dt%20related/farm.wav"
      preload="auto"
    />
  );
} 
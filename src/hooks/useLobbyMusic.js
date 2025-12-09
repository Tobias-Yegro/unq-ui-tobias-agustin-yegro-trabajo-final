import { useEffect, useRef } from "react";
import { createSound } from "../services/audio/createSound";

export function useLobbyMusic(src) {
  const musicRef = useRef(null);

  useEffect(() => {
    musicRef.current = createSound(src);
    musicRef.current.loop = true;

    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
    };
  }, [src]);

  const play = () => {
    if (musicRef.current) {
      musicRef.current.play().catch(() => {});
    }
  };

  const stop = () => {
    if (!musicRef.current) return;
    musicRef.current.pause();
    musicRef.current.currentTime = 0;
  };

  return { play, stop };
}

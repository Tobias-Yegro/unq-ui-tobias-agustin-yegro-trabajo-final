import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [volume, setVolume] = useState(1);
  const musicRef = useRef(null);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = volume;
    }
  }, [volume]);

  const playSound = useCallback(
    (src) => {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.play().catch(() => {});
    },
    [volume]
  );

  const playMusic = useCallback(
    (src, { loop = true } = {}) => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }

      const audio = new Audio(src);
      audio.volume = volume;
      audio.loop = loop;

      musicRef.current = audio;

      audio.play().catch(() => {});
    },
    [volume]
  );

  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        volume,
        setVolume,
        playSound,
        playMusic,
        stopMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);

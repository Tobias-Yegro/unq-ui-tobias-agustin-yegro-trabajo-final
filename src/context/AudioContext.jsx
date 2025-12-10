import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [volume, setVolume] = useState(1);
  const [sfxPlaying, setSfxPlaying] = useState(false);

  const musicRef = useRef(null);
  const sfxRef = useRef(null);

  useEffect(() => {
    if (musicRef.current) musicRef.current.volume = volume;
    if (sfxRef.current) sfxRef.current.volume = volume;
  }, [volume]);

  const playSound = useCallback(
    (src) => {
      const audio = new Audio(src);
      audio.volume = volume;
      sfxRef.current = audio;

      setSfxPlaying(true);

      audio.onended = () => {
        setSfxPlaying(false);
        sfxRef.current = null;
      };

      audio.play().catch(() => {});
    },
    [volume]
  );

  const playMusic = useCallback(
    (src, loop = true) => {
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
        sfxPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);

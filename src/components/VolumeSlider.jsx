import { useAudio } from "../context/AudioContext";

export default function VolumeSlider() {
  const { volume, setVolume } = useAudio();

  const getIcon = () => {
    if (volume === 0) return "🔇";
    if (volume < 0.34) return "🔈";
    if (volume < 0.67) return "🔉";
    return "🔊";
  };

  return (
    <div className="volume-control">
      <span className="volume-icon">{getIcon()}</span>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="volume-slider"
      />
    </div>
  );
}

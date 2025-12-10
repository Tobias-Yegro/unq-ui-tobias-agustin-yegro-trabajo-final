import "../styles/StartScreen.css";
import clickSound from "../assets/sounds/click.mp3";
import { useTransition } from "../hooks/useTransition";
import { useAudio } from "../context/AudioContext";

function StartScreen({ onPlay }) {
    const { startTransition } = useTransition();
    const { playSound } = useAudio();

    const handlePlay = () => {
        playSound(clickSound);

        startTransition(onPlay, 200);
    };

    return (
        <div className="start-container">
            <button className="start-button" onClick={handlePlay}>
                PLAY
            </button>
        </div>
    );
}

export default StartScreen;

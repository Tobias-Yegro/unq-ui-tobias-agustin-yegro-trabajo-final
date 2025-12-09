import "../styles/StartScreen.css";
import clickSound from "../assets/sounds/click.mp3";
import { createSound } from "../services/audio/createSound";

function StartScreen({ onPlay }) {

    const handlePlay = () => {
        const audio = createSound(clickSound);
        audio.play().catch(() => {});

        setTimeout(() => {
            onPlay();
        }, 200);
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

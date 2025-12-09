import "../styles/StartScreen.css";
import clickSound from "../assets/sounds/click.mp3";

function StartScreen({ onPlay }) {

    const handlePlay = () => {
        const audio = new Audio(clickSound);
        audio.play();

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
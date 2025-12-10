import "../styles/DifficultySelector.css";
import greenWork from "../assets/characters/GreenWork.gif";
import difficultyClick from "../assets/sounds/click.mp3";
import { useAudio } from "../context/AudioContext";

function DifficultySelector({ difficulties, onSelect }) {
    const { playSound } = useAudio();

    const handleClick = (difficulty) => {
        playSound(difficultyClick);
        onSelect(difficulty);
    };

    return (
        <div className="DS-container">
            <h2 className="DS-subtitle">Choose a difficulty:</h2>

            <div className="DS-buttons">
                {difficulties.map((difficulty) => (
                    <button
                        key={difficulty}
                        onClick={() => handleClick(difficulty)}
                        className={`DS-button DS-${difficulty}`}
                    >
                        {difficulty}
                    </button>
                ))}
            </div>

            <img 
                src={greenWork} 
                alt="character animation" 
                className="DS-character"
            />
        </div>
    );
}

export default DifficultySelector;

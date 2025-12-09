import { useRef } from "react";
import "../styles/DifficultySelector.css";
import greenWork from "../assets/characters/GreenWork.gif";
import difficultyClick from "../assets/sounds/click.mp3";

function DifficultySelector({ difficulties, onSelect }) {

    const clickSound = useRef(new Audio(difficultyClick));

    const handleClick = (difficulty) => {
        const audio = clickSound.current;
        audio.currentTime = 0;
        audio.play().catch(() => {});
        onSelect(difficulty);
    };

    return (
        <div className="difficulty-container">
            <h2 className="subtitle">Choose a difficulty:</h2>

            <div className="difficulty-buttons">
                {difficulties.map((difficulty) => (
                    <button
                        key={difficulty}
                        onClick={() => handleClick(difficulty)}
                        className={`difficulty-button difficulty-${difficulty}`}
                    >
                        {difficulty}
                    </button>
                ))}
            </div>

            <img 
              src={greenWork} 
              alt="character animation" 
              className="difficulty-character"
            />
        </div>
    );
}

export default DifficultySelector;

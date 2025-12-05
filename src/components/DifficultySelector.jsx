import "../styles/DifficultySelector.css";
import greenWork from "../assets/characters/GreenWork.gif";

function DifficultySelector({ difficulties, onSelect }) {
    return (
        <div className="difficulty-container">
            <h2 className="subtitle">Choose a difficulty:</h2>

            <div className="difficulty-buttons">
                {difficulties.map((difficulty) => (
                    <button
                        key={difficulty}
                        onClick={() => onSelect(difficulty)}
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

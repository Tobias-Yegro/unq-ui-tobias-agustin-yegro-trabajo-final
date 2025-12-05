import "../styles/DifficultySelector.css";

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
        </div>
    );
}

export default DifficultySelector;

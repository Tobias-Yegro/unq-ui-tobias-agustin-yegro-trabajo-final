import "../styles/DifficultySelector.css";

function DifficultySelector({ difficulties, onSelect }) {
    return (
        <div>
            <h2>Elegí una dificultad:</h2>

            {difficulties.map((difficulty) => (
                <button
                    key={difficulty}
                    onClick={() => onSelect(difficulty)}
                    className="difficulty-button"
                >
                    {difficulty}
                </button>
            ))}
        </div>
    );
}

export default DifficultySelector;

function DifficultySelector({ difficulties, onSelect }) {
  return (
    <div>
      <h2>Elegí una dificultad:</h2>

      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => onSelect(difficulty)}
          style={{ marginRight: 10, marginBottom: 10 }}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
}

export default DifficultySelector;

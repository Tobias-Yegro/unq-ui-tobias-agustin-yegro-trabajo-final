function QuestionCard({
    question,
    currentIndex,
    totalQuestions,
    feedback,
    onAnswer,
    onNext
}) {
    return (
        <div>
            <h2>
                Pregunta {currentIndex + 1} de {totalQuestions}
            </h2>

            <p>{question.text}</p>

            <div>
                {question.options.map((op) => (
                    <button
                        key={op.key}
                        onClick={() => onAnswer(op.key)}
                        disabled={feedback !== null}
                    >
                        {op.text}
                    </button>
                ))}
            </div>

            {feedback === "correct" && <p>¡Correcto!</p>}
            {feedback === "incorrect" && <p>Incorrecto</p>}

            {feedback && (
                <button onClick={onNext}>
                    Siguiente
                </button>
            )}
        </div>
    );
}

export default QuestionCard;

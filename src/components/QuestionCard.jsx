import { useEffect, useState, useRef } from "react";
import "../styles/QuestionCard.css";
import green from "../assets/characters/green.png";
import pink from "../assets/characters/pink.png";
import red from "../assets/characters/red.png";
import yellow from "../assets/characters/yellow.png";

const optionIcons = [green, pink, red, yellow];

function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  feedback,
  selectedOption,
  onAnswer,
  onNext,
  timerDuration
}) {

  const [shake, setShake] = useState(false);
  const cardRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const triggerShake = () => setShake(true);
    window.addEventListener("shake-screen", triggerShake);
    return () => window.removeEventListener("shake-screen", triggerShake);
  }, []);

  useEffect(() => {
    if (!shake) return;

    const card = cardRef.current;
    if (!card) return;

    const handleEnd = () => {
      setShake(false);
      onNext();
    };

    card.addEventListener("animationend", handleEnd);
    return () => card.removeEventListener("animationend", handleEnd);

  }, [shake, onNext]);

  useEffect(() => {
    const bar = timerRef.current;
    if (!bar) return;

    const handleTimerEnd = () => {
      if (selectedOption === null) {
        setShake(true);
      }
    };

    bar.addEventListener("animationend", handleTimerEnd);
    return () => bar.removeEventListener("animationend", handleTimerEnd);

  }, [currentIndex, selectedOption]);

  useEffect(() => {
    if (feedback === "correct") {
      const timeout = setTimeout(() => {
        onNext();
      }, 550);

      return () => clearTimeout(timeout);
    }
  }, [feedback, onNext]);

  return (
    <div ref={cardRef} className={`question-card ${shake ? "shake" : ""}`}
      style={{ "--timer-duration": `${timerDuration}ms` }}
    >

      <div className="question-box">
        <p className="question-text">{question.text}</p>
      </div>

      <div className="options-container">
        {question.options.map((op, index) => {
          const isSelected = selectedOption === op.key;
          const isCorrect = feedback === "correct" && isSelected;
          const isIncorrect = feedback === "incorrect" && isSelected;
          const shouldDim = selectedOption !== null && !isSelected;

          return (
            <button
              key={op.key}
              disabled={selectedOption !== null}
              onClick={() => selectedOption === null && onAnswer(op.key)}
              className={`option-button
                ${isCorrect ? "correct-button" : ""}
                ${isIncorrect ? "incorrect-button" : ""}
                ${isSelected ? "selected-option" : ""}
                ${shouldDim ? "dimmed" : ""}
              `}
            >
              <span className="option-text">{op.text}</span>
              <img src={optionIcons[index]} className="option-icon" />
            </button>
          );
        })}
      </div>

      <div className="timer-bar">
        <div
          key={currentIndex}
          ref={timerRef}
          className="timer-fill"
        ></div>
      </div>

      <div className="counter-wrapper">
        <div className="question-counter">
          {currentIndex + 1}/{totalQuestions}
        </div>
      </div>

    </div>
  );
}

export default QuestionCard;

import { useEffect, useState, useRef } from "react";
import "../styles/QuestionCard.css";
import green from "../assets/characters/green.png";
import pink from "../assets/characters/pink.png";
import red from "../assets/characters/red.png";
import yellow from "../assets/characters/yellow.png";
import correctSound from "../assets/sounds/correctAnswer.mp3";
import wrongSound from "../assets/sounds/wrongAnswer.mp3";
import { useAudio } from "../context/AudioContext";

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
  const { playSound } = useAudio();

  useEffect(() => {
    if (feedback === "correct") {
      playSound(correctSound);
    } else if (feedback === "incorrect") {
      playSound(wrongSound);
    }
  }, [feedback, playSound]);

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
      if (selectedOption === null) setShake(true);
    };

    bar.addEventListener("animationend", handleTimerEnd);
    return () => bar.removeEventListener("animationend", handleTimerEnd);

  }, [currentIndex, selectedOption]);

  useEffect(() => {
    if (feedback === "correct") {
      const timeout = setTimeout(() => {
        onNext();
      }, 1900);
      return () => clearTimeout(timeout);
    }
  }, [feedback, onNext]);

  return (
    <div
      ref={cardRef}
      className={`QC-card ${shake ? "QC-shake" : ""}`}
      style={{ "--timer-duration": `${timerDuration}ms` }}
    >

      <div className="QC-box">
        <p className="QC-text">{question.text}</p>
      </div>

      <div className="QC-options">
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
              className={`
                QC-option
                ${isSelected ? "QC-selected" : ""}
                ${isCorrect ? "QC-correct" : ""}
                ${isIncorrect ? "QC-incorrect" : ""}
                ${shouldDim ? "QC-dimmed" : ""}
              `}
            >
              <span className="QC-optionText">{op.text}</span>
              <img src={optionIcons[index]} className="QC-icon" />
            </button>
          );
        })}
      </div>

      <div className="QC-timerBar">
        <div
          key={currentIndex}
          ref={timerRef}
          className="QC-timerFill"
        ></div>
      </div>

      <div className="QC-counterWrapper">
        <div className="QC-counter">
          {currentIndex + 1}/{totalQuestions}
        </div>
      </div>

    </div>
  );
}

export default QuestionCard;

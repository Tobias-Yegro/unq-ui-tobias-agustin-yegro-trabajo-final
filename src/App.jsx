import { useState } from "react";

import { useAudio } from "./context/AudioContext";
import { useDifficulties } from "./hooks/useDifficulties";
import { useTransition } from "./hooks/useTransition";

import { fetchQuestions, postAnswer } from "./services/api";

import DifficultySelector from "./components/DifficultySelector";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import StartScreen from "./components/StartScreen";
import VolumeSlider from "./components/VolumeSlider";

import "./styles/App.css";
import background from "./assets/preguntadosbg.jpg";
import colorBar from "./assets/colorbar.png";
import lobbyMusic from "./assets/sounds/lobbyMusic.mp3";

function App() {
  const [showStart, setShowStart] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const [gameError, setGameError] = useState(null);

  const { playMusic, stopMusic } = useAudio();
  const { difficulties, loading: loadingDifficulties, error: difficultyError } = useDifficulties();

  const { transitioning, startTransition } = useTransition(400);

  const getTimerDuration = (difficulty) => {
    switch (difficulty) {
      case "easy": return 20000;
      case "normal": return 17000;
      case "hard": return 14000;
      case "extreme": return 10000;
      default: return 15000;
    }
  };

  const handleStart = () => {
    playMusic(lobbyMusic);
    startTransition(() => setShowStart(false), 1000);
  };

  const handleSelectDifficulty = (difficulty) => {
    stopMusic();

    startTransition(async () => {
      setSelectedDifficulty(difficulty);
      setGameError(null);
      setGameFinished(false);
      setFeedback(null);
      setCorrectCount(0);
      setCurrentQuestionIndex(0);

      try {
        const data = await fetchQuestions(difficulty);
        setQuestions(data);
      } catch {
        setGameError("Error al cargar las preguntas");
      }
    }, 1000);
  };

  const handleAnswer = async (optionKey) => {
    setSelectedOption(optionKey);
    const question = questions[currentQuestionIndex];

    try {
      const result = await postAnswer({
        questionId: question.id,
        option: optionKey,
      });

      if (result.answer === true) {
        setCorrectCount((prev) => prev + 1);
        setFeedback("correct");
      } else {
        setFeedback("incorrect");
        window.dispatchEvent(new Event("shake-screen"));
      }
    } catch {
      setGameError("Error al enviar la respuesta");
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setFeedback(null);
      setSelectedOption(null);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedDifficulty(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setSelectedOption(null);
    setCorrectCount(0);
    setGameFinished(false);
    setGameError(null);

    setTimeout(() => {
      playMusic(lobbyMusic);
    }, 200);
  };

  const globalError = difficultyError || gameError;

  if (showStart) {
    return (
      <div className="bg-wrapper" style={{ "--bg-image": `url(${background})` }}>
        <div
          className={`transition-overlay ${transitioning ? "" : "fade-out"}`}
          style={{ "--transition-duration": "800ms" }}
        />
        <StartScreen onPlay={handleStart} />
      </div>
    );
  }

  return (
    <div className="bg-wrapper" style={{ "--bg-image": `url(${background})` }}>
      <div
        className={`transition-overlay ${transitioning ? "" : "fade-out"}`}
        style={{ "--transition-duration": "800ms" }}
      />

      <div className="app-page">
        <div className="side-area"></div>

        <div className="center-area">
          <div className="volume-in-panel">
            <VolumeSlider />
          </div>

          <img src={colorBar} className="colorbar top-bar" alt="top" />

          <div className="content">
            {(!selectedDifficulty || gameFinished) && (
              <h1 className="title">Trivia Crack</h1>
            )}

            <div className="title-divider"></div>

            {globalError && <p className="error-text">{globalError}</p>}

            {!selectedDifficulty && !loadingDifficulties && (
              <DifficultySelector
                difficulties={difficulties}
                onSelect={handleSelectDifficulty}
              />
            )}

            {selectedDifficulty && !gameFinished && questions.length > 0 && (
              <QuestionCard
                question={questions[currentQuestionIndex]}
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                feedback={feedback}
                selectedOption={selectedOption}
                onAnswer={handleAnswer}
                onNext={handleNext}
                timerDuration={getTimerDuration(selectedDifficulty)}
              />
            )}

            {gameFinished && (
              <ResultScreen
                correctCount={correctCount}
                totalQuestions={questions.length}
                onRestart={handleRestart}
              />
            )}
          </div>

          <img src={colorBar} className="colorbar bottom-bar" alt="bottom" />
        </div>

        <div className="side-area"></div>
      </div>
    </div>
  );
}

export default App;

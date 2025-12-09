import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "../styles/ResultScreen.css";
import clickSound from "../assets/sounds/click.mp3";
import resultSound from "../assets/sounds/resultSound.mp3";

function ResultScreen({ correctCount, totalQuestions, onRestart }) {
    const ratio = correctCount / totalQuestions;

    const clickAudio = new Audio(clickSound);
    const musicRef = useRef(null);

    const getColorClass = () => {
        if (ratio < 0.4) return "score-red";
        if (ratio < 0.6) return "score-orange";
        if (ratio < 0.8) return "score-yellow";
        return "score-green";
    };

    const { width, height } = useWindowSize();

    const [showConfetti, setShowConfetti] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [showRestart, setShowRestart] = useState(false);

    useEffect(() => {
        musicRef.current = new Audio(resultSound);
        musicRef.current.volume = 0.20;
        musicRef.current.play().catch(() => {});
      }, []);

    useEffect(() => {
        setTimeout(() => setShowConfetti(false), 4000);
        setTimeout(() => setFadeOut(true), 2500);
        setTimeout(() => setShowRestart(true), 5000);
    }, []);

    const handleRestartClick = () => {
        clickAudio.currentTime = 0;
        clickAudio.play();
        setTimeout(() => onRestart(), 120);
    };

    return (
        <>
            {showConfetti && <Confetti width={width} height={height} />}

            <div className="result-container">
                <div className="result-card">
                    <h2 className="result-title">Game finished</h2>
                    <p className={`result-text ${getColorClass()}`}>
                        Correct answers: {correctCount} / {totalQuestions}
                    </p>
                </div>
            </div>

            <div className={`fade-overlay ${fadeOut ? "active" : ""}`}></div>

            {showRestart && (
                <div className="restart-overlay">
                    <button onClick={handleRestartClick} className="restart-big-button">
                        PLAY AGAIN
                    </button>
                </div>
            )}
        </>
    );
}

export default ResultScreen;

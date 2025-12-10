import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "../styles/ResultScreen.css";
import clickSound from "../assets/sounds/click.mp3";
import resultSound from "../assets/sounds/resultSound.mp3";
import { useAudio } from "../context/AudioContext";
import { useTransition } from "../hooks/useTransition";

function ResultScreen({ correctCount, totalQuestions, onRestart }) {
    const ratio = correctCount / totalQuestions;

    const { width, height } = useWindowSize();
    const { playMusic, stopMusic, playSound } = useAudio();
    const { startTransition } = useTransition();

    const [showConfetti, setShowConfetti] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [showRestart, setShowRestart] = useState(false);

    const getColorClass = () => {
        if (ratio < 0.4) return "score-red";
        if (ratio < 0.6) return "score-orange";
        if (ratio < 0.8) return "score-yellow";
        return "score-green";
    };

    useEffect(() => {
        playMusic(resultSound, false);

        return () => {
            stopMusic();
        };
    }, [playMusic, stopMusic]);

    useEffect(() => {
        const t1 = setTimeout(() => setShowConfetti(false), 4000);
        const t2 = setTimeout(() => setFadeOut(true), 2500);
        const t3 = setTimeout(() => setShowRestart(true), 5000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    const handleRestartClick = () => {
        playSound(clickSound);

        startTransition(() => {
            stopMusic();
            onRestart();
        }, 150);
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
                    <button className="restart-big-button" onClick={handleRestartClick}>
                        PLAY AGAIN
                    </button>
                </div>
            )}
        </>
    );
}

export default ResultScreen;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./quiznav.module.css";

const QuizNav:React.FC = (): React.ReactElement => {
    const navigate = useNavigate();

    const goToLanding = (): void => {
        navigate('/');
    };

    return (
        <nav className={`${styles.quizNavContainer} flex dir-row align-center justify-center`}>
            <button onClick={goToLanding} className={styles.quizHubBtn}>
                <span className={styles.quiz}>Quiz</span>&nbsp;<span className={styles.hub}>Hub</span>
            </button>
        </nav>
    )
};

export default QuizNav;

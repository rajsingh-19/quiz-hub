import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./nav.module.css";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const goToLanding = () => {
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <nav className={`${styles.navContainer} flex dir-row align-center`}>
            <div className={styles.brandContainer}>
                <button onClick={goToLanding} className={styles.quizHubBtn}>
                    <span className={styles.quiz}>Quiz</span>&nbsp;<span className={styles.hub}>Hub</span>
                </button>
            </div>
            <div>
                <button onClick={handleLogin} className={styles.loginBtn}>Login</button>
            </div>
        </nav>
    )
};

export default Navbar;


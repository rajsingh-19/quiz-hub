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
            <div className="flex dir-row justify-center">
                <button onClick={goToLanding} className={styles.quizHubBtn}>
                    <span className={styles.quiz}>Quiz</span>&nbsp;<span className={styles.hub}>Hub</span>
                </button>
                <img className={styles.brandLogo} src="https://media.istockphoto.com/id/889895020/vector/mind-icon.jpg?s=612x612&w=0&k=20&c=4235uiE6zP4H1LFnzYPi4i8D79m_v7MX_7ANYiT0eJQ=" alt="brand logo icon" />
            </div>
            <div>
                <button onClick={handleLogin} className={styles.loginBtn}>Login</button>
            </div>
        </nav>
    )
};

export default Navbar;


import React from "react";
import ReactDOM from "react-dom";
import styles from "./loader.module.css";

const Loader: React.FC = () => {
    const loaderRoot = document.getElementById('loader-root');

    if(!loaderRoot) {
        // Handle case where loader-root is not found
        return null;
    };
    
    return ReactDOM.createPortal(
        <div className={styles.loaderOverlay}>
            <div className={styles.loadingDots}>
                <div className="text-30">Loading</div>
                <div className={styles.loadingDotsDot}></div>
                <div className={styles.loadingDotsDot}></div>
                <div className={styles.loadingDotsDot}></div>
            </div>
        </div>,
        loaderRoot
    );
};

export default Loader;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./landing.module.css";
import Navbar from "../../components/nav/Navbar";
import Footer from "../../components/footer/Footer";

const LandingPage: React.FC = () =>  {
    const navigate = useNavigate();

    const handleCategory = (): void => {
        navigate('/category');
    };

    return (
        <div className="flex dir-col">
            <Navbar />
            {/*           Landing Page Featuring Content Section     */}
            <div className={`${styles.bgImg} flex dir-col align-center`}>
                <div className={styles.heading}>
                    Boost IQ & Knowledge, Dive into Quizzes!
                </div>
                <div className={styles.descLine}>
                    "Challenge your mind, expand your horizons, and enrich your intellect with quizzes that enhance both your IQ and general knowledge."
                </div>
                <div className={styles.btnContainer}>
                    <button  onClick={handleCategory} className={styles.getStartedBtn}>Get Started</button>
                </div>
            </div>
            {/*          Description Section     */}
            <div className={`${styles.descriptionContainer} flex dir-row justify-space-btwn`}>
                <div className={styles.description}>
                    <p className={styles.descLine1}>Be a Quiz Master</p>
                    <h1 className={styles.descHeading1}>A better way of learning</h1>
                    <div className={styles.para1}>
                        "Experience a better way of learning with us. Our dynamic approach maximizes comprehension and engagement, ensuring your educational journey is both enriching and effective."
                    </div>
                    <div className={styles.para2}>
                        "Explore a better way of learning with us. Our innovative approach focuses on personalized instruction, interactive resources, and practical applications to enhance your understanding and retention. Say goodbye to traditional rote memorization and hello to engaging, effective learning experiences tailored to your needs. Join us on the path to academic success and unlock your full potential today!"
                    </div>
                    <h2 className={styles.descHeading2}>"Level Up Your Preparation: Get Ready to Excel with Us!"</h2>
                    <div className={styles.para3}>
                        Elevate your quiz performance with our comprehensive preparation materials. From practice questions to expert tips, we provide everything you need to succeed. Access study guides covering a wide range of topics and boost your confidence. Visit our website now and ace your quizzes like a pro!
                    </div>
                </div>
                <div>
                    <img className={styles.quizBanner} src="https://cdn.analyticsvidhya.com/wp-content/uploads/2024/01/cover-page--scaled.jpg" alt="quiz img banner" />
                </div>
            </div>
            {/*         testimonial section         */}
            <div className={`${styles.testimonialContainer} flex dir-col align-center`}>
                <div className={styles.quizHubIconContainer}>
                    <img className={styles.quizHubIcon} src={"https://quiz.konfhub.com/logo-dark.svg"} alt="bg img icon" />
                </div>
                <div className={styles.aboutContainer}>
                    <p>"At Quizhub, we're not just about quizzes; we're about transforming the way people learn.</p>
                    <p>Our platform isn't just a destination for testing knowledge; it's a springboard for personal growth and development.</p>
                    <p>We're committed to providing an engaging and interactive experience that empowers our users to unlock their full potential and succeed in their educational journey."</p>
                    <div className={styles.brandLogoIconContainer}>
                        <img className={styles.brandLogoIcon} src="https://media.istockphoto.com/id/889895020/vector/mind-icon.jpg?s=612x612&w=0&k=20&c=4235uiE6zP4H1LFnzYPi4i8D79m_v7MX_7ANYiT0eJQ=" alt="brand logo icon" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default LandingPage;

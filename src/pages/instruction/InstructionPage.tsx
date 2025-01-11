import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./instruction.module.css";
import QuizNav from "../../components/quiznav/QuizNav";

const InstructionPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    //  Defining the type of description
    interface Rules {
        description: string
    };

    //  Defining the type of list and its description
    const list: Rules[] = [
        { description: "All the questions are of MCQ type." },
        { description: "You have only 30 seconds to answer each question." },
        { description: "You must complete all 10 questions to see your result and compare yourself with other candidates." },
        { description: "You need to mark your answer and click the 'Next' button. Click the 'Submit' button on the last question to submit your responses." },
        { description: "If you want to quit the quiz, click the 'Quit' button." },
        { description: "Your responses will not be saved if you quit the quiz in the middle." }
    ];

    //      define the id type, although it shouldn't be undefined but for surety undefined is also there 
    const handleQuiz = (id: string | undefined): void => {
        navigate(`/quiz/${id}`);
    };

    return (
        <div>
            <QuizNav />
            <div className="flex dir-col align-center">
                <p className={styles.heading}>Rules & Instructions</p>
                <div>
                    <ul className={styles.listContainer}>
                        {
                            list.map(({ description }, index) => (
                                <li key={index}>{description}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className={styles.playBtnContainer}>
                    <button onClick={() => handleQuiz(id)} className={styles.playBtn}>Play</button>
                </div>
            </div>
        </div>
    )
};

export default InstructionPage;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./quizpage.module.css";
import QuizNav from "../../components/quiznav/QuizNav";
import CustomBtn from "../../components/button/CustomBtn";
import Loader from "../../components/loader/Loader";
import { getSubById } from "../../services";
import { RxLapTimer } from "react-icons/rx";

//  Defining the option type
interface Option {
    option: string;
}
//      Defining the types of ques, opt, difficulty and id
interface QuizQuestion {
    _id: string;
    question: string;
    options: Option[];
    difficulty: string;
    correctOption: string; 
}

//      Defining the type of subject and ques & ans
interface QuizData {
    subject: string;
    quesAns: QuizQuestion[];
}

const QuizPage: React.FC = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [answered, setAnswered] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchSubQuiz = async (id: string) => {
            try {
                const response = await getSubById(id);
                const subData = await response.json();

                if(response.status === 200) {
                    setQuizData(subData);
                    setLoading(false);
                    console.log(subData);
                    return;
                } else {
                    console.log(subData.message || "Something went wrong.");
                }
            } catch (error) {
                console.error("Error fetching this subject", error);
            }
        };

        fetchSubQuiz(id as string);
    }, [id]);

    // Log the updated score whenever it changes
    useEffect(() => {
        console.log("Current score:", score);
    }, [score]);
        
    // Handle next question
    const handleNext = () => {
        if (quizData && currentQuestionIndex < quizData.quesAns.length) {
            console.log("Before updating score:", score);
            if (userAnswer === quizData.quesAns[currentQuestionIndex].correctOption) {
                setScore((prevScore) => {
                    const updatedScore = prevScore + 10;  // Calculate new score
                    console.log("Updated score within setScore:", updatedScore);  // Log inside the updater function
                    return updatedScore;
                })
            };

            if (currentQuestionIndex < quizData.quesAns.length - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setUserAnswer(null);
                setAnswered(false);
            } else {
                console.log("Final question reached. You can submit or show results.");
            }
        }
    };

    // Handle option click
    const handleOptionClick = (option: string) => {
        if (!answered) {
            setUserAnswer(option); // Set the selected option
            setAnswered(true); // Mark the question as answered
        };
    };

    // Handle quiz
    const handleQuit = ():void => {
        navigate('/category');
    };

    // Handle submit action
    const handleSubmit = () => {
        if (quizData && userAnswer === quizData.quesAns[currentQuestionIndex].correctOption) {
            setScore((prevScore) => prevScore + 10);  // Update score on submit
        }
        // Logic for submitting the quiz, such as navigating to the results page
        console.log("Quiz submitted!");
        // Example: navigate('/results');
    };

    return (
        <div className="flex dir-col">
            <QuizNav />
            {
                loading ? (
                    <Loader />
                ) : (
                    quizData && (
                        <div className="flex dir-col">
                            {/*         subject and timer container       */}
                            <div className={`${styles.quizHeadContainer} flex dir-row justify-space-btwn`}>
                                <p><span>Subject:</span>&nbsp;{quizData.subject}</p>
                                <p className="flex dir-row align-center"><span>Timer</span>&nbsp;<RxLapTimer /></p>
                            </div>
                            {/*             question and options container       */}
                            {quizData.quesAns.length > 0 && (
                            <div key={quizData.quesAns[currentQuestionIndex]._id} className="flex dir-row justify-center align-center">
                                <div className={`${styles.quesOptionsContainer} flex dir-col align-center position-relative`}>                        
                                    {/*         Question and difficulty container  */}
                                    <div className={`${styles.quesCardContainer} flex dir-col`}>     
                                        <div className={styles.difficulty}>Difficulty:<span>&nbsp;{quizData.quesAns[currentQuestionIndex].difficulty}</span></div>
                                        <div className={styles.quesContainer}>
                                            <span>Ques:</span>&nbsp;<span>{currentQuestionIndex + 1}</span>&nbsp;
                                            {quizData.quesAns[currentQuestionIndex].question}
                                        </div>   
                                    </div>
                                    {/*         Options Container                   */}
                                    {quizData.quesAns[currentQuestionIndex].options.map((option, optIndex) => (
                                        <div key={optIndex} className={`${styles.optionsContainer} flex dir-col align-center`}>
                                            <div>
                                                <input onClick={() => handleOptionClick(option.option)} checked={userAnswer === option.option} disabled={answered} type="text" name={`question-${currentQuestionIndex}`} id={`option-${optIndex}`} readOnly value={option.option} placeholder={option.option} 
                                                    className={`${userAnswer === option.option && answered && option.option === quizData.quesAns[currentQuestionIndex].correctOption ? 
                                                    styles.correctAns :
                                                    userAnswer === option.option && answered && option.option !== quizData.quesAns[currentQuestionIndex].correctOption ? 
                                                    styles.wrongAns : ''}`} 
                                                />
                                            </div>
                                        </div>
                                        ))
                                    }
                                    {/*         Btns Container           */}
                                    <div className={`${styles.btnsContainer} flex dir-row justify-center position-absolute`}>
                                        <div>
                                            <CustomBtn  type={"submit"} onClick={handleQuit} label={"Quit"}/>
                                        </div>
                                        {currentQuestionIndex < quizData.quesAns.length - 1 ? (
                                                <div>
                                                    <CustomBtn  type={"submit"} onClick={handleNext} label={"Next"} />
                                                </div>
                                            ) : (
                                                <div>
                                                    <CustomBtn  type={"submit"} onClick={handleSubmit} label={"Submit"} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>  
                            )}
                        </div>
                    )
                )
            }
        </div>
    )
};

export default QuizPage;

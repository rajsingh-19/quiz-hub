import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./quizpage.module.css";
import { useAuth } from "../../context/userContext";
import QuizNav from "../../components/quiznav/QuizNav";
import CustomBtn from "../../components/button/CustomBtn";
import Loader from "../../components/loader/Loader";
import { getSubById, createScore } from "../../services";
import { RxLapTimer } from "react-icons/rx";
import { toast } from "react-toastify";

//  Defining the option type
interface Option {
    option: string;
};

//      Defining the types of ques, opt, difficulty and id
interface QuizQuestion {
    _id: string;
    question: string;
    options: Option[];
    difficulty: string;
    correctOption: string; 
};

//      Defining the type of subject and ques & ans
interface QuizData {
    subject: string;
    quesAns: QuizQuestion[];
};

const QuizPage: React.FC = () => {
    const { subId } = useParams();
    const { token, userId } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [answered, setAnswered] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(15); // Timer state
    const [timerExpired, setTimerExpired] = useState<boolean>(false);

    //      Fetching the subject quizzes by its id
    useEffect(() => {
        if (!subId || !token) return;

        const fetchSubQuiz = async (quizId: string, token: string) => {
            try {
                const response = await getSubById(quizId, token);
                const subData = await response.json();

                if(response.status === 200) {
                    setQuizData(subData);
                    setLoading(false);
                    return;
                } else {
                    console.log(subData.message || "Something went wrong.");
                }
            } catch (error) {
                console.error("Error fetching this subject", error);
            }
        };

        fetchSubQuiz(subId, token);
    }, [subId, token]);

    // Timer logic
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval on component unmount
        } else {
            setTimerExpired(true); // Timer expired
        }
    }, [timer]);

    // Handle when the timer expires
    useEffect(() => {
        if (timerExpired) {
            if (currentQuestionIndex < (quizData?.quesAns.length || 0) - 1) {
                setAnswered(true);
                handleNext();
            } else {
                handleSubmit();
            }
        }
    }, [timerExpired]);

    // Reset timer on next question or submit
    const resetTimer = () => {
        setTimer(15); // Reset timer to 15 seconds
        setTimerExpired(false);
    };

    // Handle next question
    const handleNext = () => {
        if (quizData && currentQuestionIndex < quizData.quesAns.length) {
            if (userAnswer === quizData.quesAns[currentQuestionIndex].correctOption) {
                setScore((prevScore) => {
                    const updatedScore = prevScore + 10;  // Calculate new score
                    return updatedScore;
                })
            };

            if (currentQuestionIndex < quizData.quesAns.length - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setUserAnswer(null);
                setAnswered(false);

                resetTimer(); // Reset the timer
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
    const handleSubmit = async () => {
        if (!subId || !userId || !token) {
            console.error("Required parameters are missing.");
            return;
        };

        // Add the last question's correctness to the score
        let finalScore = score;
        if (quizData && userAnswer === quizData.quesAns[currentQuestionIndex].correctOption) {
            finalScore += 10; // Add 10 points for the last question if correct
        };
        
        // Directly calculate totalRightAns based on the current score
        const calculatedTotalRightAns = finalScore / 10;
        const calculatedTotalWrongAns = (quizData?.quesAns.length || 0) - calculatedTotalRightAns;
        
        let rightAns = calculatedTotalRightAns;
        let wrongAns = calculatedTotalWrongAns;
        
        // Call the createScore API with try-catch
        try {
            let score = finalScore;
            const res = await createScore(subId, userId, token, score, rightAns, wrongAns);
            const result = await res.json();
            const quizId = result.newScore._id;

            toast.success("Quiz Submitted");
            navigate(`/score/${quizId}`); 
        } catch (error) {
            console.error("Error submitting score:", error);
        }        
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
                                <p className="flex dir-row align-center"><span>{timer}</span>&nbsp;<RxLapTimer /></p>
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

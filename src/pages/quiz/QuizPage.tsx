import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./quizpage.module.css";
import QuizNav from "../../components/quiznav/QuizNav";
import CustomBtn from "../../components/button/CustomBtn";
import Loader from "../../components/loader/Loader";
import { getSubById } from "../../services";
import { RxLapTimer } from "react-icons/rx";

const QuizPage: React.FC = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [quizData, setQuizData] = useState(null);
    
    useEffect(() => {
        const fetchSubQuiz = async (id: string) => {
            try {
                const response = await getSubById(id);
                const subData = await response.json();

                if(response.status === 200) {
                    setLoading(false);
                    setQuizData(subData);
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

    return (
        <div className="flex dir-col">
            <QuizNav />
            {
                loading ? (
                    <Loader />
                ) :
                (
                    <div className="flex dir-col">
                        {/*         subject and timer container       */}
                        <div className={`${styles.quizHeadContainer} flex dir-row justify-space-btwn`}>
                            <p><span>Subject:</span>&nbsp;History</p>
                            <p className="flex dir-row align-center"><span>Timer</span>&nbsp;<RxLapTimer /></p>
                        </div>
                        {/*         Question and difficulty container  */}
                        <div className="flex dir-row justify-center">
                            <div className={`${styles.quesCardContainer} flex dir-col`}>     
                                <div className={styles.difficulty}>Difficulty:<span>&nbsp;Hard</span></div>
                                <div className={styles.quesContainer}>
                                    <span>Ques:</span>&nbsp;<span>2</span>&nbsp;
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam sed veritatis repellendus qui atque repellat beatae sequi et, aut alias quisquam dolorem consequuntur earum libero quidem similique, unde distinctio deleniti?    
                                </div>   
                            </div>
                        </div>
                        {/*         Options Container                   */}
                        <div className="flex dir-col align-center">
                            <div className={styles.optionsContainer}>
                                <div>
                                    <input type="radio" name="option" id="option1" value="Option 1" />
                                    <label htmlFor="option1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, tempore.</label>
                                </div>
                                <div>
                                    <input type="radio" name="option" id="option2" value="Option 2" />
                                    <label htmlFor="option2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, unde!</label>
                                </div>
                                <div>
                                    <input type="radio" name="option" id="option3" value="Option 3" />
                                    <label htmlFor="option3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, nemo?</label>
                                </div>
                                <div>
                                    <input type="radio" name="option" id="option4" value="Option 4" />
                                    <label htmlFor="option4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, amet?</label>
                                </div>
                            </div>
                        </div>
                        {/*         Btns Container           */}
                        <div className="flex dir-row justify-center">
                            <div className={styles.btnsContainer}>
                                <div>
                                    <CustomBtn  type={"submit"} className={"btn outline-none border-none font-wt-700 text-16 m-t-30 cursor-pointer"} label={"Quit"}/>
                                </div>
                                <div>
                                    <CustomBtn  type={"submit"} className={"btn outline-none border-none font-wt-700 text-16 m-t-30 cursor-pointer"} label={"Next"} />
                                </div>
                                <div>
                                    <CustomBtn  type={"submit"} className={"btn outline-none border-none font-wt-700 text-16 m-t-30 cursor-pointer"} label={"Submit"} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default QuizPage;

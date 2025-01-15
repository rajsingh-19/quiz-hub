import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/userContext";
import PieAnimation from "../../components/pieChart/PieAnimation";
import styles from "./score.module.css";
import { getScoreByQuizId } from "../../services/index";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/nav/Navbar";
import { GrAnalytics } from "react-icons/gr";
import { GrScorecard } from "react-icons/gr";

//  Defining the types of score details
interface ScoreDetails {
    score: number;
    rightAns: number;
    wrongAns: number;
};

const ScorePage: React.FC = () => {
    const { quizId } = useParams();
    const { token } = useAuth();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [scoreDetails, setScoreDetails] = useState<ScoreDetails>();
    const [percentages, setPercentages] = useState<{ rightPercentage: number; wrongPercentage: number }>({
        rightPercentage: 0,
        wrongPercentage: 0,
    });

    useEffect(() => {
        if (!quizId || !token) return;

        const fetchScoreByQuizId = async () => {
            try {
                const res = await getScoreByQuizId(quizId, token);
                const resData = await res.json();

                const scoreData = resData.result;
                if(res.status === 200) {
                    setLoading(false);
                    console.log(scoreData);
                    setScoreDetails(scoreData);

                    // Multiply rightAns and wrongAns by 10 to get percentages
                    setPercentages({
                        rightPercentage: scoreData.rightAns * 10,
                        wrongPercentage: scoreData.wrongAns * 10,
                    });
                } else {
                    console.log(resData.message || "Something went wrong.");
                }
            } catch (error) {
                console.error("Error fetching this subject", error);
            }
        };
        fetchScoreByQuizId();
    }, []);

    return (
        <div className="flex dir-col">
            <Navbar />
            {
                loading ? 
                    ( <Loader /> ) : 
                    (scoreDetails && 
                    (<div className={`${styles.scoreSection} flex dir-col align-center`}>
                        <div className={`${styles.scoreContainer} flex dir-row`}>
                            <div className={`${styles.chartContainer} flex dir-col align-center`}>
                                <div className={`${styles.scoreHeading} flex dir-row justify-center align-center`}>
                                    <p>Score Analytics</p><GrAnalytics className={styles.analyticsIcon} />
                                </div>
                                <PieAnimation right={percentages.rightPercentage} wrong={percentages.wrongPercentage} />
                            </div>
                            <div className={`${styles.scoreDetailContainer} flex dir-col justify-center align-center`}>
                                <div className="flex dir-row justify-center align-center m-b-20">
                                    <h1>Your Score</h1>
                                    <GrScorecard className={styles.scoreIcon} />
                                </div>
                                <p className={styles.score}><span>{scoreDetails.score}</span>&nbsp;<span>/</span><span>100</span></p>
                                <div className={`${styles.rightWrongDetails} flex dir-col`}>
                                    <p className="flex dir-row justify-space-btwn"><span>Correct Ans Score</span>{scoreDetails.rightAns}</p>
                                    <p className="flex dir-row justify-space-btwn"><span>InCorrect Ans Score</span>{scoreDetails.wrongAns}</p>
                                </div>
                            </div>
                        </div>
                        {/*             rank button container        */}
                        <div className={`${styles.rankBtnContainer} flex dir-col align-center`}>
                            <p>Know Your Rank Among Other Players</p>
                            <button className={`${styles.rankBtn} border-none outline-none cursor-pointer`}>See Rank</button>
                        </div>
                    </div>)
                )
            }
        </div>
    );
};

export default ScorePage;

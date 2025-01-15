import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/userContext";
import PieAnimation from "../../components/pieChart/PieAnimation";
import styles from "./score.module.css";
import { getScoreByUserId } from "../../services/index";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/nav/Navbar";
import { GrAnalytics } from "react-icons/gr";
import { GrScorecard } from "react-icons/gr";

const ScorePage: React.FC = () => {
    const { quizId } = useParams();
    const { userId, token } = useAuth();
    const [loading, setLoading] = React.useState<boolean>(false);
    // const

    useEffect(() => {
        if (!userId || !token) return;

        // const fetchScoreByUserId = async () => {
        //     try {
        //         const res = await getScoreByUserId(userId, token);
        //         const resData = await res.json();
        //         if(res.status === 200) {
        //             console.log(resData);
        //         } else {
        //             console.log(resData.message || "Something went wrong.");
        //         }
        //     } catch (error) {
        //         console.error("Error fetching this subject", error);
        //     }
        // };
        // fetchScoreByUserId();
        // console.log(userId);
        // console.log(quizId);
        // console.log(token);
    }, []);

    return (
        <div className="flex dir-col">
            <Navbar />
            {
                loading ? 
                    ( <Loader /> ) : 
                    (<div className={`${styles.scoreSection} flex dir-col align-center`}>
                        <div className={`${styles.scoreContainer} flex dir-row`}>
                            <div className={`${styles.chartContainer} flex dir-col align-center`}>
                                <div className={`${styles.scoreHeading} flex dir-row justify-center align-center`}>
                                    <p>Score Analytics</p><GrAnalytics className={styles.analyticsIcon} />
                                </div>
                                <PieAnimation />
                            </div>
                            <div className={`${styles.scoreDetailContainer} flex dir-col justify-center align-center`}>
                                <div className="flex dir-row justify-center align-center m-b-20">
                                    <h1>Your Score</h1>
                                    <GrScorecard className={styles.scoreIcon} />
                                </div>
                                <p className={styles.score}><span>50</span>&nbsp;<span>/</span><span>100</span></p>
                                <div className={`${styles.rightWrongDetails} flex dir-col`}>
                                    <p className="flex dir-row justify-space-btwn"><span>Correct Ans Score</span>30</p>
                                    <p className="flex dir-row justify-space-btwn"><span>InCorrect Ans Score</span>70</p>
                                </div>
                            </div>
                        </div>
                        {/*             rank button container        */}
                        <div className={`${styles.rankBtnContainer} flex dir-col align-center`}>
                            <p>Know Your Rank Among Other Players</p>
                            <button className={`${styles.rankBtn} border-none outline-none cursor-pointer`}>See Rank</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ScorePage;

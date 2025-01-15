import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./rank.module.css";
import Loader from "../../components/loader/Loader";
import { useAuth } from "../../context/userContext";
import { getAllScores } from "../../services";
import Navbar from "../../components/nav/Navbar";
import DataTable from "../../components/grid/DataTable";

interface ScoreArray {
    userId: {name: string};
    score: number;
    rightAns: number;
    wrongAns: number;
};

interface RankData {
    id: number;  
    name: string;
    score: number;
    rank: number;
    rightAns: number;
    wrongAns: number;
};

const RankPage: React.FC = () => {
    const { subId } = useParams();
    const { token } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [scoreArray, setScoreArray] = useState<RankData[]>([]);
    
    useEffect(() => {
        if(!subId || !token) {
            return;
        };  

        const fetchScores = async () => {
            try {
                const result = await getAllScores(subId, token);
                const resultData = await result.json();

                if(result.status === 200) {
                    const fetchedScores: ScoreArray[] = resultData.result;
                    
                    // Sort and assign rank
                    const sortedArray = fetchedScores
                        .sort((a, b) => b.score - a.score)
                        .map((score, index) => ({
                            id: index + 1,  // Added the `id` field
                            name: score.userId.name,  // Extract the name from userId
                            score: score.score,
                            rank: index + 1,           // Assign rank based on sorted order
                            rightAns: score.rightAns,
                            wrongAns: score.wrongAns
                        }));
                    
                    console.log(scoreArray);              
                    console.log(sortedArray);              
                    // Update the state with the ranked data
                    setScoreArray(sortedArray);
                    setLoading(false);
                } else {
                    console.log("Error");
                }
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

        fetchScores();
    }, [subId]);

    return (
        <div className={styles.rankPageContainer}>
            <Navbar />
            <div className="flex dir-row justify-center m-t-30">
                <p className={styles.heading}>Top Scores for this Quiz</p>
            </div>
            {
                loading ?
                ( <Loader /> ) :
                (
                    <div className="flex dir-row justify-center m-t-40">
                        {/*             Rank Page           */}
                        <div className={styles.tableContainer}>
                            <DataTable data={scoreArray} />
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default RankPage;

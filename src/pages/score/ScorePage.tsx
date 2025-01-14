import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const ScorePage: React.FC = () => {
    const { quizId } = useParams();
    const [scoreData, setScoreData] = useState(true);

    useEffect(() => {
        // const fetchScoreDetails = async () => {
        //     const scoreData = await getScoreDetailsById(quiz.Id);

        //     const result = scoreData.json();
        //     console.log(result);
        // };
        // fetchScoreDetails();
        console.log("quizID", quizId);
    }, []);

    return (
        <div>
            {
                scoreData ? (
                    <div>
                        ScorePage
                    </div>
                ) : (
                    <Loader />
                )
            }
        </div>
    );
};

export default ScorePage;

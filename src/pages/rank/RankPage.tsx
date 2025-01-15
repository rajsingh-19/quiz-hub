import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useAuth } from "../../context/userContext";
import { getAllScores } from "../../services";
import Navbar from "../../components/nav/Navbar";

const RankPage: React.FC = () => {
    const { subId } = useParams();
    const { token } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        if(!subId || !token) return;

        const fetchScores = async () => {
            const result = await getAllScores(subId, token);
            const resultData = await result.json();

            if(result.status === 200) {
                setLoading(false);
                console.log(resultData);
            } else {
                console.log("Error");
            }
        };

        fetchScores();
    }, []);

    return (
        <div>
            <Navbar />
            {
                loading ?
                ( <Loader /> ) :
                (
                    <div>
                        Rank Page
                    </div>
                )
            }
        </div>
    )
};

export default RankPage;

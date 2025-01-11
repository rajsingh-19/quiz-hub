import React from "react";
import QuizNav from "../../components/quiznav/QuizNav";
import { useParams } from "react-router-dom";

const QuizPage: React.FC = () => {
    const { id } = useParams();
    
    return (
        <div>
            <QuizNav />
            quiz page
        </div>
    )
};

export default QuizPage;

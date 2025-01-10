import React, { useEffect, useState } from "react";
import Navbar from "../../components/nav/Navbar";
import Loader from "../../components/loader/Loader";
import QuizCard from "../../components/quizCard/QuizCard";
import { getAllQuiz } from "../../services";

interface Category {
    subjectName: string,
    imgUrl: string,
    description: string
};

const CategoryPage: React.FC = () => {
    const [categoryArray, setCategoryArray] = useState<Category[]>([]);
    
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quizRes = await getAllQuiz();
                const quizzes =  await quizRes.json();
                const quizDoc = quizzes.quizzes;
                
                if (quizDoc) {
                    setCategoryArray(quizDoc);
                };
            } catch (error) {
                console.error("Error fetching quiz: ", error);
            }
        };

        fetchQuizData();
    }, []);

    return (
        <div className="flex dir-col">
            <Navbar />
            <div>
                Category Page
                {
                    categoryArray.length > 0 ? (
                        categoryArray.map(({ subjectName, imgUrl, description }) => {
                            return (
                                <QuizCard key={subjectName} subjectName={subjectName} imgUrl={imgUrl} description={description} />
                            )
                        })
                    ) : 
                    (
                        <Loader />
                    )
                }
            </div>
        </div>
    )
};

export default CategoryPage;

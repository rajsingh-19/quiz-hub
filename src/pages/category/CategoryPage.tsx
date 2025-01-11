import React, { useEffect, useState } from "react";
import styles from "./category.module.css";
import Navbar from "../../components/nav/Navbar";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import QuizCard from "../../components/quizCard/QuizCard";
import { getAllQuiz, getSubByCategory } from "../../services";
import { FaFilter } from "react-icons/fa";

// Defining the types of category information
interface Category {
    _id: string
    subjectName: string,
    imgUrl: string,
    description: string
};

// Defining the types of filter 
interface Filter {
    label: string
};

//  Defining the list 
const list: Filter[] = [
    { label: "All"},
    { label: "Literature"},
    { label: "Technology"},
    { label: "Entertainment"},
    { label: "General Knowledge"},
    { label: "Science and Nature"},
    { label: "Sports"}
];

const CategoryPage: React.FC = () => {
    const [categoryArray, setCategoryArray] = useState<Category[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>("All");

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

    const handleCategories = async (category: string) => {
        setActiveFilter(category);

        if (category === "All") {
            const quizRes = await getAllQuiz();
            const quizzes = await quizRes.json();
            const quizDoc = quizzes.quizzes;
            console.log(quizDoc);
            setCategoryArray(quizDoc);
            return;
        };

        try {
            const categoryQuiz = await getSubByCategory(category);
            const subjects = await categoryQuiz.json();
            const quizDoc = subjects.subjects;
            console.log(quizDoc);
            setCategoryArray(quizDoc);
        } catch (error) {
            console.error("Error fetching this category", error);
        }
    };

    return (
        <div className={`${styles.categoryPageContainer} flex dir-col`}>
            <Navbar />
            {/*         filter container     */}
            <div className={styles.listContainer}>
                <ul className={styles.filterListContainer}>
                    <li className={styles.filter}><span className="m-r-3">Filter</span><FaFilter className={styles.filterIcon} /></li>
                    {
                        list.map(({label}, index) => (
                            <li key={index} className={styles.list}>
                                <button onClick={() => handleCategories(label)} className={`${styles.categoryBtns}  ${
                                    activeFilter === label ? styles.activeCategory : ""
                                }`}>{label}</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={styles.categoryContainer}>
                {
                    categoryArray.length > 0 ? (
                        categoryArray.map(({ _id,subjectName, imgUrl, description }) => {
                            return (
                                <QuizCard key={_id} subjectName={subjectName} imgUrl={imgUrl} description={description} />
                            )
                        })
                    ) : 
                    (
                        <Loader />
                    )
                }
            </div>
            <Footer />
        </div>
    )
};

export default CategoryPage;

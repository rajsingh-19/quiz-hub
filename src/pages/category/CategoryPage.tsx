import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./category.module.css";
import Navbar from "../../components/nav/Navbar";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import QuizCard from "../../components/quizCard/QuizCard";
import { getAllQuiz, getSubByCategory } from "../../services";
import { FaFilter } from "react-icons/fa";

// Defining the types of category information
interface Category {
  _id: string;
  subjectName: string;
  imgUrl: string;
  description: string;
}

// Defining the types of filter
interface Filter {
  label: string;
}

//  Defining the list
const list: Filter[] = [
  { label: "All" },
  { label: "Literature" },
  { label: "Technology" },
  { label: "Entertainment" },
  { label: "General Knowledge" },
  { label: "Science and Nature" },
  { label: "Sports" },
];

const CategoryPage: React.FC = () => {
  const [categoryArray, setCategoryArray] = useState<Category[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [dataloaded, setDataLoaded] = useState<boolean>(false);

  const navigate = useNavigate();

  //  Fetching the quizzes data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizRes = await getAllQuiz();
        const quizzes = await quizRes.json();
        const quizDoc = quizzes.filteredQuizzes;
        setDataLoaded(false);

        if (quizDoc) {
          setCategoryArray(quizDoc);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching quiz: ", error);
      }
    };

    fetchQuizData();
  }, []);

  //    filter function
  const handleCategories = async (category: string) => {
    setActiveFilter(category);

    if (category === "All") {
      const quizRes = await getAllQuiz();
      const quizzes = await quizRes.json();
      const quizDoc = quizzes.filteredQuizzes;

      setCategoryArray(quizDoc);
      return;
    }

    try {
      const categoryQuiz = await getSubByCategory(category);
      const subjects = await categoryQuiz.json();
      const quizDoc = subjects.filteredQuizzes;

      setCategoryArray(quizDoc);
    } catch (error) {
      console.error("Error fetching this category", error);
    }
  };

  //    go to instruction page function
  const handleInstruction = (_id: string): void => {
    const subId = _id; // change _id to quizId for convenience
    navigate(`/instruction/${subId}`);
  };

  return (
    <div className={`${styles.categoryPageContainer} flex dir-col position-relative`} >
      <Navbar />
      {/*         filter container     */}
      <div className={styles.listContainer}>
        <ul className={styles.filterListContainer}>
          <li className={styles.filter}>
            <span className="m-r-3">Filter</span>
            <FaFilter className={styles.filterIcon} />
          </li>
          {list.map(({ label }, index) => (
            <li key={index} className={styles.list}>
              <button onClick={() => handleCategories(label)} className={`${styles.categoryBtns}  ${activeFilter === label ? styles.activeCategory : "" }`} >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/*       Quiz Card Section    */}
      <div className={dataloaded ? styles.categoryLoadedContainer : styles.categoryContainer}>
        {categoryArray.length > 0 ? (
          categoryArray.map(({ _id, subjectName, imgUrl, description }) => {
            return (
              <div key={_id}>
                <QuizCard _id={_id} subjectName={subjectName} imgUrl={imgUrl} description={description} handleInstruction={handleInstruction} />
              </div>
            );
          })
        ) : (
          <Loader />
        )}
        <div className={styles.footerContainer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

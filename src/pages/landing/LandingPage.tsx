import { useNavigate } from "react-router-dom";
import Navbar from "../../components/nav/Navbar";

const LandingPage = () =>  {
    const navigate = useNavigate();

    const handleCategory = () => {
        navigate('/category');
    };

    return (
        <div className="flex dir-col">
            <Navbar />
            {/*           Landing Page Content     */}
            <div>
                main page
                <button onClick={handleCategory}>Get Started</button>
            </div>
        </div>
    )
}

export default LandingPage;


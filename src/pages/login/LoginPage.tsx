import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import CustomBtn from "../../components/button/CustomBtn";
import { loginUser } from "../../services";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import lock from "../../assets/lock.svg";

type Errors = {
    email?: string;
    password?: string;
};

//  Define the type of login form data
interface LoginFormData {
    email: string,
    password: string
};

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    //               useState initializes the login data state with default empty values
    const [loginFormData, setLoginFormData] = React.useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(true);
    const [errors, setErrors] = useState<Errors>({});           //          states for handling the form errors
    
    //      function for validating the form inputs by using regex
    const validateForm = () => {
        const errors: Errors = {};          // Use the defined Errors type
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        //      check if the email input is empty
        if (!loginFormData.email.trim()) {
            errors.email = "Email is required";
            //  check if the email format is correct
        } else if (!emailRegex.test(loginFormData.email)) {
            errors.email = "Invalid email format";
        };

        if (loginFormData.password.length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        };

        //      check if the password input is empty
        if (!loginFormData.password.trim()) {
            errors.password = "Password is required";
        }
        //      set the error state 
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    //      Fucntion for user login
    const handleLoginUser = async (e: React.FormEvent) => {
        e.preventDefault();                     // Prevents the default form submission behavior (like refreshing the page)

        if (!validateForm()) {
            return;
        };

        try {
            const res = await loginUser(loginFormData);
            // console.log(res);
            
            if(res.status === 200)  {
                const data = await res.json();
                // console.log(data);
                localStorage.setItem('token', data.token);

                setLoginFormData({
                    email: "",
                    password: ""
                });

                alert("login success");
                navigate('/category');
            } else {
                const errorData = await res.json();
                const errorMessage = errorData.message || "An error occured";
                alert(errorMessage);
            }
        } catch (error) {
            console.log(error);
            alert(`An unexpected error occurs: ${error}`);
        }
    };

    const passwordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    //              function for handle the sign up 
    const handleRegister = () => {
        navigate('/register');
    };

    const handleQuizCatgeory = () => {
        navigate('/category');
    };

    return (
        <div className={`${styles.loginFormContainer} flex dir-col justify-center align-center position-relative`}>
            <div className=" flex dir-col align-center">
                <p className="dm-sans font-wt-700 text-30">Quiz Hub</p>
                <p className="dm-sans font-wt-500 text-19 text-grayClr">The Ultimate Quiz platform</p>
            </div>
            <form onSubmit={handleLoginUser} className={`${styles.loginForm} flex dir-col align-center`}>
                {/* Form for user login */}
                <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                    <input className={`${styles.input} text-16 dm-sans font-wt-500 border-none outline-none`} type="email" name="email" value={loginFormData.email} placeholder="Email" onChange={(e) => setLoginFormData({...loginFormData, [e.target.name]: e.target.value})} />
                </div>
                {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                    <img className={styles.inputIcons} src={lock} alt="lock icon" />
                    <input className={`${styles.passwordInput} text-16 dm-sans font-wt-500 border-none outline-none`}  type={showPassword ? "password" : "text"} name="password" value={loginFormData.password} placeholder="Password" onChange={(e) => setLoginFormData({...loginFormData, [e.target.name]: e.target.value})} />
                    {
                        showPassword ? <IoEyeOffOutline onClick={passwordVisibility} className={`${styles.hideShowIcons} cursor-pointer`} /> : <IoEyeOutline onClick={passwordVisibility} className={`${styles.hideShowIcons} cursor-pointer`} /> 
                    }
                </div>
                {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
                <div className={`${styles.submitBtnContainer} m-t-15`}>
                    <CustomBtn type={"submit"} className={"btn outline-none border-none font-wt-700 text-16 m-t-30 cursor-pointer"} label={"Sign In"} />
                </div>
            </form>
            <div className={`${styles.lastLine} flex dir-col align-center`}>
                <span className="dm-sans font-wt-500 text-19 text-grayClr">Don't have an account?</span>&nbsp;&nbsp;
                <button className={`dm-sans text-19 font-wt-500 ${styles.signupBtn} border-none cursor-pointer`} onClick={handleRegister}>Sign Up</button>
            </div>
            {/*         home button      */}
            <button onClick={handleQuizCatgeory} className={`${styles.quizzesBtn} flex justify-center position-absolute`}>
                <IoArrowBackOutline />
                <span>Quizzes</span>
            </button>
        </div>
    )
};

export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import lock from "../../assets/lock.svg";


type Errors = {
    email?: string;
    password?: string;
};

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    //               useState initializes the login data state with default empty values
    const [loginFormData, setLoginFormData] = useState({
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
        }
        //      check if the password input is empty
        if (!loginFormData.password.trim()) {
            errors.password = "Password is required";
        }
        //      set the error state 
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    //      Fucntion for user login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();                     // Prevents the default form submission behavior (like refreshing the page)

        if (!validateForm()) {
            return;
        };

        console.log(loginFormData);
    };

    const passwordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    //              function for handle the sign up 
    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <div className={`${styles.loginFormContainer} flex dir-col justify-center align-center`}>
            <div className=" flex dir-col align-center">
                <p className="dm-sans font-wt-700 text-30">Quiz Hub</p>
                <p className="dm-sans font-wt-500 text-19 text-grayClr">The Ultimate Quiz platform</p>
            </div>
            <form onSubmit={handleLogin} className={`${styles.loginForm} flex dir-col align-center`}>
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
                <div>
                    <button type="submit" className="btn outline-none border-none font-wt-700 text-16 m-t-30 cursor-pointer">Sign in</button>
                </div>
            </form>
            <div className={`${styles.lastLine} flex dir-col align-center`}>
                <span className="dm-sans font-wt-500 text-19 text-grayClr">Don't have an account?</span>&nbsp;&nbsp;
                <button className={`dm-sans text-19 font-wt-500 underline ${styles.signupBtn} border-none cursor-pointer`} onClick={handleRegister}>Sign Up</button>
            </div>
        </div>
    )
};

export default LoginPage;
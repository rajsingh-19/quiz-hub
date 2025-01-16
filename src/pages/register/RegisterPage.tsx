import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../login/login.module.css";
import CustomBtn from "../../components/button/CustomBtn";
import { registerUser } from "../../services";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import lock from "../../assets/lock.svg"; 
import { toast } from 'react-toastify';

type Errors = {
    name?: String;
    email?: String;
    mobile?: String;
    password?: String;
    checkbox?: String;
};

//      Define the type of register form data
interface RegisterFormData {
    name: string,
    email: string,
    mobile: string,
    password: string
};

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    //              useState initializes the form data state with default empty values
    const [registerFormData, setRegisterFormData] = React.useState<RegisterFormData>({          
        name: '',
        email: '',
        mobile: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);

    //          states for handling the form errors
    const [errors, setErrors] = useState<Errors>({});

    // Form validation logic
    const validateForm = () => {
        const validationErrors: Errors = {};

        if (!registerFormData.name.trim()) {
            validationErrors.name = "Name is required.";
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(registerFormData.email)) {
            validationErrors.email = "Invalid email format.";
        };

        if(registerFormData.mobile.length < 10 ) {
            validationErrors.mobile = "Enter 10 digit mobile number.";
        };

        if (registerFormData.password.length < 8) {
            validationErrors.password = "Password must be at least 8 characters long.";
        };

        if (!checkboxChecked) {
            validationErrors.checkbox = "You must agree to the terms of use and privacy policy.";
        };

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    //               Function to handle form submission and register the user
    const handleRegisterUser = async (e: React.FormEvent) => {
        e.preventDefault();                         // Prevents the default form submission behavior (like refreshing the page)

        if (!validateForm()) {
            return;
        };

        try {
            const res = await registerUser(registerFormData);
            
            if(res.status === 201) {
                setRegisterFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    password: ''
                })
                toast.success("Registered Success");
                navigate('/login');
            } else {
                const errorData = await res.json();
                const errorMessage = errorData.message || "An error occured";
                toast.error(errorMessage);
            }
        } catch (error) {
            console.log(error);
            toast.error(`An Unexpected error occur: ${error}`);
        }
    };
    
    const passwordVisibility = (): void => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = (): void => {
        navigate('/login');
    };

    const handleQuizCatgeory = (): void => {
        navigate('/category');
    };

    return (
        <div className="flex dir-row position-relative">
            <div className={`${styles.loginFormContainer} flex dir-col align-center justify-center`}>
                <div className="firstSection">
                    <p className="dm-sans font-wt-700 text-30">Create an account</p>
                    <p className="dm-sans font-wt-500 text-19 text-grayClr">The Ultimate quiz game is here</p>
                </div>
                {/* Form for user registration */}
                <form onSubmit={handleRegisterUser} className={`${styles.loginForm} flex dir-col`}>
                    {/* Form for user register  */}
                    <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                        <input className={`${styles.input} text-16 dm-sans font-wt-500 border-none outline-none`} type="text" name='name' value={registerFormData.name} placeholder="Name" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                    </div>
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                    <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                        <input className={`${styles.input} text-16 dm-sans font-wt-500 border-none outline-none`} type="email" name='email' value={registerFormData.email} placeholder="Email" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                    </div>
                    {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                    <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                        <input className={`${styles.input} text-16 dm-sans font-wt-500 border-none outline-none`} style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'none' }} type="number" name='mobile' value={registerFormData.mobile} placeholder="Mobile" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                    </div>
                    {errors.mobile && <p className={styles.errorMessage}>{errors.mobile}</p>}
                    <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                        <img className={styles.inputIcons} src={lock} alt="lock icon" />
                        <input className={`${styles.passwordInput} text-16 dm-sans font-wt-500 border-none outline-none`} type={showPassword ? "password" : "text"} name='password' value={registerFormData.password} placeholder="Password" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                        {
                            showPassword ? <IoEyeOffOutline onClick={passwordVisibility} className={`${styles.hideShowIcons} cursor-pointer`} /> : <IoEyeOutline onClick={passwordVisibility} className={`${styles.hideShowIcons} cursor-pointer`} /> 
                        }
                    </div>
                    {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
                    <div className="flex dir-row align-center m-t-15 m-b-15">
                        <input className={`${styles.checkbox} m-r-5`} type="checkbox" checked={checkboxChecked} onChange={(e) => setCheckboxChecked(e.target.checked)} />
                        <p className="text-grayClr">By creating an account, I agree to our terms of use and privacy policy</p>
                    </div>
                    {errors.checkbox && <p className={styles.errorMessage}>{errors.checkbox}</p>}
                    <div className={`${styles.submitBtnContainer} m-t-5`}>
                        <CustomBtn type={"submit"} className={"btn outline-none border-none font-wt-700 text-16 m-t-30 cursor-pointer"} label={"Create Account"} />
                    </div>
                </form>
                <div className={styles.lastLine}>
                    <span className="dm-sans font-wt-500 text-19 text-grayClr">Already have an account?</span>&nbsp;&nbsp;
                    <button className={`dm-sans text-19 font-wt-500 ${styles.signupBtn} border-none cursor-pointer`} onClick={handleLogin}>Login</button>
                </div>
            </div>
            {/*         Quizzes button      */}
            <button onClick={handleQuizCatgeory} className={`${styles.quizzesBtn} flex justify-center position-absolute`}>
                <IoArrowBackOutline />
                <span>Quizzes</span>
            </button>
        </div>
    )
};

export default RegisterPage;

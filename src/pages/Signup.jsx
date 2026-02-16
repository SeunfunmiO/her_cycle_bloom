
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axios from 'axios';
import GoogleSignIn from '../config/firebaseAuth';
import { useTranslation } from 'react-i18next';



const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation([
        "authoptions",
        "common",
        "toast",
        "placeholder"
    ]);


    const handleGoogleSignIn = async () => {
        try {
            const user = await GoogleSignIn()
            if (user) {
                toast.success(t("toast:account_created"));
                navigate('/create-profile');
            } else {
                toast.error(t("toast:email_used"));
            }
        } catch (error) {
            toast.error(t("toast:email_used"));
            return error
        }
    }


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: yup.object({
            email: yup.string().required(t("toast:email_required")).email(t("toast:valid_email")),
            password: yup.string()
                .required(t("toast:password_required")).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
                    t("toast:password_rules")),
            confirmPassword: yup.string().required(t("toast:confirm_password"))
                .oneOf([yup.ref("password")], t("toast:password_match")),
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const payload = {
                    email: values.email,
                    password: values.password
                }
                const response = await axios.post("https://her-cycle-bloom-backend.onrender.com/user/sign-up", payload,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                const data = response.data

                localStorage.setItem('token', response.data.token)

                if (!data.success) {
                    toast.error(t("toast:email_used"));
                } else {
                    toast.success(t("toast:account_created"));
                    setTimeout(() => {
                        navigate('/create-profile');
                    }, 1200);
                }
            } catch (error) {
                console.log("Error signing up user : ", error);
                toast.error(t("toast:email_used"));
            } finally {
                setLoading(false)
            }
        }
    });

    return (
        <div className='bg-lavender dark:bg-neutral-900'>
            <div className='max-w-md mx-auto px-4 text-neutral-900 dark:text-neutral-100'>
                <img
                    onClick={() => navigate(-1)} src="./maki_arrow.svg"
                    className='pt-5 dark:invert'
                    alt="back" />

                <form className='flex flex-col justify-center gap-4 mt-20' onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label className='font-medium' htmlFor="email">{t("common:email")}</label>
                        <input
                            className={`border border-black dark:border-neutral-100 rounded-lg py-3 px-2 bg-transparent
                                 placeholder:font-medium
                          ${formik.touched.email && formik.errors.email ? 'border-red-600 dark:border-red-500' : ''}`}
                            type="email"
                            name="email"
                            placeholder={t("placeholder:enter_email")}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            autoFocus
                        />
                        {formik.touched.email && formik.errors.email && <small className="text-red-600 dark:text-red-500">
                            {formik.errors.email}</small>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-medium' htmlFor="password">{t("common:create_password")}</label>
                        <input
                            className={`border border-black  dark:border-neutral-100  rounded-lg py-3 px-2 bg-transparent
                                 placeholder:font-medium
                            ${formik.touched.password && formik.errors.password
                                    ? 'border-red-600 dark:border-red-500' : ''}`}
                            type="password"
                            name="password"
                            placeholder={t("placeholder:enter_password")}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && <small className="text-red-600 dark:text-red-500">
                            {formik.errors.password}</small>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-medium' htmlFor="confirmPassword">{t("common:confirm_password")}</label>
                        <input
                            className={`border border-black  dark:border-neutral-100  rounded-lg py-3 px-2 bg-transparent
                                 placeholder:font-medium  
                             ${formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                    'border-red-600 dark:border-red-500' : ''}`}
                            type="password"
                            name="confirmPassword"
                            placeholder={t("placeholder:re_enter_password")}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <small className="text-red-600
                         dark:text-red-500">
                            {formik.errors.confirmPassword}</small>}
                    </div>


                    <button
                        type='submit'
                        className={`mt-10 mb-14 w-full py-2 shadow-lg text-lg font-bold lg:text-xl rounded-3xl
                      ${loading ? 'bg-pink-300 cursor-not-allowed' : 'bg-palevioletred'}`}
                        disabled={loading}
                    >
                        {loading ? t("common:creating") : t("common:create_account")}
                    </button>

                </form>

                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-neutral-300 dark:bg-neutral-100"></div>
                    <span className="text-neutral-500 text-sm dark:text-neutral-300">{t("common:or")}</span>
                    <div className="flex-1 h-px bg-neutral-300 dark:bg-neutral-100"></div>
                </div>

                <div className='mx-4 gap-5 flex flex-col py-14 items-center justify-center'>
                    <button
                        type='button'
                        onClick={handleGoogleSignIn}
                        className='gap-3 font-medium items-center justify-center rounded-full w-full flex py-3 border border-black
                         dark:border-neutral-100  outline-0'
                    >
                        <img className='w-4 h-4'
                            src="./devicon_google.svg" alt="Google Icon" />
                        {t("authoptions:sign_up_google")}
                    </button>
                    <button
                        type='button'
                        className="flex font-medium items-center justify-center gap-3 w-full rounded-full py-3 border border-black 
                        dark:border-neutral-100 ">
                        <img className='w-3 h-3 dark:invert' src="./Vector.svg" alt="Apple Icon" />
                        {t("authoptions:sign_up_apple")}
                    </button>
                </div>
            </div >
        </div >
    )
}

export default Signup;
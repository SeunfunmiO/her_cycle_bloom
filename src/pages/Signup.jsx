import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup'

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleCreateAccount = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/create-profile')
            toast.success(' Account created successfully')
        }, 3000);
        setLoading(false)
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async (values) => {
            try {
                console.log(values);
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong. Please try again.')
            }
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .required("Email is required!")
                .email("Please enter a valid email address"),
            password: yup
                .string()
                .required("Password is required!")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
                    "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character"
                ),
            confirmPassword: yup
                .string()
                .required("Please confirm your password")
                .oneOf([yup.ref("password")], "Passwords must match"),
        }),
    });
    console.log(formik.values);


    return (
        <div style={{ backgroundColor: 'var(--bgLavender)' }} >
            <img src="./maki_arrow.svg" className='ml-3 pt-5' alt="arrow" />

            <form className='flex flex-col md:items-center justify-center gap-4 mx-4 mt-20 text-base' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <label className='text-base font-medium' htmlFor="email">Email</label>
                    <input className={`border border-black rounded-lg py-3 px-2 bg-transparent
                     ${formik.touched.email && formik.errors.email ? `border-red-600` : ''}`} type="email"
                        name="email" placeholder='Enter email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email ? <small className="text-red-600">{formik.errors.email}</small> : ''}
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-base font-medium' htmlFor="password">Create Password</label>
                    <input className={`border border-black rounded-lg py-3 px-2 bg-transparent 
                    ${formik.touched.password && formik.errors.password ? `border-red-600` : ''}`}
                        type="password" name="password" placeholder='Enter password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password ? <small className="text-red-600">{formik.errors.password}</small> : ''}
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-base font-medium' htmlFor="confirmPassword">Confirm Password</label>
                    <input className={`border border-black rounded-lg py-3 px-2 bg-transparent 
                    ${formik.touched.confirmPassword && formik.errors.confirmPassword ? `border-red-600` : ''}`} type="password"
                        name="confirmPassword" placeholder='Enter password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword ? <small className="text-red-600">{formik.errors.confirmPassword}</small> : ''}
                </div>
            </form>

            <div className='mx-4 gap-5 flex flex-col mt-28 items-center justify-center'>
                <button className='gap-3 font-medium items-center justify-center rounded-full w-full md:w-1/2 flex py-3 border border-black'>
                    <img className='w-4 h-4'
                        src="https://static.vecteezy.com/system/resources/previews/046/861/647/non_2x/google-logo-transparent-background-free-png.png" alt="Google Icon" />
                    sign-up with google
                </button>
                <button className="flex font-medium items-center justify-center gap-3 w-full md:w-1/2 rounded-full py-3 border border-black">
                    <img className='w-3 h-3' src="./Vector.svg" alt="Apple Icon" />
                    sign-up with Apple
                </button>
            </div>

            <div className='mx-4 flex items-center justify-center'>
                <button type='button' disabled={loading} onClick={() => handleCreateAccount()}
                    style={{ backgroundColor: ' var(--bgPalevioletred)' }}
                    className='mt-16 mb-20 w-full md:w-1/2 py-2 shadow-lg text-xl font-bold md:text-2xl rounded-3xl'>
                    {loading ? 'Creating...' : 'Create Account'}
                </button>
            </div>
        </div>
    )
}

export default Signup
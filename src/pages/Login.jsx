import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleSignIn from '../config/firebaseAuth';
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      const user = await GoogleSignIn()
      if (user) {
        navigate('/home');
      } else {
        toast.error(user.message || "User not found")
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
      return error
    }
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup.string().required('Email is required!').email('Please enter a valid email'),
      password: yup.string().required('Password is required!'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const response = await axios.post("https://her-cycle-bloom-backend.onrender.com/user/sign-in", values)
        const data = response.data


        if (data?.user) {
          navigate('/home');
        } else {
          toast.error(data.message || 'Invalid email or password');
        }
      } catch (error) {
        toast.error('Something went wrong , please try again')
        return error
      }
    }
  });

  return (
    <div
      className='bg-lavender dark:bg-neutral-900 transition-colors duration-300'>
      <div className='max-w-md mx-auto px-4'>
        <img
          onClick={() => navigate(-1)}
          src="./maki_arrow.svg"
          className='pt-5 dark:invert'
          alt="back"
        />

        <form className='flex flex-col gap-4 justify-center mt-36' onSubmit={formik.handleSubmit}>
          <div className='flex flex-col gap-2 text-neutral-900 dark:text-neutral-100'>
            <label className='text-base font-medium ' htmlFor="email">Email</label>
            <input
              className={`border border-black dark:border-neutral-100 rounded-lg py-3 px-2 w-full bg-transparent
                 placeholder:font-medium
            ${formik.touched.email && formik.errors.email ? `border-red-600  dark:border-red-500` : ''}`}
              type="email"
              name="email"
              placeholder='Enter email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoFocus
            />
            {formik.touched.email ? <small className="text-red-600 dark:text-red-500">{formik.errors.email}</small> : ''}
          </div>

          <div className='flex flex-col gap-2 text-neutral-900 dark:text-neutral-100'>
            <label className='text-base font-medium' htmlFor="password">Password</label>
            <input
              className={`border border-black dark:border-neutral-100 rounded-lg py-3 px-2 w-full bg-transparent placeholder:font-medium 
              ${formik.touched.password && formik.errors.password ? `border-red-600 dark:border-red-500` : ''}`}
              type="password"
              name="password"
              placeholder='Enter password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password ? <small className="text-red-600 dark:text-red-500">{formik.errors.password}</small> : ''}
            <p className="text-sm font-medium gap-0">Forgot password ?</p>
          </div>

          <button
            className={`mt-10 mb-14 w-full text-neutral-900 dark:text-neutral-100 py-2 shadow-lg font-bold text-lg lg:text-xl rounded-3xl 
              ${loading ?
                'bg-pink-300 cursor-not-allowed' : 'bg-palevioletred'}`}
            type='submit'
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>

        </form >

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-neutral-300 dark:bg-neutral-100"></div>
          <span className="text-neutral-500 text-sm dark:text-neutral-300">OR</span>
          <div className="flex-1 h-px bg-neutral-300 dark:bg-neutral-100"></div>
        </div>

        <div className='mx-4 gap-5 flex flex-col py-14 items-center justify-center text-neutral-900 dark:text-neutral-100'>
          <button
            type='submit'
            onClick={handleGoogleSignIn}
            className='gap-3 font-medium items-center justify-center rounded-full w-full flex py-3 border border-black 
            dark:border-neutral-100 outline-0 text-neutral-900 dark:text-neutral-100'
          >
            <img className='w-4 h-4'
              src="./devicon_google.svg" alt="Google Icon" />
            sign-up with google
          </button>
          <button
            type='submit'
            className="flex font-medium items-center justify-center gap-3 w-full rounded-full py-3 border border-black
             dark:border-neutral-100 text-neutral-900 dark:text-neutral-100">
            <img className='w-3 h-3 dark:invert' src="./Vector.svg" alt="Apple Icon" />
            sign-up with Apple
          </button>
        </div>
      </div >
    </div >
  )
}

export default Login

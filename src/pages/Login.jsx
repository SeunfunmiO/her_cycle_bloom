import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignIn = () => {
    setLoading(true)
    setTimeout(() => {
      navigate('/home')
    }, 3000);
    setLoading(false)
  }


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },

    validationSchema: yup.object({
      email: yup.string().required('Email is required!')
        .email('Please enter a valid email address'),
      password: yup.string().required('Password is required!')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/, 'Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character')
        .min(6, 'Password must be at least 6 characters'),
    })
  })

  return (
    <div style={{ backgroundColor: 'var(--bgLavender)' }}>
      <img src="./maki_arrow.svg" className='ml-3 pt-5' alt="arrow" />

      <form className='flex flex-col gap-4 justify-center md:items-center md:mx-auto mx-4 mt-36 text-base' onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-2'>
          <label className='text-base font-medium' htmlFor="email">Email</label>
          <input className={`border border-black rounded-lg py-3 px-2 w-full bg-transparent
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
          <input className={`border border-black rounded-lg py-3 px-2 w-full bg-transparent 
                    ${formik.touched.password && formik.errors.password ? `border-red-600` : ''}`}
            type="password" name="password" placeholder='Enter password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password ? <small className="text-red-600">{formik.errors.password}</small> : ''}
          <p className="text-sm font-medium gap-0">Forgot password ?</p>
        </div>
      </form >

      <div className='flex flex-col justify-center items-center gap-5 mx-4 text-center mt-20'>
        <button className='gap-3 font-medium items-center justify-center rounded-full w-full md:w-1/2 flex py-3 border border-black'>
          <img className='w-4 h-4' src="https://static.vecteezy.com/system/resources/previews/046/861/647/non_2x/google-logo-transparent-background-free-png.png" alt="Google Icon" />
          Login with google
        </button>
        <button className="flex font-medium items-center justify-center gap-3 w-full md:w-1/2 rounded-full py-3 border border-black">
          <img className='w-3 h-3' src="./Vector.svg" alt="Apple Icon" />
          Login with Apple
        </button>
        <button disabled={loading} onClick={handleSignIn}
          style={{ backgroundColor: ' var(--bgPalevioletred)' }}
          className='my-14 w-full md:w-1/2 py-2 shadow-lg font-bold text-xl md:text-2xl rounded-3xl'>
          {loading ? 'Logging In' : 'Login'}
        </button>
      </div>
    </div >
  )
}

export default Login
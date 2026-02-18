import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
const ChangePassword = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                setSaved(false)

                const token = localStorage.getItem('token')
                const payload = {
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword
                }
                const res = await axios.put(`${import.meta.env.APP_URL}/user/change-password`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(res);

                const data = res.data

                if (!data.success) {
                    toast.error(data.message)
                } else {
                    setSaved(true)
                    formik.resetForm()
                    toast.success(data.message)
                    setTimeout(() => {
                        localStorage.removeItem("token")
                        navigate("/log-in")
                    }, 1500)
                }
            } catch (error) {
                console.log("Error changing password: ", error);
                const message =
                    error.response?.data?.message ||
                    "Error changing password"

                toast.error(message)
            } finally {
                setLoading(false)
            }
        },
        validationSchema: yup.object({
            oldPassword: yup
                .string()
                .required("Password is required!")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
                    "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character"
                ),
            newPassword: yup
                .string()
                .required("New password is required!")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
                    "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character"
                ),
            confirmNewPassword: yup
                .string()
                .required("Please confirm your new password")
                .oneOf([yup.ref("newPassword")], "Password must match new password!"),
        }),
    });


    return (
        <div
            className="bg-white dark:bg-neutral-900 h-screen transition-colors duration-200"
        >
            <div className='max-w-md mx-auto pt-10 px-4'>
                <div className="flex w-full items-center pb-5 px-3">
                    <img
                        className='cursor-pointer dark:invert'
                        onClick={() => navigate(-1)}
                        src="./Arrow Left.svg" alt="back"
                    />
                    <h1 className="font-bold text-lg lg:text-xl w-full text-center">
                        Change Password
                    </h1>
                </div>

                <div className='border-gray-200 dark:border-neutral-700 border-b'></div>

                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-10 mt-8">

                    <div>
                        <div className={`border rounded-2xl border-pink-200  relative flex justify-center gap-2 flex-col h-12 px-2
                        ${formik.errors.oldPassword && formik.touched.oldPassword ?
                                'border border-red-500' :
                                'border border-gray-200'
                            }
                        `}>
                            <input
                                className='outline-0 peer px-2 bg-transparent'
                                type="password"
                                name='oldPassword'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.oldPassword}
                            />
                            <label
                                className={`text-pink-200 text-sm absolute bg-white dark:bg-neutral-900 peer-focus:-top-5 
                                    peer-focus:text-sm transition-all
                                pointer-events-none left-2 p-2 lg:text-base 
                                ${formik.errors.oldPassword && formik.touched.oldPassword ?
                                        'text-red-500' :
                                        'text-gray-200'
                                    }
                        `}
                                htmlFor="account-password">Old Password
                            </label>
                        </div>
                        {formik.touched.oldPassword ? <small className="text-red-500 text-[12px] md:text-sm">
                            {formik.errors.oldPassword}
                        </small> : ''
                        }
                    </div>

                    <div>
                        <div className={`border rounded-2xl border-pink-200 relative flex justify-center gap-2 flex-col h-12 px-2
                        ${formik.errors.newPassword && formik.touched.newPassword ?
                                'border border-red-500' :
                                'border border-gray-200'
                            }
                        `}>
                            <input
                                className='outline-0 peer px-2 bg-transparent'
                                type="password"
                                name='newPassword'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPassword}
                            />
                            <label
                                className={`text-pink-200 text-sm absolute bg-white  dark:bg-neutral-900 peer-focus:-top-5 
                                    peer-focus:text-sm transition-all pointer-events-none left-2 p-2 lg:text-base 
                        ${formik.errors.newPassword && formik.touched.newPassword ?
                                        'text-red-500' :
                                        'text-gray-200'
                                    }
                        `}
                                htmlFor="account-password">New Password
                            </label>
                        </div>
                        {formik.touched.newPassword ? <small className="text-red-500 text-[12px] md:text-sm">
                            {formik.errors.newPassword}
                        </small> : ''
                        }
                    </div>

                    <div>
                        <div className={`border rounded-2xl border-pink-200 relative flex justify-center gap-2 flex-col h-12 px-2
                        ${formik.errors.confirmNewPassword && formik.touched.confirmNewPassword ?
                                'border border-red-500' :
                                'border border-gray-200'
                            }
                        `}>
                            <input
                                className='outline-0 peer px-2 bg-transparent'
                                type="password"
                                name='confirmNewPassword'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmNewPassword}
                            />
                            <label
                                className={`text-pink-200 text-sm absolute bg-white  dark:bg-neutral-900 peer-focus:-top-5 
                                    peer-focus:text-sm transition-all pointer-events-none left-2 p-2 lg:text-base 
                        ${formik.errors.confirmNewPassword && formik.touched.confirmNewPassword ?
                                        'text-red-500' :
                                        'text-gray-200'
                                    }
                        `}
                                htmlFor="account-password">Confirm New Password
                            </label>
                        </div>
                        {formik.touched.confirmNewPassword ? <small className="text-red-500 text-[12px] md:text-sm">
                            {formik.errors.confirmNewPassword}
                        </small> : ''
                        }
                    </div>

                    <button
                        type="submit"
                        disabled={loading || saved}
                        className={`w-full py-3 rounded-2xl text-white font-medium
                          ${loading || saved
                                ? "bg-pink-300 cursor-not-allowed"
                                : "bg-palevioletred cursor-pointer"
                          }
                    `}
                    >
                        {loading ? "Saving..." : saved ? "Saved" : "Save"}
                    </button>

                </form>

            </div>
        </div>
    )
}

export default ChangePassword
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: yup.object({
            password: yup
                .string()
                .required('Password is required')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
                    'Password must have at least 6 characters, one uppercase, one lowercase, one number, and one special character'
                ),
            confirmPassword: yup
                .string()
                .required('Please confirm your password')
                .oneOf([yup.ref('password')], 'Passwords must match'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const payload = {
                    newPassword: values.password,
                    token,
                };

                const { data } = await axios.post(
                    `https://hercyclebloom.vercel.app/user/reset-password`,
                    payload,
                    { headers: { 'Content-Type': 'application/json' } }
                );

                if (!data.success) {
                    toast.error(data.message || 'Cannot reset password now, try again');
                } else {
                    toast.success(data.message || 'Password reset successfully');
                    setTimeout(() => navigate('/log-in'), 1200);
                }
            } catch (error) {
                console.error('Reset password error:', error);
                toast.error(error.response?.data?.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="bg-white dark:bg-neutral-900 min-h-screen flex items-center">
            <form
                onSubmit={formik.handleSubmit}
                className="max-w-md w-full mx-auto p-6 space-y-6 bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-md"
            >
                <h1 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100">
                    Reset Password
                </h1>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-neutral-900 dark:text-neutral-100">New Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={`border rounded-lg py-2 px-3 bg-transparent outline-none
                        ${formik.touched.password && formik.errors.password ? 'border-red-500'
                                : 'border-gray-300 dark:border-neutral-600'}
                        text-neutral-900 dark:text-neutral-100`}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <small className="text-red-500">{formik.errors.password}</small>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-neutral-900 dark:text-neutral-100">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        className={`border rounded-lg py-2 px-3 bg-transparent outline-none
                        ${formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                'border-red-500' :
                                'border-gray-300 dark:border-neutral-600'}
                        text-neutral-900 dark:text-neutral-100`}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <small className="text-red-500">{formik.errors.confirmPassword}</small>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-xl font-semibold text-white
                        ${loading ? 'bg-pink-300 cursor-not-allowed' : 'bg-palevioletred'}`}
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;

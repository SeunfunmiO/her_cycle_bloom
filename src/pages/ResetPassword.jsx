import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation([
        "toast",
        "common"
    ])
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
                .required(t("toast:confirm_password"))
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
                    t("toast:password_rules")
                ),
            confirmPassword: yup
                .string()
                .required(t("toast:re_enter_password"))
                .oneOf([yup.ref('password')], t("toast:password_match")),
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
                    toast.error(t("toast:reset_failed"));
                } else {
                    toast.success(t("toast:reset_success"));
                    setTimeout(() => navigate('/log-in'), 2000);
                }
            } catch (error) {
                console.error('Reset password error:', error);
                toast.error(t("toast:reset_failed"));
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
                    {t("common:reset_password")}
                </h1>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-neutral-900 dark:text-neutral-100">{t("common:new_password")}</label>
                    <input
                        type="password"
                        name="password"
                        placeholder={t("placeholder:enter_new_password")}
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
                    <label className="font-medium text-neutral-900 dark:text-neutral-100">{t("common:confirm_password")}</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder={t("placeholder:confirm_new_password")}
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
                    {loading ? t("common:resetting") : t("common:reset_password")}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;

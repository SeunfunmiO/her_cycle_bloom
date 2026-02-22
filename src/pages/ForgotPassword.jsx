import React, { useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const { t } = useTranslation([
        "toast",
        "common",
        "placeholder"
    ])

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const { data } = await axios.post(`https://hercyclebloom.vercel.app/user/forgot-password`,
                { email }
            )

            if (!data.success) {
                setMessage(t("toast:reset_link_error"))
            } else {
                setMessage(t("toast:reset_link_sent"))
            }
        } catch (error) {
            setMessage(t("toast:reset_link_error"))
            console.log("Error sending reset link", error)

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white dark:bg-neutral-900 min-h-screen flex items-center">
            <form
                onSubmit={handleForgotPassword}
                className="max-w-md mx-auto w-full space-y-4"
            >
                <div className="flex flex-col gap-2 text-neutral-900 dark:text-neutral-100">
                    <label className="text-base font-medium" htmlFor="email">
                        {t("common:email")}
                    </label>
                    <input
                        className="border border-black dark:border-neutral-100 rounded-lg py-3 px-2 w-full bg-transparent"
                        type="email"
                        name="email"
                        placeholder={t("placeholder:enter_email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-palevioletred text-white py-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? t("common:sending") : t("common:send_link")}
                </button>

                {message && (
                    <p className="text-sm text-center text-neutral-700 dark:text-neutral-300">
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
}

export default ForgotPassword
